import { UserOutlined } from "@ant-design/icons";
import { Descriptions, Tabs, TabsProps } from "antd";
import ProgramHistory from "./programHistory";
import SurveyHistory from "./surveyHistory";
import "./userProfile.scss";
import BookingHistory from "./bookingHistory";

const UserProfile = () => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Lịch sử khảo sát",
      children: (
        <>
          <SurveyHistory />
        </>
      ),
    },
    {
      key: "2",
      label: "Lịch sử chương trình",
      children: (
        <>
          <ProgramHistory />
        </>
      ),
    },
    {
      key: "3",
      label: "Lịch hẹn khám",
      children: (
        <>
          <BookingHistory />
        </>
      ),
    },
  ];

  return (
    <div className="user-profile">
      <div className="user-profile__content">
        <div className="user-profile__left-panel">
          <div className="user-profile__header">
            <div className="user-profile__avatar">
              <UserOutlined />
            </div>
            <div className="user-profile__info">
              <h2>Nguyễn Văn A</h2>
              <p>ID: SE170121</p>
            </div>
          </div>

          <Descriptions bordered column={1} size="small">
            <Descriptions.Item label="Sinh nhật">14/09/2003</Descriptions.Item>
            <Descriptions.Item label="Quốc tịch">Việt Nam</Descriptions.Item>
            <Descriptions.Item label="Giới tính">Nam</Descriptions.Item>
            <Descriptions.Item label="Email">
              nguyenvana@gmail.com
            </Descriptions.Item>
            <Descriptions.Item label="Số điện thoại">
              0123456789
            </Descriptions.Item>
          </Descriptions>

          <div className="user-profile__health-status">
            <h3>Tình trạng sức khỏe</h3>
            <div className="status-item">
              <span className="status-item__label">Trầm cảm</span>
              <span className="status-item__value low">Thấp</span>
            </div>
            <div className="status-item">
              <span className="status-item__label">Lo âu</span>
              <span className="status-item__value medium">Trung bình</span>
            </div>
            <div className="status-item">
              <span className="status-item__label">Stress</span>
              <span className="status-item__value high">Cao</span>
            </div>
          </div>
        </div>

        <div className="user-profile__right-panel">
          <Tabs defaultActiveKey="1" items={items} />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
