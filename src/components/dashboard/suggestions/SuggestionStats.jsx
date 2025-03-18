import React from "react";

const SuggestionStats = ({ stats }) => {
  return (
    <div className="row">
      <div className="col-4">
        <div className="alert alert-success" role="alert">
          Suggestions acceptées : {stats.accepted}
        </div>
      </div>
      <div className="col-4">
        <div className="alert alert-danger" role="alert">
          Suggestions refusées : {stats.refused}
        </div>
      </div>
      <div className="col-4">
        <div className="alert alert-warning" role="alert">
          Suggestions en attentes : {stats.pending}
        </div>
      </div>
    </div>
  );
};

export default SuggestionStats;
