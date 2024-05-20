import React from 'react';
import './index.scss';

function Introduction() {
  return (
    <div className="mt-5">
      <div className="text-center mb-4">
        <h1>Chào mừng đến với Trang Web của Chúng Tôi</h1>
        <p className="lead">Mang đến hạnh phúc và niềm vui cho mọi người</p>
      </div>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <h2>Sứ mệnh của chúng tôi</h2>
          <p>
            Chúng tôi đã xây dựng ylc.com.vn với mong muốn tạo ra một không gian nơi mọi người có thể tìm thấy những điều làm họ hạnh phúc. Dù bạn đang tìm kiếm những sản phẩm tuyệt vời, những bài viết đầy cảm hứng, hay đơn giản là một góc nhỏ để thư giãn và tận hưởng cuộc sống, chúng tôi luôn sẵn sàng đồng hành cùng bạn.
          </p>
          <h2>Giá trị cốt lõi</h2>
          <ul className="list-group mb-4">
            <li className="list-group-item"><strong>Chất lượng và Đổi mới:</strong> Chúng tôi luôn cam kết mang đến những sản phẩm và dịch vụ tốt nhất, được thiết kế và phát triển với sự sáng tạo và tâm huyết.</li>
            <li className="list-group-item"><strong>Sự hài lòng của khách hàng:</strong> Hạnh phúc của bạn là ưu tiên hàng đầu của chúng tôi. Chúng tôi luôn lắng nghe và nỗ lực hết mình để đáp ứng mọi nhu cầu và mong muốn của bạn.</li>
            <li className="list-group-item"><strong>Cộng đồng và Kết nối:</strong> Chúng tôi tin rằng sức mạnh của cộng đồng có thể tạo ra sự thay đổi tích cực. Chúng tôi luôn tạo cơ hội để bạn kết nối, chia sẻ và cùng nhau lan tỏa niềm vui.</li>
          </ul>
          <h2>Lời cam kết từ chúng tôi</h2>
          <p>
            Với mỗi bước tiến của mình, chúng tôi luôn đặt khách hàng ở vị trí trung tâm. Chúng tôi không chỉ mong muốn mang đến cho bạn những sản phẩm và dịch vụ tuyệt vời mà còn là những trải nghiệm đáng nhớ và niềm vui bất tận.
          </p>
          <p>
            Cảm ơn bạn đã ghé thăm ylc.com.vn. Hãy cùng chúng tôi lan tỏa niềm hạnh phúc và xây dựng một cộng đồng tràn đầy yêu thương và sự gắn kết. Chúng tôi rất mong được phục vụ bạn và cùng nhau tạo nên những khoảnh khắc đáng nhớ!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Introduction;
