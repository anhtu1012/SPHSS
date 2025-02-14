import { RiCalendarScheduleLine } from "react-icons/ri";
import { GiMedicines } from "react-icons/gi";
import { GiHealthNormal } from "react-icons/gi";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaHeadSideVirus } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";

import homeBanner from "../../assets/home_banner.png";
import sectionOne from "../../assets/home_section_1.png";
import sectionTwo from "../../assets/home_section_2.png";
import sectionThree from "../../assets/home_section_3.png";
import fptUniversity from "../../assets/fpt_university.png";
import fptPolytechnic from "../../assets/fpt_polytechnic.png";
import fptSchools from "../../assets/fpt_schools.png";
import "./index.scss";
import Icon from "./Icon";
import SchoolImg from "./SchoolImg";
import Psychologist from "./Psychologist";
import { psychologistList } from "./mockData";
import { Carousel } from "antd";

export default function Home() {
  return (
    <div className="home__container">
      {/* banner */}
      <div className="home__banner__img__container">
        <img src={homeBanner} alt="home_banner" />
      </div>
      {/* section 1 */}
      <div className="home__section__one__container">
        <div className="home__section__one__img__container">
          <img src={sectionOne} alt="section_one" />
        </div>
        <div className="home__section__one__content__container">
          <h2 className="home__section__one__content__title">
            Hệ Sinh Thái Y Tế
            <span className="home__section__one__content__title--highlight">
              &nbsp;Toàn Diện
            </span>
          </h2>
          <p className="home__section__one__content__description">
            YagHealth là nền tảng kết nối giữa sinh viên và hơn 6 Bác sĩ chuyên
            khoa, với các cơ sở y tế khắp các đại học FPT toàn quốc, cung cấp
            các dịch vụ thăm khám, xét nghiệm, chăm sóc sức khoẻ toàn diện
          </p>
          <div className="home__section__one__content__icon__list__container">
            <Icon title="Tìm bác sĩ riêng">
              <FaUserDoctor color="white" size={30} />
            </Icon>
            <Icon title="Tham vấn tâm lý">
              <FaHeadSideVirus color="white" size={30} />
            </Icon>
            <Icon title="Chăm sóc người bệnh">
              <BsFillPeopleFill color="white" size={30} />
            </Icon>
            <Icon title="Sản phẩm sức khoẻ">
              <GiHealthNormal color="white" size={30} />
            </Icon>
            <Icon title="Mua thuốc online">
              <GiMedicines color="white" size={30} />
            </Icon>
            <Icon title="Đặt lịch hẹn khám">
              <RiCalendarScheduleLine color="white" size={30} />
            </Icon>
          </div>
        </div>
      </div>
      {/* section 2 */}
      <div className="home__section__two__container">
        <div className="home__section__two__content__container">
          <h2 className="home__section__two__content__title">
            Chăm sóc sức khoẻ toàn diện cho
            <span className="home__section__two__content__title--highlight">
              &nbsp;trường học
            </span>
          </h2>
          <p className="home__section__two__content__description">
            Không chỉ dừng lại ở chương trình khám sức khỏe định kỳ, YagHealth
            cung cấp cho doanh nghiệp những tiện ích chăm sóc sức khỏe toàn
            diện, tối ưu, tiết kiệm và chuyên nghiệp.
          </p>
          <div className="home__section__two__content__img__list__container">
            <SchoolImg url={fptUniversity} />
            <SchoolImg url={fptPolytechnic} />
            <SchoolImg url={fptSchools} />
          </div>
        </div>
        <div className="home__section__two__img__container">
          <img src={sectionTwo} alt="section_one" />
        </div>
      </div>
      {/* section 3 */}
      <div className="home__section__three__container">
        <div className="home__section__three__content__container">
          <h2 className="home__section__three__content__title">
            Mạng lưới y tế Yag Health
          </h2>
          <div className="home__section__three__content__icon__list__container">
            <Icon title="Tỉnh thành phố" number="6" />
            <Icon title="Bác sĩ" number="6" />
            <Icon title="Bệnh viện thành phố" number="6" />
            <Icon title="Trung tâm xét nghiệm" number="6" />
            <Icon title="Điều dưỡng" number="6" />
          </div>
        </div>
        <div className="home__section__three__img__container">
          <img src={sectionThree} alt="section_one" />
        </div>
      </div>
      <div className="home__psychologist__list__container">
        <div className="home__psychologist__list__title">
          Đội ngũ chuyên viên tâm lý
        </div>
        <Carousel dots={false} arrows slidesToShow={6}>
          {psychologistList.map((psychology, index) => (
            <Psychologist key={index} {...psychology} />
          ))}
        </Carousel>
      </div>
    </div>
  );
}
