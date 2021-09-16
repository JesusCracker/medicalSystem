import React from 'react';
import RegisterNotice from "../components/patient/RegisterNotice";
import {connect} from 'dva';
//import PropTypes from "prop-types";


const RegisterNoticePage = (props) => {
  return <RegisterNotice {...props} />
}

const mapStateToProps = (state) => {
  return {
    //loading: state.loading,
    state
  }
}

export default connect(mapStateToProps)(RegisterNoticePage);
