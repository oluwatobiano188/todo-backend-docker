# -------- BUILD STAGE --------
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY src ./src

# -------- PRODUCTION STAGE --------
FROM node:20-alpine

WORKDIR /app

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src ./src
COPY package*.json ./

RUN chown -R appuser:appgroup /app

USER appuser 

ENV NODE_ENV=production
EXPOSE 3000

CMD ["npm", "start"]
