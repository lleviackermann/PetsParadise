import { authActions } from "./auth-slice";

export const addItemToCart = (id, token) => {
  return async (dispatch) => {
    const sendData = await fetch("http://localhost:8000/auth/addToCart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        productId: id,
      }),
    });
    const data = await sendData.json();
    console.log(data.cart);
    dispatch(authActions.updateCart(data.cart));
  };
};

export const removeItemFromCart = (id, token) => {
  return async (dispatch) => {
    const removeData = await fetch(
      "http://localhost:8000/auth/removeFromCart",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          productId: id,
        }),
      }
    );
    const data = await removeData.json();
    console.log("data is ", data);
    dispatch(authActions.updateCart(data.cart));
  };
};
