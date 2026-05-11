# Multi-stage Dockerfile for the Angular frontend.
# Build context: project frontend root (eco-ressource-b2b-main)
#
# Build:
#   docker build -f deployment/docker/frontend.Dockerfile -t <dockerhub_user>/eco-frontend:v1 .
#
# Run locally:
#   docker run --rm -p 8080:80 <dockerhub_user>/eco-frontend:v1

FROM node:24-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build -- --configuration production

FROM nginx:1.27-alpine AS runtime

COPY deployment/docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/eco-ressource-b2b/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
