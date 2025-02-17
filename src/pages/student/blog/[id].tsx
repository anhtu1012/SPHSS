import { useLocation } from "react-router-dom";
import "./blogDetail.scss";
import Post1 from "../../../assets/npost1.png";
import { Card, Col, Row } from "antd";

function BlogDetail() {
  const location = useLocation();
  const post = location.state;
  console.log(post);

  return (
    <div className="blog-detail">
      <div className="blog-detail__title">{post.title}</div>
      <p className="blog-detail__meta">
        Bởi {post.author} • {new Date(post.date).toLocaleDateString("vi-VN")}
      </p>
      <p className="blog-detail__excerpt">
        Mùa thi luôn là thời điểm căng thẳng và áp lực đối với nhiều học sinh,
        sinh viên. Áp lực từ việc học tập, thi cử, và kỳ vọng từ gia đình, bạn
        bè có thể khiến bạn cảm thấy căng thẳng và mệt mỏi. Tuy nhiên, có rất
        nhiều phương pháp hiệu quả để kiểm soát và đối phó với stress trong mùa
        thi, giúp bạn duy trì sức khỏe tinh thần và thể chất tốt nhất.
      </p>
      <p className="blog-detail__excerpt">
        1. Lập kế hoạch học tập hợp lý Một trong những nguyên nhân chính gây
        căng thẳng trong mùa thi là sự thiếu tổ chức trong việc học tập. Việc
        lập kế hoạch học tập rõ ràng sẽ giúp bạn cảm thấy chủ động và kiểm soát
        được thời gian của mình. Hãy chia nhỏ các mục tiêu và phân bổ thời gian
        học sao cho hợp lý, tránh học quá sức vào những ngày gần thi.
        <br />
        <br />
        2. Tạo thói quen nghỉ ngơi và thư giãn Trong những ngày ôn thi căng
        thẳng, nhiều người có xu hướng bỏ qua việc nghỉ ngơi. Tuy nhiên, việc
        này thực sự có thể làm giảm hiệu quả học tập và tăng thêm sự căng thẳng.
        Hãy dành thời gian để thư giãn, có thể là một buổi đi bộ nhẹ nhàng, tập
        yoga, hoặc đơn giản là thư giãn bằng cách nghe nhạc. Những khoảng thời
        gian nghỉ ngơi giúp bạn nạp lại năng lượng và cải thiện khả năng tập
        trung khi học.
      </p>
      <img
        src={Post1}
        alt="DEMO FOR THE STRESS IN EXAM"
        style={{ width: "100%", height: 450, marginBottom: "20px" }}
      ></img>
      <p className="blog-detail__excerpt">
        3. Ăn uống và ngủ đủ giấc Sức khỏe thể chất có ảnh hưởng trực tiếp đến
        khả năng học tập và sự ổn định về tinh thần. Trong mùa thi, việc duy trì
        chế độ ăn uống lành mạnh và ngủ đủ giấc rất quan trọng. Hãy ăn các thực
        phẩm giàu vitamin, khoáng chất và hạn chế thức ăn nhanh, nhiều dầu mỡ.
        Ngủ đủ 7-8 tiếng mỗi đêm giúp bạn giữ tinh thần minh mẫn và tránh cảm
        giác mệt mỏi, căng thẳng.
        <br />
        <br />
        4. Tập trung vào hơi thở và thiền Một trong những phương pháp hiệu quả
        để giảm căng thẳng là luyện tập hơi thở sâu và thiền. Chỉ cần dành vài
        phút mỗi ngày để tập trung vào hơi thở có thể giúp bạn giảm lo âu và hồi
        phục sức khỏe tinh thần. Nếu bạn chưa thử, hãy bắt đầu với một vài bài
        tập thiền đơn giản như "hơi thở sâu" hoặc "quét cơ thể", giúp bạn thư
        giãn và xoa dịu căng thẳng.
      </p>
      <hr style={{ color: "#444", marginBottom: "15px" }} />
      <p className="blog-detail__related">Tin liên quan</p>
      <div className="blog-related">
        <Row gutter={[15, 15]}>
          <Col span={24}>
            <Card
              className="blog-related__post"
              title="Xây dựng mối quan hệ lành mạnh trong môi trường học đường"
            >
              <p style={{ fontSize: "1rem" }}>
                Tìm hiểu cách xây dựng và duy trì các mối quan hệ tích cực với
                bạn bè và thầy cô...
              </p>
            </Card>
          </Col>
          <Col span={24}>
            <Card
              className="blog-related__post"
              title="Xây dựng mối quan hệ lành mạnh trong môi trường học đường"
            >
              <p style={{ fontSize: "1rem" }}>
                Tìm hiểu cách xây dựng và duy trì các mối quan hệ tích cực với
                bạn bè và thầy cô...
              </p>
            </Card>
          </Col>
          <Col span={24}>
            <Card
              className="blog-related__post"
              title="Xây dựng mối quan hệ lành mạnh trong môi trường học đường"
            >
              <p style={{ fontSize: "1rem" }}>
                Tìm hiểu cách xây dựng và duy trì các mối quan hệ tích cực với
                bạn bè và thầy cô...
              </p>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default BlogDetail;
