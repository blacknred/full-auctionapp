# Auction app(broking)

> selling and buying assets and services

## Features

`Auction`

1. created(_active_)
   1. system
      1. can delete offer anytime if it violates rules
      2. can promote(_is-promoted_) offer
      3. streams offer via firehose
      4. sends notification to bidder which bid was unbid
      5. add bidder to observers
      6. sends offer notifications to observers
   2. author
      1. can change offer only in _failed_ status
      2. can delete own offer before _finished_ status
      3. cannot bid own offer
      4. cannot see bidders in _is-anonymous_ mode
   3. bidder
      1. can make one(_is-single-bid_) or many bids
      2. bid must have price that incrementes(_sell-mode_) or decrementes(_buy-mode_) the nearest price by fixed(_price-step_) of free amount
      3. can delete own bid
      4. cannot bid if doesnt have enough rating in _bidder-min-rating_ mode
      5. cannot see other bidders in _is-anonymous_ mode
      6. can bid _blitz-price_ to attempt to finish auction before ending
2. ended(_ends-at_) or blitz-price-bid created
   1. there are no bids
      1. system transits offer to _failed_ status and sends notifications to author/observers
   2. there are bids
      1. system transits offer to _inactive_ status and sends notifications to author/observers
      2. author have to accept/reject bid during 1 day, otherwise last bid is a winner
         1. system transits offer to _finished_ or _failed_ status and sends notification to author and observers
         2. system sends notifications to author and won bidder to rate each other for _finished_ offer
   3. author can update offer in failed status and transit it to active status
      1. system sends notifications to author and observers
   4. _finished_ orders available only for author and bidders

`Monetization`

- Cons: Ads, 25 bids per month
- Offer promotion(fixed price, 1month)
- Premium functionality(fixed price, 1month): unlimited bids, smart notifications, no ads

## Arch(docker)

- RabbitMQ
  - handle peaks with batching: pre_ending bids, notifications
  - delayed exchange (instead of cron)
    - delayed_exchange_premium_payment(1mon), delayed_exchange_promotion_payment(1m)
    - delayed_exchange_offer_closing(n), delayed_exchange_offer_winner(1d)
    - delayed_exchange_user_deletion(1mon)
- Redis
  - cache: bids:user_id(ttl)
  - pubsub: offers_channel firehose
- Postgres
  - entities: User, Profile, Category, Offer, Offer_Observer
  - procedures
- Nginx
  - proxy
  - security(ssl, rate limiting, cors, helmet headers)
  - http cache
  - load ballancer(only for microservices since message queue issues)
- Nodejs
  - NestJs MVC, passport
  - swagger
  - jest, supertest
- Client
  - NextJs, nextauth
  - tailwind
  - react-intl
  - swr
  - redux-toolkit/recoil
  - jest, testing-library, cypress

## App

### Entities

```ddl
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS 'profile';
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS offer;
DROP TABLE IF EXISTS offer_observer;

CREATE TABLE user (
  id serial PRIMARY KEY,
  email text UNIQUE NOT NULL CHECK (length(VALUE) >= 5),
  password text NOT NULL,
  phone varchar(500),
  is_admin boolean DEFAULT 0,
  is_premium boolean DEFAULT 0,
  urgent_notification_method enum('email', 'phone') NOT NULL DEFAULT 'email',
  currency varchar(3) NOT NULL DEFAULT 'usd',
  'locale' varchar(5) NOT NULL,
  created_at date NOT NULL DEFAULT now(),
  deleted_at date,
  notifications jsonb  -- [{ offer_id, body, created_at }], <1000
)
CREATE TABLE 'profile' (
  'username' varchar(100) NOT NULL CHECK (length(VALUE) >= 5),
  'image' text,
  bio text,
  rating smallint NOT NULL DEFAULT 0,
  user_id int REFERENCES user(id) UNIQUE ON UPDATE CASCADE ON DELETE SET NULL
)
CREATE TABLE category (
  id serial PRIMARY KEY,
  'name' varchar(500) UNIQUE NOT NULL CHECK (length(VALUE) >= 5),
  specifications jsonb, -- [{ spec: decription }]
  category_id smallint REFERENCES employee(id) ON DELETE CASCADE
)
CREATE TABLE offer_observer (
  user_id int REFERENCES user(id) ON UPDATE CASCADE,
  offer_id int REFERENCES offer(id) ON UPDATE CASCADE,
  PRIMARY KEY (user_id, offer_id)
)
CREATE TABLE offer (
  id serial PRIMARY KEY,
  'type' enum('sell', 'buy') NOT NULL DEFAULT 'sell',
  title varchar(500) NOT NULL CHECK (length(VALUE) >= 5),
  'description' text NOT NULL,
  specifications jsonb, -- [{ spec: value }]
  assets text[],
  created_at date NOT NULL DEFAULT now(),
  ends_at date,
  category_id smallint REFERENCES category(id) ON UPDATE CASCADE ON DELETE CASCADE,
  author_id int REFERENCES user(id) ON UPDATE CASCADE ON DELETE CASCADE,
  --
  'status' enum('active', 'inactive', 'failed', 'finished') NOT NULL DEFAULT 'active',
  start_price numeric(15,4) NOT NULL,
  blitz_price numeric(15,4),
  price_step numeric(15,4),
  currency varchar(3) NOT NULL,
  is_promoted boolean DEFAULT 0,
  is_anonymous boolean DEFAULT 0,
  is_single_bid boolean DEFAULT 0,
  bidder_min_rating int,
  --
  bids jsonb, -- [{ user_id, price, comment, created_at }])
 ) PARTITION BY RANGE (created_at);
CREATE TABLE offer_2022 PARTITION OF offer FOR VALUES FROM ('2022.01.01') TO ('2023-01-01');

CREATE UNIQUE INDEX profile_user_id_idx ON profile(user_id);
CREATE INDEX offer_category_id_idx ON offer(category_id);
CREATE INDEX offer_user_id_idx ON offer(user_id);
CREATE INDEX offer_created_at_idx ON offer(created_at);
```

