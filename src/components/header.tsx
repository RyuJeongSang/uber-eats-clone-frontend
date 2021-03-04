import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useMe } from "../hooks/useMe";
import { Link } from "react-router-dom";

export const Header: React.FC = () => {
  const { data } = useMe();
  return (
    <>
      {!data?.me.verified && (
        <div className="bg-red-700 py-3 px-3 text-center text-base text-white">
          <span>Please verify your email.</span>
        </div>
      )}
      <header className="py-4">
        <div className="w-full px-5 xl:px-0 max-w-screen-lg mx-auto flex justify-between items-center">
          <Link to="/">
            <div className="text-2xl flex font-semibold">
              <h2 className="mr-2">Nest</h2>
              <h2 className="text-lime-500">App</h2>
            </div>
          </Link>
          <span className="text-xl">
            <Link to="/my-profile/">
              <FontAwesomeIcon icon={faUser} />
            </Link>
          </span>
        </div>
      </header>
    </>
  );
};
