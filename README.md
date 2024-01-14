scp spa.zip root@coffee.book-mm.com:/root/

```
cd /etc/nginx/html/gems-admin && rm -rf ./* && mv /root/spa.zip ./spa.zip && unzip spa.zip && rm -rf spa.zip && mv spa/* ./ && rm -rf spa
```

systemctl restart nginx
