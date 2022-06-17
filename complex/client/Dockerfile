# builder is the name of the phase
FROM node:alpine as builder

WORKDIR /app

COPY ./package.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx

EXPOSE 3000

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

# copy from builder phase
COPY --from=builder /usr/app/build /usr/share/nginx/html