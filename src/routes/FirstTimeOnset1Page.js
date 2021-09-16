import React, {PureComponent} from 'react';
import FirstTimeOnset1 from "../components/patient/components/FirstTimeOnset1";
import HistoryCollectionHeader from '../components/HistoryCollectionHeader'
import {connect} from 'dva';

const mapStateToProps = (state) => {
  return {
    //loading: state.loading,
    state
  }
}
class FirstTimeOnset1Page extends PureComponent {
  render() {
    return (
      <div>
        <HistoryCollectionHeader />
        <FirstTimeOnset1 />
      </div>
    )
  }
}


export default connect(mapStateToProps)(FirstTimeOnset1Page);
