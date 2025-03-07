import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaHeadSideVirus } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { GiHealthNormal, GiMedicines } from "react-icons/gi";
import { RiCalendarScheduleLine } from "react-icons/ri";

import { toast } from "react-toastify";
import fptPolytechnic from "../../../assets/fpt_polytechnic.png";
import fptSchools from "../../../assets/fpt_schools.png";
import fptUniversity from "../../../assets/fpt_university.png";
import homeBanner from "../../../assets/home_banner.png";
import sectionOne from "../../../assets/home_section_1.png";
import sectionTwo from "../../../assets/home_section_2.png";
import sectionThree from "../../../assets/home_section_3.png";
import DoctorCard, { DoctorCardProps } from "../../../components/DoctorCard";
import ProgramCard from "../../../components/ProgramCard";
import { getListDoctors } from "../../../services/psychologist/api";
import Icon from "./Icon";
import SchoolImg from "./SchoolImg";
import "./index.scss";

export default function Home() {
  // const featuresRef = useRef(null);
  const programsRef = useRef(null);
  const doctorsRef = useRef(null);

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };
  const [doctorList, setDoctorList] = useState<DoctorCardProps[]>([]);
  const getAllDoctor = async () => {
    try {
      const res = await getListDoctors("R3");
      setDoctorList(res.data.data);
    } catch (error) {
      toast.error("Lỗi");
    }
  };

  useEffect(() => {
    getAllDoctor();
  }, []);

  const featuredPrograms = [
    {
      id: "1",
      title: "Tư vấn tâm lý cá nhân",
      description: "Chương trình tư vấn 1-1 với chuyên gia tâm lý",
      image:
        "https://firebasestorage.googleapis.com/v0/b/pet-management-94cf6.appspot.com/o/program-1.jpg?alt=media&token=4afd4cb5-fa0c-4fdb-931e-85d5d7c50e0f",
    },
    {
      id: "2",
      title: "Chương trình tư vấn nhóm",
      description: "Tham gia các buổi tư vấn nhóm để chia sẻ",
      image:
        "https://firebasestorage.googleapis.com/v0/b/pet-management-94cf6.appspot.com/o/program-2.webp?alt=media&token=249dc743-4354-48f3-ae5d-ad32e7ea9016",
    },
    {
      id: "3",
      title: "Workshop Quản lý Stress",
      description: "Workshop chuyên sâu về quản lý stress",
      image:
        "https://firebasestorage.googleapis.com/v0/b/pet-management-94cf6.appspot.com/o/program-3.jpg?alt=media&token=ae338815-451d-4e25-a420-a5ed40dfe1a5",
    },
  ];

  return (
    <div className="home__container">
      <motion.div
        className="home__banner__img__container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <img src={homeBanner} alt="home_banner" />
        <div className="home__banner__overlay">
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Chăm sóc sức khỏe tinh thần
          </motion.h1>
          <motion.div
            className="home__banner__buttons"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <button onClick={() => scrollToSection(programsRef)}>
              Xem chương trình
            </button>
            <button onClick={() => scrollToSection(doctorsRef)}>
              Tìm bác sĩ
            </button>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="home__featured__doctors__container"
        ref={doctorsRef}
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="home__featured__doctors__title">
          Bác sĩ nổi bật
          <span className="home__featured__doctors__title--highlight">
            &nbsp;của chúng tôi
          </span>
        </h2>
        <div className="home__featured__doctors__list">
          {doctorList.slice(0, 4).map((doctor, index) => (
            <DoctorCard key={index} {...doctor} />
          ))}
        </div>
      </motion.div>

      <motion.div
        className="home__featured__programs__container"
        ref={programsRef}
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="home__featured__programs__title">
          Chương trình tư vấn
          <span className="home__featured__programs__title--highlight">
            &nbsp;nổi bật
          </span>
        </h2>
        <div className="home__featured__programs__list">
          {featuredPrograms.map((program, index) => (
            <ProgramCard key={index} {...program} />
          ))}
        </div>
      </motion.div>

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
    </div>
  );
}
