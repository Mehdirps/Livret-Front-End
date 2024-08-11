import React from 'react';

const Success = ({ success }) => {
    return (
        <div className="alert alert-danger" role="alert">
            {success}
        </div>
    );
};

export default Success;