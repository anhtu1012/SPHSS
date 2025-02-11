const Psychologist = ({ img, name }: { img: string; name: string }) => {
  return (
    <div className="home__psychologist">
      <div className="home__psychologist__img__container">
        <img src={img} alt="doctor" />
      </div>
      <div className="home__psychologist__name">{name}</div>
    </div>
  );
};

export default Psychologist;
