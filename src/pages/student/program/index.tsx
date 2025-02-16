/* eslint-disable @typescript-eslint/no-explicit-any */
import { Rate } from "antd";
import {
  Key
} from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import { programList } from "./mockData";

interface Program {
  id: Key | null | undefined;
  image: string | undefined;
  title: string;
  description: string;
  rating: number | undefined;
  reviews: number;
  price: {
    toLocaleString: (arg0: string) => string;
  };
}

function Program() {
  const navigate = useNavigate();

  return (
    <div className="program__container">
      <h1 className="program__title">Chương trình hỗ trợ tâm lý</h1>
      <p className="program__subtitle">
        Khám phá các chương trình tư vấn tâm lý chuyên sâu của chúng tôi
      </p>

      <div className="program__grid">
        {programList.map((program: Program) => (
          <div
            key={program.id}
            className="program__card"
            onClick={() => navigate(`/program/${program.id}`)}
          >
            <div className="program__card-image">
              <img src={program.image} alt={String(program.title)} />
            </div>
            <div className="program__card-content">
              <h2 className="program__card-title">{program.title}</h2>
              <p className="program__card-description">{program.description}</p>
              <div className="program__card-rating">
                <Rate disabled defaultValue={program.rating} />
                <span>({program.reviews} đánh giá)</span>
              </div>
              <div className="program__card-price">
                {program.price.toLocaleString("vi-VN")} VNĐ
              </div>
              <button className="program__card-button">Xem chi tiết</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Program;
