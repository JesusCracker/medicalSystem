import React from 'react';
import MedicalHistoryList from "../components/doctor/MedicalHistoryList";
import { connect } from 'dva';
//import PropTypes from "prop-types";


const MedicalHistory = (props) => {
    return <MedicalHistoryList {...props} />
}


// DoctorrPage.propTypes = {

// };

const mapStateToProps = (state) => {
    return {
        //loading: state.loading,
    }
}

export default connect(mapStateToProps)(MedicalHistory);
