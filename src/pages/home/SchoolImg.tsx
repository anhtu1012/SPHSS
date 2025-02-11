const SchoolImg = ({ url }: { url: string }) => {
  return (
    <div className="home__section__two__content__img__container">
      <img src={url} alt="" />
    </div>
  );
};

export default SchoolImg;
