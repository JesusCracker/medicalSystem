import React, {PureComponent} from 'react';
import Past from "../components/patient/components/Past";
import HistoryCollectionHeader from '../components/HistoryCollectionHeader'
import {connect} from 'dva';

const mapStateToProps = (state) => {
  return {
    //loading: state.loading,
    state
  }
}
class PastPage extends PureComponent {
  render() {
    return (
      <div>
        <HistoryCollectionHeader />
        <Past />
      </div>
    )
  }
}


export default connect(mapStateToProps)(PastPage);
