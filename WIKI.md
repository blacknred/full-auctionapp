# Auction app(broking)

> selling and buying assets and services

- `Auction`:
  1. created(_active_)
    1.2. system
      1.2.1. can delete offer anytime if it violates rules
      1.2.2. can promote(_is-promoted_) offer
      1.2.3. streams offer via firehose
      1.2.4. sends notification to bidder which bid was unbid
      1.2.5. add bidder to watchers
      1.2.6. sends offer notifications to watchers
    1.2. author
      1.2.1. cannot change offer in _active_ status
      1.2.2. can delete own offer before _finished_ status
      1.2.3. cannot bid own offer
      1.2.4. cannot see bidders in _private_ mode
    1.3. bidder
      1.3.1. can make one(_is-single-bid_) or many bids
      1.3.2. bid must have price that incrementes(_sell-mode_) or decrementes(_buy-mode_) the nearest price by fixed(_bid-step_) of free amount
      1.3.3.
      1.3.4. cannot bid if doesnt have enough rating in _min-rating-bid_ mode
      1.3.5. cannot see other bidders in _private_ mode
      1.3.6. can bid _blitz-price_ to attempt to finish auction before ending
  2. ended(_ends-at_) or blitz-price-bid created
    2.1. there are no bids
      2.1.1. system transits offer to _failed_ status and sends notifications to author and watchers
    2.2. there are bids
      2.2.1. system transits offer to _inactive_ status and sends notifications to author and watchers
      2.2.2. author have to accept/reject bid during 1 day, otherwise last bid is a winner
        2.2.2.1. system transits offer to _finished_ or _failed_ status and sends notification to author and watchers
        2.2.2.2. system sends notifications to author and won bidder to rate each other for _finished_ offer
    2.3. author can update offer in failed status and transit it to active status
        2.3.1. system sends notifications to author and watchers
    2.4. _finished_ orders available only for author and bidders  

- `Monetization`
  - Ads, 25 bids per month
  - Offer promotion(fixed price, 1month)
  - Premium functionality: unlimited bids, smart notifications, no ads


<!-- notifications
  - seller
    - offer successfully deleted/ended
    - a new bid for offer
    - offer winner
    - rate a buyer
    - a new question about offer
    - offer promotion ended
    - 
  - buyer
    - offer i watch is deleted/ended
    - my bid was outbid/rejected/deleted
    - offer winner
    - rate a seller -->

### Arch(docker)

- RabbitMq: handle peak(pre_ending) bids with batching, delayed exchange(instead of cron) for 
delayed_exchange_premium_payment(1mon), delayed_exchange_user_delete(1mon),

ending bids, accepting bids, ending offer promotions, hard_user_delete
- Redis: firehose(pubsub), cache: user_bids_per_month_with_ttl
- Postgres: entities, partitions, procedures
- Nginx: proxy, security(rate limiting, cors, helmet), http cache, load ballancer
- Nodejs: NestJs MVC, swagger, passport
- NextJs: tailwind, react-intl, swr, redux-toolkit/recoil, nextauth, jest, testing-library, cypress

### Entities

