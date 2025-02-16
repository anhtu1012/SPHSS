import { Input } from "antd";
import { useState } from "react";
import DoctorCard from "../../../components/DoctorCard";
import doctor1 from "../../../assets/doctor_1.png";
import doctor2 from "../../../assets/doctor_2.png";
import "./index.scss";

const { Search } = Input;

const Doctors = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const doctors = [
    {
      id: 1,
      img: doctor1,
      name: "Dr. Nguyễn Văn A",
      specialty: "Chuyên gia tâm lý lâm sàng",
      experience: "15 năm kinh nghiệm",
      rating: 5,
    },
    {
      id: 2,
      img: doctor2,
      name: "Dr. Trần Thị B",
      specialty: "Chuyên gia tư vấn tâm lý",
      experience: "12 năm kinh nghiệm",
      rating: 4.5,
    },
    // Add more doctors as needed
  ];

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="doctors-page">
      <h1 className="doctors-page__title">Đội ngũ Chuyên gia Tâm lý</h1>
      <p className="doctors-page__subtitle">
        Đội ngũ chuyên gia giàu kinh nghiệm, tận tâm hỗ trợ bạn
      </p>

      <div className="doctors-page__search">
        <Search
          placeholder="Tìm kiếm chuyên gia..."
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ maxWidth: 400 }}
        />
      </div>

      <div className="doctors-page__grid">
        {filteredDoctors.map((doctor) => (
          <DoctorCard key={doctor.id} {...doctor} />
        ))}
      </div>
    </div>
  );
};

export default Doctors;
