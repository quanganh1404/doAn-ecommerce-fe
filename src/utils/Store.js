import { createContext, useReducer } from "react";
import Cookies from "js-cookie";

export const Store = createContext();

const initialState = {
  userInfo: Cookies.get("userInfo")
    ? JSON.parse(Cookies.get("userInfo"))
    : null,
  cartItems: Cookies.get("cartItems")
    ? JSON.parse(Cookies.get("cartItems"))
    : [],
  imageLink: Cookies.get("imageLink") ? Cookies.get("imageLink") : "",
};

function reducer(state, action) {
  switch (action.type) {
    case "USER_LOGIN": {
      return { ...state, userInfo: action.payload };
    }

    case "USER_LOGOUT": {
      const { userInfo, ...rest } = state;
      Cookies.remove("userInfo");
      Cookies.remove("cartItems");
      return { rest };
    }

    case "CART_ADD_ITEM": {
      const { _id, slug, name, countInStock, quantity, image, price } =
        action.payload;
      const newItem = { _id, slug, name, countInStock, quantity, image, price };
      const existItem = state.cartItems.find(
        (item) => item._id === newItem._id
      );

      const cartItems = existItem
        ? state.cartItems.map((item) =>
            item.name === existItem.name ? newItem : item
          )
        : [...state.cartItems, newItem];

      Cookies.set("cartItems", JSON.stringify(cartItems));

      console.log(cartItems);
      return { ...state, cartItems: cartItems };
    }

    case "CART_REMOVE_ITEM": {
      const cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      Cookies.set("cartItems", JSON.stringify(cartItems));

      return { ...state, ...cartItems };
    }

    case "CHECKOUT_COMPLETE": {
      const { cartItems, ...rest } = state;
      Cookies.remove("cartItems");

      return { rest };
    }

    case "GET_IMAGE_LINK_CLOUD": {
      Cookies.set("imageLink", state.imageLink);

      return { ...state, imageLink: action.payload };
    }

    case "CLEAR_IMAGE_LINK": {
      Cookies.remove("imageLink");

      const { imageLink, ...rest } = state;
      return { rest };
    }

    default:
      return { ...state };
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
