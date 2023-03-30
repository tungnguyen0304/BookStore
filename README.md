Mọi người lưu ý để làm việc tiếp giai đoạn backend mình cần thiết lập những thứ sau:
1) Khi làm backend thì yêu cầu phải có cả XAMPP (backend) và npm bên React (frontend) chạy cùng lúc
2) Nên vậy mọi người đầu tiên thiết lập một virtual host XAMPP trỏ tới thư mục /btl-web/src, tên miền virtual host là www.btl-web.com
    Cách làm, tham khảo: https://medium.com/@nutanbhogendrasharma/create-simple-reactjs-application-and-host-in-xampp-4dae8e466c50
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
