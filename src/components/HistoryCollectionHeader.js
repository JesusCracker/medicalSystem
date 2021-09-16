import React, {PureComponent} from "react";
import styles from './HistoryCollectionHeader.less';
import {withRouter} from 'dva/router';
import {Icon, NavBar, Modal} from "antd-mobile";
import style from "./header.less";
import {connect} from 'dva'

class HistoryCollectionHeader extends PureComponent {
  state = {
    // steps中path属性要与路由中的path（/historyCollection/xxx）中的xxx保持一致
    steps: [
      {
        label: '1',
        path: 'baseInfo',
        text: '基本情况'
      },
      {
        label: '2',
        path: 'workAndLife',
        text: '生活工作情况'
      },
      {
        label: '3',
        path: 'firstTimeOnset',
        text: '首次发病情况'
      },
      {
        label: '4',
        path: 'firstTimeOnset1',
        text: '首次发病情况（续）'
      },
      {
        label: '5',
        path: 'afterOnset',
        text: '发病后情况'
      },
      {
        label: '6',
        path: 'Maternity',
        text: '孕产情况'
      },
      {
        label: '7',
        path: 'past',
        text: '既往情况'
      },
      {
        label: '8',
        path: 'past1',
        text: '既往情况（续）'
      },
      {
        label: '9',
        path: 'outsideHospitalTreatment',
        text: '外院治疗经过'
      },
      {
        label: '10',
        path: 'onsetAndTreatment',
        text: '发病及治疗详情'
      }
    ],
    current: 0,
    text: ''
  }

  componentDidMount() {
    const {location, dispatch} = this.props;
    const {steps} = this.state;
    const stepName = location.pathname.split('/')[2];
    // 获取详情
    if (location.state && location.state.id) {
      dispatch({
        type: 'historyCollection/getPatientHistoryDetail',
        payload: {
          id: location.state.id
        }
      })
    }
    setTimeout(() => {
      // 修改current（当前索引），同时获取当前填写部分的名称text
      steps.forEach((item, index) => {
        if (item.path === stepName) {
          this.setState({
            current: index,
            text: item.text
          })
        }
      })
    }, 0)
  }

  handleTo(index, path) {
    const {history, location, historyCollection} = this.props;
    if (index <= historyCollection.step) {
      Modal.alert('跳转', '若确认跳转将不会保存当前页面信息', [{
        text: '确认', onPress: () => {
          if (location.state && location.state.id) {
            history.push(`/historyCollection/${path}`, {id: location.state.id})
          } else {
            history.push(`/historyCollection${path}`)
          }
        }
      }, {text: '取消'}]);
    }
  }

  render() {
    const {history, historyCollection} = this.props;
    const {steps, current, text} = this.state;

    return (
      <div>
        <NavBar
          mode="light"
          icon={<Icon type="cross"/>}
          onLeftClick={() => {
            Modal.alert('跳转', '若确认跳转将不会保存当前页面信息', [{
              text: '确认', onPress: () => {
                history.push('/patientRegister')
              }
            }, {text: '取消'}]);
          }}
          className={style.header}
        >
          IGM病史登记列表
        </NavBar>
        <ul className={styles.stepBox}>
          {
            steps.map((item, index) => {
              return (<li key={item.label}
                          className={index === current ? styles.active : (index < historyCollection.step ? styles.done : '')}>
                <a onClick={() => this.handleTo(index, item.path)}>{item.label}</a>
              </li>)
            })
          }
        </ul>
        <div className={styles.text}>{text}</div>
      </div>
    )
  }
}

export default connect((state) => {
  return {
    historyCollection: state.historyCollection
  }
})(withRouter(HistoryCollectionHeader));
