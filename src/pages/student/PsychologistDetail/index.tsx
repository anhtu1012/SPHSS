import { Divider, Dropdown, Space } from "antd";
import doctorImg from "../../../assets/doctor_1.png";
import "./index.scss";
import Time from "./Time";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { getTimeSlotByDoctorId } from "../../../services/student/PsychologistDetail/api";
import { toast } from "react-toastify";

type TimeSlotType = {
  startTime: string;
  endTime: string;
};

const PsychologistDetail = () => {
  const { id } = useParams();
  const [timeSlotList, setTimeSlotList] = useState<TimeSlotType[]>([]);
  const handleFetchDoctorTimeSlot = useCallback(async () => {
    try {
      const res = await getTimeSlotByDoctorId(id as string);
      const data = res.data.data;
      if (data.length <= 0) {
        toast.warning("Bác sĩ này chưa có lịch khám nào");
      } else {
        const newTimeSLotList = data.map((timeSlot: any) => ({
          startTime: timeSlot.start_time,
          endTime: timeSlot.end_time,
        }));
        setTimeSlotList(newTimeSLotList);
      }
    } catch (error: any) {
      toast.error(error.response?.data || "Lỗi khi fetch data");
    }
  }, []);

  useEffect(() => {
    handleFetchDoctorTimeSlot();
  }, [handleFetchDoctorTimeSlot]);
  return (
    <div className="doctor__detail__container">
      {/* doctor basic information & schedule */}
      <div className="doctor__detail__section1__container">
        {/* basic info */}
        <div className="doctor__detail__section1__basic__info__container">
          <div className="doctor__detail__section1__basic__info__img__container">
            <img src={doctorImg} alt="doctor_img" />
          </div>
          <div className="doctor__detail__section1__basic__info">
            <div className="doctor__detail__section1__basic__info__name">
              Bác sĩ Chuyên khoa | Nguyễn Tường Vũ
            </div>
            <div className="doctor__detail__section1__basic__info__description">
              25 năm kinh nghiệm về Ngoại Chấn thương Chỉnh hình Trưởng khoa
              Chấn thương Chỉnh hình, Y học Thể thao, Bệnh viện Đa khoa Nam Sài
              Gòn Bác sĩ nhận khám mọi độ tuổi
            </div>
            <div className="doctor__detail__section1__basic__info__location">
              📍Thành phố Hồ Chí Minh
            </div>
          </div>
        </div>
        {/* schedule */}
        <div className="doctor__detail__section1__schedule__container">
          <div className="doctor__detail__section1__schedule__title">
            Lịch tư vấn
          </div>
          <Dropdown className="doctor__detail__section1__schedule__dropdown">
            <Space>
              Thứ 2-19/1
              <span>
                <MdOutlineKeyboardArrowDown />
              </span>
            </Space>
          </Dropdown>
          <div className="doctor__detail__section1__schedule__option__list">
            {timeSlotList.map((timeSlot, index) => (
              <Time key={index} {...timeSlot} />
            ))}
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
          Bác sĩ Chuyên khoa | Nguyễn Tường Vũ
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
    </div>
  );
};

export default PsychologistDetail;
