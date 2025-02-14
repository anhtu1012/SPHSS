import { useNavigate } from "react-router-dom";

const Psychologist = ({
  img,
  name,
  id,
}: {
  img: string;
  name: string;
  id: string;
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/student/psychologist-detail/${id}`);
  };

  return (
    <div className="home__psychologist" onClick={handleClick}>
      <div className="home__psychologist__img__container">
        <img src={img} alt="doctor" />
      </div>
      <div className="home__psychologist__name">{name}</div>
    </div>
  );
};

export default Psychologist;
