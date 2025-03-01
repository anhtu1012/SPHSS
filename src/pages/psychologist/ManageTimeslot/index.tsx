import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Modal,
  Popconfirm,
  Select,
  TimePicker,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { ColumnType } from "antd/es/table";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { MdAutoDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Cbutton from "../../../components/cButton";
import AntDComponent from "../../../components/cTableAntD";
import { TimeSlotValues } from "../../../models/psy";
import { RootState } from "../../../redux/RootReducer";
import {
  createTimeSlot,
  deleteTimeSlot,
  getTimeSlotByUser,
  updateTimeSlot,
} from "../../../services/psychologist/api";

function ManageTimeslot() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [form] = useForm();
  const user = useSelector((state: RootState) => state.user) as any | null;
  const userID = user.id;
  const [rowData, setRowData] = useState<TimeSlotValues[]>([]);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editingRecord, setEditingRecord] = useState<TimeSlotValues | null>(
    null
  );
  const [statusInit, setStatus] = useState("");
  console.log(statusInit);

  const fetchTimeSlot = useCallback(async () => {
    try {
      const res = await getTimeSlotByUser(userID);
      const data = res.data.data;
      if (data.length <= 0) {
        toast.warning("Chưa có lịch khám nào");
      }
      setRowData(data);
    } catch (error: any) {
      toast.error(error.response?.data || "Lỗi khi fetch data");
    }
  }, []);

  const handleSaveTimeSlot = useCallback(
    async (id: string) => {
      try {
        if (!editingRecord) {
          toast.error("Không có dữ liệu để cập nhật!");
          return;
        }
        const originalRecord = rowData.find((item) => item.time_slot_id === id);
        if (!originalRecord) return;
        const payload: Partial<TimeSlotValues> = {};
        if (editingRecord.start_time !== originalRecord.start_time) {
          payload.start_time = editingRecord.start_time;
        }
        if (editingRecord.end_time !== originalRecord.end_time) {
          payload.end_time = editingRecord.end_time;
        }
        if (editingRecord.status !== originalRecord.status) {
          payload.status = editingRecord.status;
        }
        if (Object.keys(payload).length === 0) {
          toast.info("Không có thay đổi nào để cập nhật.");
          setEditingKey(null);
          setEditingRecord(null);
          return;
        }
        await updateTimeSlot(id, payload);
        toast.success("Cập nhật lịch hẹn thành công");
        setEditingKey(null);
        setEditingRecord(null);
        fetchTimeSlot();
      } catch (error) {
        toast.error("Lỗi khi cập nhật dữ liệu");
      }
    },
    [editingRecord, fetchTimeSlot]
  );

  const handleEditDetails = (record: TimeSlotValues) => {
    setEditingKey(record.time_slot_id);
    setEditingRecord({ ...record });
  };

  const handleCancelEdit = () => {
    setEditingKey(null);
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

  const columns: ColumnType<TimeSlotValues>[] = [
    {
      title: "Bác sĩ",
      dataIndex: "user",
      render: (user) => `${user.firstName} ${user.lastName}`,
    },
    {
      title: "Thời gian bắt đầu",
      dataIndex: "start_time",
      render: (_, record) =>
        editingKey === record.time_slot_id ? (
          <TimePicker
            value={dayjs(editingRecord?.start_time, "HH:mm")}
            format="HH:mm"
            onChange={(time) =>
              setEditingRecord((prev) =>
                prev
                  ? { ...prev, start_time: time?.format("HH:mm") || "" }
                  : prev
              )
            }
          />
        ) : (
          record.start_time
        ),
    },
    {
      title: "Thời gian kết thúc",
      dataIndex: "end_time",
      render: (_, record) =>
        editingKey === record.time_slot_id ? (
          <TimePicker
            value={dayjs(editingRecord?.end_time, "HH:mm")}
            format="HH:mm"
            onChange={(time) =>
              setEditingRecord((prev) =>
                prev ? { ...prev, end_time: time?.format("HH:mm") || "" } : prev
              )
            }
          />
        ) : (
          record.end_time
        ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (status, record) =>
        editingKey === record.time_slot_id ? (
          <Select value={status} onChange={(value) => setStatus(value)}>
            <Select.Option value="Available">Available</Select.Option>
            <Select.Option value="Booked">Booked</Select.Option>
          </Select>
        ) : (
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
      render: (_, record) =>
        editingKey === record.time_slot_id ? (
          <div style={{ display: "flex", gap: "12px" }}>
            <CheckCircleOutlined
              style={{ fontSize: "25px", color: "green", cursor: "pointer" }}
              onClick={() => handleSaveTimeSlot(record.time_slot_id)}
            />
            <CloseCircleOutlined
              style={{ fontSize: "25px", color: "red", cursor: "pointer" }}
              onClick={handleCancelEdit}
            />
          </div>
        ) : (
          <div style={{ display: "flex", gap: "12px" }}>
            <AiOutlineEdit
              size={30}
              style={{ color: "orange", cursor: "pointer" }}
              onClick={() => handleEditDetails(record)}
            />
            <Popconfirm
              title="Xóa lịch hẹn"
              description="Bạn có chắc chắn muốn xóa lịch hẹn này?"
              onConfirm={() => handleDeleteTimeslot(record.time_slot_id)}
              okText="Có"
              cancelText="Không"
            >
              <MdAutoDelete
                style={{ cursor: "pointer" }}
                color="red"
                size={30}
              />
            </Popconfirm>
          </div>
        ),
    },
  ];

  useEffect(() => {
    fetchTimeSlot();
  }, []);

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
          Thời gian
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
            <Cbutton
              type="primary"
              origin={{
                color: "white",
                bgcolor: "green",
                hoverBgColor: "white",
                hoverColor: "green",
              }}
              onClick={() => handleCreateTimeslot()}
            >
              Tạo
            </Cbutton>,
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
      <AntDComponent dataSource={rowData} columns={columns} />
    </div>
  );
}

export default ManageTimeslot;
