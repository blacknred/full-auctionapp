# Auction app(broking)

> selling and buying assets and services

- `Auction`:
  1. starts with _active_ status
    1.1. seller cannot change active offer but can delete it
    1.2. system can delete offer if it violates rules
    1.3. seller cannot bid own offer
    1.4. buyers can make one/many bids with own/fixed price step bigger(sell)/lesser(buy) the current price untill the auction ends
    1.5. buyers can bid blitz price and accept offer before the auction ends
  2. blitz_price accepted
  3. ends
    3.1. there are bids: last bid wins auction
    3.2. there are no bids: set _nosold_ status

  1. not_sold status: 
  1. 
    1.1. if transaction fails due  . If there is no closest bids left 
  2. there is may be a blitz price 
  3. 1/n bids per user, 
- `Monetization`
  - Ads, 25 bids per month
  - Offer promotion(1%)
  - Premium functionality: unlimited bids, smart notifications, no ads


q&a
notifications
  - seller
    - offer successfully deleted/ended
    - a new bid for offer
    - offer winner
    - rate a buyer
    - a new question about offer
  - buyer
    - offer i watch is deleted/ended
    - my bid was rebided/rejected/deleted
    - offer winner
    - rate a seller

### Entities

- `User` {id(serial),email(text),password(text),card(text),is_premium(bool),created_at(ts),deleted_at(ts)}
- `Profile` {user_id(int,fk,idx),name(varchar(500)),bio?(text),image(text),rating(smallint),notifications([{order_id,text,created_at}],1000max)}
- `Notification` {}
- `Category` {id(serial),name(varchar(500)),specifications(json)}
- `Offer`(partition) {id(serial),title(text,tsvector),description(text),specifications(json),media([text]),created_at(ts,idx),ends_at(ts),status(active|inactive|failed|finished),category(int,fk,idx),user_id(int,fk,idx),start_price(int),blitz_price?(int),is_promoted(bool),is_private(bool),is_price_reversed(bool),price_increment?(int),is_singlebid(bool),bids([{user_id,price,comment,created_at}])}
- `User_Offer` {Offer_id(int,fk),user_id(int,fk),pk(Offer_id,user_id)}
<!-- - `Bid` {Offer_id(int,fk),user_id(int,fk),price(int),comment?(text),created_at(ts),pk(Offer_id,user_id,created_at)} -->

### Arch(docker)

- RabbitMq: handle peak(pre_ending) bids with batching, delayed exchange instead of cron
- Redis: firehose(pubsub), cache: user_bids_per_month_with_ttl
- Postgres: entities, partitions, procedures
- Nginx: proxy, security(rate limiting, cors, helmet), http cache, load ballancer
- Nodejs: NestJs MVC, swagger, passport
- NextJs: tailwind, react-intl, swr, redux-toolkit/recoil, nextauth, jest, testing-library, cypress

### App

- Backend(monolith)
  - `AUTH`(crud):
    - create: refresh_token_&_access_token_via_cookie, payload{id,is_premium}
    - read:
    - patch: access_token
    - delete: remove_tokens_from_cookie
  - `USER`(crud):
    - create: User & Profile
    - read: Profile
    - patch: enable_premium->payment_transaction->delayed_exchange_monthly_payment(disable_premium_if_fails)
    - delete: soft_delete->delayed_exchange_monthly_hard_user_delete

  - Offer(crud, amqp, redis)
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
