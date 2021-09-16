import React, {PureComponent} from 'react';
import Maternity from "../components/patient/components/Maternity";
import HistoryCollectionHeader from '../components/HistoryCollectionHeader'
import {connect} from 'dva';

const mapStateToProps = (state) => {
  return {
    //loading: state.loading,
    state
  }
}
class MaternityPage extends PureComponent {
  render() {
    return (
      <div>
        <HistoryCollectionHeader />
        <Maternity />
      </div>
    )
  }
}


export default connect(mapStateToProps)(MaternityPage);
