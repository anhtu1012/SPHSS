import { Input } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DoctorCard, { DoctorCardProps } from "../../../components/DoctorCard";
import { getListDoctors } from "../../../services/psychologist/api";
import "./index.scss";

const { Search } = Input;

const Doctors = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [doctorList, setDoctorList] = useState<DoctorCardProps[]>([]);
  const getAllDoctor = async () => {
    try {
      const res = await getListDoctors("R3");
      setDoctorList(res.data.data);
    } catch (error) {
      toast.error("Lỗi");
    }
  };

  useEffect(() => {
    getAllDoctor();
  }, []);

  const filteredDoctors = doctorList.filter((doctor) =>
    doctor.lastName.toLowerCase().includes(searchTerm.toLowerCase())
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
