import { CalendarOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { Avatar, Divider, Rate } from "antd";
import { useLocation } from "react-router-dom";

import { formatDate } from "../../../utils/dateUtils";
import "./detail.scss";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../redux/features/cartSlice";
import { RootState } from "../../../redux/RootReducer";

// interface Guest {
//   name: string;
//   title: string;
//   topic: string;
// }

// interface Feature {
//   title: string;
//   description: string;
// }

// interface ProgramDetail {
//   id: string;
//   image: string;
//   title: string;
//   rating: number;
//   reviews: number;
//   description: string;
//   schedule: {
//     startDate: string;
//     endDate: string;
//     time: string;
//     frequency: string;
//   };
//   price: {
//     toLocaleString: (locale: string) => string;
//   };
//   meetLink: string;
//   instructor: {
//     name: string;
//     avatar: string;
//     title: string;
//     experience: string;
//     description: string;
//   };
//   guests: Guest[];
//   benefits: string[];
//   features: Feature[];
// }

function ProgramDetail() {
  const location = useLocation();
  const program = location.state;
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch(addToCart(program));
  };
  const existProgram = useSelector((state: RootState) => state.cart) as any;
  const isInCart = existProgram.some(
    (item: any) => item.programId === program.programId
  );

  if (!program) {
    return <div>Program not found</div>;
  }

  return (
    <div className="program-detail__container">
      <div className="program-detail__header">
        <div className="program-detail__image">
          <img src={program.imageUrl} alt={program.title} />
        </div>
        <div className="program-detail__info">
          <h1 className="program-detail__title">{program.title}</h1>
          <div className="program-detail__rating">
            <Rate disabled defaultValue={program.rating} />
            <span>({program.rating} đánh giá)</span>
          </div>
          <p className="program-detail__description">{program.description}</p>
          <p
            style={{
              marginBottom: "1.5rem",
              color: "#666",
              fontSize: "1.1rem",
            }}
          >
            Đối tượng: {program.targetAudience}
          </p>

          <div className="program-detail__schedule">
            <div className="schedule-item">
              <CalendarOutlined />
              <span>
                {formatDate(`${program.startDate}`)} - {""}
                {formatDate(`${program.endDate}`)}
              </span>
            </div>
            <div className="schedule-item">
              <ClockCircleOutlined />
              <span>{program.time}</span>
            </div>
            <div className="schedule-item">
              <CalendarOutlined />
              <span>{program.frequency}</span>
            </div>
          </div>

          <div className="program-detail__price">{program.price} VNĐ</div>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <a
              className={`program-detail__addToCart ${
                isInCart ? "disabled" : ""
              } `}
              style={{
                cursor: isInCart ? "not-allowed" : "pointer",
                opacity: isInCart ? 0.5 : 1,
              }}
              onClick={handleAddToCart}
            >
              {isInCart ? "Đã thêm vào giỏ hàng" : "Thêm vào giỏ hàng"}
            </a>
            <a
              // href={program.meetLink}
              target="_blank"
              rel="noopener noreferrer"
              className="program-detail__button"
            >
              Tham gia ngay
            </a>
          </div>
        </div>
      </div>

      <Divider />

      <div className="program-detail__instructor">
        <h2>Người hướng dẫn chính</h2>
        <div className="instructor-info">
          {program.instructors && program.instructors.length > 0 ? (
            <>
              <Avatar
                size={100}
                src={program.instructors[0].instructorImage}
                alt={program.instructors[0].instructorName}
              />
              <div className="instructor-details">
                <h3>{program.instructors[0].instructorName}</h3>
                <p className="instructor-title">
                  {program.instructors[0].instructorTitle}
                </p>
                <p className="instructor-experience">
                  {program.instructors[0].instructorExperience}
                </p>
                <p className="instructor-description">
                  {program.instructors[0].instructorDescription}
                </p>
              </div>
            </>
          ) : (
            <div style={{ fontWeight: "bold" }}>
              Chương trình này hiện chưa có người hướng dẫn
            </div>
          )}
        </div>
      </div>

      <Divider />

      <div className="program-detail__guests">
        <h2>Khách mời đặc biệt</h2>
        <div className="guests-grid">
          {/* {program.guests.map((guest, index) => (
            <div key={index} className="guest-card">
              <h3>{guest.name}</h3>
              <p className="guest-title">{guest.title}</p>
              <p className="guest-topic">Chủ đề: {guest.topic}</p>
            </div>
          ))} */}
        </div>
      </div>

      <Divider />

      <div className="program-detail__benefits">
        <h2>Lợi ích từ chương trình</h2>
        <ul className="benefits-list">
          {/* {program.benefits.map((benefit, index) => (
            <li key={index}>{benefit}</li>
          ))} */}
        </ul>
      </div>

      <Divider />

      <div className="program-detail__content">
        <h2>Chi tiết chương trình</h2>
        <div className="program-detail__features">
          {/* {program.features.map((feature, index) => (
            <div key={index} className="program-detail__feature">
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
}

export default ProgramDetail;
