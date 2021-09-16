import React, {PureComponent} from "react";
import style from "./Maternity.less";
import {Button, Flex, InputItem, List, Picker} from "antd-mobile";
import {createForm} from 'rc-form';
import {withRouter} from 'dva/router'
import {connect} from "dva";

class WorkAndLife extends PureComponent {

  handleSave(type) {
    const {form, dispatch, location, history} = this.props
    const {getFieldsValue} = form;
    const {maritalStatus, educationLevel, ...params} = getFieldsValue(['maritalStatus', 'educationLevel', 'job', 'company', 'position', 'height', 'weight']);
    params.maritalStatus = maritalStatus && maritalStatus[0];
    params.educationLevel = educationLevel && educationLevel[0];
    if (location.state && location.state.id) {
      params.id = location.state.id
    }
    params.userId = JSON.parse(localStorage.getItem('patientInfo')).id;
    params.step = 2;
    dispatch({
      type: 'historyCollection/postPatientHistory',
      payload: params
    }).then(res => {
      if (res && res.status === 1) {
        if(type === 'close') {
          history.push('/patientRegister')
        } else {
          history.push('/historyCollection/firstTimeOnset', {id: location.state.id})
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
        const {maritalStatus, educationLevel, job, position, height, weight, company} = res.data;
        form.setFieldsValue({
          job, position, company, height, weight,
          maritalStatus: [maritalStatus],
          educationLevel: [educationLevel]
        })
      })
    }
  }

  render() {
    const {form} = this.props
    const {getFieldProps} = form;
    const Marriage = [
      {
        value: '已婚',
        label: '已婚'
      },
      {
        value: '未婚',
        label: '未婚'
      },
      {
        value: '单身',
        label: '单身'
      }
    ]
    const educationalLevel = [
      {
        value: '小学',
        label: '小学'
      },
      {
        value: '初中',
        label: '初中'
      },
      {
        value: '高中',
        label: '高中'
      },
      {
        value: '大专',
        label: '大专'
      },
      {
        value: '大学',
        label: '大学'
      },
      {
        value: '硕士及以上',
        label: '硕士及以上'
      }
    ]

    return (
      <div className={style.patientFormContent}>
        <div>
          <Flex className={style.inputTitle}>
            <Flex.Item className={style.inputTitleLeft}>生活情况：</Flex.Item>
          </Flex>
          <div>
            <Picker
              {...getFieldProps('maritalStatus')}
              data={Marriage}
              cols={1}
            >
              <List.Item onClick={this.onClick}>婚姻情况</List.Item>
            </Picker>
            <Picker
              {...getFieldProps('educationLevel')}
              data={educationalLevel}
              cols={1}
            >
              <List.Item onClick={this.onClick}>文化程度</List.Item>
            </Picker>
          </div>
          <Flex className={style.inputTitle}>
            <Flex.Item className={style.inputTitleLeft}>工作情况：</Flex.Item>
          </Flex>
          <div>
            <InputItem
              {...getFieldProps('job')}
              placeholder="请输入"
            >
              职业
            </InputItem>
            <InputItem
              {...getFieldProps('company')}
              placeholder="请输入"
            >
              单位
            </InputItem>
            <InputItem
              {...getFieldProps('position')}
              placeholder="请输入"
            >
              单位职务
            </InputItem>
          </div>
          <Flex className={style.inputTitle}>
            <Flex.Item className={style.inputTitleLeft}>其他情况：</Flex.Item>
          </Flex>
          <div>
            <InputItem
              {...getFieldProps('height')}
              placeholder="请输入"
              type="number"
            >
              身高（cm）
            </InputItem>
            <InputItem
              {...getFieldProps('weight')}
              placeholder="请输入"
              type="number"
            >
              体重（kg）
            </InputItem>
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
})(createForm()(withRouter(WorkAndLife)));
