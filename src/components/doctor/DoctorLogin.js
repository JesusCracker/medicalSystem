import React, { PureComponent } from "react";
import LoginPage from "../LoginPage";

class DoctorLogion extends PureComponent {
    render() {

        return (
            <div>
                <LoginPage title='医生' />
            </div>
        )
    }
}

DoctorLogion.propTypes = {
    //data: PropTypes.string
};

export default DoctorLogion;
