FROM node:16-alpine as deps
WORKDIR /frontend
COPY package*.json ./
RUN npm install --frozen-lockfile

FROM node:16-alpine as builder
WORKDIR /frontend
COPY . .
COPY --from=deps /frontend/node_modules ./node_modules
RUN npm run build && npm install --production

FROM node:16-alpine AS runner
WORKDIR /frontend
ENV NODE_ENV production
COPY --from=builder /frontend/public ./public
COPY --from=builder /frontend/.next ./.next
COPY --from=builder /frontend/node_modules ./node_modules
COPY --from=builder /frontend/package.json ./package.json
COPY --from=builder /frontend/next.config.js ./next.config.js

EXPOSE 3000

CMD ["node_modules/.bin/next", "start"]