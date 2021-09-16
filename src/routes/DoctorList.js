import React from 'react';
import DoctorPageList from "../components/doctor/DoctorList";
import { connect } from 'dva';
//import PropTypes from "prop-types";


const DoctorList = (props) => {
    return <DoctorPageList {...props} />
}


// DoctorList.propTypes = {

// };

const mapStateToProps = (state) => {
    return {
        //loading: state.loading,
    }
}

export default connect(mapStateToProps)(DoctorList);
