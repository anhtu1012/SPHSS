import { Rate } from "antd";
import "./index.scss";
import { useNavigate } from "react-router-dom";

export interface DoctorCardProps {
  id: string;
  image: string;
  firstName: string;
  lastName: string;
  specialty?: string;
  experience?: string;
  rating?: number;
}

const DoctorCard = ({
  id,
  image,
  firstName,
  lastName,
  specialty = "Chuyên gia tâm lý",
  experience = "15 năm kinh nghiệm",
  rating = 5,
}: DoctorCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      className="doctor__card"
      onClick={() => navigate(`/psychologist-detail/${id}`)}
    >
      <img src={image} alt={firstName} className="doctor__image" />
      <div className="doctor__info">
        <h3 className="doctor__name">
          {firstName} {lastName}
        </h3>
        <p className="doctor__specialty">{specialty}</p>
        <Rate disabled defaultValue={rating} className="doctor__rating" />
        <p className="doctor__experience">{experience}</p>
      </div>
    </div>
  );
};

export default DoctorCard;
