import React from 'react';

const ModuleCard = ({name, icon, title}) => {
    return (
        <div className="col-md-3 col-sm-4">
            <div className="card text-center">
                <i className={`${icon}`}></i>
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#${name}Modal`}>
                {title}
                </button>
            </div>
        </div>
    );
};

export default ModuleCard;