/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Cbutton from "../../../../../components/cButton";
import AntDComponent from "../../../../../components/cTableAntD";
import { ColumnType } from "antd/es/table";
import {
  getAppointmentByUser,
  getAppointmentsByPsychologist,
} from "../../../../../services/admin/api";
import { getReportAppointmentId } from "../../../../../services/admin/api";
import { AppointmentByUser } from "../../../../../models/admin";
import { Report } from "../../../../../models/admin";
import dayjs from "dayjs";
import { Select, Tag } from "antd";
import { AppointmentStatus } from "../../../../../models/enum";

interface UserProfileTableProps {
  accountType: string;
  showModal: (record: any, type: "consult" | "survey", report?: Report) => void;
  userId: string;
}

const UserProfileTable: React.FC<UserProfileTableProps> = ({
  accountType,
  showModal,
  userId,
}) => {
  const [appointments, setAppointments] = useState<AppointmentByUser[]>([]);
  console.log("Dữ liệu từ API:", userId);
  const [status, setStatus] = useState<AppointmentStatus | null>(null);
  const handleStatusChange = (value: AppointmentStatus | null) => {
    setStatus(value);
  };
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        let response;
        if (accountType === "R3") {
          console.log(status);

          response = await getAppointmentsByPsychologist(userId, status);
        } else {
          response = await getAppointmentByUser(userId);
        }
        setAppointments(response.data.data);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    };

    if (userId) {
      fetchAppointments();
    }
  }, [userId, accountType, status]);

  const handleShowReport = async (record: any) => {
    try {
      const response = await getReportAppointmentId(record.appointment_id);
      showModal(record, "consult", response.data);
    } catch (error) {
      console.error("Lỗi khi lấy báo cáo:", error);
    }
  };

  const columns: ColumnType<any>[] = ["R1", "R2"].includes(accountType)
    ? [
        {
          title: "Ngày chẩn đoán",
          dataIndex: "date",
          key: "date",
          render: (text: string) =>
            text ? new Date(text).toLocaleDateString("vi-VN") : "-",
        },
        {
          title: "Chẩn đoán",
          dataIndex: "diagnosis",
          key: "diagnosis",
          render: (text: string) =>
            text.length > 35 ? `${text.substring(0, 35)}...` : text,
        },
        {
          title: "Chi tiết báo cáo",
          dataIndex: "action",
          key: "action_consult",
          render: (_, record) => (
            <Cbutton onClick={() => handleShowReport(record)}>Báo cáo</Cbutton>
          ),
        },
      ]
    : [
        {
          title: "Người được khảo sát",
          dataIndex: "studentName",
          key: "studentName",
        },
        {
          title: "Ngày khảo sát",
          dataIndex: "date",
          key: "date",
          //sử dụng dayjs để format ngày tháng
          render: (date) => <p>{dayjs(date).format("YYYY-MM-DD HH:mm:ss")}</p>,
        },
        {
          title: "Thời gian",
          dataIndex: "start_time",
          key: "start_time",
          render: (start_time, record) => (
            <p>{`${start_time} - ${record.end_time}`}</p>
          ),
        },
        {
          title: "Trạng thái",
          dataIndex: "status",
          key: "status",
          //sử dụng Tag antd
          render: (status) => {
            if (status === "Completed") {
              return <Tag color="green">Hoàn thành</Tag>;
            } else if (status === "Pending") {
              return <Tag color="orange">Đang chờ</Tag>;
            } else if (status === "Cancelled") {
              return <Tag color="red">Hủy</Tag>;
            } else {
              return <Tag color="blue">Đã chấp nhận</Tag>;
            }
          },
        },
        {
          title: "Link Meeting",
          dataIndex: "linkMeeting",
          key: "linkMeeting",
          render: (_, record) => {
            if (record.status === "Completed" || record.status === "Approved") {
              return (
                <a
                  href={record.linkMeeting}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Link Meeting
                </a>
              );
            }
            return null;
          },
        },
        {
          title: "Chi tiết báo cáo",
          dataIndex: "action",
          key: "action_consult",
          render: (_, record) => {
            if (record.status === "Completed") {
              return (
                <Cbutton onClick={() => handleShowReport(record)}>
                  Báo cáo
                </Cbutton>
              );
            }
            return null;
          },
        },
      ];

  const data = ["R1", "R2"].includes(accountType)
    ? appointments.map((appointment, index) => ({
        key: index.toString(),
        date: appointment.date
          ? new Date(appointment.date).toLocaleDateString("vi-VN")
          : "-",
        diagnosis: appointment.status,
        appointment_id: appointment.appointment_id,
      }))
    : appointments.map((appointment, index) => ({
        key: index.toString(),
        studentName: appointment.fullName,
        start_time: appointment.start_time,
        end_time: appointment.end_time,
        status: appointment.status,
        date: appointment.date
          ? new Date(appointment.date).toLocaleDateString("vi-VN")
          : "-",
        appointment_id: appointment.appointment_id,
      }));
  const statusOptions = [
    { value: null, label: "Tất cả" },
    { value: AppointmentStatus.Pending, label: "Đang chờ" },
    { value: AppointmentStatus.Approved, label: "Đã chấp nhận" },
    { value: AppointmentStatus.Cancelled, label: "Hủy" },
    { value: AppointmentStatus.Completed, label: "Hoàn thành" },
  ];
  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Select
          style={{
            width: "100%",
            marginTop: "10px",
            maxWidth: 250,
            marginRight: 16,
            borderRadius: 6,
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
          placeholder="Lọc theo trạng thái"
          onChange={handleStatusChange}
          options={statusOptions}
        />
      </div>
      <AntDComponent dataSource={data} columns={columns} />
    </div>
  );
};

export default UserProfileTable;
