import React from "react";
import data from "../data.json";
const App = () => {
  return (
    <main className="p-[6vw] xl:px-[7vw]">
      <div className="md:flex gap-8 items-start justify-start">
        <section className="desserts relative">
          <h1 className="text-[10vw] md:text-[3vw] font-bold">Desserts</h1>
          <div className="mt-10 flex flex-wrap gap-8 md:max-w-[70%] ">
            {data.map((products) => {
              return (
                <div key={products.id} className="mt-5">
                  <div className="product md:w-[250px] shadow-lg relative border-b-4 border-Rose-400/50 rounded-xl">
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
                    <button
                      className="flex items-center justify-center gap-2 font-semibold outline-Rose-300 
                outline-2 bg-Rose-50 z-20 w-[145px] h-[40px] rounded-full absolute 
                  right-[20%] bottom-[-10%] text-[4vw] md:text-sm cursor-pointer hover:text-Red "
                    >
                      <img src="/images/icon-add-to-cart.svg" alt="cart-icon" />
                      Add to cart
                    </button>
                  </div>

                  <div className="mt-10">
                    <span className="text-Rose-400">{products.category}</span>
                    <h3 className="text-lg font-semibold">{products.name}</h3>
                    <p className="text-Red font-semibold">₹{products.price}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        {/* cart section */}
        <section className="cart md:fixed md:right-10 xl:right-20 md:w-[35vw] xl:w-[30vw] z-20 bg-white p-4 md:p-6 mt-10 md:m-0 rounded-xl shadow-lg">
          <h1 className="text-[6vw] md:text-[2vw] font-bold text-Red">
            Your cart (0)
          </h1>
          <div className="mt-10 flex flex-col items-center justify-center">
            <img src="/images/illustration-empty-cart.svg" alt="emptty-cart" />
            <p className="text-Rose-500">Your added items will appear here</p>
          </div>
          <div className="my-5 flex items-center justify-between pb-4 border-b-2 border-Rose-100 rounded-b-lg">
            <div className="flex flex-col justify-between ">
              <h3 className="font-semibold">Product Name</h3>
              <div className="flex gap-4">
                <span className="text-Red font-bold">1x</span>
                <p className="text-Rose-400">@ ₹599.90</p>
                <p className="text-Rose-500 font-semibold">@ ₹599.90</p>
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
          <div className="flex justify-between items-center">
            <p className="capitalize text-Rose-900">order total</p>
            <h1 className="text-3xl font-bold">₹ 599.90</h1>
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

export function ConfirmModal() {
  return (
    <div className="confirm bg-white p-4 rounded-xl shadow-lg">
      <img src="/images/icon-order-confirmed.svg" alt="confirm-icon" />
      <h1 className="text-[8vw] font-bold w-[30vw]">Order Confirmed</h1>
      <p className="text-Rose-400">We hope you enjoy your food!</p>

      <div className="mt-7 bg-Rose-50 p-4 flex justify-between items-center ">
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

      <button className="bg-Red text-white w-full rounded-full p-4 capitalize mt-10">
        start new order
      </button>
    </div>
  );
}
