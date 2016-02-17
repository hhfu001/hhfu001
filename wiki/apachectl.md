

1. 在终端运行“sudo vi /etc/apache2/httpd.conf”，打开Apche的配置文件
2. httpd.conf中找到“#Include /private/etc/apache2/extra/httpd-vhosts.conf”，去掉前面的“＃”，保存并退出。
3. 运行“sudo apachectl restart”，重启Apache后就开启了虚拟主机配置功能。
4. 运行“sudo vi /etc/apache2/extra/httpd-vhosts.conf”，就打开了配置虚拟主机文件httpd-vhost.conf，配置虚拟主机了

```
<VirtualHost *:80>
    DocumentRoot "/Library/WebServer/Documents"
    ServerName localhost
    ErrorLog "/private/var/log/apache2/localhost-error_log"
    CustomLog "/private/var/log/apache2/localhost-access_log" common
</VirtualHost>
 
<VirtualHost *:80>
    DocumentRoot "/Users/hhfu/tudou"
    ServerName mysites
    ErrorLog "/private/var/log/apache2/sites-error_log"
    CustomLog "/private/var/log/apache2/sites-access_log" common
    <Directory />
       Options Indexes FollowSymLinks MultiViews
        AllowOverride None
        Order deny,allow
        Allow from all
    </Directory>
</VirtualHost>
```

5. 运行“sudo vi /etc/hosts”，打开hosts配置文件，加入"127.0.0.1 mysites"，这样就可以配置完成sites虚拟主机了，可以访问“http://mysites”了，在10.8之前Mac OS X版本其内容和“http://localhost/~[用户名]”完全一致。
