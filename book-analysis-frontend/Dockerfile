FROM node:lts-alpine3.16 AS builder
ENV NODE_ENV=production
WORKDIR /home/app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --omit=dev
COPY . .
RUN	npm run build

FROM alpine
WORKDIR /home/app
COPY --from=builder /home/app /home/app
RUN apk add --no-cache nodejs npm xsel && \
	npm install -g serve
CMD serve -s -n build -l 4000
