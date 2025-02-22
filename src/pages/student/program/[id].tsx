import { CalendarOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { Avatar, Divider, Rate } from "antd";
import { useLocation, useParams } from "react-router-dom";

import { useCallback, useEffect, useState } from "react";
import { getProgramDetail } from "../../../services/psychologist/api";
import "./detail.scss";
import { programList } from "./mockData";

interface Guest {
  name: string;
  title: string;
  topic: string;
}

interface Feature {
  title: string;
  description: string;
}

interface ProgramDetail {
  id: string;
  image: string;
  title: string;
  rating: number;
  reviews: number;
  description: string;
  schedule: {
    startDate: string;
    endDate: string;
    time: string;
    frequency: string;
  };
  price: {
    toLocaleString: (locale: string) => string;
  };
  meetLink: string;
  instructor: {
    name: string;
    avatar: string;
    title: string;
    experience: string;
    description: string;
  };
  guests: Guest[];
  benefits: string[];
  features: Feature[];
}

function ProgramDetail() {
  const [programDetail, setProgramDetail] = useState();
  console.log(programDetail);
  const location = useLocation();
  const programId = location.state;
  const { id } = useParams();
  const program = programList.find((p: ProgramDetail) => p.id === id);

  const getDetail = useCallback(async () => {
    try {
      const res = await getProgramDetail(programId);
      const data = res.data.data;
      setProgramDetail(data);
    } catch (error) {
      // toast.error("Không tìm thấy chương trình!");
    }
  }, []);

  useEffect(() => {
    getDetail();
  }, []);

  if (!program) {
    return <div>Program not found</div>;
  }

  return (
    <div className="program-detail__container">
      <div className="program-detail__header">
        <div className="program-detail__image">
          <img src={program.image} alt={program.title} />
        </div>
        <div className="program-detail__info">
          <h1 className="program-detail__title">{program.title}</h1>
          <div className="program-detail__rating">
            <Rate disabled defaultValue={program.rating} />
            <span>({program.reviews} đánh giá)</span>
          </div>
          <p className="program-detail__description">{program.description}</p>

          <div className="program-detail__schedule">
            <div className="schedule-item">
              <CalendarOutlined />
              <span>
                {program.schedule.startDate} - {program.schedule.endDate}
              </span>
            </div>
            <div className="schedule-item">
              <ClockCircleOutlined />
              <span>{program.schedule.time}</span>
            </div>
            <div className="schedule-item">
              <CalendarOutlined />
              <span>{program.schedule.frequency}</span>
            </div>
          </div>

          <div className="program-detail__price">
            {program.price.toLocaleString("vi-VN")} VNĐ
          </div>
          <a
            href={program.meetLink}
            target="_blank"
            rel="noopener noreferrer"
            className="program-detail__button"
          >
            Tham gia ngay
          </a>
        </div>
      </div>

      <Divider />

      <div className="program-detail__instructor">
        <h2>Người hướng dẫn chính</h2>
        <div className="instructor-info">
          <Avatar
            size={100}
            src={program.instructor.avatar}
            alt={program.instructor.name}
          />
          <div className="instructor-details">
            <h3>{program.instructor.name}</h3>
            <p className="instructor-title">{program.instructor.title}</p>
            <p className="instructor-experience">
              {program.instructor.experience}
            </p>
            <p className="instructor-description">
              {program.instructor.description}
            </p>
          </div>
        </div>
      </div>

      <Divider />

      <div className="program-detail__guests">
        <h2>Khách mời đặc biệt</h2>
        <div className="guests-grid">
          {program.guests.map((guest, index) => (
            <div key={index} className="guest-card">
              <h3>{guest.name}</h3>
              <p className="guest-title">{guest.title}</p>
              <p className="guest-topic">Chủ đề: {guest.topic}</p>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      <div className="program-detail__benefits">
        <h2>Lợi ích từ chương trình</h2>
        <ul className="benefits-list">
          {program.benefits.map((benefit, index) => (
            <li key={index}>{benefit}</li>
          ))}
        </ul>
      </div>

      <Divider />

      <div className="program-detail__content">
        <h2>Chi tiết chương trình</h2>
        <div className="program-detail__features">
          {program.features.map((feature, index) => (
            <div key={index} className="program-detail__feature">
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProgramDetail;
