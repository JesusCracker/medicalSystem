import React, {PureComponent} from "react";
import LoginPage from "../LoginPage";

class PatientLogin extends PureComponent {
  render() {
    return (
      <div>
        <LoginPage title='用户' />
      </div>
    )
  }
}

PatientLogin.propTypes = {
    //data: PropTypes.string
};


export default PatientLogin;
