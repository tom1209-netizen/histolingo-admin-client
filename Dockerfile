# Fetching the latest node image on apline linux
FROM node:alpine AS builder

# Setting up the work directory
WORKDIR /app

EXPOSE 3000
EXPOSE 80
EXPOSE 443

# Copying all the files in our project
COPY . .

RUN npm install

# Building our application
RUN npm run build

# Fetching the latest nginx image
FROM nginx

# Copying built assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copying our nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf