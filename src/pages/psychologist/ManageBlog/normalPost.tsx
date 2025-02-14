import { FaArrowRightLong } from "react-icons/fa6";
import { FiEdit3 } from "react-icons/fi";
import Post1 from "../../../assets/npost1.png";

function NormalPost() {
  return (
    <div className="blog__container__normal">
      <div>
        <img
          src={Post1}
          alt="Tu Van 1"
          height={220}
          style={{ width: "100%", borderRadius: "10px" }}
        />
        <div style={{ fontSize: "20px", fontWeight: "bold", marginTop: "3px" }}>
          Áp Lực Thành Tích Học Tập Trở Thành Gánh Nặng
        </div>
        <div
          style={{
            fontSize: "15px",
            marginTop: "3px",
            color: "#939292",
            marginBottom: "3px",
          }}
        >
          Trong môi trường giáo dục cạnh tranh, nhiều học sinh phải đối mặt với
          áp lực điểm số và kỳ vọng từ gia đình. Điều này có thể dẫn đến căng
          thẳng, lo âu và thậm chí là mất động lực học tập. Làm thế nào để cân
          bằng giữa thành tích và sức khỏe tinh thần? Hãy cùng khám phá những
          phương pháp giúp học sinh học tập hiệu quả mà vẫn giữ vững tinh thần
          thoải mái!
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="blog__container__content__title3__readMore">
            Read More <FaArrowRightLong />
          </div>
          <div className="blog__container__content__title3__edit">
            <FiEdit3 />
            Edit
          </div>
        </div>
      </div>
      <div>
        <img
          src={Post1}
          alt="Tu Van 2"
          height={220}
          style={{ width: "100%", borderRadius: "10px" }}
        />
        <div style={{ fontSize: "20px", fontWeight: "bold", marginTop: "3px" }}>
          Tác Động Của Mạng Xã Hội Đến Tâm Lý Học Sinh
        </div>
        <div
          style={{
            fontSize: "15px",
            marginTop: "3px",
            color: "#939292",
            marginBottom: "3px",
          }}
        >
          Mạng xã hội mang đến nhiều lợi ích nhưng cũng tiềm ẩn không ít rủi ro,
          đặc biệt là đối với tâm lý học sinh. So sánh bản thân với người khác,
          áp lực từ lượt thích và bình luận có thể ảnh hưởng tiêu cực đến sự tự
          tin và cảm xúc. Vậy làm thế nào để sử dụng mạng xã hội một cách lành
          mạnh? Hãy cùng tìm hiểu những lời khuyên hữu ích giúp bảo vệ sức khỏe
          tinh thần trong thời đại số!
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="blog__container__content__title3__readMore">
            Read More <FaArrowRightLong />
          </div>
          <div className="blog__container__content__title3__edit">
            <FiEdit3 />
            Edit
          </div>
        </div>
      </div>
    </div>
  );
}

export default NormalPost;
