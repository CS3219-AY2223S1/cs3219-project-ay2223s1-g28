# build environment
FROM node:16-alpine as build

# build time argument
ARG URI_SVC
# Image environment variables
ENV NODE_ENV=production
ENV REACT_APP_URI_SVC=$URI_SVC

WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build

# production environment
FROM nginx:1.23-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
