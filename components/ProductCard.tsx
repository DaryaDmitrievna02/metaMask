import React from "react";
import { PayButton } from "./PayButton";

const ProductCard = ({ product }) => {
  return (
    <div className="p-5">
      <h2>Sepoil transaction</h2>
      <div className="mx-auto bg-white rounded-xl shadow-md overflow-hidden ">
        <div>
          <div>
            <img
              className="h-48 w-full object-cover"
              src={product.image}
              alt={product.name}
            />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              {product.name}
            </div>
            <p className="mt-2 text-gray-500">${product.price}</p>
            <PayButton price={product.price} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
