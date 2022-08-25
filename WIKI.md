# Auction app

> selling and buying assets and services

## Features

`Offer`

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

`Monetization`

- User
  - limited: 25 bids per month, ads, only web notifications
  - unlimited(fixed price, 1month): unlimited bids, no ads, email/phone notifications
    - non-payment: back to limitations
- Offer
  - promoted(fixed price, 1month)
    - non-payment: no promotion

## App(docker)

### Stack

- Postgres

  ```ddl
  DROP TABLE IF EXISTS user_identity;
  DROP TABLE IF EXISTS user_timeline;
  DROP TABLE IF EXISTS user_invoice;
  DROP TABLE IF EXISTS user;
  DROP TABLE IF EXISTS offer_watcher;
  DROP TABLE IF EXISTS offer_category;
  DROP TABLE IF EXISTS offer_bid;
  DROP TABLE IF EXISTS offer;

  -- USERS
  CREATE TABLE user (
    id serial PRIMARY KEY,
    'username' varchar(50) NOT NULL CHECK (length(VALUE) >= 5),
    'image' text,
    bio text,
    rating smallint NOT NULL DEFAULT 0,
    created_at date NOT NULL DEFAULT now(),
    updated_at date NOT NULL,
    deleted_at date
  )
  CREATE TABLE user_identity (
    email text UNIQUE NOT NULL CHECK (length(VALUE) >= 5),
    'password' text NOT NULL,
    phone varchar(15),
    is_admin boolean DEFAULT 0,
    is_unlimited boolean DEFAULT 0,
    notification_method enum('email', 'phone') NOT NULL DEFAULT 'email',
    currency varchar(3) NOT NULL DEFAULT 'USD',
    'locale' varchar(5) NOT NULL DEFAULT 'en_US',
    user_id int REFERENCES user(id) UNIQUE ON UPDATE CASCADE ON DELETE CASCADE
  )
  CREATE TABLE user_timeline (
    notifications jsonb DEFAULT '[]',  -- [{ link, body, created_at }], <1000
    user_id int REFERENCES user(id) UNIQUE ON UPDATE CASCADE ON DELETE CASCADE
  )
  CREATE TABLE user_invoice (
    id serial PRIMARY KEY,
    payment enum('UNLIMITED_PROFILE', 'OFFER_PROMOTION') NOT NULL,
    comment text,
    sum numeric(15,4) NOT NULL,
    is_admin boolean DEFAULT 0,
    created_at date NOT NULL DEFAULT now(),
    user_id int REFERENCES user(id) ON UPDATE CASCADE ON DELETE SET NULL
  )

  -- OFFERS
  CREATE TABLE offer_category (
    id serial PRIMARY KEY,
    'name' varchar(100) UNIQUE NOT NULL CHECK (length(VALUE) >= 5),
    specifications jsonb DEFAULT '[]', -- [{ specname: decription }]
    created_at date NOT NULL DEFAULT now(),
    updated_at date NOT NULL,
    category_id smallint REFERENCES employee(id) ON UPDATE CASCADE ON DELETE SET NULL
  )
  CREATE TABLE offer (
    id serial PRIMARY KEY,
    'type' enum('SELL', 'BUY') NOT NULL DEFAULT 'SELL',
    title varchar(300) NOT NULL CHECK (length(VALUE) >= 5),
    'description' text NOT NULL,
    specifications jsonb DEFAULT '[]', -- [{ specname: value }]
    assets text[],
    created_at date NOT NULL DEFAULT now(),
    updated_at date NOT NULL,
    ends_at date NOT NULL,
    'status' enum('ACTIVE', 'INACTIVE', 'FAILED', 'FINISHED') NOT NULL DEFAULT 'ACTIVE',
    start_price numeric(15,4) NOT NULL,
    blitz_price numeric(15,4),
    price_step numeric(15,4),
    currency char(3) NOT NULL DEFAULT 'USD',
    is_promoted boolean DEFAULT 0,
    is_anonymous boolean DEFAULT 0,
    is_single_bid boolean DEFAULT 0,
    bidder_min_rating int,
    views_cnt int NOT NULL DEFAULT 0;
    category_id smallint REFERENCES category(id) ON UPDATE CASCADE ON DELETE SET NULL,
    author_id int REFERENCES user(id) ON UPDATE CASCADE ON DELETE SET NULL
  ) PARTITION BY RANGE (created_at);
  CREATE TABLE offer_2022 PARTITION OF offer FOR VALUES FROM ('2022.01.01') TO ('2023-01-01');
  CREATE TABLE offer_bid (
    price numeric(15,4) NOT NULL,
    comment text,
    created_at date NOT NULL DEFAULT now(),
    offer_id int REFERENCES offer(id) ON UPDATE CASCADE ON DELETE CASCADE,
    user_id int REFERENCES user(id) ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (offer_id, user_id)
  )
  CREATE TABLE offer_watcher (
    offer_id int REFERENCES offer(id) ON UPDATE CASCADE ON DELETE CASCADE,
    user_id int REFERENCES user(id) ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (offer_id, user_id)
  )

  -- INDICES
  CREATE UNIQUE INDEX user_identity_user_id_idx ON user_identity(user_id);
  CREATE UNIQUE INDEX user_timeline_user_id_idx ON user_timeline(user_id);
  CREATE UNIQUE INDEX user_invoice_user_id_idx ON user_invoice(user_id);
  CREATE INDEX offer_category_id_idx ON offer(category_id);
  CREATE INDEX offer_author_id_idx ON offer(author_id);
  CREATE INDEX offer_created_at_idx ON offer(created_at);
  ```

