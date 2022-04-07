#Stage1 Build
FROM node:erbium-alpine3.14 AS build
WORKDIR /app
ARG REACT_APP_API_PORT
ENV REACT_APP_API_PORT $REACT_APP_API_PORT
ARG REACT_APP_BASE_URL
ENV REACT_APP_BASE_URL $REACT_APP_BASE_URL
COPY package*.json ./
RUN npm install
COPY ./ ./
RUN npm run build-nginx

#Stage2 Production
FROM nginx:1.21.4-alpine AS prod
WORKDIR /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build ./
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]