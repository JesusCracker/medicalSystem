import React, {PureComponent} from 'react';
import WorkAndLife from "../components/patient/components/WorkAndLife";
import HistoryCollectionHeader from '../components/HistoryCollectionHeader'
import {connect} from 'dva';

const mapStateToProps = (state) => {
  return {
    //loading: state.loading,
    state
  }
}
class WorkAndLifePage extends PureComponent {
  render() {
    return (
      <div>
        <HistoryCollectionHeader />
        <WorkAndLife />
      </div>
    )
  }
}


export default connect(mapStateToProps)(WorkAndLifePage);
