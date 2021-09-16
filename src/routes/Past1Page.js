import React, {PureComponent} from 'react';
import Past1 from "../components/patient/components/Past1";
import HistoryCollectionHeader from '../components/HistoryCollectionHeader'
import {connect} from 'dva';

const mapStateToProps = (state) => {
  return {
    //loading: state.loading,
    state
  }
}
class Past1Page extends PureComponent {
  render() {
    return (
      <div>
        <HistoryCollectionHeader />
        <Past1 />
      </div>
    )
  }
}


export default connect(mapStateToProps)(Past1Page);
