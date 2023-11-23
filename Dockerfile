FROM node:18.18.2-alpine3.18 as build

WORKDIR /usr/local/app

COPY ./ /usr/local/app/

RUN npm install

RUN npm run build-prod


FROM nginx:latest

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /usr/local/app/dist/works.register-frontend /usr/share/nginx/html

EXPOSE 80