import { Rate } from "antd";
import "./index.scss";

interface DoctorCardProps {
  img: string;
  name: string;
  specialty?: string;
  experience?: string;
  rating?: number;
}

const DoctorCard = ({
  img,
  name,
  specialty = "Chuyên gia tâm lý",
  experience = "15 năm kinh nghiệm",
  rating = 5,
}: DoctorCardProps) => {
  return (
    <div className="doctor__card">
      <img src={img} alt={name} className="doctor__image" />
      <div className="doctor__info">
        <h3 className="doctor__name">{name}</h3>
        <p className="doctor__specialty">{specialty}</p>
        <Rate disabled defaultValue={rating} className="doctor__rating" />
        <p className="doctor__experience">{experience}</p>
      </div>
    </div>
  );
};

export default DoctorCard;
