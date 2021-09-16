import React from 'react';
import PatientDetail from "../components/PatientDetails";
import { connect } from 'dva';
//import PropTypes from "prop-types";


const CheckPatient = (props) => {
    return <PatientDetail {...props} />
}


// CheckPatient.propTypes = {

// };

const mapStateToProps = (state) => {
    return {
        //loading: state.loading,
    }
}

export default connect(mapStateToProps)(CheckPatient);
