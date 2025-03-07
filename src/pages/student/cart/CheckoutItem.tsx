import { useDispatch } from "react-redux";
import { Program } from "../../../models/program";
import { remove } from "../../../redux/features/cartSlice";
import "./index.scss";

const CheckoutItem = ({ cartItem }: { cartItem: Program }) => {
  const { imageUrl, title, description } = cartItem;
  const dispatch = useDispatch();
  const removeFromCart = (programId: string) => {
    dispatch(remove(programId));
  };

  return (
    <div className="checkout-item">
      <div className="checkout-column">
        <img src={imageUrl} alt={title} className="checkout-image" />
      </div>
      <div className="checkout-column">
        <span className="checkout-title">{title}</span>
      </div>
      <div className="checkout-column">
        <span className="checkout-description">{description}</span>
      </div>
      {/* <div className="checkout-column">
        <span className="checkout-price">{price.toLocaleString()} VND</span>
      </div> */}
      <div className="checkout-column">
        <button
          className="checkout-remove"
          onClick={() => removeFromCart(cartItem.programId)}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default CheckoutItem;
