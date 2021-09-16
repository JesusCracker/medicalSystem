import React, { PureComponent } from "react";
import { Flex, Button, InputItem, List, Switch, Picker } from 'antd-mobile';
import style from './Maternity.less'
import { createForm } from 'rc-form';
import {connect} from "dva";
import {withRouter} from "dva/router";


class Past1 extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      checked2: false,
    };
  }

  handleSave = (type) => {
    // allergicHistory, allergicHistoryDesc, smokingHistory, smokingYears, smokingCate, smokingNoEveryDay, feedCat, feedCatDesc, breastCancerFamilyHistory, breastCancerFamilyHistoryDesc, illnessReason
    const {form, dispatch, location, history} = this.props
    const {getFieldsValue} = form;
    const {allergicHistory, smokingHistory, smokingCate, feedCat, breastCancerFamilyHistory, illnessReason, ...params} = getFieldsValue(['allergicHistory', 'allergicHistoryDesc', 'smokingHistory', 'smokingYears', 'smokingCate', 'smokingNoEveryDay', 'feedCat', 'feedCatDesc', 'breastCancerFamilyHistory','breastCancerFamilyHistoryDesc', 'illnessReason']);
    params.allergicHistory = allergicHistory ? 2 : 1;
    params.smokingHistory = smokingHistory ? 2: 1;
    params.smokingCate = smokingCate ? 2: 1;
    params.feedCat = feedCat ? 2: 1;
    params.breastCancerFamilyHistory = breastCancerFamilyHistory ? 2: 1;
    params.illnessReason = illnessReason && illnessReason[0];
    if (location.state && location.state.id) {
      params.id = location.state.id
    }
    params.userId = JSON.parse(localStorage.getItem('patientInfo')).id;
    params.step = 8;
    dispatch({
      type: 'historyCollection/postPatientHistory',
      payload: params
    }).then(res => {
      if (res && res.status === 1) {
        if(type === 'close') {
          history.push('/patientRegister')
        } else {
          history.push('/historyCollection/outsideHospitalTreatment', {id: location.state.id})
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
        const {allergicHistory, allergicHistoryDesc, smokingHistory, smokingYears, smokingCate, smokingNoEveryDay, feedCat, feedCatDesc, breastCancerFamilyHistory, breastCancerFamilyHistoryDesc, illnessReason} = res.data
        form.setFieldsValue({
          allergicHistory: allergicHistory === 2,
          smokingHistory: smokingHistory === 2,
          smokingCate: smokingCate === 2,
          feedCat: feedCat === 2,
          breastCancerFamilyHistory: breastCancerFamilyHistory === 2,
          allergicHistoryDesc,
          smokingYears,
          smokingNoEveryDay,
          feedCatDesc,
          breastCancerFamilyHistoryDesc,
          illnessReason: illnessReason && [illnessReason]
        })
      })
    }
  }

  render() {
    const { form } = this.props
    const { getFieldProps, getFieldValue } = form;
    const { checked2 } = this.state

    const data = [
      {
        label: '不知道',
        value: '不知道',
      },
      {
        label: '小孩碰撞',
        value: '小孩碰撞',
      },
      {
        label: '吃了海鲜',
        value: '吃了海鲜',
      },
      {
        label: '抑郁症药物',
        value: '抑郁症药物',
      },
      {
        label: '其他',
        value: '其他',
      },
    ]

    return (
      <div className={style.patientFormContent}>
        <div>
          <Flex className={style.inputTitle}>
            <Flex.Item className={style.inputTitleLeft}>其他既往史：</Flex.Item>
          </Flex>
          <div>
            <List.Item
              extra={<Switch
                {...getFieldProps('allergicHistory', {
                  initialValue: checked2,
                  valuePropName: 'checked',
                })}
                platform="android"
              />}
            >过敏史</List.Item>
            <div style={{display: getFieldValue('allergicHistory') ? 'block' : 'none'}}>
              <InputItem
                {...getFieldProps('allergicHistoryDesc')}
                placeholder="请输入"
              >过敏史描述</InputItem>
            </div>
            <List.Item
              extra={<Switch
                {...getFieldProps('smokingHistory', {
                  initialValue: checked2,
                  valuePropName: 'checked',
                })}
                platform="android"
              />}
            >吸烟史</List.Item>
            <div style={{display: getFieldValue('smokingHistory') ? 'block' : 'none'}}>
              <InputItem
                {...getFieldProps('smokingYears')}
                placeholder="请输入数字"
                type="number"
              >吸烟年限</InputItem>
            </div>
            <List.Item
              extra={<Switch
                {...getFieldProps('smokingCate', {
                  initialValue: checked2,
                  valuePropName: 'checked',
                })}
                platform="android"
              />}
            >吸烟频率</List.Item>
            <div style={{display: getFieldValue('smokingCate') ? 'block' : 'none'}}>
              <InputItem
                {...getFieldProps('smokingNoEveryDay')}
                placeholder="请输入数字"
                type="number"
              >每天几支</InputItem>
            </div>
            <List.Item
              extra={<Switch
                {...getFieldProps('feedCat', {
                  initialValue: checked2,
                  valuePropName: 'checked',
                })}
                platform="android"
              />}
            >养宠物</List.Item>
            <div style={{display: getFieldValue('feedCat') ? 'block' : 'none'}}>
              <InputItem
                {...getFieldProps('feedCatDesc')}
                placeholder="请输入"
              >养宠物描述</InputItem>
            </div>

          </div>
          <Flex className={style.inputTitle}>
            <Flex.Item className={style.inputTitleLeft}>家族史：</Flex.Item>
          </Flex>
          <div>
            <List.Item
              extra={<Switch
                {...getFieldProps('breastCancerFamilyHistory', {
                  initialValue: checked2,
                  valuePropName: 'checked',
                })}
                platform="android"
              />}
            >乳癌家族史</List.Item>
            <div style={{display: getFieldValue('breastCancerFamilyHistory') ? 'block' : 'none'}}>
              <InputItem
                {...getFieldProps('breastCancerFamilyHistoryDesc')}
                placeholder="请输入"
              >乳癌家族史描述</InputItem>
            </div>

          </div>
          <Flex className={style.inputTitle}>
            <Flex.Item className={style.inputTitleLeft}>您认为发病的其他原因：</Flex.Item>
          </Flex>
          <div>
            <Picker
              {...getFieldProps('illnessReason')}
              data={data}
              cols={1}
            >
              <List.Item onClick={this.onClick}>发病原因</List.Item>
            </Picker>
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
})(createForm()(withRouter(Past1)));
