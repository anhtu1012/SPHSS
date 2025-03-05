/* eslint-disable @typescript-eslint/no-explicit-any */
import { DatePicker, Divider } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AppointmentForm from "../../../components/AppointmentForm";
import { selectUser } from "../../../redux/features/userSlice";
import { getUserId } from "../../../services/admin/api";
import {
  createAppointment,
  getTimeSlotByDoctorId,
} from "../../../services/student/PsychologistDetail/api";
import "./index.scss";
import Time from "./Time";
import SuccessModal from "./SuccessModal";

type TimeSlotType = {
  startTime: string;
  endTime: string;
  id: string;
};
type AppointmentDetailsType = {
  doctorName: string;
  startTime: string;
  endTime: string;
  date: string;
};

const PsychologistDetail = () => {
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<TimeSlotType | null>(null);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [appointmentDetails, setAppointmentDetails] =
    useState<AppointmentDetailsType>();
  const [timeSlotList, setTimeSlotList] = useState<TimeSlotType[]>([]);
  const currentUser = useSelector(selectUser) as any;
  const [doctorInfo, setDoctorInfo] = useState<any>();
  useEffect(() => {
    setSelectedDate(new Date());
    const fetchDoctor = async () => {
      const response = await getUserId(id as string);
      setDoctorInfo(response.data.data as any);
    };
    fetchDoctor();
  }, []);

  const handleTimeSlotClick = (timeSlot: TimeSlotType) => {
    if (!selectedDate) {
      toast.warning("Vui lòng chọn ngày tư vấn trước");
      return;
    }

    setSelectedSlot(timeSlot);
    setIsAppointmentModalOpen(true);
  };

  const handleAppointmentSubmit = async (values: any) => {
    const payload = {
      user_id: currentUser.id,
      appointments: [
        {
          time_slot_id: selectedSlot!.id,
          notes: values.notes,
          date: values.appointmentDate.toDate(),
        },
      ],
    };
    try {
      const res = await createAppointment(payload);
      if (res.data.data) {
        setIsAppointmentModalOpen(false);
        setSelectedSlot(null);
        setAppointmentDetails({
          doctorName: `${doctorInfo.firstName} ${doctorInfo.lastName}`,
          startTime: selectedSlot!.startTime,
          endTime: selectedSlot!.endTime,
          date: values.appointmentDate.format("DD/MM/YYYY"),
        });
        setIsConfirmationModalOpen(true);
      } else {
        toast.error("Đặt lịch tư vấn thất bại!");
      }
    } catch (error) {
      toast.error("Đặt lịch tư vấn thất bại!");
      console.error("Error creating appointment:", error);
    }
  };

  const handleGetTimeSlot = async () => {
    const res = await getTimeSlotByDoctorId(id as string);
    const resTimeSlotList = res.data.data.map((timeSlot: any) => ({
      startTime: timeSlot.start_time,
      endTime: timeSlot.end_time,
      id: parseFloat(timeSlot.time_slot_id),
    }));

    setTimeSlotList(resTimeSlotList);
  };

  const handleDateChange = (date: any) => {
    if (date && dayjs(date).isValid()) {
      setSelectedDate(date.toDate());
    }
  };

  const disabledDate = (current: any) => {
    return current && current < dayjs().startOf("day");
  };

  const currentDate = dayjs();
  const daysOfWeek = [
    "Chủ nhật",
    "Thứ hai",
    "Thứ ba",
    "Thứ tư",
    "Thứ năm",
    "Thứ sáu",
    "Thứ bảy",
  ];

  useEffect(() => {
    handleGetTimeSlot();
  }, []);

  return (
    <div className="doctor__detail__container">
      <div className="doctor__detail__section1__container">
        {/* Basic info section - unchanged */}
        <div className="doctor__detail__section1__basic__info__container">
          <div className="doctor__detail__section1__basic__info__img__container">
            <img src={doctorInfo?.image} alt="doctor_img" />
          </div>
          <div className="doctor__detail__section1__basic__info">
            <div className="doctor__detail__section1__basic__info__name">
              {`${doctorInfo?.firstName} ${doctorInfo?.lastName}`}
            </div>
            <div className="doctor__detail__section1__basic__info__description">
              {doctorInfo?.description}
            </div>
            <div className="doctor__detail__section1__basic__info__location">
              📍Thành phố Hồ Chí Minh
            </div>
          </div>
        </div>

        {/* Modified schedule section with pricing */}
        <div className="doctor__detail__schedule__wrapper">
          <div className="doctor__detail__section1__schedule__container">
            <div className="doctor__detail__section1__schedule__header">
              <div className="doctor__detail__section1__schedule__title">
                Lịch tư vấn
              </div>
              <div className="doctor__detail__section1__schedule__price">
                <span className="price-tag">300.000đ</span>
                <span className="price-duration">/60 phút</span>
              </div>
            </div>

            <DatePicker
              onChange={handleDateChange}
              className="date-picker"
              defaultValue={currentDate}
              format={(value) =>
                `${daysOfWeek[dayjs(value).day()]} ${dayjs(value).format(
                  "DD/MM"
                )}`
              }
              disabledDate={disabledDate}
            />

            <div className="time-slots-container">
              <div className="time-slots-heading">Chọn giờ tư vấn:</div>
              <div className="doctor__detail__section1__schedule__option__list">
                {timeSlotList.map((timeSlot, index) => (
                  <Time
                    key={index}
                    {...timeSlot}
                    isSelected={selectedSlot?.id === timeSlot.id}
                    onClick={() => handleTimeSlotClick(timeSlot)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* New session info card */}
          <div className="session-info-card">
            <h3>Thông tin buổi tư vấn</h3>
            <ul>
              <li>✓ Thời lượng: 60 phút</li>
              <li>✓ Tư vấn trực tuyến qua video</li>
              <li>✓ Chat với bác sĩ trước buổi tư vấn</li>
              <li>✓ Nhận tài liệu hỗ trợ sau buổi tư vấn</li>
            </ul>
          </div>
        </div>
      </div>

      <Divider
        style={{
          borderColor: "#ec744a",
        }}
      />
      {/* doctor detail information*/}
      <div>
        <h2 className="doctor__detail__description__title">
          {`${doctorInfo?.firstName} ${doctorInfo?.lastName}`}
        </h2>
        <ul className="doctor__detail__description__info__list">
          <li>
            Nhiều năm kinh nghiệm trong khám và điều trị các bệnh lý Nội - Ngoại
            Thần kinh
          </li>
          <li>
            Hiện đang công tác tại Bệnh viện Chợ Rẫy và Bệnh viện Nhân dân 115
          </li>
          <li>Bác sĩ nhận khám từ 10 tuổi</li>
        </ul>

        <h2 className="doctor__detail__description__title">Khám và điều trị</h2>
        <h3 className="doctor__detail__description__title">
          Khám và điều trị các rối loạn:
        </h3>
        <ul className="doctor__detail__description__info__list">
          <li>Đau nửa đầu Thần kinh</li>
          <li>Rối loạn tiền đình</li>
          <li>Parkinson</li>
          <li>
            Tai biến mạch máu não Đau dây thần kinh số V Viêm đa dây thần kinh
          </li>
          <li>
            Nhược cơ Liệt mặt Đau dây thần kinh liên sườn Hội chứng liệt nửa
            người
          </li>
          <li>Hội chứng mất trí nhớ thường xuyên</li>
        </ul>
        <h3 className="doctor__detail__description__title">
          Phẫu thuật bệnh lý ngoại biên
        </h3>
        <ul className="doctor__detail__description__info__list">
          <li>Máu tụ DMC (dưới màng cứng) mạn tính và các CTSN</li>
          <li>Ghép sọ tự thân, nhân tạo </li>
          <li>U da đầu lành tính</li>
          <li>U màng não bán cầu</li>
          <li>Hội chứng ống cổ tay</li>
          <li>TVĐD thắt lưng</li>
        </ul>
        <h3 className="doctor__detail__description__title">
          Xạ phẫu Gamma Knife
        </h3>
        <ul className="doctor__detail__description__info__list">
          <li>
            Dị dạng mạch máu não: AVM, Cavernoma, dò DM màng cứng xoang hang
          </li>
          <li>Các u não lành tính còn nhỏ &lt; 3 cm hoặc còn lại sau mổ</li>
          <li>
            Đau thần kinh số V tái phát, thất bại sau điều trị với các phương
            pháp khác hay ở bệnh nhân là người già và có nhiều bệnh nội khoa
            khác đi kèm
          </li>
        </ul>
        <h3 className="doctor__detail__description__title">
          Điều trị các bệnh lý về Nội Thần kinh thông thường
        </h3>
        <ul className="doctor__detail__description__info__list">
          <li>Mất ngủ</li>
          <li>Đau đầu</li>
          <li>Đau lưng</li>
        </ul>
        <h3 className="doctor__detail__description__title">
          Quá trình công tác
        </h3>
        <ul className="doctor__detail__description__info__list">
          <li>
            Chuyên tư vấn và trực tiếp điều trị xạ phẫu Gamma Knife về các bệnh
            lý trong não (Các loại u não, dị dạng mạch máu não), đau dây thần
            kinh số V tại Bệnh viện Chợ Rẫy và Bệnh viện 115
          </li>
        </ul>
        <Divider
          style={{
            borderColor: "#ec744a",
            width: "99vw",
            marginLeft: "calc(-50vw + 50%)",
          }}
        />
      </div>
      {/* students feedback*/}
      <div className="doctor__detail__student__feedback__container">
        <div className="doctor__detail__student__feedback__title">
          Phản hồi của học sinh sau khi được tư vấn
        </div>
        <ul className="doctor__detail__student__feedback__list">
          <li className="doctor__detail__student__feedback">
            <Divider
              style={{
                borderColor: "#ec744a",
              }}
            />
            <div className="doctor__detail__student__feedback__name">
              Nguyễn Văn A
            </div>
            <div className="doctor__detail__student__feedback__content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </div>
          </li>
          <li className="doctor__detail__student__feedback">
            <Divider
              style={{
                borderColor: "#ec744a",
              }}
            />
            <div className="doctor__detail__student__feedback__name">
              Nguyễn Văn B
            </div>
            <div className="doctor__detail__student__feedback__content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </div>
          </li>
        </ul>
      </div>
      {doctorInfo && (
        <AppointmentForm
          isOpen={isAppointmentModalOpen}
          onClose={() => {
            setIsAppointmentModalOpen(false);
            setSelectedSlot(null);
          }}
          doctor={{
            id: doctorInfo.id,
            name: doctorInfo.firstName + " " + doctorInfo.lastName,
          }}
          selectedSlot={selectedSlot}
          selectedDate={selectedDate}
          onSubmit={handleAppointmentSubmit}
          disabledDate={disabledDate}
        />
      )}
      {appointmentDetails && (
        <SuccessModal
          isOpen={isConfirmationModalOpen}
          onClose={() => setIsConfirmationModalOpen(false)}
          appointmentDetails={appointmentDetails}
        />
      )}
    </div>
  );
};

export default PsychologistDetail;
