import React from "react";
import { findRestaurant_findRestaurant_restaurant_menu_options } from "../__generated__/findRestaurant";

interface IDishProps {
  id?: number;
  description: string;
  name: string;
  price: number;
  isCustomer?: boolean;
  orderStarted?: boolean;
  isSelected?: boolean;
  options?: findRestaurant_findRestaurant_restaurant_menu_options[] | null;
  removeFromOrder?: (dishId: number) => void;
  addItemToOrder?: (dishId: number) => void;
}

export const Dish: React.FC<IDishProps> = ({
  id = 0,
  description,
  name,
  price,
  isCustomer = false,
  orderStarted = false,
  options,
  addItemToOrder,
  isSelected,
  removeFromOrder,
  children: dishOptions,
}) => {
  const onClick = () => {
    if (orderStarted) {
      if (!isSelected && addItemToOrder) {
        return addItemToOrder(id);
      }
      if (isSelected && removeFromOrder) {
        return removeFromOrder(id);
      }
    }
  };

  return (
    <div
      className={`px-8 py-3 border transition-all ${
        isSelected ? "border-gray-800" : "hover:border-gray-800"
      }`}
    >
      <div className="mb-5">
        <h2 className="text-lg font-medium">
          {name}
          {orderStarted && (
            <button
              className={`ml-3 py-1 px-3 focus:outline-none text-sm text white ${
                isSelected ? "bg-red-500" : "bg-lime-500"
              }`}
              onClick={onClick}
            >
              {isSelected ? "Remove" : "Add"}
            </button>
          )}
        </h2>
        <h4 className="">{description}</h4>
      </div>
      <span>${price}</span>
      {isCustomer && options && options?.length !== 0 && (
        <div>
          <h4 className="my-3 font-medium">Dish Options:</h4>
          <div className="grid gap-2 justify-start">{dishOptions}</div>
        </div>
      )}
    </div>
  );
};
