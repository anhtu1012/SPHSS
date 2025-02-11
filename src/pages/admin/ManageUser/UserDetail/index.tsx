
import Cbutton from "../../../../components/cButton";
import AntDComponent from "../../../../components/cTableAntD";
import { ColumnType } from "antd/es/table";
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import styles from "./userProfile.module.scss";
import { Descriptions } from "antd";
import { useState } from "react";
import PopupInfoConsult from "../PopupViewInfoConsult";
import PopupChangeStatus from "../PopupStatusUser";
import PopupChangeInfoUser from "../PopupChangeInfo";

function UserProfile() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedConsult, setSelectedConsult] = useState(null);
  const [isStatusPopupOpen, setIsStatusPopupOpen] = useState(false);
  const [isChangeInfoPopupOpen, setIsChangeInfoPopupOpen] = useState(false);

  const showModal = (record: any) => {
    setSelectedConsult(record);
    setIsModalOpen(true);
  };

  const columns: ColumnType<any>[] = [
    {
      title: "Ngày chẩn đoán",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Chẩn đoán",
      dataIndex: "diagnosis",
      key: "diagnosis",
    },
    {
      title: "Xem chi tiết",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Cbutton
          origin={{ bgcolor: "#ec744a", hoverBgColor: "#ff7875" }}
          onClick={() => showModal(record)}
        >
          Xem
        </Cbutton>
      ),
    },
    
    {
      title: "Ghi chú",
      dataIndex: "note",
      key: "note",
    },
  ];

  const data = [
    {
      key: "1",
      date: "12/12/2024",
      diagnosis: "Rối loạn căng thẳng sau chấn thương (PTSD)",
      note: "Phải liên hệ phụ huynh",
    },
    {
      key: "2",
      date: "12/12/2024",
      diagnosis: "Rối loạn nhân cách chống đối xã hội",
      note: "",
    },
    {
      key: "3",
      date: "12/12/2024",
      diagnosis: "Rối loạn căng thẳng sau chấn thương (PTSD)",
      note: "Kiểm tra sau 5 ngày",
    },
    {
      key: "4",
      date: "12/12/2024",
      diagnosis: "Rối loạn căng thẳng sau chấn thương (PTSD)",
      note: "",
    },
  ];

  return (
    <div className={styles.userProfile}>
      {/* ẩn nút backbutton vì xấu quá  */}
      {/* <div className={styles.backButton}>
        <Cbutton onClick={() => navigate(-1)}>
          <ArrowLeftOutlined className={styles.backIcon} />
          Quay lại
        </Cbutton>
      </div> */}
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
              </div>
            </div>
            <div className={styles.status}>
              <Cbutton  onClick={() => setIsStatusPopupOpen(true)}>Đang hoạt động</Cbutton>
            </div>
          </div>
          <div>
            <p className={styles.sectionTitle}>
              Lịch sử điều trị tâm lý của sinh viên
            </p>
            <AntDComponent dataSource={data} columns={columns} />
          </div>
        </div>

        <div className={styles.rightProfile}>
          <div className={styles.infoSection}>
            <Descriptions
              title="Thông tin cá nhân"
              bordered
              column={1}
              size="small"
              style={{
                marginBottom: "10px",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              <Descriptions.Item label="Sinh nhật">
                14/09/2003
              </Descriptions.Item>
              <Descriptions.Item label="Quốc tịch">Việt Nam</Descriptions.Item>
              <Descriptions.Item label="Hôn nhân">Độc thân</Descriptions.Item>
              <Descriptions.Item label="Giới tính">Nữ</Descriptions.Item>
              <Descriptions.Item label="Loại tài khoản">
                Học/Sinh viên
              </Descriptions.Item>
              <Descriptions.Item label="Trường">
                Đại học FPT HCM
              </Descriptions.Item>
            </Descriptions>
            <Descriptions
              title="Thông tin liên hệ"
              bordered
              column={1}
              size="small"
              style={{ borderRadius: "8px", overflow: "hidden" }}
            >
              <Descriptions.Item
                label={<HomeOutlined style={{ color: "#EC744A" }} />}
              >
                Quận 12, TP Hồ Chí Minh
              </Descriptions.Item>
              <Descriptions.Item
                label={<PhoneOutlined style={{ color: "#EC744A" }} />}
              >
                84987654321
              </Descriptions.Item>
              <Descriptions.Item
                label={<MailOutlined style={{ color: "#EC744A" }} />}
              >
                thy14903@gmail.com
              </Descriptions.Item>
            </Descriptions>
          </div>
          <div className={styles.changeInfo}>
            <Cbutton onClick={() => setIsChangeInfoPopupOpen(true)}>Thay đổi thông tin</Cbutton>
          </div>
        </div>
      </div>
      {selectedConsult && (
        <PopupInfoConsult
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          consultData={selectedConsult}
        />
      )}
      {isStatusPopupOpen && (
        <PopupChangeStatus isOpen={isStatusPopupOpen} onClose={() => setIsStatusPopupOpen(false)} />
      )}
      {isChangeInfoPopupOpen && (
        <PopupChangeInfoUser isOpen={isChangeInfoPopupOpen} onClose={() => setIsChangeInfoPopupOpen(false)} />
      )}
    </div>
  );
}

export default UserProfile;
