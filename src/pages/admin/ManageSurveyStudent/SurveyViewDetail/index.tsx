import Cbutton from "../../../../components/cButton";
import styles from "./SurveyView.module.scss";
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Descriptions, Rate } from "antd";
import AntDComponent from "../../../../components/cTableAntD";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";
import DetailPopup from "../PopupDetailSurvey";
import DeletePopup from "../PopupDeleteSurvey";
import ChangeInfoPopup from "../PopupChangeInfor";
import dayjs from "dayjs";

interface DataType {
  key: string;
  name: string;
  date: string;
  id: string;
  attitude: string;
  comments: string;
  rating: number;
}

function UserProfile() {
  const data = [
    {
      key: "1",
      name: "Nguyễn Văn A",
      date: new Date("2024-12-12").toISOString(),
      id: "SE18021",
      attitude: "Thân thiện, nhiệt tình",
      comments: "Rất tốt, cần duy trì",
      rating: 5,
    },
    {
      key: "2",
      name: "Nguyễn Văn B",
      date: new Date("2024-12-12").toISOString(),
      id: "SE18022",
      attitude: "Bình thường",
      comments: "Không có góp ý",
      rating: 3,
    },
  ];

  const [selectedSurvey, setSelectedSurvey] = useState<DataType | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isChangeInfoOpen, setIsChangeInfoOpen] = useState(false);

  const columns: ColumnsType<DataType> = [
    {
      title: "Người khảo sát",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <div className={styles.userInfoContainer}>
          <span className={styles.surveyName}>{record.name}</span>
          <br />
          <span className={styles.id}>{record.id || "Chưa có ID"}</span>
        </div>
      ),
    },
    {
      title: "Ngày khảo sát",
      dataIndex: "date",
      key: "date",
      render: (_, record) => (
        <div className={styles.surveyInfoContainer}>
          <span className={styles.surveyType}>
            {dayjs(record.date).format("DD/MM/YYYY")}
          </span>
        </div>
      ),
    },
    {
      title: "Chi tiết",
      key: "action",
      render: (_, record) => (
        <Cbutton
          origin={{ bgcolor: "#ec744a", hoverBgColor: "#ff7875" }}
          onClick={() => {
            setSelectedSurvey({
              key: record.key,
              name: record.name,
              date: record.date,
              id: record.id,
              attitude: record.attitude,
              comments: record.comments,
              rating: record.rating,
            });
            setIsDetailOpen(true);
          }}
        >
          Xem chi tiết
        </Cbutton>
      ),
    },
  ];

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
                <h2>HIV và những con số đáng ngạc nhiên</h2>
                <p>KSCT0076</p>
                <Rate className={styles.customRate} disabled defaultValue={4} />
              </div>
            </div>
            <div className={styles.status}>
              <Cbutton onClick={() => setIsDeleteOpen(true)}>
                Xóa khảo sát
              </Cbutton>
            </div>
          </div>
          <p className={styles.sectionTitle}>
            Danh sách những người tham gia khảo sát
          </p>
          <AntDComponent dataSource={data} columns={columns} />
        </div>
        <div className={styles.rightProfile}>
          <div className={styles.infoSection}>
            <Descriptions
              title="Thông tin khảo sát"
              bordered
              column={1}
              size="small"
            >
              <Descriptions.Item label="Ngày bắt đầu">
                14/09/2023
              </Descriptions.Item>
              <Descriptions.Item label="Ngày kết thúc">20/09/2023</Descriptions.Item>
              <Descriptions.Item label="Trạng thái">
                Đang diễn ra
              </Descriptions.Item>
              <Descriptions.Item label="Đối tượng">
                Lớp SE1702
              </Descriptions.Item>
              <Descriptions.Item label="Loại khảo sát">
                Khảo sát chương trình
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
                Hội trường B - Đại học FPT HCM
              </Descriptions.Item>
              <Descriptions.Item
                label={<PhoneOutlined style={{ color: "#EC744A" }} />}
              >
                84987654321
              </Descriptions.Item>
              <Descriptions.Item
                label={<MailOutlined style={{ color: "#EC744A" }} />}
              >
                fpthealth@fu.vn
              </Descriptions.Item>
            </Descriptions>
          </div>
          <div className={styles.changeInfo}>
            <Cbutton onClick={() => setIsChangeInfoOpen(true)}>
              Thay đổi nội dung khảo sát
            </Cbutton>
          </div>
        </div>
      </div>
      {selectedSurvey && (
        <DetailPopup
          isOpen={isDetailOpen}
          onClose={() => setIsDetailOpen(false)}
          surveyData={{
            studentName: selectedSurvey.name,
            studentId: selectedSurvey.id,
            date: selectedSurvey.date,
            attitude: selectedSurvey.attitude,
            comments: selectedSurvey.comments,
            rating: selectedSurvey.rating,
          }}
        />
      )}

      <DeletePopup
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={() => {
          setIsDeleteOpen(false);
        }}
      />
      <ChangeInfoPopup
        isOpen={isChangeInfoOpen}
        onClose={() => setIsChangeInfoOpen(false)}
        onSave={() => {
          setIsChangeInfoOpen(false);
        }}
      />
    </div>
  );
}

export default UserProfile;
