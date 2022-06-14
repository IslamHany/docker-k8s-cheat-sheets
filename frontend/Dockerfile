# builder is the name of the phase
FROM node:14-alpine as builder

WORKDIR /usr/app

COPY ./package.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx

# copy from builder phase
COPY --from=builder /usr/app/build /usr/share/nginx/html