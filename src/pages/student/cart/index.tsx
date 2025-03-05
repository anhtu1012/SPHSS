import { useSelector } from "react-redux";
import { RootState } from "../../../redux/RootReducer";
import "./index.scss";
import CheckoutItem from "./CheckoutItem";

function Cart() {
  const cartPrograms = useSelector((state: RootState) => state.cart) as any;
  const cartTotal = cartPrograms.reduce((total: number, item: any) => {
    return total + parseFloat(item.price);
  }, 0);
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
          <div className="header-block">
            <span>Giá</span>
          </div>
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
          <span className="total">Tổng: ${cartTotal} VND</span>
          <a className="payment">Thanh toán</a>
        </div>
      </div>
    </>
  );
}

export default Cart;
