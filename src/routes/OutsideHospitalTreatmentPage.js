import React, {PureComponent} from 'react';
import OutsideHospitalTreatment from "../components/patient/components/OutsideHospitalTreatment";
import HistoryCollectionHeader from '../components/HistoryCollectionHeader'
import {connect} from 'dva';

const mapStateToProps = (state) => {
  return {
    //loading: state.loading,
    state
  }
}
class OutsideHospitalTreatmentPage extends PureComponent {
  render() {
    return (
      <div>
        <HistoryCollectionHeader />
        <OutsideHospitalTreatment />
      </div>
    )
  }
}


export default connect(mapStateToProps)(OutsideHospitalTreatmentPage);
