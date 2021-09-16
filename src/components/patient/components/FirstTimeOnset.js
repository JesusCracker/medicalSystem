import React, {PureComponent} from "react";
import {createForm} from 'rc-form';
import style from "./Maternity.less";
import {Button, DatePicker, Flex, InputItem, List, Picker, Switch} from "antd-mobile";
import {connect} from "dva";
import {withRouter} from "dva/router";
import moment from "moment";

class FirstTimeOnset extends PureComponent {

  state = {
    inflamedSkin: false,
    lowerLimbsErythema: false,
    arthralgia: false
  }

  handleSave = (type) => {
    const {form, location, dispatch, history} = this.props;
    const {getFieldsValue} = form;
    const {illnessDate, illnessPeriod, illnessTimeForNow, illnessMonthForNow, illnessPosition, illnessExpression, tumorSize, inflamedSkin, lowerLimbsErythema, arthralgia} = getFieldsValue(['illnessDate', 'illnessPeriod', 'illnessTimeForNow', 'illnessMonthForNow', 'illnessPosition', 'illnessExpression', 'tumorSize', 'inflamedSkin', 'lowerLimbsErythema', 'arthralgia']);
    const params = {};
    params.illnessDate = illnessDate && moment(illnessDate).format('YYYY-MM-DD');
    params.illnessPeriod = illnessPeriod && illnessPeriod[0];
    params.illnessTimeForNow = illnessTimeForNow && illnessTimeForNow[0];
    params.illnessMonthForNow = illnessMonthForNow && illnessMonthForNow;
    params.illnessPosition = illnessPosition && illnessPosition[0];
    params.illnessExpression = illnessExpression && illnessExpression[0];
    params.tumorSize = tumorSize && tumorSize[0];
    params.inflamedSkin = inflamedSkin ? 2 : 1;
    params.lowerLimbsErythema = lowerLimbsErythema ? 2 : 1;
    params.arthralgia = arthralgia ? 2: 1;
    if (location.state && location.state.id) {
      params.id = location.state.id
    }
    params.userId = JSON.parse(localStorage.getItem('patientInfo')).id;
    params.step = 3;
    dispatch({
      type: 'historyCollection/postPatientHistory',
      payload: params
    }).then(res => {
      if (res && res.status === 1) {
        if(type === 'close') {
          history.push('/patientRegister')
        } else {
          history.push('/historyCollection/firstTimeOnset1', {id: location.state.id})
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
        const {illnessDate, illnessPeriod, illnessTimeForNow, illnessMonthForNow, illnessPosition, illnessExpression, tumorSize, inflamedSkin, lowerLimbsErythema, arthralgia} = res.data;
        form.setFieldsValue({
          illnessDate: illnessDate && new Date(illnessDate),
          illnessPeriod: [illnessPeriod],
          illnessTimeForNow: [illnessTimeForNow],
          illnessMonthForNow,
          illnessPosition: [illnessPosition],
          illnessExpression: [illnessExpression],
          tumorSize: [tumorSize],
          inflamedSkin: inflamedSkin === 2,
          lowerLimbsErythema: lowerLimbsErythema === 2,
          arthralgia: arthralgia === 2
        })
      })
    }
  }

  render() {
    const {form} = this.props
    const {getFieldProps, getFieldValue} = form;
    const {inflamedSkin, lowerLimbsErythema, arthralgia} = this.state
    const range = [
      {
        value: '白天',
        label: '白天'
      },
      {
        value: '晚上',
        label: '晚上'
      }
    ]
    const interval = [
      {
        value: '1周之内',
        label: '1周之内'
      },
      {
        value: '1-2周',
        label: '1-2周'
      },
      {
        value: '2-3周',
        label: '2-3周'
      },
      {
        value: '3-4周',
        label: '3-4周'
      },
      {
        value: '4周以上',
        label: '4周以上'
      },
    ]
    const position = [
      {
        value: '左侧',
        label: '左侧'
      },
      {
        value: '右侧',
        label: '右侧'
      },
      {
        value: '双侧同时',
        label: '双侧同时'
      }
    ]
    const symptom = [
      {
        value: '疼痛',
        label: '疼痛'
      },
      {
        value: '肿块',
        label: '肿块'
      },
      {
        value: '疼痛伴肿块',
        label: '疼痛伴肿块'
      },
      {
        value: '乳头溢液',
        label: '乳头溢液'
      },
      {
        value: '其他',
        label: '其他'
      },
    ]
    const size = [
      {
        value: '小于鹌鹑蛋',
        label: '小于鹌鹑蛋'
      },
      {
        value: '大于鹌鹑蛋小于鸡蛋',
        label: '大于鹌鹑蛋小于鸡蛋'
      },
      {
        value: '大于鸡蛋小于苹果',
        label: '大于鸡蛋小于苹果'
      },
      {
        value: '大于苹果',
        label: '大于苹果'
      }
    ]
    return (
      <div className={style.patientFormContent}>
        <div>
          <Flex className={style.inputTitle}>
            <Flex.Item className={style.inputTitleLeft}>首次发病时间：</Flex.Item>
          </Flex>
          <div>
            <DatePicker
              {...getFieldProps('illnessDate')}
              mode="date"
              title="选择日期"
              extra="请选择"
              format="YYYY-MM-DD"
              minDate={new Date(1900, 0, 1, 0,0,0)}
              maxDate={new Date()}
            >
              <List.Item>
                发病日期
              </List.Item>
            </DatePicker>
            <Picker
              {...getFieldProps('illnessPeriod')}
              data={range}
              cols={1}
            >
              <List.Item onClick={this.onClick}>发病时段</List.Item>
            </Picker>
            <Picker
              {...getFieldProps('illnessTimeForNow')}
              data={interval}
              cols={1}
            >
              <List.Item onClick={this.onClick}>离现在的时间</List.Item>
            </Picker>
            {getFieldValue('illnessTimeForNow') && getFieldValue('illnessTimeForNow')[0] === '4周以上' && <InputItem
              {...getFieldProps('illnessMonthForNow')}
              placeholder="请输入"
              type="number"
            >
              离现在几个月
            </InputItem>}
          </div>
          <Flex className={style.inputTitle}>
            <Flex.Item className={style.inputTitleLeft}>最早发病症状：</Flex.Item>
          </Flex>
          <div>
            <Picker
              {...getFieldProps('illnessPosition')}
              data={position}
              cols={1}
            >
              <List.Item onClick={this.onClick}>发病位置</List.Item>
            </Picker>
            <Picker
              {...getFieldProps('illnessExpression')}
              data={symptom}
              cols={1}
            >
              <List.Item onClick={this.onClick}>发病最初表现</List.Item>
            </Picker>
            <Picker
              {...getFieldProps('tumorSize')}
              data={size}
              cols={1}
            >
              <List.Item onClick={this.onClick}>肿块大小</List.Item>
            </Picker>
            <List.Item
              extra={<Switch
                {...getFieldProps('inflamedSkin', {
                  initialValue: inflamedSkin,
                  valuePropName: 'checked',
                })}
                platform="android"
              />}
            >皮肤红肿</List.Item>
            <List.Item
              extra={<Switch
                {...getFieldProps('lowerLimbsErythema', {
                  initialValue: lowerLimbsErythema,
                  valuePropName: 'checked',
                })}
                platform="android"
              />}
            >下肢红斑</List.Item>
            <List.Item
              extra={<Switch
                {...getFieldProps('arthralgia', {
                  initialValue: arthralgia,
                  valuePropName: 'checked',
                })}
                platform="android"
              />}
            >关节疼痛</List.Item>
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
})(createForm()(withRouter(FirstTimeOnset)));
