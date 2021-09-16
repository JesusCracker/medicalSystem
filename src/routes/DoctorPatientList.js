import React from 'react';
import DoctorPattList from "../components/doctor/DoctorPatientList";
import { connect } from 'dva';
//import PropTypes from "prop-types";


const DoctorPatientList = (props) => {
    return <DoctorPattList {...props} />
}


// DoctorrPage.propTypes = {

// };

const mapStateToProps = (state) => {
    return {
        //loading: state.loading,
    }
}

export default connect(mapStateToProps)(DoctorPatientList);
