import React from "react";

interface IButtonProps {
  canClick: boolean;
  loading: boolean;
  actionText: string;
}

export const FormButton: React.FC<IButtonProps> = ({
  canClick,
  loading,
  actionText,
}) => (
  <button
    role="button"
    className={`text-white font-medium py-3 px-5 text-lg rounded-lg focus:outline-none hover:opacity-80 transition-opacity mb-4 ${
      canClick ? "bg-lime-500" : "bg-gray-300 pointer-events-none"
    }`}
  >
    {loading ? "Loading..." : actionText}
  </button>
);
