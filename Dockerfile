# Используем официальный базовый образ Nginx
FROM nginx:alpine

# Копируем статические файлы в директорию, где Nginx их будет обслуживать
COPY . /usr/share/nginx/html

# Копируем кастомный файл конфигурации Nginx
COPY ./nginx.conf /etc/nginx/nginx.conf

# Открываем порт 80
EXPOSE 80

# Запускаем Nginx в форграунд режиме
CMD ["nginx", "-g", "daemon off;"]
