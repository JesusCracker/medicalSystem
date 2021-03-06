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
        label: '?????????',
        value: '?????????',
      },
      {
        label: '????????????',
        value: '????????????',
      },
      {
        label: '????????????',
        value: '????????????',
      },
      {
        label: '???????????????',
        value: '???????????????',
      },
      {
        label: '??????',
        value: '??????',
      },
    ]

    return (
      <div className={style.patientFormContent}>
        <div>
          <Flex className={style.inputTitle}>
            <Flex.Item className={style.inputTitleLeft}>??????????????????</Flex.Item>
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
            >?????????</List.Item>
            <div style={{display: getFieldValue('allergicHistory') ? 'block' : 'none'}}>
              <InputItem
                {...getFieldProps('allergicHistoryDesc')}
                placeholder="?????????"
              >???????????????</InputItem>
            </div>
            <List.Item
              extra={<Switch
                {...getFieldProps('smokingHistory', {
                  initialValue: checked2,
                  valuePropName: 'checked',
                })}
                platform="android"
              />}
            >?????????</List.Item>
            <div style={{display: getFieldValue('smokingHistory') ? 'block' : 'none'}}>
              <InputItem
                {...getFieldProps('smokingYears')}
                placeholder="???????????????"
                type="number"
              >????????????</InputItem>
            </div>
            <List.Item
              extra={<Switch
                {...getFieldProps('smokingCate', {
                  initialValue: checked2,
                  valuePropName: 'checked',
                })}
                platform="android"
              />}
            >????????????</List.Item>
            <div style={{display: getFieldValue('smokingCate') ? 'block' : 'none'}}>
              <InputItem
                {...getFieldProps('smokingNoEveryDay')}
                placeholder="???????????????"
                type="number"
              >????????????</InputItem>
            </div>
            <List.Item
              extra={<Switch
                {...getFieldProps('feedCat', {
                  initialValue: checked2,
                  valuePropName: 'checked',
                })}
                platform="android"
              />}
            >?????????</List.Item>
            <div style={{display: getFieldValue('feedCat') ? 'block' : 'none'}}>
              <InputItem
                {...getFieldProps('feedCatDesc')}
                placeholder="?????????"
              >???????????????</InputItem>
            </div>

          </div>
          <Flex className={style.inputTitle}>
            <Flex.Item className={style.inputTitleLeft}>????????????</Flex.Item>
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
            >???????????????</List.Item>
            <div style={{display: getFieldValue('breastCancerFamilyHistory') ? 'block' : 'none'}}>
              <InputItem
                {...getFieldProps('breastCancerFamilyHistoryDesc')}
                placeholder="?????????"
              >?????????????????????</InputItem>
            </div>

          </div>
          <Flex className={style.inputTitle}>
            <Flex.Item className={style.inputTitleLeft}>?????????????????????????????????</Flex.Item>
          </Flex>
          <div>
            <Picker
              {...getFieldProps('illnessReason')}
              data={data}
              cols={1}
            >
              <List.Item onClick={this.onClick}>????????????</List.Item>
            </Picker>
          </div>
        </div>

        <div className={style.btnContent}>
          <Button className={style.doctorBtn1} onClick={() => this.handleSave('close')}>???????????????</Button>
          <Button className={style.doctorBtn2} onClick={() => this.handleSave()}>????????????????????????</Button>
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
