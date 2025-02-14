import { Button, Form, Input, Select } from "antd";
import MarkdownIt from "markdown-it";
import { useEffect, useState } from "react";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
// import "./index.scss";
// import { createMarkdown, fetchDoctor } from "../../../services/api";

import { useForm } from "antd/es/form/Form";
import { getMarkDown } from "../../../services/psychologist/api";
import DisplayMarkdown from "../../../utils/markdown";

function CreateBlog() {
  const [contentHTML, setContentHTML] = useState<string>("");
  console.log(contentHTML);
  const [contentMarkdown, setContentMarkdown] = useState<string>("");
  console.log(contentMarkdown);
  const [doctorData, setDoctorData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = useForm();
  const mdParser = new MarkdownIt();

  const fetchAllDoctors = async () => {
    setLoading(true);
    const choose = "All";
    console.log(choose);
    try {
      const res = await getMarkDown();
      // console.log(res.data.data);
      const doctors = res.data.data;
      console.log(doctors);

      setDoctorData(doctors);

      if (doctors.length > 0) {
        const defaultDoctor = doctors[0];
        form.setFieldsValue({
          doctorId: defaultDoctor.id,
          description: defaultDoctor.description,
        });
      }
      setLoading(false);
    } catch (error: any) {
      // toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchAllDoctors();
  }, []);

  console.log(doctorData);

  const handleEditorChange = ({
    html,
    text,
  }: {
    html: string;
    text: string;
  }) => {
    setContentHTML(html);
    setContentMarkdown(text);
  };

  // const onFinish = async (values: FormValues) => {
  //   try {
  //     const data = {
  //       contentHTML,
  //       contentMarkdown,
  //       description: values.description,
  //       doctorId: values.doctorId,
  //     };
  //     const res = await createMarkdown(data);
  //     toast.success(res.data.message);
  //   } catch (error) {
  //     toast.error(error.response?.data?.message);
  //   }
  // };

  const fuzzySearch = (input: string, option: any) => {
    const inputLower = input.toLowerCase();
    const optionLower = option.children.toLowerCase();

    return optionLower.includes(inputLower);
  };

  // if (loading) {
  //   return <LoadingTruck />;
  // }

  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        // onFinish={onFinish}
        initialValues={{
          doctorId: null,
          description: "",
        }}
      >
        <Form.Item
          label="Select Doctor"
          name="doctorId"
          rules={[{ required: true, message: "Please select a doctor!" }]}
        >
          <Select
            showSearch
            placeholder="Select Doctor"
            optionFilterProp="children"
            filterOption={fuzzySearch}
            filterSort={(optionA, optionB) =>
              optionA.children
                .toLowerCase()
                .localeCompare(optionB.children.toLowerCase())
            }
          >
            {/* {doctorData.map((data) => (
              <Option key={data.id} value={data.id}>
                {`${data.firstName} ${data.lastName} `}
              </Option>
            ))} */}
          </Select>
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please enter a description!" }]}
        >
          <Input.TextArea placeholder="Enter description" />
        </Form.Item>

        <Form.Item label="Content">
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text: string) => mdParser.render(text)}
            onChange={handleEditorChange}
          />
        </Form.Item>

        <Form.Item>
          <Button loading={loading} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      {/* {doctorData.map()} */}

      <DisplayMarkdown
        content={
          "**DDL** : data definition (Định nghĩa dữ liệu)\n+ **Create** + database : tạo ra database\n+ <a>Rename</a> : đổi tên\n+ <a>Alter</a> : đặt ràng buộc \n+ <a>Drop + database</a>:  vứt luôn bảng database"
        }
      />
    </div>
  );
}

export default CreateBlog;
