import {
  Descriptions,
  Form,
  GetProp,
  Image,
  Input,
  Select,
  Tabs,
  TabsProps,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { useCallback, useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Cbutton from "../../../components/cButton";
import { setUser } from "../../../redux/features/userSlice";
import { RootState } from "../../../redux/RootReducer";
import { updateStudentProfile } from "../../../services/student/PsychologistDetail/api";
import uploadFile from "../../../utils/upload";
import BookingHistory from "./bookingHistory";
import ProgramHistory from "./programHistory";
import SurveyHistory from "./surveyHistory";
import "./userProfile.scss";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

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
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user) as any | null;
  console.log(user);

  const [form] = Form.useForm();
  const [editable, setEditable] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [pendingImage, setPendingImage] = useState<FileType | null>(null);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);

    if (newFileList.length > 0 && newFileList[0].originFileObj) {
      const file = newFileList[0].originFileObj;
      setPendingImage(file); // Store file instead of uploading it immediately
    } else {
      setPendingImage(null);
    }
  };

  const handleSubmit = useCallback(async () => {
    const formValues = form.getFieldsValue();
    const changedFields: any = {};
    Object.keys(formValues).forEach((key) => {
      if (formValues[key] !== undefined && formValues[key] !== user[key]) {
        changedFields[key] = formValues[key];
      }
    });
    if (pendingImage) {
      changedFields.image = await uploadFile(pendingImage);
    }
    if (Object.keys(changedFields).length === 0) {
      toast.info("Không có thay đổi nào");
      setEditable(false);
      return;
    }
    try {
      const res = await updateStudentProfile(user.userCode, changedFields);
      if (res) {
        dispatch(
          setUser({
            ...user,
            ...changedFields,
          })
        );
        toast.success("Cập nhật thông tin thành công");
      }
      setEditable(false);
    } catch (error) {
      toast.error("Lỗi khi cập nhật thông tin!");
    }
  }, [user, form, pendingImage, dispatch]);

  useEffect(() => {
    if (user.image) {
      setFileList([{ uid: "-1", name: "avatar.png", url: user.image }]);
    }
  }, [user.image]);

  return (
    <div className="user-profile">
      <div className="user-profile__content">
        <div className="user-profile__left-panel">
          <Form form={form} onFinish={handleSubmit}>
            <Form.Item
              name="image"
              style={{
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                marginBottom: "10px",
              }}
            >
              <Upload
                listType="picture-circle"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                beforeUpload={(file) => {
                  const isImage = file.type.startsWith("image/");
                  if (!isImage) {
                    toast.error("You can only upload image files!");
                  }
                  const isLt2M = file.size / 1024 / 1024 < 2;
                  if (!isLt2M) {
                    toast.error("Image must be smaller than 2MB!");
                  }
                  return isImage && isLt2M;
                }}
                maxCount={1}
              >
                {fileList.length >= 1 ? null : "HEHE"}
              </Upload>
            </Form.Item>
            {previewImage && (
              <Image
                wrapperStyle={{ display: "none" }}
                preview={{
                  visible: previewOpen,
                  onVisibleChange: (visible) => setPreviewOpen(visible),
                  afterOpenChange: (visible) => !visible && setPreviewImage(""),
                }}
                src={previewImage}
              />
            )}
            <div className="user-profile__header">
              <div className="user-profile__info">
                <h3>{`${user.firstName} ${user.lastName}`}</h3>
                <p>ID: {`${user.userCode}`}</p>
              </div>
              <div
                className="user-profile__edit"
                onClick={() => setEditable(!editable)}
              >
                <FaRegEdit />
              </div>
            </div>

            <Descriptions bordered column={1} size="small">
              <Descriptions.Item label="Họ và tên đệm">
                {editable ? (
                  <Form.Item name="firstName" style={{ marginBottom: 0 }}>
                    <Input defaultValue={`${user.firstName}`} />
                  </Form.Item>
                ) : (
                  `${user.firstName}`
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Tên">
                {editable ? (
                  <Form.Item name="lastName" style={{ marginBottom: 0 }}>
                    <Input defaultValue={`${user.lastName}`} />
                  </Form.Item>
                ) : (
                  `${user.lastName}`
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Số điện thoại">
                {editable ? (
                  <Form.Item name="phone" style={{ marginBottom: 0 }}>
                    <Input defaultValue={`${user.phone}`} />
                  </Form.Item>
                ) : (
                  `${user.phone}`
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Giới tính">
                {editable ? (
                  <Form.Item name="gender" style={{ marginBottom: 0 }}>
                    <Select
                      defaultValue={`${user.gender}`}
                      options={[
                        { label: "Male", value: "male" },
                        { label: "Female", value: "female" },
                      ]}
                    />
                  </Form.Item>
                ) : (
                  `${user.gender}`
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {editable ? (
                  <Form.Item name="email" style={{ marginBottom: 0 }}>
                    <Input defaultValue={`${user.email}`} />
                  </Form.Item>
                ) : (
                  `${user.email}`
                )}
              </Descriptions.Item>
            </Descriptions>
            <div style={{ display: "flex", justifyContent: "end" }}>
              <Cbutton
                htmlType="submit"
                disabled={editable ? false : true}
                style={{
                  marginTop: "12px",
                  opacity: editable ? 1 : 0.5,
                }}
              >
                Lưu
              </Cbutton>
            </div>
          </Form>

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