### API(monolith)

- `MONITORING`
- `AUTH`(crud):
  - create: refresh*token*&\_access_token_via_cookie, payload{id,is_admin,is_premium,urgent_notification_method}
  - read:
  - patch: access_token
  - delete: remove_tokens_from_cookie
- `USER`(crud,amqp):
  - create({email,name,password}):200: User & Profile
  - read: Profile
  - patch: enable_premium->payment_transaction->delayed_exchange_premium_payment_publish(1mon)(if_fails_disable_premium_and_send_notification)
  - delete: soft_delete->delayed_exchange_user_delete(1mon)
  - premium*payment(): delayed_exchange_premium_payment_consume->payment_transaction
    -\_premium-payment(amqp)*: payment_transaction->if_fails_disable_premium_and_send_notification
- `NOTIFICATION`(crd,amqp)
  - create
  - read
  - delete
- `CATEGORY`(crud)
  - create(401/403, {}):
  - read:
  - patch(401/403):
  - delete(401/403):
- `OFFER`(crud,amqp,redis)
  - create(401)
    - db_write_Offer
    - delayed_exchange_offer_ends_publish
    - redis_offers_channel_publish
  - read:
    - db_read_from_all_own_and_only_active_theirs
      - filter[category,user_id,start_price,query,created_at,ends_at,blitz_price,is_down_price,observed]
      - sort[created_at,ends_at,start_price,blitz_price]
      - pagination[keyset]
  - readOne(401):
    - db*read_Offer*(404)
  - patch(401)
    - db_update_Offer_only_in_non_active_status(408)
    - delayed_exchange_offer_ends_consume->define_winner
      - db_update_status
        - db_remove_from_observed_if_finished
      - **notify_all_bidders**
  - delete(401)
    - db_delete_Offer
    - db_delete_related_bids
    - **notify_all_bidders**
  - firehose(a,sse): redis_offers_channel_subscribe->filter[none,category,user_id,start_price,query]
- `OBSERVER`(crd)
  - create(401): upsert offer_observer
  - read(401):
  - delete(401):
- `BID`(crd,amqp,redis)
  - create(401)
    - filter_bids_from_user_with_premium_or_under_25_bids_per_month
    - delayed_exchange_bulk_bids_publish
  - createBulk(amqp)
    - delayed_exchange_bulk_bids_consume
    - sort_bids_by_creation_date_since(rabbitmq_doesnt_guarantees_message_order)
    - reject those which disorder price and notify bidders about rejection
    - db_bulk_insert_Bids
    - db_upsert_offer_to_Offer_Observer
  - read(401)
    - db_read_Bids
  - delete(401)
    - db_deleteBid/s
    <!-- notifications
    - seller
      - offer successfully deleted/ended
      - a new bid for offer
      - offer winner
      - rate a buyer
      - a new question about offer
      - offer promotion ended
    - buyer
      - offer i observer is deleted/ended
      - my bid was outbid/rejected/deleted
      - offer winner
      - rate a seller -->

### FE

- /auth [form[name,email,password]]
- /profile [analitics[rating,Offers_cnt,bids_cnt,won_bids_cnt,activity_chart,top_price_bid,medium_bid_price,pending_bids], form[name,bio,image,email,password,enable_premium,delete_account]]
- /offers
  - active orders list
- /offers/:id
  - form[]
  - chart[]
- /offer
  - form[]
- /
  - [observed,bidded,won]
- admin sections: users,categories,promotions

— Header —
Auction lang, currency, profile/rating/notifications
— Card —
media[0]
title
current-price time-remaining
— Page —
media[0] title
status(active|done) category
description
current-top-bid time-remaining
media. input? submit-bid
blitz-price
buy-now
bids history

## TODO

- private offers: restricts access to auction
- full text search for offer.title with tsvector
- offer q&a or chat
- payment
- nginx
- setup cron + backup.sh in postgres container
- prometheus & graphana
- switch to microservices



const result = await this.connection.query(
  'CALL myStoredProcedure (:param1value)',
  [param1value]
)

