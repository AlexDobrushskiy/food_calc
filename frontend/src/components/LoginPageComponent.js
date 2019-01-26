import React from 'react';
import {RegisterModalContainer} from "../containers/RegisterModalContainer";
import {LoginContainer} from "../containers/LoginContainer";

export const LoginPage = () => {
    return <div className="col-5 offset-3">
        <RegisterModalContainer/>
        <LoginContainer/>
    </div>;
};
