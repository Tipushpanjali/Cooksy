import React from "react";
import { Link, useParams } from "react-router-dom";

const Homecard2 = (props) => {
  return (
    <div >
      <div className="bg-[#FF8A65] p-9 rounded-2xl shadow-xl w-72 text-center border border-white/40">
        <img
          src={props.src}
          alt="Paneer Tikka"
          className="rounded-xl w-full h-38 object-cover mb-4"
        />
        <h2 className="text-xl font-semibold text-gray-900">{props.name}</h2>
        <p className="text-gray-700 mb-4 text-sm">{props.dsc}</p>
        <Link
          to={props.link}
          className="bg-white text-[#FF7043] font-semibold py-2 px-6 rounded-lg shadow hover:bg-[#FF7043] hover:text-white transition-all duration-300"
        >
          View Recipe
        </Link>
      </div>
    </div>
  );
};

export default Homecard2;
