import React, {PureComponent} from 'react';
import AfterOnset from "../components/patient/components/AfterOnset";
import HistoryCollectionHeader from '../components/HistoryCollectionHeader'
import {connect} from 'dva';

const mapStateToProps = (state) => {
  return {
    //loading: state.loading,
    state
  }
}
class AfterOnsetPage extends PureComponent {
  render() {
    return (
      <div>
        <HistoryCollectionHeader />
        <AfterOnset />
      </div>
    )
  }
}


export default connect(mapStateToProps)(AfterOnsetPage);
