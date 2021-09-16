import React, {PureComponent} from 'react';
import DoctorLogin from "../Header";
import PatientCard from '../PatientCard';
import {Button, Tabs} from 'antd-mobile';
import {connect} from "dva";
import styles from './PatientRegister.less'

class PatientRegister extends PureComponent {

  tabs = [
    {title: '待提交'},
    {title: '已提交'}
  ];

  componentDidMount() {
    const {dispatch} = this.props;
    // 获取未提交的记录
    dispatch({
      type: 'patientRegister/getList',
      payload: {
        commitStatus: 1
      }
    })
    // 获取已提交的记录
    dispatch({
      type: 'patientRegister/getList',
      payload: {
        commitStatus: 2
      }
    })
  }

  // 新增登记
  handleRegister = () => {
    const {history} = this.props;
    history.push('/RegisterNotice');
  }

  render() {
    const {patientRegister} = this.props;
    const {notPost = [], hasPost = []} = patientRegister
    const name = JSON.parse(localStorage.getItem('patientInfo'))?.username;
    return (
      <div>
        <DoctorLogin titleNavbar="病史采集系统" titleNoction={name + ',欢迎登录系统'}/>
        <Tabs tabs={this.tabs} initialPage={0} animated={true} useOnPan={false} swipeable={false}>
          <div style={{background: '#eeeeee', height: 'calc(100vh - 190px)', overflow: "scroll"}}>
            {
              notPost.length > 0 ? notPost.map(item => {
                return (
                  <PatientCard
                    key={item.id}
                    type={'patient'}
                    isFinished={false}
                    patientInfo={{
                      id: item.id,
                      name: item.name,
                      phone: item.mobile,
                      step: item.step,
                      fillDate: item.createdDate,
                    }}
                  />
                )
              }) : <div style={{
                width: '100%',
                height: '30px',
                background: '#fff',
                lineHeight: '30px',
                textAlign: 'center'
              }}>暂无数据</div>
            }
          </div>
          <div style={{background: '#eeeeee', height: 'calc(100vh - 190px)', overflow: "scroll"}}>
            {
              hasPost.length > 0 ? hasPost.map(item => {
                return (
                  <PatientCard
                    key={item.id}
                    type={'patient'}
                    isFinished={true}
                    patientInfo={{
                      id: item.id,
                      name: item.name,
                      phone: item.mobile,
                      step: item.step,
                      fillDate: item.createdDate
                    }}
                  />
                )
              }) : <div style={{
                width: '100%',
                height: '30px',
                background: '#fff',
                lineHeight: '30px',
                textAlign: 'center'
              }}>暂无数据</div>
            }
          </div>
        </Tabs>
        <div className={styles.btnContent}>
          <Button className={styles.manageDoctor} onClick={() => this.handleRegister()}>新增登记</Button>
        </div>
      </div>
    )
  }
}

export default connect((state) => {
  return {
    patientRegister: state.patientRegister,
    loading: state.loading
  }
})(PatientRegister)
