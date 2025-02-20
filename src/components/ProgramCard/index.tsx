import { Rate } from "antd";
import "./index.scss";
import { useNavigate } from "react-router-dom";

interface ProgramCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  rating?: number;
  price?: string;
}

const ProgramCard = ({
  id,
  title,
  description,
  image,
  rating = 4,
  price = "500.000đ",
}: ProgramCardProps) => {
  const navigate = useNavigate();
  return (
    <div
      className="program__card"
      onClick={() => {
        navigate(`/program/${id}`);
      }}
    >
      <div className="program__image__container">
        <img src={image} alt={title} className="program__image" />
      </div>
      <div className="program__info">
        <h3 className="program__title">{title}</h3>
        <p className="program__description">{description}</p>
        <div className="program__details">
          <Rate disabled defaultValue={rating} className="program__rating" />
          <span className="program__price">{price}</span>
        </div>
      </div>
    </div>
  );
};

export default ProgramCard;
