import { useState } from "react";
import { Descriptions, Tabs, Modal } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./userProfile.scss";

const { TabPane } = Tabs;

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("surveys");
  const [selectedSurvey, setSelectedSurvey] = useState<{
    id: number;
    title: string;
    date: string;
    responses: { question: string; answer: string; score: number }[];
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock data for survey responses
  const surveyResponses = [
    {
      id: 1,
      title: "Khảo sát trầm cảm",
      date: "05/01/2023",
      responses: [
        {
          question: "Bạn có thường xuyên cảm thấy buồn không?",
          answer: "Thỉnh thoảng",
          score: 2,
        },
        {
          question: "Bạn có gặp khó khăn khi ngủ không?",
          answer: "Hiếm khi",
          score: 1,
        },
        {
          question: "Bạn có cảm thấy mệt mỏi và thiếu năng lượng không?",
          answer: "Thường xuyên",
          score: 3,
        },
      ],
    },
    {
      id: 2,
      title: "Khảo sát lo âu",
      date: "10/02/2023",
      responses: [
        {
          question: "Bạn có thường xuyên cảm thấy căng thẳng không?",
          answer: "Thường xuyên",
          score: 3,
        },
        {
          question: "Bạn có hay lo lắng về tương lai không?",
          answer: "Rất thường xuyên",
          score: 4,
        },
      ],
    },
  ];

interface SurveyResponse {
    question: string;
    answer: string;
    score: number;
}

interface Survey {
    id: number;
    title: string;
    date: string;
    responses: SurveyResponse[];
}

const showSurveyDetail = (survey: Survey) => {
    setSelectedSurvey(survey);
    setIsModalOpen(true);
};

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
          <Tabs activeKey={activeTab} onChange={setActiveTab}>
            <TabPane tab="Lịch sử khảo sát" key="surveys">
              <div className="user-profile__survey-list">
                {surveyResponses.map((survey) => (
                  <div
                    key={survey.id}
                    className="survey-list-item"
                    onClick={() => showSurveyDetail(survey)}
                  >
                    <div className="survey-list-item__title">
                      {survey.title}
                    </div>
                    <div className="survey-list-item__date">{survey.date}</div>
                  </div>
                ))}
              </div>
            </TabPane>
            <TabPane tab="Lịch sử chương trình" key="programs">
              <div className="user-profile__tab-content">
                <h3>Lịch sử tham gia chương trình</h3>
                <ul>
                  <li>Chương trình A - 01/01/2023</li>
                  <li>Chương trình B - 15/02/2023</li>
                  <li>Chương trình C - 20/03/2023</li>
                </ul>
              </div>
            </TabPane>
          </Tabs>
        </div>
      </div>

      <Modal
        title={selectedSurvey?.title}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={700}
      >
        {selectedSurvey && (
          <div className="survey-detail-modal">
            {selectedSurvey.responses.map((response, index) => (
              <div key={index} className="survey-detail-modal__item">
                <div className="question">{response.question}</div>
                <div className="answer">
                  Trả lời: {response.answer} (Điểm: {response.score})
                </div>
              </div>
            ))}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default UserProfile;
