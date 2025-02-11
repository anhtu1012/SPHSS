/* eslint-disable @typescript-eslint/prefer-as-const */
import {
  Button,
  Form,
  GetProp,
  Image,
  Input,
  Modal,
  Popconfirm,
  Table,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { toast } from "react-toastify";
import api from "../../config/axios";
import { MdAutoDelete } from "react-icons/md";
import { PlusOutlined } from "@ant-design/icons";
import uploadFile from "../../utils/upload";
import { ColumnType } from "antd/es/table";
import "./ManaeDashboard.module.scss";

export interface Column extends ColumnType<any> {
  title: string;
  dataIndex: string;
  key: string;
  align: "left" | "right" | "center";
  render?: (value: any, record: any) => any;
}
interface ManageTemplateProps {
  title: string;
  columns: Column[];
  formItems: React.ReactElement;
  apiURI: string;
  onError: (message: string) => void;
  customActions?: boolean; // Thêm prop để kiểm tra
}
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
function ManageTemplate({
  columns,
  title,
  formItems,
  apiURI,
  customActions,
  onError,
}: ManageTemplateProps) {
  const [dataSource, setDataSource] = useState([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(true);
  const [form] = useForm();
  const [tableColumns, settableColumns] = useState<Column[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  useEffect(() => {
    const newColumns = [...columns];

    if (customActions) {
      newColumns.push({
        title: "Action",
        dataIndex: "id",
        key: "id",
        align: "center" as "center",
        render: (_: any, record: any) => (
          <div style={{ textAlign: "center" }}>
            <AiOutlineEdit
              size={30}
              color="orange"
              onClick={() => {
                setShowModal(true);
                const newRecord = { ...record };
                form.setFieldsValue(newRecord);

                if (!(record.image === null)) {
                  if (newRecord.image) {
                    setFileList([
                      {
                        uid: "-1",
                        name: "image.png",
                        status: "done",
                        url: newRecord.image,
                      },
                    ]);
                  } else {
                    setFileList([]);
                  }
                }

                form.setFieldsValue(newRecord);
              }}
              style={{ marginRight: 8 }}
            />
            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task?"
              onConfirm={() => handleDelete(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <MdAutoDelete color="red" size={30} />
            </Popconfirm>
          </div>
        ),
      });
    }

    settableColumns(newColumns);
  }, [columns, form, customActions]);

  const fetchItem = async () => {
    try {
      const res = await api.get(`${apiURI}`);
      setDataSource(res.data.data);
      setFetching(false);
      onError("");
    } catch (error: any) {
      onError(error.response?.data?.message);
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    fetchItem();
  }, []);
  if (!dataSource) {
    return <div>Loading...</div>;
  }
  const handleDelete = async (id: string) => {
    try {
      await api.delete(`${apiURI}/${id}`);
      // const listAfterDelete = dataSource.filter(
      //   (category) => category.id !== id
      // );
      fetchItem();
      onError("");
      // setDataSource(listAfterDelete);
      toast.success("Delete Successfully");
    } catch (error: any) {
      onError(error.response?.data?.message);
      toast.error(error.response.data.message);
    }
  };
  const handleSubmit = async (values: any) => {
    setLoading(true);
    console.log(values.id);
    try {
      if (fileList.length > 0) {
        const fileToUpload = fileList[0].originFileObj;
        if (fileToUpload) {
          const url = await uploadFile(fileToUpload);
          values.image = url;
        }
      }

      if (values.id) {
        await api.put(`${apiURI}/${values.id}`, values);
      } else {
        await api.post(apiURI, values);
      }
      onError("");
      setLoading(false);
      toast.success(`Successfully ${title} `);
      fetchItem();
      setShowModal(false);
      setFileList([]);
    } catch (error: any) {
      setLoading(false);
      onError(error.response?.data?.message);
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div>
      <div style={{ paddingBottom: "10px" }}>
        {" "}
        <Button
          onClick={() => {
            setShowModal(true);
            form.resetFields();
          }}
          style={{ background: "green", color: "white" }}
        >
          Thêm mới {title}
        </Button>
      </div>
      <Table
        loading={fetching}
        dataSource={dataSource}
        columns={tableColumns}
        pagination={{ position: ["bottomCenter"] }}
      />
      <Modal
        onCancel={() => {
          setShowModal(false);
          form.resetFields();
          setFileList([]);
        }}
        open={showModal}
        footer={[
          <Button
            key="back"
            onClick={() => {
              setShowModal(false);
              form.resetFields();
              setFileList([]);
            }}
          >
            Cancel
          </Button>,
          <Button
            type="primary"
            style={{ background: "green", color: "white" }}
            onClick={() => form.submit()}
            loading={loading}
          >
            Submit
          </Button>,
        ]}
      >
        <Form form={form} labelCol={{ span: 24 }} onFinish={handleSubmit}>
          <Form.Item name="id" hidden>
            <Input />
          </Form.Item>
          {formItems}
          <Form.Item name="image">
            {" "}
            <Upload
              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              listType="picture-circle"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
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
    </div>
  );
}

export default ManageTemplate;
