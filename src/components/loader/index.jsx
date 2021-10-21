import React from 'react';

export const Loader = (fullscreen) => {
    return (
        <div className="spinner-grow" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    );
};

export default Loader;