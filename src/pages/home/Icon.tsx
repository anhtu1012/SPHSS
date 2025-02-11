import { ReactNode } from "react";

const Icon = ({
  title,
  number,
  children,
}: {
  title: string;
  number?: string;
  children?: ReactNode;
}) => {
  return (
    <>
      {children && (
        <div className="home__section__one__content__icon__container">
          <div className="home__section__one__content__icon">{children}</div>
          <div className="home__section__one__content__icon__description">
            {title}
          </div>
        </div>
      )}
      {!children && (
        <div className="home__section__three__content__icon__container">
          <div className="home__section__three__content__icon">{number}</div>
          <div className="home__section__three__content__icon__description">
            {title}
          </div>
        </div>
      )}
    </>
  );
};

export default Icon;
