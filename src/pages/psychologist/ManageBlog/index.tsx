import { Image } from "antd";
import { FaArrowRightLong } from "react-icons/fa6";
import { FiEdit3 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import PostPsy from "../../../assets/Post1.jpg";
import Cbutton from "../../../components/cButton";
import "./index.scss";
import NormalPost from "./normalPost";

function ManageBlog() {
  const navigate = useNavigate();
  return (
    <>
      <div
        style={{
          width: "94%",
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "15px",
        }}
      >
        <Cbutton onClick={() => navigate("create-blog")}>Tạo Bài Viết</Cbutton>
      </div>
      <div className="blog__container">
        <div className="blog__container__content">
          <Image
            src={PostPsy}
            alt="Tu van tam ly hoc duong"
            width={1200}
            className="image-with-border"
          />
          <div>
            <div className="blog__container__content__title1">
              Để Hiểu Và Giải Quyết Vấn Đề Khủng Hoảng Tâm Lý Học Đường
            </div>
            <div className="blog__container__content__title2">
              Áp lực học tập, mối quan hệ bạn bè và sự kỳ vọng từ gia đình có
              thể tạo ra những ảnh hưởng tiêu cực đến tâm lý của học sinh. Việc
              nhận biết sớm các dấu hiệu lo âu, trầm cảm và căng thẳng sẽ giúp
              phụ huynh, giáo viên và học sinh có biện pháp hỗ trợ kịp thời.
              Cùng tìm hiểu những giải pháp giúp xây dựng một môi trường học
              đường lành mạnh hơn!
            </div>
            <div className="blog__container__content__title3">
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
        <NormalPost />
      </div>
    </>
  );
}

export default ManageBlog;
