import React from 'react';
import DoctorLogion from "../components/doctor/DoctorLogin";
import { connect } from 'dva';
//import PropTypes from "prop-types";


const DoctorrPage = (props) => {
    return <DoctorLogion {...props} />
}


// DoctorrPage.propTypes = {

// };

const mapStateToProps = (state) => {
    return {
        //loading: state.loading,
    }
}

export default connect(mapStateToProps)(DoctorrPage);
