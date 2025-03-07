import React, { useEffect, useState } from "react";
import Cbutton from "../../../../../components/cButton";
import AntDComponent from "../../../../../components/cTableAntD";
import { ColumnType } from "antd/es/table";
import { getAppointmentByUser, getAppointmentsByPsychologist } from "../../../../../services/admin/api";
import { getReportAppointmentId } from "../../../../../services/admin/api"; 
import { AppointmentByUser } from "../../../../../models/admin";
import { Report } from "../../../../../models/admin"; 

interface UserProfileTableProps {
  accountType: string;
  showModal: (record: any, type: "consult" | "survey", report?: Report) => void; 
  userId: string;
}

const UserProfileTable: React.FC<UserProfileTableProps> = ({ accountType, showModal, userId }) => {
  const [appointments, setAppointments] = useState<AppointmentByUser[]>([]);
  
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        let response;
        if (accountType === "R3") {
          response = await getAppointmentsByPsychologist(userId);
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
  }, [userId, accountType]);

  const handleShowReport = async (record: any) => {
    try {
      const response = await getReportAppointmentId(record.appointment_id); 
      showModal(record, "consult", response.data); 
    } catch (error) {
      console.error("Lỗi khi lấy báo cáo:", error);
    }
  };

  const columns: ColumnType<any>[] =
    ["R1", "R2"].includes(accountType)
      ? [
          {
            title: "Ngày chẩn đoán",
            dataIndex: "date",
            key: "date",
            render: (text: string) => (text ? new Date(text).toLocaleDateString("vi-VN") : "-"),
          },
          {
            title: "Chẩn đoán",
            dataIndex: "diagnosis",
            key: "diagnosis",
            render: (text: string) => (text.length > 35 ? `${text.substring(0, 35)}...` : text),
          },
          {
            title: "Chi tiết báo cáo",
            dataIndex: "action",
            key: "action_consult",
            render: (_, record) => (
              <Cbutton onClick={() => handleShowReport(record)}>Báo cáo</Cbutton>
            ),
          },
          {
            title: "Chi tiết khảo sát",
            dataIndex: "action",
            key: "action_survey",
            render: (_, record) => (
              <Cbutton onClick={() => showModal(record, "survey")}>Khảo sát</Cbutton>
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
            render: (text: string) => (text ? new Date(text).toLocaleDateString("vi-VN") : "-"),
          },
          {
            title: "Chi tiết báo cáo",
            dataIndex: "action",
            key: "action_consult",
            render: (_, record) => (
              <Cbutton onClick={() => handleShowReport(record)}>Báo cáo</Cbutton>
            ),
          },
          {
            title: "Chi tiết khảo sát",
            dataIndex: "action",
            key: "action_survey",
            render: (_, record) => (
              <Cbutton onClick={() => showModal(record, "survey")}>Khảo sát</Cbutton>
            ),
          },
        ];

  const data =
    ["R1", "R2"].includes(accountType)
      ? appointments.map((appointment, index) => ({
          key: index.toString(),
          date: appointment.date ? new Date(appointment.date).toLocaleDateString("vi-VN") : "-",
          diagnosis: appointment.status,
          appointment_id: appointment.appointment_id, 
        }))
      : appointments.map((appointment, index) => ({
          key: index.toString(),
          studentName: appointment.fullName,
          date: appointment.date ? new Date(appointment.date).toLocaleDateString("vi-VN") : "-",
          appointment_id: appointment.appointment_id, 
        }));

  return <AntDComponent dataSource={data} columns={columns} />;
};

export default UserProfileTable;
