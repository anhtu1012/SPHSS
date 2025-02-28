import Cbutton from "../../../../components/cButton";
import styles from "./userProfile.module.scss";
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Descriptions, Rate } from "antd";
import { useEffect, useState } from "react";
import PopupInfoConsult from "../PopupViewInfoConsult";
import PopupSurveyDetail from "../../ManageSurveyStudent/PopupDetailSurvey";
import PopupChangeStatus from "../PopupStatusUser";
import PopupChangeInfoUser from "../PopupChangeInfo";
import UserProfileTable from "./DetailUserTable";
import { useParams } from "react-router-dom";
import { getUserId } from "../../../../services/admin/api";
import { User } from "../../../../models/admin";

function UserProfile() {
  const { id } = useParams();
  const [user, setUser] = useState<User>({} as User);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedConsult, setSelectedConsult] = useState(null);
  const [popupType, setPopupType] = useState<"consult" | "survey" | null>(null);
  const [isStatusPopupOpen, setIsStatusPopupOpen] = useState(false);
  const [isChangeInfoPopupOpen, setIsChangeInfoPopupOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const genderMap: Record<string, string> = {
    male: "Nam",
    female: "Nữ",
  };
  const roleMap: Record<string, string> = {
    R1: "Student",
    R2: "Parent",
    R3: "Psychologist",
    R4: "Manager",
  };

  const showModal = (record: any) => {
    setSelectedConsult(record);
    setIsModalOpen(true);
    if (["R1", "R2"].includes(user.role)) {
      setPopupType("consult");
    } else {
      setPopupType("survey");
    }
  };

  const updateUserState = (updatedUser: User) => {
    setUser(updatedUser);
  };

  useEffect(() => {
    if (!id) return;
    const fetchUser = async () => {
      try {
        const response = await getUserId(id);
        console.log("Dữ liệu từ API:", response.data);
        setUser(response.data.data as User);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin user:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (!user) return <p>Không tìm thấy người dùng</p>;

  return (
    <div className={styles.userProfile}>
      <div className={styles.mainContent}>
        <div className={styles.leftProfile}>
          <div className={styles.profileHeader}>
            <div className={styles.profileName}>
              <div className={styles.avatar}>
                {user.image ? (
                  <img
                    src={user.image}
                    alt="Avatar"
                    className={styles.userAvatar}
                  />
                ) : (
                  <UserOutlined />
                )}
              </div>
              <div className={styles.profileInfo}>
                <h2>
                  {`${user.firstName || ""} ${user.lastName || ""}`.trim()}
                </h2>
                <p>{user.userCode}</p>
                {user.role === "R3" && (
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
                {user.status ? "Đang hoạt động" : "Đã khóa"}
              </Cbutton>
            </div>
          </div>
          <p className={styles.sectionTitle}>
            {user.role === "R3"
              ? "Danh sách học/sinh viên đã tư vấn"
              : "Lịch sử điều trị tâm lý của học/sinh viên"}
          </p>
          {user.role !== "R4" && (
            <UserProfileTable accountType={user.role} showModal={showModal} />
          )}
        </div>
        <div className={styles.rightProfile}>
          <div className={styles.infoSection}>
            <Descriptions
              title="Thông tin cá nhân"
              bordered
              column={1}
              size="small"
            >
              <Descriptions.Item label="Tên người dùng">
                {user.username}
              </Descriptions.Item>
              <Descriptions.Item label="Giới tính">
                {genderMap[user.gender] || "Không xác định"}
              </Descriptions.Item>
              <Descriptions.Item label="Loại tài khoản">
                {roleMap[user.role]}
              </Descriptions.Item>
              <Descriptions.Item label="Giới thiệu">
                {user.description}
              </Descriptions.Item>
            </Descriptions>
            <Descriptions
              title="Thông tin liên hệ"
              bordered
              column={1}
              size="small"
            >
              <Descriptions.Item
                label={<HomeOutlined style={{ color: "#EC744A" }} />}
              >
                TP Hồ Chí Minh, Việt Nam
              </Descriptions.Item>
              <Descriptions.Item
                label={<PhoneOutlined style={{ color: "#EC744A" }} />}
              >
                {user.phone}
              </Descriptions.Item>
              <Descriptions.Item
                label={<MailOutlined style={{ color: "#EC744A" }} />}
              >
                {user.email}
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
      {isStatusPopupOpen && user && id && (
        <PopupChangeStatus
          isOpen={isStatusPopupOpen}
          onClose={() => setIsStatusPopupOpen(false)}
          userId={id}
          currentStatus={Boolean(user.status)}
        />
      )}
      {isChangeInfoPopupOpen && user && (
        <PopupChangeInfoUser
          isOpen={isChangeInfoPopupOpen}
          onClose={() => setIsChangeInfoPopupOpen(false)}
          user={user}
          onUpdateUser={updateUserState}
        />
      )}
    </div>
  );
}

export default UserProfile;
