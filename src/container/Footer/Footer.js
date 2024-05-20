import React from 'react';
import './footerStyles.scss';

function Footer() {
  return (
    <footer className="footer_area section_padding_130_0 mt-5">
      <div className="container">
        <div className="row">
          {/* Single Widget*/}
          <div className="col-12 col-sm-6 col-lg-4">
            <div className="single-footer-widget section_padding_0_130">
              {/* Footer Logo*/}
              <div className="footer-logo mb-3"></div>
              <p>Tạo ra bằng tình yêu và sự sáng tạo của YLC.</p>
              {/* Copywrite Text*/}

              {/* Footer Social Area*/}

            </div>
          </div>
          {/* Single Widget*/}
          <div className="col-12 col-sm-6 col-lg">
            <div className="single-footer-widget section_padding_0_130">
              {/* Widget Title*/}
              <h5 className="widget-title">Giới Thiệu</h5>
              {/* Footer Menu*/}
              <div className="footer_menu">
                <ul>
                  <li><a href="#">Về Chúng Tôi</a></li>
                  <li><a href="#">Bán Hàng Doanh Nghiệp</a></li>
                  <li><a href="#">Điều Khoản &amp; Chính Sách</a></li>
                  <li><a href="#">Cộng Đồng</a></li>
                </ul>
              </div>
            </div>
          </div>
          {/* Single Widget*/}
          <div className="col-12 col-sm-6 col-lg">
            <div className="single-footer-widget section_padding_0_130">
              {/* Widget Title*/}
              <h5 className="widget-title">Hỗ Trợ</h5>
              {/* Footer Menu*/}
              <div className="footer_menu">
                <ul>
                  <li><a href="#">Trợ Giúp</a></li>
                  <li><a href="#">Hỗ Trợ</a></li>
                  <li><a href="#">Chính Sách Bảo Mật</a></li>
                  <li><a href="#">Điều Khoản &amp; Điều Kiện</a></li>
                  <li><a href="#">Trợ Giúp &amp; Hỗ Trợ</a></li>
                </ul>
              </div>
            </div>
          </div>
          {/* Single Widget*/}
          <div className="col-12 col-sm-6 col-lg">
            <div className="single-footer-widget section_padding_0_130">
              {/* Widget Title*/}
              <h5 className="widget-title">Liên Hệ</h5>
              {/* Footer Menu*/}
              <div className="footer_menu">
                <ul>
                  <li><a href="#">Trung Tâm Gọi</a></li>
                  <li><a href="#">Gửi Email Cho Chúng Tôi</a></li>
                  <li><a href="#">Điều Khoản &amp; Điều Kiện</a></li>
                  <li><a href="#">Trung Tâm Trợ Giúp</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