```sql
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS 'profile';
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS offer;
DROP TABLE IF EXISTS user_offer;

CREATE TABLE user (
  id serial PRIMARY KEY,
  email text UNIQUE NOT NULL CHECK (length(VALUE) >= 6),
  password text NOT NULL,
  is_premium boolean DEFAULT 0,
  created_at date NOT NULL DEFAULT now(),
  deleted_at date,
  notifications jsonb  -- [{ order_id, text, created_at }], <1000
)
CREATE TABLE 'profile' (
  'name' varchar(500) NOT NULL CHECK (length(VALUE) >= 6),
  'image' text,
  bio text,
  rating smallint NOT NULL DEFAULT 0,
  user_id int REFERENCES user(id) UNIQUE ON UPDATE CASCADE ON DELETE SET NULL
)
CREATE TABLE category (
  id serial PRIMARY KEY,
  name varchar(500) UNIQUE NOT NULL,
  specifications jsonb, -- [{ spec: decription }]
  parent_id smallint REFERENCES employee(id) ON DELETE CASCADE
)
CREATE TABLE offer (
  id serial PRIMARY KEY,
  'type' enum('sell', 'buy') NOT NULL,
  title text NOT NULL,
  'description' text,
  specifications jsonb, -- [{ spec: value }]
  media text[],
  created_at date NOT NULL DEFAULT now(),
  ends_at date,
  category_id smallint REFERENCES category(id) ON UPDATE CASCADE ON DELETE CASCADE,
  user_id int REFERENCES user(id) ON UPDATE CASCADE ON DELETE CASCADE,
  --
  'status' enum('active', 'inactive', 'failed', 'finished') NOT NULL,
  start_price int NOT NULL,
  blitz_price int,
  currency varchar(3) NOT NULL,
  is_promoted boolean DEFAULT 0,
  is_private boolean DEFAULT 0,
  is_single_bid boolean DEFAULT 0,
  bid_step int,
  min_rating_bid int,
  --
  bids jsonb, -- [{ user_id, price, comment, created_at }])
  questions jsonb -- [{ user_id, question, answer, created_at }])
 ) PARTITION BY RANGE (created_at);
CREATE TABLE offer_2022 PARTITION OF offer FOR VALUES FROM ('2022.01.01') TO ('2023-01-01');
CREATE TABLE user_offer (
  user_id int REFERENCES user(id) ON UPDATE CASCADE,
  offer_id int REFERENCES offer(id) ON UPDATE CASCADE,
  PRIMARY KEY (user_id, offer_id)
)
```

### App

- Backend(monolith)
  - `AUTH`(crud):
    - create: refresh_token_&_access_token_via_cookie, payload{id,is_premium}
    - read:
    - patch: access_token
    - delete: remove_tokens_from_cookie
  - `USER`(crud, amqp):
    - create: User & Profile
    - read: Profile
    - patch: enable_premium->payment_transaction->delayed_exchange_premium_payment_publish(1mon)(if_fails_disable_premium_and_send_notification)
    - delete: soft_delete->delayed_exchange_user_delete(1mon)
    - premium_payment(): delayed_exchange_premium_payment_consume->payment_transaction
    
    -_premium-payment(amqp)_: payment_transaction->if_fails_disable_premium_and_send_notification
  - `NOTIFICATION`(crd)
    - create
    - read
    - delete
  - `OFFER`(crud, amqp, redis)
    - create(401)
      - db_write_Offer
      - delayed_exchange_offer_ends_publish
      - redis_offers_channel_publish
    - read:
      - db_read_from_all_own_and_only_active_theirs
        - filter[category,user_id,start_price,query,created_at,ends_at,blitz_price,is_down_price,watched]
        - sort[created_at,ends_at,start_price,blitz_price]
        - pagination[keyset]
    - readOne(401):
      - db_read_Offer_(404)
    - patch(401)
      - db_update_Offer_only_in_non_active_status(408)
      - delayed_exchange_offer_ends_consume->define_winner
        - db_update_status
          - db_remove_from_watched_if_finished
        - __notify_all_bidders__
    - delete(401)
      - db_delete_Offer
      - db_delete_related_bids
      - __notify_all_bidders__
    - firehose(a,sse): redis_offers_channel_subscribe->filter[none,category,user_id,start_price,query]

  - Bid(crd, amqp, redis)
    - create(401)
      - delayed_exchange_bulk_bids_publish
    - createBulk(amqp)
      - delayed_exchange_bulk_bids_consume
      - filter_bids_from_user_with_premium_or_under_25_bids_per_month
      - db_bulk_insert_Bids
      - db_upsert_offer_to_Watch_Offer
    - read(401)
      - db_read_Bids
    - delete(401)
      - db_deleteBid/s

  - Notification
- Frontend
  - /auth [form[name,email,password]]
  - /profile [analitics[rating,Offers_cnt,bids_cnt,won_bids_cnt,activity_chart,top_price_bid,meduim_bid_price,pending_bids], form[name,bio,image,email,password,enable_premium,delete_account]]
  - /offers
    - active orders list
  - /offers/:id
    - form[]
    - chart[]
  - /offer
    - form[]
  - /
    - [watched,bidded,won]

— Header —
Auction    lang, currency, profile/rating/notifications
— Card —
media[0]
title
current-price   time-remaining
— Page —
media[0]  title
                 status(active|done) category
                 description
                 current-top-bid  time-remaining
media.      input?  submit-bid
                 blitz-price
                 buy-now
                 bids history


## TODO

- workspaces
- payment
- offer.title tsvector
- prometheus & graphana
- nginx
