FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/tsconfig.json ./tsconfig.json
COPY --from=builder /app/tsconfig.build.json ./tsconfig.build.json
COPY --from=builder /app/src ./src
COPY --from=builder /app/doc ./doc
EXPOSE $PORT
CMD [  "npm", "run", "start:migrate:prod" ]