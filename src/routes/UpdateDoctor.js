import React from 'react';
import ManageDoctor from "../components/doctor/ManageDoctor";
import { connect } from 'dva';
//import PropTypes from "prop-types";


const UpdateDoctor = (props) => {
    return <ManageDoctor {...props} />
}


// DoctorrPage.propTypes = {

// };

const mapStateToProps = (state) => {
    return {
        //loading: state.loading,
    }
}

export default connect(mapStateToProps)(UpdateDoctor);
