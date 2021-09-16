import React from 'react';
import CompleteHistory from "../components/doctor/CompleteHistory";
import { connect } from 'dva';
//import PropTypes from "prop-types";


const CompleteHistoryForm = (props) => {
    return <CompleteHistory {...props} />
}


// CompleteHistoryForm.propTypes = {

// };

const mapStateToProps = (state) => {
    return {
        //loading: state.loading,
    }
}

export default connect(mapStateToProps)(CompleteHistoryForm);
