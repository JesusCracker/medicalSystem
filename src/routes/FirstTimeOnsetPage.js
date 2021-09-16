import React, {PureComponent} from 'react';
import FirstTimeOnset from "../components/patient/components/FirstTimeOnset";
import HistoryCollectionHeader from '../components/HistoryCollectionHeader'
import {connect} from 'dva';

const mapStateToProps = (state) => {
  return {
    //loading: state.loading,
    state
  }
}
class FirstTimeOnsetPage extends PureComponent {
  render() {
    return (
      <div>
        <HistoryCollectionHeader />
        <FirstTimeOnset />
      </div>
    )
  }
}


export default connect(mapStateToProps)(FirstTimeOnsetPage);
