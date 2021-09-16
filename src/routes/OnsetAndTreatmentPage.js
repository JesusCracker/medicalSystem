import React, {PureComponent} from 'react';
import OnsetAndTreatment from "../components/patient/components/OnsetAndTreatment";
import HistoryCollectionHeader from '../components/HistoryCollectionHeader'
import {connect} from 'dva';

const mapStateToProps = (state) => {
  return {
    //loading: state.loading,
    state
  }
}
class OnsetAndTreatmentPage extends PureComponent {
  render() {
    return (
      <div>
        <HistoryCollectionHeader />
        <OnsetAndTreatment />
      </div>
    )
  }
}


export default connect(mapStateToProps)(OnsetAndTreatmentPage);
