import React from "react";
import { Link } from "react-router-dom";
import { BsLinkedin, BsGithub, BsYoutube, BsInstagram } from "react-icons/bs";
const Footer = () => {
  return (
      <footer className="py-4">
        <div className="container">
          <div className="row text-center">
            <div className="col-12 col-sm-6 col-md-4 mt-4">
              <h4 className="text-white mb-4">Liên hệ</h4>
              <div>
                <address className="text-white fs-6">
                  Địa chỉ: Cơ sở Dĩ An: Khu phố Tân Lập <br/>, Phường Đông Hòa, TP. Dĩ An, Tỉnh Bình Dương  <br />
                </address>
                <a
                  href="tel:+91 8264954234"
                  className="mt-3 d-block mb-1 text-white"
                >
                  (+84) 123456789
                </a>
                <a
                  href="mailto:bkelhcmut@hcmut.edu.vn"
                  className="mt-2 d-block mb-0 text-white"
                >
                  bkelhcmut@hcmut.edu.vn
                </a>
                <div className="social_icons d-flex align-items-center justify-content-center gap-30 mt-4">
                  <a className="text-white" href="#">
                    <BsLinkedin className="fs-4" />
                  </a>
                  <a className="text-white" href="#">
                    <BsInstagram className="fs-4" />
                  </a>
                  <a className="text-white" href="#">
                    <BsGithub className="fs-4" />
                  </a>
                  <a className="text-white" href="#">
                    <BsYoutube className="fs-4" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-3 mt-4">
              <h4 className="text-white mb-4">Thông tin</h4>
              <div className="footer-link d-flex flex-column">
                <Link to="/privacy-policy" className="text-white py-2 mb-1">
                  Chính sách quyền riêng tư
                </Link>
                <Link to="/refund-policy" className="text-white py-2 mb-1">
                  Chính sách hoàn tiền
                </Link>
                <Link to="/shipping-policy" className="text-white py-2 mb-1">
                  Chính sách vận chuyển
                </Link>
                <Link to="/term-conditions" className="text-white py-2 mb-1">
                  Điều khoản sử dụng
                </Link>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-3 mt-4">
              <h4 className="text-white mb-4">Tài khoản</h4>
              <div className="footer-link d-flex flex-column">
                <Link className="text-white py-2 mb-1">Về chúng tôi</Link>
                <Link className="text-white py-2 mb-1">FAQ</Link>
                <Link className="text-white py-2 mb-1">Liên hệ</Link>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-2 mt-4">
              <h4 className="text-white mb-4">Đường dẫn</h4>
              <div className="footer-link d-flex flex-column">
                <Link className="text-white py-2 mb-1" to="/category/sach-trong-nuoc">Sách trong nước</Link>
                <Link className="text-white py-2 mb-1" to="/category/sach-ngoai-quoc">Sách ngoại quốc</Link>
                <Link className="text-white py-2 mb-1" to="/category/do-choi">Đồ chơi</Link>
                <Link className="text-white py-2 mb-1" to="/category/van-phong-pham">Văn phòng phẩm</Link>
                <Link className="text-white py-2 mb-1" to="/category/hang-luu-niem">Hàng lưu niệm</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
  );
};

export default Footer;
