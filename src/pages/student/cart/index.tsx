import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/RootReducer";
import "./index.scss";
import CheckoutItem from "./CheckoutItem";
import { toast } from "react-toastify";
import { payProgram } from "../../../services/student/PsychologistDetail/api";
import { reset } from "../../../redux/features/cartSlice";

function Cart() {
  const dispatch = useDispatch();
  const cartPrograms = useSelector((state: RootState) => state.cart) as any;
  const user = useSelector((state: RootState) => state.user) as any | null;

  const handleSubmitProgram = async () => {
    const programIds = cartPrograms.map((item: any) => item.programId);
    if (programIds.length === 0) {
      toast.error("Giỏ hàng đang trống!");
      return;
    }
    try {
      const response = await payProgram({
        userId: user.id,
        programIds,
      });

      if (response.status === 200) {
        toast.success("Thanh toán thành công!");
        dispatch(reset());
      } else {
        toast.error("Thanh toán thất bại, vui lòng thử lại!");
      }
    } catch (error: any) {
      toast.error(error.response?.data || "Lỗi khi thanh toán!");
    }
  };
  return (
    <>
      <h2 style={{ textAlign: "center", marginTop: "110px", color: "#08509f" }}>
        Giỏ hàng
      </h2>
      <div className="checkout-container">
        <div className="checkout-header">
          <div className="header-block">
            <span>Hình ảnh</span>
          </div>
          <div className="header-block">
            <span>Chương trình</span>
          </div>
          <div className="header-block">
            <span>Mô tả</span>
          </div>
          {/* <div className="header-block">
            <span>Giá</span>
          </div> */}
          <div className="header-block">
            <span>Hủy</span>
          </div>
        </div>
        {cartPrograms.map((cartItem: any) => (
          <CheckoutItem key={cartItem.programId} cartItem={cartItem} />
        ))}
        <div
          style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
        >
          {/* <span className="total">Tổng: ${cartTotal} VND</span> */}
          <a className="payment" onClick={handleSubmitProgram}>
            Thanh toán
          </a>
        </div>
      </div>
    </>
  );
}

export default Cart;