- Redis
  - temp(ttl): bids:user_id, confirm tokens
  - data: last_notified:user_id
  - pubsub: offers_channel firehose
- RabbitMQ:
  - consume batching: bids(peaks right before offer ending)
  - worker queue(batch): notifications
  - delayed-exchange(instead of cron)
    - delayed_exchange_user_invoice(1mon)
    - delayed_exchange_user_deletion(1mon)
    - delayed_exchange_offer_closing(n), delayed_exchange_offer_winner(1d)
- Nginx
  - proxy, http cache, load ballancer, static serving
  - security(ssl, rate limiting, cors, helmet headers)
- Nodejs
  - NestJs
    - passport(jwt), mikroorm, amqplib, ioredis
    - swagger, compodoc, metrics(prom-client, termius)
    - jest, supertest
  - ReactJs
    - NextJs(next-auth, next-pwa, next-seo)
    - tailwind, react-intl, swr, redux-toolkit, react-hook-form+zod
    - jest, testing-library, cypress

### BE

- `PROXY(nginx)`
  - proxying api
  - security(ssl, rate-limiting, cors, helmet)
  - http cache
  - logging
  - static: fe
- `API(nodejs http/amqp)`
  - `MONITORING(prometheus)`
  - `AUTH(crud)`
    - create: refresh*token*&\_access_token_via_cookie, payload{id,is_admin,is_unlimited,urgent_notification_method}
    - read:
    - patch: access_token
    - delete: remove_tokens_from_cookie
  - `BILLING(crud, amqp)`
    - create(user_enable_promotion_or_unlimited):
      - try_payment ? update_offer_promotion_or_unlimited_profile_to_true_and_set_delayed_exchange_unlimited_payment : null
      - send_notification
    - delete(user_disable_promotion_or_unlimited): just_update_offer_promotion_or_unlimited_profile_to_false
    - payment_method(amqp):
      - offer_promotion_or_unlimited_profile_are_false_or_offer_is_finished ?? return
      - try_payment ? set_new_amqp_message : update_offer_promotion_or_unlimited_profile_to_false
      - send_notification
        create(pay)- {charge_id?,type} update charge or create, delayed_exchange_billing_charge(mon)
        get-
        amqp- checks,notifications,changes
  - `USER(crud, amqp)`
    - create({email,name,password}):200: User & Profile
    - read: Profile
    - patch: enable_unlimited->payment_transaction->delayed_exchange_unlimited_payment_publish(1mon)(if_fails_disable_unlimited_and_send_notification)
    - delete: soft_delete->delayed_exchange_user_delete(1mon)
    - unlimited*payment(): delayed_exchange_unlimited_payment_consume->payment_transaction
      -\_unlimited-payment(amqp)*: payment_transaction->if_fails_disable_unlimited_and_send_notification
  - `NOTIFICATION(crud, amqp)`
    - create
    - read (length)
    - delete
  - `CATEGORY(crud)`
    - create(401/403, {}):
    - read:
    - patch(401/403):
    - delete(401/403):
  - `OFFER(crud, amqp)`
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
  - `WATCHER(crud)`
    - create(401): upsert offer_observer
    - read(401):
    - delete(401):
  - `BID(crud, amqp)`
    - create(401)
      - filter_bids_from_user_with_unlimited_or_under_25_bids_per_month
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

### FE

- `APP(ssg)`
  - /auth, /auth/new, /auth/restore
  - /, /[:category], /offer/:id, /offer
  - /my, /my/watchlist, my/bids, /my/offers, /my/notifications, /my/profile

## TODO

- private offers: restrict access to auction with invitations or groups
- full text search for offer.title field with tsvector
- offer q&a or chat
- stripe + billing setup
- prometheus & grafana
- switch to microservices?
- web admin client: /users stats, /categories managent, /promotions managent, /billing
