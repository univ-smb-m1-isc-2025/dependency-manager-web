FROM nginx:alpine

# COPY nginx.local.conf /etc/nginx/conf.d/default.conf // Local configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY dist/dependency-manager-web /usr/share/nginx/html

EXPOSE 4200

CMD ["nginx", "-g", "daemon off;"]