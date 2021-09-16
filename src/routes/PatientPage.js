import React from 'react';
import PatientLogin from "../components/patient/PatientLogin";
import {connect} from 'dva';
//import PropTypes from "prop-types";


const PatientPage = (props) => {
  return <PatientLogin {...props} />
}

const mapStateToProps = (state) => {
  return {
    //loading: state.loading,
    state
  }
}

export default connect(mapStateToProps)(PatientPage);
