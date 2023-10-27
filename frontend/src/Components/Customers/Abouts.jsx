import React from 'react';
import { Container, Row } from 'react-bootstrap';

function Abouts(props) {
    return (
        <div>
            <div className='d-flex justify-content-center padding-header' style={{ backgroundImage: `url('/image/Background/bg-contacts.png')`, backgroundSize: "cover", height: "500px" }}>
                <div>
                    <h2 style={{ fontSize: "65px", textTransform: "uppercase", color: "#f33f3f", letterSpacing: "5px", fontWeight: "500" }}>PETSHOP</h2>
                    <h1 style={{ fontSize: "65px", textTransform: "uppercase", color: "white", letterSpacing: "5px", fontWeight: "500" }}>abouts</h1>
                </div>
            </div>
            <Container>
                <h1 className='text-uppercase text-danger mt-3'>Giới thiệu về chúng tôi</h1>
                <Row className='text-start '>
                    <h3>1. NT-CARS</h3>
                    <p>
                        NT-CARS là nền tảng thương mại điện tử thế hệ tiếp theo dành cho ô tô siêu sịn, siêu đẹp. Chúng tôi cung cấp trải nghiệm tốt nhất cho người mua ô tô bằng cách cung cấp nhiều loại ô tô được chứng nhận được giao tận nhà chỉ bằng một nút bấm trong khi người bán nhận được giá tốt nhất cho phương tiện của họ trong vòng chưa đầy 1 giờ.
                    </p>
                    <h3>2. Điểm đến hạng nhất cho bạn!</h3>
                    <p>
                        NT-CARS là điểm dừng duy nhất để bạn mua hoặc bán ô tô siêu đẹp trên khắp Việt Nam. Chúng tôi đã kết hợp công nghệ tiên tiến với các đối tác trên toàn quốc và quan trọng hơn là sự hiểu biết sâu sắc về nhu cầu của người mua và người bán. Chúng tôi giải quyết tất cả các điểm khó khăn liên quan đến việc bán một chiếc ô tô hiện có hoặc mua một chiếc xe yêu thích từ trước. Cho dù bạn đang mua hay bán, bạn sẽ nhận được một quy trình nhanh chóng, dễ dàng, công bằng, minh bạch, không rắc rối (và mặc cả).
                    </p>
                    <h3>3. Bạn muốn biết về việc mua ô tô với chúng tôi? </h3>
                    <p>
                        Danh mục ô tô lớn của chúng tôi có mọi kiểu dáng và kiểu dáng mà bạn muốn, với quy trình kiểm tra kỹ lưỡng đảm bảo chất lượng hoàn toàn minh bạch. Với các tùy chọn tài chính dễ dàng, hỗ trợ RC Transfer và bảo hành 6 tháng cho mỗi chiếc xe, chúng tôi loại bỏ mọi sự không chắc chắn trong quá trình mua hàng. Bạn tập trung vào việc bạn sẽ đi đâu khi chiếc xe mới mua của bạn về nhà, phần còn lại để chúng tôi lo.
                    </p>
                    <h3>4. Nhiệm vụ của chúng tôi</h3>
                    <p>
                        Nhiệm vụ của chúng tôi là cách mạng hóa cách mua và bán ô tô siêu sịn, siêu đẹp trên toàn thế giới. Với suy nghĩ này, chúng tôi đã thành lập vào năm 2022 và chúng tôi đã đi một chặng đường dài kể từ đó - từ một văn phòng duy nhất đến 205 chi nhánh trên 64 thành phố lớn ở Việt Nam. Hơn 4 ngàn khách hàng hài lòng đã sử dụng nền tảng của chúng tôi kể từ đó. Và với sự đổi mới liên tục, nhiều mối quan hệ đối tác hơn và các mối quan hệ có giá trị với mọi người, chúng tôi muốn tiếp tục giải quyết các vấn đề cho người tiêu dùng và mang lại sự thoải mái cũng như giá trị cho cuộc sống của họ.
                    </p>
                    <h3>5. Tầm nhìn của chúng tôi</h3>
                    <p>
                        Chúng tôi đã nói với bạn những gì NT-CARS làm. Nhưng bức tranh lớn mà chúng ta tuân theo là gì? Những giá trị nào tiếp tục thúc đẩy chúng tôi giúp bạn lái chiếc xe bạn chọn?
                    </p>
                    <h3>6. Chúng tôi tin tưởng và xây dựng niềm tin</h3>
                    <p>
                        Chúng tôi làm việc chăm chỉ để khách hàng tin tưởng chúng tôi và chúng tôi làm điều đó bằng cách đặt họ lên hàng đầu. Cho dù đó là đánh giá, chính sách bảo vệ khách hàng, bảo hành hay chỉ hỗ trợ khách hàng - chúng tôi luôn sẵn sàng hỗ trợ mọi khách hàng, mọi bên liên quan. Đây là nền tảng của mọi việc chúng tôi làm và chúng tôi làm việc chăm chỉ với các mục tiêu và thời hạn đã cam kết để tiếp tục cải thiện.
                    </p>
                </Row>
            </Container>
        </div>
    );
}

export default Abouts;