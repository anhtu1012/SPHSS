import { FaCalendarAlt, FaMapMarkerAlt, FaUsers } from "react-icons/fa";
import styles from "./ViewProgram.module.scss";
// import { useState } from "react";
// import ProgramPopup from "../PopupEditProgram";
// import Cbutton from "../../../../components/cButton";
import logoKS from "./LOGO_KS.png";

const ManageProgramDetail = () => {
  // const [isModalOpen, setIsModalOpen] = useState(false);

  // const handleEditClick = () => {
  //   setIsModalOpen(true);
  // };

  return (
    <div className={styles.manageProgramDetail}>
      <h1 className={styles.title}>WORLD AIDS DAY</h1>
      <div className={styles.image}>
        <img src={logoKS} alt="img of combo KS" />
      </div>

      <p className={styles.description}>
        Our collective efforts can foster a healthy and joyful community.
        Remember, neither happiness nor good health can be bought, so it’s our
        responsibility to cherish and nurture them in ourselves and in those
        around us. Let's make it a priority to take excellent care of our
        well-being and the wellbeing of those we care about.
      </p>
      <div className={styles.info}>
        <div className={styles.infoItem}>
          <FaUsers className={styles.icon} />
          <span>Lớp SE1702_SUM24</span>
        </div>
        <div className={styles.infoItem}>
          <FaCalendarAlt className={styles.icon} />
          <span>23/11/2024 - 26/11/2024</span>
        </div>
        <div className={styles.infoItem}>
          <FaMapMarkerAlt className={styles.icon} />
          <span>Hội Trường B - Đại Học FPT HCM</span>
        </div>
      </div>

      <div className={styles.ratingSection}>
        <h2>ĐÁNH GIÁ CỦA NGƯỜI THAM GIA SAU CHƯƠNG TRÌNH</h2>
        <div className={styles.stars}>
          <span>⭐</span>
          <span>⭐</span>
          <span>⭐</span>
          <span>⭐</span>
          <span>⭐</span>
          <p className={styles.ratingCode}>(Mã Khảo Sát 008731)</p>
        </div>
      </div>

      {/* <Cbutton
        className={styles.editButton}
        onClick={handleEditClick}
        origin={{ bgcolor: "#EC744A" }}
      >
        Chỉnh sửa thông tin chương trình
      </Cbutton> */}

      {/* <ProgramPopup isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} /> */}

    </div>
  );
};

export default ManageProgramDetail;
