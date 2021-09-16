import React, { PureComponent } from "react";
import { Card, Icon } from "antd-mobile";
import styles from "./PatientCard.less";
import { withRouter } from 'dva/router'
// import { ReactComponent as Edit } from "../../assets/edit.svg"

/*
* 传入参数：
*   type: string, 'patient'/'doctor',
*   isFinish: boolean, true已完善/false待完善
*   patientInfo: {
*     name: string,
*     phone: string,
*     step: number[患者端传],
*     fillDate: string填表时间,
*     completeDate: 提交日期[医生端传]
*   }
* */
class PatientCard extends PureComponent {

  steps = [
    {
      label: 1,
      path: 'baseInfo'
    },
    {
      label: 2,
      path: 'workAndLife'
    },
    {
      label: 3,
      path: 'firstTimeOnset'
    },
    {
      label: 4,
      path: 'firstTimeOnset1'
    },
    {
      label: 5,
      path: 'afterOnset'
    },
    {
      label: 6,
      path: 'Maternity'
    },
    {
      label: 7,
      path: 'past'
    },
    {
      label: 8,
      path: 'past1'
    },
    {
      label: 9,
      path: 'outsideHospitalTreatment'
    },
    {
      label: 10,
      path: 'onsetAndTreatment'
    }
  ]

  // 编辑图标
  editIcon = ({
    width = "200",
    height = "200",
    fill = "black"
  }) => (
    <svg t="1608779393628" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
      p-id="2779" width={width} height={height}>
      <path
        d="M768 981.333333H170.666667c-72.533333 0-128-55.466667-128-128V256c0-72.533333 55.466667-128 128-128h298.666666c25.6 0 42.666667 17.066667 42.666667 42.666667s-17.066667 42.666667-42.666667 42.666666H170.666667c-25.6 0-42.666667 17.066667-42.666667 42.666667v597.333333c0 25.6 17.066667 42.666667 42.666667 42.666667h597.333333c25.6 0 42.666667-17.066667 42.666667-42.666667v-298.666666c0-25.6 17.066667-42.666667 42.666666-42.666667s42.666667 17.066667 42.666667 42.666667v298.666666c0 72.533333-55.466667 128-128 128z"
        p-id="2780" fill={fill} />
      <path
        d="M341.333333 725.333333c-12.8 0-21.333333-4.266667-29.866666-12.8-12.8-8.533333-17.066667-25.6-12.8-38.4l42.666666-170.666666c0-8.533333 4.266667-12.8 12.8-21.333334l405.333334-405.333333C810.666667 25.6 896 25.6 947.2 76.8c51.2 51.2 51.2 136.533333 0 187.733333l-405.333333 405.333334c-4.266667 4.266667-12.8 8.533333-21.333334 12.8l-170.666666 42.666666H341.333333z m81.066667-192l-21.333333 89.6 89.6-21.333333 396.8-396.8c17.066667-17.066667 17.066667-46.933333 0-68.266667-17.066667-17.066667-51.2-17.066667-68.266667 0l-396.8 396.8z m366.933333-426.666666z"
        p-id="2781" fill={fill} />
    </svg>
  )

  // 查看详情图标
  bookIcon = ({
    width = "200",
    height = "200",
    fill = "black"
  }) => (
    <svg t="1608780868436" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
      p-id="32001" width={width} height={height}>
      <path
        d="M960 896c-97.92 4.288-284.608 21.056-385.92 73.664C569.28 1000.256 543.936 1024 512 1024c-31.936 0-57.216-23.744-62.08-54.336C348.672 917.056 161.92 900.288 64 896c-35.328 0-64-28.608-64-64L0 64c0-35.328 28.672-64 64-64 2.24 0 4.096 1.088 6.336 1.28C510.464 12.608 512 128 512 128s1.536-115.392 441.664-126.72C955.904 1.088 957.76 0 960 0c35.392 0 64 28.672 64 64l0 768C1024 867.392 995.392 896 960 896zM448 200.576C365.44 158.592 228.864 141.12 128 133.696l0 637.824C299.776 780.224 395.904 805.952 448 832L448 200.576zM896 133.696c-100.864 7.424-237.44 24.896-320 66.88L576 832c52.096-26.048 148.224-51.776 320-60.48L896 133.696zM832 256l0 128c0 0-192 0-192 64L640 320C640 320 640 256 832 256zM832 512l0 128c0 0-192 0-192 64L640 576C640 576 640 512 832 512zM384 320l0 128c0-64-192-64-192-64L192 256C384 256 384 320 384 320zM384 576l0 128c0-64-192-64-192-64L192 512C384 512 384 576 384 576z"
        p-id="32002" fill={fill} />
    </svg>
  )

