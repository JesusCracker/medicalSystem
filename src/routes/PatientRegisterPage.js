import React from 'react';
import PatientRegister from "../components/patient/PatientRegister";
import { connect } from 'dva';
//import PropTypes from "prop-types";


const PatientPage = (props) => {
  return <PatientRegister {...props} />
}

const mapStateToProps = (state) => {
  return {
    //loading: state.loading,
    state
  }
}

export default connect(mapStateToProps)(PatientPage);
