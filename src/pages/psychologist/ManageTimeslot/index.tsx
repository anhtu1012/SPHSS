import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Popconfirm, TimePicker } from "antd";
import { useForm } from "antd/es/form/Form";
import { ColumnType } from "antd/es/table";
import { useCallback, useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { MdAutoDelete } from "react-icons/md";
import { toast } from "react-toastify";
import Cbutton from "../../../components/cButton";
import AntDComponent from "../../../components/cTableAntD";
import { TimeSlotValues } from "../../../models/psy";
import {
  createTimeSlot,
  deleteTimeSlot,
  getTimeSlot,
} from "../../../services/psychologist/api";
import dayjs from "dayjs";

function ManageTimeslot() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [form] = useForm();
  const [userID, setUserID] = useState<string>("");
  const [rowData, setRowData] = useState<TimeSlotValues[]>([]);
  const fetchTimeSlot = useCallback(async () => {
    try {
      const res = await getTimeSlot();
      console.log(res);

      const data = res.data.data;
      if (data.length <= 0) {
        toast.warning("Chưa có lịch khám nào");
      }
      setRowData(data);
      setUserID(data.length > 0 ? data[0].user_id : "");
      console.log(userID);
    } catch (error: any) {
      toast.error(error.response?.data || "Lỗi khi fetch data");
    }
  }, []);

  const handleViewDetails = (student: any) => {
    // student chứa thông tin của học sinh hiện tại
    console.log("Thông tin học sinh: ", student);
  };

  const handleCreateTimeslot = useCallback(async () => {
    try {
      const values = await form.validateFields();
      const startTime = dayjs(values.start_time).format("HH:mm");
      const endTime = dayjs(values.end_time).format("HH:mm");
      const payload = {
        user_id: userID,
        slots: [{ start_time: startTime, end_time: endTime }],
      };
      await createTimeSlot(payload);
      toast.success("Tạo lịch hẹn thành công!");
      setShowModal(false);
      fetchTimeSlot();
      form.resetFields();
    } catch (error) {
      toast.error("Lỗi khi tạo lịch hẹn!");
    }
  }, [rowData]);

  const handleDeleteTimeslot = useCallback(async (id: string) => {
    try {
      await deleteTimeSlot(id);
      toast.success("Xóa lịch hẹn thành công");
      fetchTimeSlot();
    } catch (error) {
      toast.error("Lỗi khi delete");
    }
  }, []);

  const columns: ColumnType[] = [
    {
      title: "Bác sĩ",
      dataIndex: "user",
      render: (user) => `${user.firstName} ${user.lastName}`,
    },
    {
      title: "Thời gian bắt đầu",
      dataIndex: "start_time",
    },
    {
      title: "Thời gian kết thúc",
      dataIndex: "end_time",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (status) => (
        <span
          style={{
            color: status === "Booked" ? "#EC744A" : "#08509F",
          }}
        >
          {status === "Booked" ? (
            <CloseCircleOutlined />
          ) : (
            <CheckCircleOutlined />
          )}{" "}
          {status}
        </span>
      ),
    },
    {
      title: "Chi tiết",
      width: 100,
      align: "center",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "12px" }}>
          <AiOutlineEdit
            size={30}
            style={{ color: "orange", cursor: "pointer" }}
            onClick={() => handleViewDetails(record)}
          />
          <Popconfirm
            title="Xóa lịch hẹn"
            description="Bạn có chắc chắn muốn xóa lịch hẹn này?"
            onConfirm={() => handleDeleteTimeslot(record.time_slot_id)}
            okText="Có"
            cancelText="Không"
          >
            <MdAutoDelete style={{ cursor: "pointer" }} color="red" size={30} />
          </Popconfirm>
        </div>
      ),
    },
  ];

  useEffect(() => {
    fetchTimeSlot();
  }, [userID]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingBottom: "5px",
        }}
      >
        <p style={{ color: "#888", fontSize: "15px", paddingTop: "15px" }}>
          Lịch hẹn
        </p>
        <Cbutton
          onClick={() => {
            setShowModal(true);
          }}
          origin={{
            color: "white",
            bgcolor: "green",
            hoverBgColor: "white",
            hoverColor: "green",
          }}
        >
          Thêm mới
        </Cbutton>
        <Modal
          onCancel={() => {
            setShowModal(false);
          }}
          open={showModal}
          footer={[
            <Button
              key="back"
              onClick={() => {
                setShowModal(false);
              }}
            >
              Hủy
            </Button>,
            <Button
              type="primary"
              style={{ background: "green", color: "white" }}
              onClick={() => handleCreateTimeslot()}
            >
              Tạo
            </Button>,
          ]}
        >
          <Form form={form} labelCol={{ span: 24 }} style={{ rowGap: "16px" }}>
            <Form.Item name="user_id" hidden>
              <Input />
            </Form.Item>
            <Form.Item
              name="start_time"
              label="Thời gian bắt đầu"
              style={{ marginBottom: "16px" }}
            >
              <TimePicker
                use12Hours
                format="h:mm A"
                placeholder="Chọn thời gian bắt đầu"
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item
              name="end_time"
              label="Thời gian kết thúc"
              style={{ marginBottom: "16px" }}
            >
              <TimePicker
                use12Hours
                format="h:mm A"
                placeholder="Chọn thời gian kết thúc"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
      <AntDComponent
        dataSource={rowData}
        columns={columns}
        // showOperationColumn={true}
      />
    </div>
  );
}

export default ManageTimeslot;
