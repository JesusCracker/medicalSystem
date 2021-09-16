import React, {PureComponent} from 'react';
import BaseInfo from "../components/patient/components/BaseInfo";
import HistoryCollectionHeader from '../components/HistoryCollectionHeader'
import {connect} from 'dva';

const mapStateToProps = (state) => {
  return {
    //loading: state.loading,
    state
  }
}
class BaseInfoPage extends PureComponent {
  render() {
    return (
      <div>
        <HistoryCollectionHeader />
        <BaseInfo />
      </div>
    )
  }
}


export default connect(mapStateToProps)(BaseInfoPage);
