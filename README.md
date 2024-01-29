```
scp pwa.zip root@coffee.book-mm.com:/root/
```

```
cd /etc/nginx/html/gems-admin && rm -rf ./* && mv /root/pwa.zip ./pwa.zip && unzip pwa.zip && rm -rf pwa.zip && mv pwa/* ./ && rm -rf pwa
```

```
chown -R nginx:nginx /etc/nginx/html/gems-admin
```

```
systemctl restart nginx
```
