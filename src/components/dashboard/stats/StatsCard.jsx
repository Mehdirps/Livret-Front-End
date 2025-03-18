import React from "react";

const StatsCard = ({ data, bgColor, title }) => {
  return (
    <div className="col-lg-3 col-md-4 col-sm-6">
      <div className={`card text-white bg-${bgColor} mb-3`}>
        <div className="card-header">{title}</div>
        <div className="card-body">
          <h5 className="card-title">{data}</h5>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
