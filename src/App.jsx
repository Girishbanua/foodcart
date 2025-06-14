import React from "react";
import data from "../data.json";
import { useState } from "react";
const App = () => {
  const [productList, setProductList] = useState([]);
  return (
    <main className="p-[6vw] xl:px-[7vw]">
      <ConfirmModal />
      <div className="md:flex gap-8 items-start justify-start">
        <section className="desserts relative shrink">
          <h1 className="text-[10vw] md:text-[3vw] font-bold">Desserts</h1>
          <div className="mt-10 flex flex-wrap gap-8 ">
            {data.map((products) => {
              return (
                <div key={products.id} className="mt-5  ">
                  <div className="product shadow-lg xl:w-[250px] md:w-[150px] relative border-b-4 border-Rose-400/50 rounded-xl">
                    <img
                      className="md:hidden"
                      src={products.image.mobile}
                      alt={products.category}
                    />
                    <img
                      className="hidden md:block xl:hidden"
                      src={products.image.tablet}
                      alt={products.category}
                    />
                    <img
                      className="hidden xl:block"
                      src={products.image.desktop}
                      alt={products.category}
                    />
                    <AddToCart
                      pid={products.id}
                      pname={products.name}
                      price={products.price}
                      productList={productList}
                      setProductList={setProductList}
                    />
                  </div>

                  <div className="mt-10">
                    <span className="text-Rose-400">{products.category}</span>
                    <h3 className="text-lg md:text-xs xl:text-lg font-semibold">
                      {products.name}
                    </h3>
                    <p className="text-Red font-semibold">₹{products.price}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        {/* cart section */}
        <section className="cart w-full grow bg-white p-4 md:p-6 mt-10 md:mt-0 rounded-xl shadow-lg">
          <h1 className="text-[6vw] md:text-[2vw] font-bold text-Red">
            Your cart (
            {productList.reduce((acc, curr) => acc + curr.quantity, 0)})
          </h1>

          <div className="mt-10 flex flex-col items-center justify-center">
            <img src="/images/illustration-empty-cart.svg" alt="emptty-cart" />
            <p className="text-Rose-500">Your added items will appear here</p>
          </div>
          <AddedProduct plist={productList} />
          <div className="flex justify-between items-center">
            <p className="capitalize text-Rose-900">order total</p>
            <h1 className="text-3xl font-bold">
              ₹{" "}
              {productList
                .reduce((total, item) => total + item.price * item.quantity, 0)
                .toFixed(2)}
            </h1>
          </div>
          <div className="flex select-none mt-7 items-center justify-center gap-2 bg-Rose-100 h-[70px] rounded-lg ">
            <img
              className="hover:scale-125 smooth-transition"
              src="/images/icon-carbon-neutral.svg"
              alt="tree"
            />
            <p>
              This is a <b>carbon-neutral</b> delivery
            </p>
          </div>
          <button className="mt-7 capitalize bg-Red w-full font-bold text-Rose-50 h-[50px] rounded-full hover:bg-Green smooth-transition">
            confirm order
          </button>
        </section>
      </div>
      {/* confirm order */}
    </main>
  );
};

export default App;

export function IncDecButton(props) {
  return (
    <div className="bg-Red flex items-center text-Rose-50 justify-around absolute w-[145px] h-[40px] rounded-full left-15 -bottom-5 z-20">
      <button
        onClick={props.handleQuantity}
        className="outline-2 outline-Rose-100 rounded-full p-1 aspect-square"
      >
        <img src="/images/icon-decrement-quantity.svg" alt="-" />
      </button>
      <p>{props.quantity}</p>
      <button
        onClick={
          // props.quantity < 10 && props.setQuantity(props.quantity + 1)
          props.handleAdd
        }
        className="outline-2 outline-Rose-100 rounded-full p-1"
      >
        <img src="/images/icon-increment-quantity.svg" alt="+" />
      </button>
    </div>
  );
}
export function AddToCart(props) {
  const [visible, setVisible] = useState(true);
  const [quantity, setQuantity] = useState(0);
  const handleQuantity = () => {
    quantity < 2 ? setVisible(true) : setQuantity(quantity - 1);
  };
  const handleAdd = () => {
    setVisible(false);
    const existingProductIndex = props.productList.findIndex(
      (item) => item.id === props.pid
    );
    setQuantity(quantity + 1)

    if (existingProductIndex !== -1) {
      // product already in cart, increase quantity      
      const updatedList = [...props.productList];
      updatedList[existingProductIndex].quantity += 1;
      props.setProductList(updatedList);
    } else {
      setQuantity(quantity + 1)
      // new product, add with quantity 1
      props.setProductList([
        ...props.productList,
        { id: props.pid, pname: props.pname, price: props.price, quantity: 1 },
      ]);
    }
  };

  return visible ? (
    <button className="addtoCart" onClick={handleAdd}>
      <img src="/images/icon-add-to-cart.svg" alt="cart-icon" />
      Add to cart
    </button>
  ) : (
    <IncDecButton
      visible={visible}
      setVisible={setVisible}
      quantity={quantity}
      setQuantity={setQuantity}
      handleQuantity={handleQuantity}
      handleAdd={handleAdd}
    />
  );
}
export function AddedProduct({ plist }) {
  return (
    <>
      {plist.map((item, id) => {
        return (
          <div
            key={id}
            className="my-5 flex items-center justify-between pb-4 border-b-2 border-Rose-100 rounded-b-lg"
          >
            <div className="flex flex-col justify-between ">
              <h3 className="font-semibold">{item.pname}</h3>
              <div className="flex gap-4">
                <span className="text-Red font-bold">{item.quantity}x</span>
                <p className="text-Rose-400">@ ₹ {item.price}</p>
                <p className="text-Rose-500 font-semibold">
                  @ ₹ {item.quantity * item.price}
                </p>
              </div>
            </div>
            <button className="hover:invert transition-all ease-in-out duration-200 ">
              <img
                className="outline-2 outline-Rose-300 rounded-full p-1"
                src="/images/icon-remove-item.svg"
                alt="remove"
              />
            </button>
          </div>
        );
      })}
    </>
  );
}

export function ConfirmModal() {
  return (
    <div className="hidden md:fixed top-0 left-0 bg-black/50 h-[100vh] w-[100vw] z-30 backdrop-blur-[5px] flex items-center justify-center">
      <div className="confirm bg-white p-4 md:p-8 rounded-xl shadow-lg z-20 w-1/2">
        <img src="/images/icon-order-confirmed.svg" alt="confirm-icon" />
        <h1 className="text-4xl  font-bold w-[30vw] mt-5">Order Confirmed</h1>
        <p className="text-Rose-400">We hope you enjoy your food!</p>

        <div className="bg-Rose-50 rounded-lg p-4 mt-7 ">
          <div className="flex justify-between items-center border-b-2 border-Rose-100 pb-5">
            <div className="flex gap-4 text-sm">
              <img
                src="/images/image-waffle-thumbnail.jpg"
                alt="thumbnail"
                className="rounded-xl w-12 "
              />
              <div className="flex flex-col justify-between">
                <h3 className="font-semibold">Product Name</h3>
                <div className="flex justify-between">
                  <span className="text-Red font-bold">1x</span>
                  <p className="text-Rose-400">@ ₹599.90</p>
                </div>
              </div>
            </div>
            <p className="font-semibold">₹599.90</p>
          </div>
          <div className="flex justify-between items-center mt-5">
            <p className="capitalize text-Rose-900">order total</p>
            <h1 className="text-2xl font-bold">₹ 599.90</h1>
          </div>
        </div>

        <button className="bg-Red text-white w-full rounded-full p-4 capitalize mt-10 hover:bg-Red/90">
          start new order
        </button>
      </div>
    </div>
  );
}
