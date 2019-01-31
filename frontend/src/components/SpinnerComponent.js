import React from 'react';

export const Spinner = ({show}) => {
    if (!show) {
        return null;
    }
    return <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"/>;

};
