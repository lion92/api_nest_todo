FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build


FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist

VOLUME /app/data

ENV DATABASE_PATH=/app/data/database.sqlite

EXPOSE 3005

CMD ["node", "dist/main"]
