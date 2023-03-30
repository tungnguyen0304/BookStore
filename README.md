Mọi người lưu ý để làm việc tiếp giai đoạn backend mình cần thiết lập những thứ sau:
1) Khi làm backend thì yêu cầu phải có cả XAMPP (backend) và npm bên React (frontend) chạy cùng lúc
2) Nên vậy mọi người đầu tiên thiết lập một virtual host XAMPP trỏ tới thư mục /btl-web/src, tên miền virtual host là www.btl-web.com
    Cách làm, tham khảo: https://medium.com/@nutanbhogendrasharma/create-simple-reactjs-application-and-host-in-xampp-4dae8e466c50
    Nội dung file /opt/lampp/etc/extra/httpd-vhosts.conf (mình dùng Ubuntu, mọi người dùng Windows thì kiếm file nào ở đường dẫn gần giống vậy nha, ví dụ: C:\xampp\apache\conf\extra\httpd-vhosts.conf)
    Thêm dòng này vào cuối, đổi đường dẫn tới thư mục src lại luôn:
    <VirtualHost 127.0.0.1:80>
        ServerName btl-web.com
        ServerAlias www.btl-web.com
        ServerAdmin webmaster@btl-web.com
        DocumentRoot "/home/phatle/Documents/btl-web/src"
         <Directory /home/phatle/Documents/btl-web/src>
            Options Indexes FollowSymLinks MultiViews
      AllowOverride all
      Order Deny,Allow
            Allow from all
            Require all granted
        </Directory>

        RewriteEngine On

        # Serve the API from the /src/api directory
        RewriteRule ^api/(.*)$ /home/phatle/Documents/btl-web/src/api/$1 [L]

    </VirtualHost>
    Đồng thời vào file hosts của hệ thống thêm tên miền vào:
        cd C:/Windows/System32/drivers/etc
        notepad hosts
    Thêm dòng sau:
        127.0.0.1 www.btl-web.com
3) Khi làm việc front-end, mình vẫn vào link là localhost:3000
      Mục đích của việc làm virtual host là để đồng nhất đường dẫn tới đó, nếu dùng localhost:số cổng thì ko nên
4) Trong React lúc gọi api như sau:
        axios({
          method: 'post',
          url: `http://www.btl-web.com/api/test.php`,
          headers: { 'content-type': 'application/json' },
        })
          .then(result => {
            console.log(result)
          })
          .catch(error => 
            {console.log(error)
          });       
