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
        value: '??????',
        label: '??????'
      },
      {
        value: '??????',
        label: '??????'
      }
    ]
    const interval = [
      {
        value: '1?????????',
        label: '1?????????'
      },
      {
        value: '1-2???',
        label: '1-2???'
      },
      {
        value: '2-3???',
        label: '2-3???'
      },
      {
        value: '3-4???',
        label: '3-4???'
      },
      {
        value: '4?????????',
        label: '4?????????'
      },
    ]
    const position = [
      {
        value: '??????',
        label: '??????'
      },
      {
        value: '??????',
        label: '??????'
      },
      {
        value: '????????????',
        label: '????????????'
      }
    ]
    const symptom = [
      {
        value: '??????',
        label: '??????'
      },
      {
        value: '??????',
        label: '??????'
      },
      {
        value: '???????????????',
        label: '???????????????'
      },
      {
        value: '????????????',
        label: '????????????'
      },
      {
        value: '??????',
        label: '??????'
      },
    ]
    const size = [
      {
        value: '???????????????',
        label: '???????????????'
      },
      {
        value: '???????????????????????????',
        label: '???????????????????????????'
      },
      {
        value: '????????????????????????',
        label: '????????????????????????'
      },
      {
        value: '????????????',
        label: '????????????'
      }
    ]
    return (
      <div className={style.patientFormContent}>
        <div>
          <Flex className={style.inputTitle}>
            <Flex.Item className={style.inputTitleLeft}>?????????????????????</Flex.Item>
          </Flex>
          <div>
            <DatePicker
              {...getFieldProps('illnessDate')}
              mode="date"
              title="????????????"
              extra="?????????"
              format="YYYY-MM-DD"
              minDate={new Date(1900, 0, 1, 0,0,0)}
              maxDate={new Date()}
            >
              <List.Item>
                ????????????
              </List.Item>
            </DatePicker>
            <Picker
              {...getFieldProps('illnessPeriod')}
              data={range}
              cols={1}
            >
              <List.Item onClick={this.onClick}>????????????</List.Item>
            </Picker>
            <Picker
              {...getFieldProps('illnessTimeForNow')}
              data={interval}
              cols={1}
            >
              <List.Item onClick={this.onClick}>??????????????????</List.Item>
            </Picker>
            {getFieldValue('illnessTimeForNow') && getFieldValue('illnessTimeForNow')[0] === '4?????????' && <InputItem
              {...getFieldProps('illnessMonthForNow')}
              placeholder="?????????"
              type="number"
            >
              ??????????????????
            </InputItem>}
          </div>
          <Flex className={style.inputTitle}>
            <Flex.Item className={style.inputTitleLeft}>?????????????????????</Flex.Item>
          </Flex>
          <div>
            <Picker
              {...getFieldProps('illnessPosition')}
              data={position}
              cols={1}
            >
              <List.Item onClick={this.onClick}>????????????</List.Item>
            </Picker>
            <Picker
              {...getFieldProps('illnessExpression')}
              data={symptom}
              cols={1}
            >
              <List.Item onClick={this.onClick}>??????????????????</List.Item>
            </Picker>
            <Picker
              {...getFieldProps('tumorSize')}
              data={size}
              cols={1}
            >
              <List.Item onClick={this.onClick}>????????????</List.Item>
            </Picker>
            <List.Item
              extra={<Switch
                {...getFieldProps('inflamedSkin', {
                  initialValue: inflamedSkin,
                  valuePropName: 'checked',
                })}
                platform="android"
              />}
            >????????????</List.Item>
            <List.Item
              extra={<Switch
                {...getFieldProps('lowerLimbsErythema', {
                  initialValue: lowerLimbsErythema,
                  valuePropName: 'checked',
                })}
                platform="android"
              />}
            >????????????</List.Item>
            <List.Item
              extra={<Switch
                {...getFieldProps('arthralgia', {
                  initialValue: arthralgia,
                  valuePropName: 'checked',
                })}
                platform="android"
              />}
            >????????????</List.Item>
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
})(createForm()(withRouter(FirstTimeOnset)));
