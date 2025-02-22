/* eslint-disable @typescript-eslint/no-explicit-any */
import { Rate } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ProgramData } from "../../../models/psy";
import { getProgram } from "../../../services/psychologist/api";
import "./index.scss";

function Program() {
  const [programData, setProgramData] = useState<ProgramData[]>([]);
  const navigate = useNavigate();

  const fetchProgram = useCallback(async () => {
    try {
      const res = await getProgram();
      const data = res.data.data;
      if (data.length < 0) {
        toast.error("Không có dữ liệu");
      }
      setProgramData(data);
    } catch (error: any) {
      toast.error("Error when fetching data " + error?.response.message);
    }
  }, []);

  useEffect(() => {
    fetchProgram();
  }, []);

  return (
    <div className="program__container">
      <h1 className="program__title">Chương trình hỗ trợ tâm lý</h1>
      <p className="program__subtitle">
        Khám phá các chương trình tư vấn tâm lý chuyên sâu của chúng tôi
      </p>

      <div className="program__grid">
        {programData.map((program: ProgramData) => (
          <div
            key={program.programId}
            className="program__card"
            onClick={() =>
              navigate(`/program/${program.programId}`, {
                state: program.programId,
              })
            }
          >
            <div className="program__card-image">
              <img src={program.imageUrl} alt={String(program.title)} />
            </div>
            <div className="program__card-content">
              <h2 className="program__card-title">{program.title}</h2>
              <p className="program__card-description">{program.description}</p>
              <div className="program__card-rating">
                <Rate disabled defaultValue={program.rating} />
                <span>({program.rating} đánh giá)</span>
              </div>
              <div className="program__card-price">{program.price} VNĐ</div>
              <button className="program__card-button">Xem chi tiết</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Program;
