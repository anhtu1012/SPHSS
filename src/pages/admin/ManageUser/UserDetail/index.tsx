import Cbutton from "../../../../components/cButton";
import styles from "./userProfile.module.scss";
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Descriptions, Rate } from "antd";
import { useState } from "react";
import PopupInfoConsult from "../PopupViewInfoConsult";
import PopupSurveyDetail from "../PopupSurveyInfo";
import PopupChangeStatus from "../PopupStatusUser";
import PopupChangeInfoUser from "../PopupChangeInfo";
import UserProfileTable from "./DetailUserTable";

function UserProfile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedConsult, setSelectedConsult] = useState(null);
  const [popupType, setPopupType] = useState<"consult" | "survey" | null>(null);
  const [isStatusPopupOpen, setIsStatusPopupOpen] = useState(false);
  const [isChangeInfoPopupOpen, setIsChangeInfoPopupOpen] = useState(false);
  const accountType = "Tư vấn viên"; 
  // const accountType = "Học/sinh viên";
  // const accountType = "Phụ huynh";

  const showModal = (record: any) => {
    setSelectedConsult(record);
    setIsModalOpen(true);
    if (["Học/sinh viên", "Phụ huynh"].includes(accountType)) {
      setPopupType("consult");
    } else {
      setPopupType("survey");
    }
  };

  return (
    <div className={styles.userProfile}>
      <div className={styles.mainContent}>
        <div className={styles.leftProfile}>
          <div className={styles.profileHeader}>
            <div className={styles.profileName}>
              <div className={styles.avatar}>
                <UserOutlined />
              </div>
              <div className={styles.profileInfo}>
                <h2>Tạ Thị Hải Yến</h2>
                <p>SE170121</p>
                {accountType === "Tư vấn viên" && (
                  <Rate
                    className={styles.customRate}
                    disabled
                    defaultValue={4}
                  />
                )}
              </div>
            </div>
            <div className={styles.status}>
              <Cbutton onClick={() => setIsStatusPopupOpen(true)}>
                Đang hoạt động
              </Cbutton>
            </div>
          </div>
          <p className={styles.sectionTitle}>
            {accountType === "Tư vấn viên"
              ? "Danh sách học/sinh viên đã tư vấn"
              : "Lịch sử điều trị tâm lý của học/sinh viên"}
          </p>
          <UserProfileTable accountType={accountType} showModal={showModal} />
        </div>
        <div className={styles.rightProfile}>
          <div className={styles.infoSection}>
            <Descriptions title="Thông tin cá nhân" bordered column={1} size="small">
              <Descriptions.Item label="Sinh nhật">14/09/2003</Descriptions.Item>
              <Descriptions.Item label="Quốc tịch">Việt Nam</Descriptions.Item>
              <Descriptions.Item label="Hôn nhân">Độc thân</Descriptions.Item>
              <Descriptions.Item label="Giới tính">Nữ</Descriptions.Item>
              <Descriptions.Item label="Loại tài khoản">{accountType}</Descriptions.Item>
              <Descriptions.Item label="Trường">Đại học FPT HCM</Descriptions.Item>
            </Descriptions>
            <Descriptions title="Thông tin liên hệ" bordered column={1} size="small">
              <Descriptions.Item label={<HomeOutlined style={{ color: "#EC744A" }} />}>
                Quận 12, TP Hồ Chí Minh
              </Descriptions.Item>
              <Descriptions.Item label={<PhoneOutlined style={{ color: "#EC744A" }} />}>
                84987654321
              </Descriptions.Item>
              <Descriptions.Item label={<MailOutlined style={{ color: "#EC744A" }} />}>
                thy14903@gmail.com
              </Descriptions.Item>
            </Descriptions>
          </div>
          <div className={styles.changeInfo}>
            <Cbutton onClick={() => setIsChangeInfoPopupOpen(true)}>
              Thay đổi thông tin
            </Cbutton>
          </div>
        </div>
      </div>

      {/* Popups */}
      {popupType === "consult" && selectedConsult && (
        <PopupInfoConsult
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          consultData={selectedConsult}
        />
      )}
      {popupType === "survey" && selectedConsult && (
        <PopupSurveyDetail
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          surveyData={selectedConsult}
        />
      )}
      {isStatusPopupOpen && (
        <PopupChangeStatus
          isOpen={isStatusPopupOpen}
          onClose={() => setIsStatusPopupOpen(false)}
        />
      )}
      {isChangeInfoPopupOpen && (
        <PopupChangeInfoUser
          isOpen={isChangeInfoPopupOpen}
          onClose={() => setIsChangeInfoPopupOpen(false)}
        />
      )}
    </div>
  );
}

export default UserProfile;
