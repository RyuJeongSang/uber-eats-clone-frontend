import React from "react";
import { Link } from "react-router-dom";

interface IRestaurantProps {
  id: string;
  coverImg: string;
  name: string;
  categoryName?: string;
}

export const Restaurant: React.FC<IRestaurantProps> = ({
  id,
  coverImg,
  name,
  categoryName,
}) => {
  return (
    <Link to={`/restaurant/${id}`}>
      <div className="flex flex-col">
        <div
          style={{ backgroundImage: `url(${coverImg})` }}
          className="bg-lime-500 bg-cover bg-center py-24 mb-2"
        ></div>
        <h3 className="text-lg font-medium">{name}</h3>
        <span className="border-t mt-2 py-2 text-xs opacity-50 border-gray-400">
          {categoryName}
        </span>
      </div>
    </Link>
  );
};
