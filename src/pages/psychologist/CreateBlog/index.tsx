import { Button, Form, Input, Select } from "antd";
import MarkdownIt from "markdown-it";
import { useEffect, useState } from "react";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
// import "./index.scss";
// import { createMarkdown, fetchDoctor } from "../../../services/api";
import { useForm } from "antd/es/form/Form";
import { toast } from "react-toastify";
import { getCategory } from "../../../services/psychologist/api";

function CreateBlog() {
  const [contentHTML, setContentHTML] = useState<string>("");
  console.log(contentHTML);
  const [contentMarkdown, setContentMarkdown] = useState<string>("");
  console.log(contentMarkdown);
  const [category, setCategory] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = useForm();
  const mdParser = new MarkdownIt();

  const fetchAllCategory = async () => {
    setLoading(true);
    try {
      const res = await getCategory();
      const categories = res.data.data;
      setCategory(categories);
      if (categories.length > 0) {
        const defaultCategory = categories[0];
        form.setFieldsValue({
          category_id: defaultCategory.categoryId,
        });
      }
      setLoading(false);
    } catch (error: any) {
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchAllCategory();
  }, []);

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
          label="Chọn danh mục"
          name="categoryId"
          rules={[{ required: true, message: "Hãy chọn 1 danh mục" }]}
        >
          <Select
            showSearch
            placeholder="Chọn danh mục"
            optionFilterProp="children"
            filterOption={fuzzySearch}
            filterSort={(optionA, optionB) =>
              optionA.children
                .toLowerCase()
                .localeCompare(optionB.children.toLowerCase())
            }
            style={{
              border: "1px solid rgba(0, 0, 0, 0.1)",
              borderRadius: "4px",
              backgroundColor: "white",
            }}
          >
            {category.map((data) => (
              <Select.Option key={data.categoryId} value={data.categoryId}>
                {data.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Mô tả"
          name="description"
          rules={[{ required: true, message: "Hãy nhập mô tả!" }]}
        >
          <Input.TextArea placeholder="Hãy nhập mô tả" />
        </Form.Item>

        <Form.Item label="Nội dung">
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text: string) => mdParser.render(text)}
            onChange={handleEditorChange}
          />
        </Form.Item>

        <Form.Item>
          <Button loading={loading} type="primary" htmlType="submit">
            Đăng
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default CreateBlog;
