export const AddToCart = (addedItems) => {
  return (dispatch) => {
    dispatch({ type: "ADD_TO_CART", addedItems });
  };
};
export const ClearCart = () => {
  return (dispatch) => {
    dispatch({ type: "CLEAR_CART" });
  };
};
export const DecreaseQuantity = (DecreaseId) => {
  return (dispatch) => {
    dispatch({ type: "DECREASE_QUANTITY", DecreaseId });
  };
};
export const IncreaseQuantity = (IncreaseId) => {
  return (dispatch) => {
    dispatch({ type: "INCREASE_QUANTITY", IncreaseId });
  };
};
