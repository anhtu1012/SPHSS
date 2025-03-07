import { useCallback, useEffect, useState } from "react";
import "./userProfile.scss";
import { getProgramByUserId } from "../../../services/student/PsychologistDetail/api";
import { RootState } from "../../../redux/RootReducer";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

interface Program {
  userId: string;
  programId: string;
  joinedAt: string;
  program: {
    programId: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    time: string;
    frequency: string;
    targetAudience: string;
    location: string;
    organizerEmail: string;
    contactPhone: string;
    imageUrl: string;
    price: string;
    rating: number;
    ratingCount: number | null;
    categoryId: string;
  };
}

function ProgramHistory() {
  const user = useSelector((state: RootState) => state.user) as any | null;
  const [data, setData] = useState<Program[]>([]);

  const fetchProgram = useCallback(async () => {
    try {
      const res = await getProgramByUserId(user.id);
      console.log(res);

      setData(res.data.data);
    } catch (error: any) {
      toast.error(error.response?.data || "Lỗi khi lấy danh sách báo cáo");
    }
  }, []);

  useEffect(() => {
    fetchProgram();
  }, []);

  return (
    <div className="user-profile__tab-content">
      <h3>Lịch sử tham gia chương trình</h3>
      <ul>
        {data.map((program) => (
          <li style={{ fontWeight: "bold" }}>{program.program.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default ProgramHistory;