  // 登记内容
  renderItems(step) {
    return (
      <div className={styles.itemBox}>
        <div className={step > 0 ? styles.isActive:''}>基本情况<Icon className={styles.icon} type='check' /></div>
        <div className={step > 1 ? styles.isActive:''}>生活工作情况<Icon className={styles.icon} type='check' /></div>
        <div className={step > 2 ? styles.isActive:''}>首次发病情况<Icon className={styles.icon} type='check' /></div>
        <div className={step > 3 ? styles.isActive:''}>首次发病情况(续)<Icon className={styles.icon} type='check' /></div>
        <div className={step > 4 ? styles.isActive:''}>发病后情况<Icon className={styles.icon} type='check' /></div>
        <div className={step > 5 ? styles.isActive:''}>孕产情况<Icon className={styles.icon} type='check' /></div>
        <div className={step > 6 ? styles.isActive:''}>既往情况<Icon className={styles.icon} type='check' /></div>
        <div className={step > 7 ? styles.isActive:''}>既往情况(续)<Icon className={styles.icon} type='check' /></div>
        <div className={step > 8 ? styles.isActive:''}>外院治疗经过<Icon className={styles.icon} type='check' /></div>
        <div className={step > 9 ? styles.isActive:''}>发病及治疗情况<Icon className={styles.icon} type='check' /></div>
      </div>
    )
  }

  //查看病历详情
  checkHistory = () => {
    const { type, history, patientInfo } = this.props
    history.push('/checkPatient', { type, id: patientInfo.id })
  }

  editHistory = () => {
    const { type, history,patientInfo } = this.props
    const {step} = patientInfo;
    if (type === 'doctor') {
      history.push('/completeForm',{id: patientInfo.id})
    }else if(type === 'patient') {
      this.steps.forEach(item => {
        if((step + 1)  === item.label) {
          history.push(`/historyCollection/${item.path}`, {id: patientInfo.id})
        }else if(step === 10) {
          history.push(`/historyCollection/onsetAndTreatment`, {id: patientInfo.id})
        }
      })
    }
  }


  render() {
    const {type = 'patient', isFinished = false, patientInfo = {}} = this.props;
    const {step = 1} = patientInfo;
    return (
      <Card full style={{ marginBottom: '10px' }}>
        <Card.Header
          title={
            <span>
              {patientInfo.fillDate}
              {isFinished ? <span className={styles.posted}>{type === 'patient' ? '已提交' : '已完善'}</span> : <span className={styles.tag}>{type === 'patient' ? '待提交' : '待完善'}</span>}
            </span>
          }
          extra={<div>
            {
              isFinished ?
                (<div style={{ height: '20px' }} onClick={this.checkHistory}>{this.bookIcon({ width: '1em', height: '1em', fill: 'rgba(204,204,204,1)' })}</div>) :
                (<div style={{ height: '20px' }} onClick={this.editHistory}>{this.editIcon({ width: '1em', height: '1em', fill: 'rgba(204,204,204,1)' })}</div>)
            }
          </div>}
        />
        <Card.Body>
          <div className={styles.row}>
            <div className={styles.label}>患者姓名：</div>
            <div className={styles.content}>{patientInfo.name}</div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>患者手机:</div>
            <div className={styles.content}>{patientInfo.phone}</div>
          </div>
          <div className={styles.row}>
            <div className={styles.label} style={{ paddingTop: '5px' }}>{type === 'patient' ? '登记内容：' : '提交日期：'}</div>
            <div className={styles.content}>
              {type === 'patient' ? this.renderItems(step) : <div style={{paddingTop: '5px'}}>{patientInfo.completeDate}</div>}
            </div>
          </div>
        </Card.Body>
      </Card>
    )
  }
}

export default withRouter(PatientCard);
