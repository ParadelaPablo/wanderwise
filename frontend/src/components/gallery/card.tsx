import React from "react";

export const Card = () => {
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Trip to...</h2>
        <p>It was amazing</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Go to trip</button>
        </div>
      </div>
    </div>
  );
};
