FROM node:alpine As build
RUN apk add g++ make py3-pip
ENV NODE_ENV=development
WORKDIR /usr/src/app
# USER node
COPY package*.json yarn.lock ./
RUN yarn --dev install && yarn cache clean
COPY . .
RUN yarn build

FROM node:alpine as production
RUN curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | bash -s -- -b /usr/local/bin
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 server
USER server
COPY package*.json yarn.lock ./
RUN yarn install --production=true --frozen-lockfile && yarn cache clean
RUN /usr/local/bin/node-prune
COPY . .
COPY --from=build --chown=server:nodejs /usr/src/app/dist ./dist
CMD ["node", "dist/main"]
