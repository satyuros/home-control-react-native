import React, { createContext, useContext, useState, useEffect } from "react";

const Context = createContext();
export const StateContext = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [playlist, setPlaylist] = useState();

  const toggleCartItemQuantity = (id, value) => {
    // const newCartItems = [...cartItems];
    // foundProduct = newCartItems.find((item) => item._id === id);
    // //index = cartItems.findIndex((item) => item._id === id);
    // if (value === "inc") {
    //   foundProduct.quantity = foundProduct.quantity + 1;
    //   setCartItems([...newCartItems]);
    //   setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
    //   setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    // } else if (value === "dec" && foundProduct.quantity > 1) {
    //   foundProduct.quantity = foundProduct.quantity - 1;
    //   setCartItems([...newCartItems]);
    //   setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
    //   setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
    // }
  };

  const onRemove = (id) => {
    // foundProduct = cartItems.find((item) => item._id === id);
    // setTotalPrice(
    //   (prevTotalPrice) =>
    //     prevTotalPrice - foundProduct.price * foundProduct.quantity
    // );
    // setTotalQuantities(
    //   (prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity
    // );
    // setCartItems([...cartItems.filter((item) => item._id !== id)]);
  };

  const onAdd = (product, quantity) => {
    // const checkProductInCart = cartItems.find(
    //   (item) => item._id === product._id
    // );
    // setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
    // setTotalPrice(
    //   (prevTotalPrice) => prevTotalPrice + quantity * product.price
    // );
    // if (checkProductInCart) {
    //   const updatedCartItems = cartItems.map((cartProduct) => {
    //     if (cartProduct._id === product._id)
    //       return {
    //         ...cartProduct,
    //         quantity: cartProduct.quantity + quantity,
    //       };
    //   });
    //   setCartItems(updatedCartItems);
    // } else {
    //   product.quantity = quantity;
    //   setCartItems([...cartItems, { ...product }]);
    // }
    // toast.success(`${qty} ${product.name} added to the cart.`);
  };

  const playVideo = (itemVideo) => {
    console.log("play " + itemVideo.id);
    setIsPlaying(!!itemVideo);
    setCurrentVideo(itemVideo);
  };

  return (
    <Context.Provider
      value={{
        isPlaying,
        setIsPlaying,
        currentVideo,
        playVideo,
        playlist,
        setPlaylist,
        onAdd,
        toggleCartItemQuantity,
        onRemove,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
