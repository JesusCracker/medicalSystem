import React, {PureComponent} from "react";
import {createForm} from "rc-form";
import style from "./Maternity.less";
import {Button, Flex, InputItem, List, Picker, Switch} from "antd-mobile";
import {connect} from "dva";
import {withRouter} from "dva/router";
class AfterOnset extends PureComponent {
  state = {
    checked1: false,
    checked2: false,
    checked3: false,
  }

  handleSave = (type) => {
    const {form, dispatch, location, history} = this.props
    const {getFieldsValue} = form;
    // hotCompress, massage, skinFestered, dealAfterIllnessTime, treatAfterIllnessTime, treatHospotal, treatHospotalName, Department, treatDepartment
    const {hotCompress, massage, skinFestered, dealAfterIllnessTime, treatAfterIllnessTime, treatHospotal, treatHospotalName, treatDepartment, treatDepartmentName} = getFieldsValue(['hotCompress', 'massage', 'skinFestered', 'dealAfterIllnessTime', 'treatAfterIllnessTime', 'treatHospotal', 'treatHospotalName', 'treatDepartment', 'treatDepartmentName']);
    const params = {};
    params.hotCompress = hotCompress ? 2 : 1;
    params.massage = massage ? 2 : 1;
    params.skinFestered = skinFestered ? 2 : 1;
    params.dealAfterIllnessTime = dealAfterIllnessTime && dealAfterIllnessTime[0];
    params.treatAfterIllnessTime = treatAfterIllnessTime && treatAfterIllnessTime[0];
    params.treatHospotal = treatHospotal && treatHospotal[0];
    params.treatHospotalName = treatHospotalName;
    params.treatDepartment = treatDepartment && treatDepartment[0];
    params.treatDepartmentName = treatDepartmentName;
    if (location.state && location.state.id) {
      params.id = location.state.id
    }
    params.userId = JSON.parse(localStorage.getItem('patientInfo')).id;
    params.step = 5;
    dispatch({
      type: 'historyCollection/postPatientHistory',
      payload: params
    }).then(res => {
      if (res && res.status === 1) {
        if(type === 'close') {
          history.push('/patientRegister')
        } else {
          history.push('/historyCollection/Maternity', {id: location.state.id})
        }
      }
    })
  }

  componentDidMount() {
    const {location, dispatch, form} = this.props;
    if (location.state && location.state.id) {
      dispatch({
        type: 'historyCollection/getPatientHistoryDetail',
        payload: {
          id: location.state.id
        }
      }).then(res => {
        const {hotCompress, massage, skinFestered, dealAfterIllnessTime, treatAfterIllnessTime, treatHospotal, treatHospotalName, treatDepartment, treatDepartmentName} = res.data;
        form.setFieldsValue({
          hotCompress: hotCompress === 2,
          massage: massage === 2,
          skinFestered: skinFestered === 2,
          dealAfterIllnessTime: dealAfterIllnessTime && [dealAfterIllnessTime],
          treatAfterIllnessTime: treatAfterIllnessTime && [treatAfterIllnessTime],
          treatHospotal: treatHospotal && [treatHospotal],
          treatHospotalName,
          treatDepartment: treatDepartment && [treatDepartment],
          treatDepartmentName
        })
      })
    }
  }

  render() {
    const { form } = this.props
    const { getFieldProps, getFieldValue } = form;
    const { checked1,checked2,checked3 } = this.state

    const interval = [
      {
        value: '1周以内',
        label: '1周以内'
      },
      {
        value: '1-2周以内',
        label: '1-2周以内'
      },
      {
        value: '2-3周以内',
        label: '2-3周以内'
      },
      {
        value: '3-4周以内',
        label: '3-4周以内'
      },
      {
        value: '4周以上',
        label: '4周以上'
      },
      {
        value: '到目前皮肤没有溃烂',
        label: '到目前皮肤没有溃烂'
      },
    ]
    const hospital = [
      {
        value: '三级医院',
        label: '三级医院'
      },
      {
        value: '二级医院',
        label: '二级医院'
      },
      {
        value: '社区医院',
        label: '社区医院'
      },
      {
        value: '四川省妇幼保健院',
        label: '四川省妇幼保健院'
      },
    ]
    const department = [
      {
        value: '乳腺科',
        label: '乳腺科'
      },
      {
        value: '妇产科',
        label: '妇产科'
      },
      {
        value: '妇女保健科',
        label: '妇女保健科'
      },
      {
        value: '其他科室',
        label: '其他科室'
      },
    ]
    return (
      <div className={style.patientFormContent}>
        <div>
          <Flex className={style.inputTitle}>
            <Flex.Item className={style.inputTitleLeft}>发病后处理情况：</Flex.Item>
          </Flex>
          <div>
            <List.Item
              extra={<Switch
                {...getFieldProps('hotCompress', {
                  initialValue: checked1,
                  valuePropName: 'checked',
                })}
                platform="android"
              />}
            >热敷</List.Item>
            <List.Item
              extra={<Switch
                {...getFieldProps('massage', {
                  initialValue: checked2,
                  valuePropName: 'checked',
                })}
                platform="android"
              />}
            >按摩</List.Item>
            <List.Item
              extra={<Switch
                {...getFieldProps('skinFestered', {
                  initialValue: checked3,
                  valuePropName: 'checked',
                })}
                platform="android"
              />}
            >皮肤溃烂</List.Item>
            <Picker
              {...getFieldProps('dealAfterIllnessTime')}
              data={interval}
              cols={1}
            >
              <List.Item onClick={this.onClick}>离首次发病时间</List.Item>
            </Picker>
          </div>
          <Flex className={style.inputTitle}>
            <Flex.Item className={style.inputTitleLeft}>发病后就诊情况：</Flex.Item>
          </Flex>
          <div>
            <Picker
              {...getFieldProps('treatAfterIllnessTime')}
              data={interval}
              cols={1}
            >
              <List.Item onClick={this.onClick}>离首次发病时间</List.Item>
            </Picker>
            <Picker
              {...getFieldProps('treatHospotal')}
              data={hospital}
              cols={1}
            >
              <List.Item onClick={this.onClick}>首次就诊医院</List.Item>
            </Picker>
            <div
              style={{display: (getFieldValue('treatHospotal') && getFieldValue('treatHospotal')[0])  !== '四川省妇幼保健院' ? 'block' : 'none'}}
            >
              <InputItem
                {...getFieldProps('treatHospotalName')}
                placeholder="请输入"
              >
                医院名称
              </InputItem>
            </div>
            <Picker
              {...getFieldProps('treatDepartment')}
              data={department}
              cols={1}
            >
              <List.Item onClick={this.onClick}>首次就诊科室</List.Item>
            </Picker>
            <div style={{display: (getFieldValue('treatDepartment') && getFieldValue('treatDepartment')[0]) === '其他科室' ? 'block' : 'none'}}>
              <InputItem
                {...getFieldProps('treatDepartmentName')}
                placeholder="请输入"
              >
                科室名称
              </InputItem>
            </div>
          </div>
        </div>
        <div className={style.btnContent}>
          <Button className={style.doctorBtn1} onClick={() => this.handleSave('close')}>保存后关闭</Button>
          <Button className={style.doctorBtn2} onClick={() => this.handleSave()}>保存，并继续填写</Button>
        </div>
      </div>
    )
  }
}
export default connect(state => {
  return {
    ...state,
    historyCollection: state.historyCollection
  }
})(createForm()(withRouter(AfterOnset)));
