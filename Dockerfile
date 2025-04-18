FROM nginx:alpine

COPY dist/dependency-manager-web /usr/share/nginx/html

EXPOSE 4200

CMD ["nginx", "-g", "daemon off;"]