import React, {PureComponent} from "react";
import {Flex, Button, InputItem, DatePicker, List, Switch, Picker} from 'antd-mobile';
import style from './Maternity.less'
import moment from "moment";
import {createForm} from 'rc-form';
import {connect} from "dva";
import {withRouter} from "dva/router";


class Maternity extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      checked1: false,
      checked2: false,
      checked3: false,
      checked4: false,
      times: []
    };
  }

  renderPicker(res) {
    const {form} = this.props;
    form.setFieldsValue({
      bearNo: res
    })
    let arr = []
    for(let i = 0; i < Number(res); i++) {
      arr.push(i);
    }
    this.setState({
      times: arr
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
        const {pregnancyNo, bearNo, lastPregnancyStatus, abactus, lastPregnancyAfterIllnessTime, fetusSex, confinementStatus, lactation, promoteLactation, mastitis, bearDate} = res.data;
        form.setFieldsValue({
          pregnancyNo,
          bearNo,
          lastPregnancyStatus: [lastPregnancyStatus],
          abactus: abactus === 2,
          lastPregnancyAfterIllnessTime: [lastPregnancyAfterIllnessTime],
          fetusSex: [fetusSex],
          confinementStatus: [confinementStatus],
          lactation: lactation === 2,
          promoteLactation: promoteLactation === 2,
          mastitis: mastitis === 2
        })
        let arr = []
        for(let i = 0; i < Number(bearNo); i++) {
          arr.push(i);
        }
        this.setState({
          times: arr
        }, () => {
          let obj = {};
          if (bearDate) {
            for(let i = 0; i < bearDate.split(',').length; i++) {
              // obj.push(`bearDate${i}`)
              obj[`bearDate${i}`] = new Date(bearDate.split(',')[i])
            }
          }
          form.setFieldsValue({
            ...obj
          })
        })
      })
    }
  }

  handleSave(type) {
    const {times} = this.state;
    const {form, dispatch, location, history} = this.props
    const {getFieldsValue} = form;
    // ????????????????????????
    let arr = [];
    for(let i = 0; i < times.length; i++) {
      arr.push(`bearDate${i}`)
    }
    let bearDateArr = [];
    Object.keys(getFieldsValue([...arr])).forEach(key => {
      // eslint-disable-next-line no-unused-expressions
      getFieldsValue([...arr])[key] ? bearDateArr.push(moment(getFieldsValue([...arr])[key]).format('YYYY-MM-DD')) : '';
    })
    const bearDate = bearDateArr.join(',');
    const params = {};
    // pregnancyNo, bearNo, lastPregnancyStatus, abactus, lastPregnancyAfterIllnessTime, fetusSex, confinementStatus, lactation, promoteLactation, mastitis
    const {pregnancyNo, bearNo, lastPregnancyStatus, abactus, lastPregnancyAfterIllnessTime, fetusSex, confinementStatus, lactation, promoteLactation, mastitis} = getFieldsValue(['pregnancyNo', 'bearNo', 'lastPregnancyStatus', 'abactus', 'lastPregnancyAfterIllnessTime', 'fetusSex', 'confinementStatus', 'lactation', 'promoteLactation', 'mastitis']);
    params.pregnancyNo = pregnancyNo && Number(pregnancyNo);
    params.bearNo = bearNo && Number(bearNo);
    params.lastPregnancyStatus = lastPregnancyStatus && lastPregnancyStatus[0];
    params.abactus = abactus ? 2 : 1;
    params.lastPregnancyAfterIllnessTime = lastPregnancyAfterIllnessTime && lastPregnancyAfterIllnessTime[0];
    params.fetusSex = fetusSex && fetusSex[0];
    params.confinementStatus = confinementStatus && confinementStatus[0];
    params.lactation = lactation ? 2 : 1;
    params.promoteLactation = promoteLactation ? 2 : 1;
    params.mastitis = mastitis ? 2 : 1;
    params.bearDate = bearDate;
    if (location.state && location.state.id) {
      params.id = location.state.id
    }
    params.userId = JSON.parse(localStorage.getItem('patientInfo')).id;
    params.step = 6;
    dispatch({
      type: 'historyCollection/postPatientHistory',
      payload: params
    }).then(res => {
      if (res && res.status === 1) {
        if(type === 'close') {
          history.push('/patientRegister')
        } else {
          history.push('/historyCollection/past', {id: location.state.id})
        }
      }
    })
  }

  render() {
    const {form} = this.props
    const {getFieldProps} = form;
    const {checked1, checked2, checked3, checked4, times} = this.state;
    const data1 = [
      {
        label: '??????',
        value: '??????',
      },
      {
        label: '??????',
        value: '??????',
      },
      {
        label: '???????????????',
        value: '???????????????',
      },
      {
        label: '????????????',
        value: '????????????',
      },
    ]

    const data2 = [
      {
        label: '1?????????',
        value: '1?????????',
      },
      {
        label: '1-2???',
        value: '1-2???',
      },
      {
        label: '2-3???',
        value: '2-3???',
      },
      {
        label: '3-4???',
        value: '3-4???',
      },
      {
        label: '4?????????',
        value: '4?????????',
      },
    ]

    const data3 = [
      {
        label: '???',
        value: '???',
      },
      {
        label: '???',
        value: '???',
      },
      {
        label: '??????????????????',
        value: '??????????????????',
      },
    ]

    const data4 = [
      {
        label: '?????????????????????',
        value: '?????????????????????',
      },
      {
        label: '??????????????????????????????',
        value: '??????????????????????????????',
      },
      {
        label: '?????????????????????????????????',
        value: '?????????????????????????????????',
      },
      {
        label: '??????????????????????????????',
        value: '??????????????????????????????',
      },
    ]

    return (
      <div className={style.patientFormContent}>
        <div>
          <Flex className={style.inputTitle}>
            <Flex.Item className={style.inputTitleLeft}>???????????????</Flex.Item>
          </Flex>
          <div>
            <InputItem
              {...getFieldProps('pregnancyNo')}
              placeholder="???????????????"
              type="number"
            >????????????</InputItem>
            <InputItem
              {...getFieldProps('bearNo')}
              placeholder="???????????????"
              type="number"
              onChange={(res) => this.renderPicker(res)}
            >????????????</InputItem>
            {
              times.map((_, index) => {
                return (
                  <DatePicker
                    key={index}
                    {...getFieldProps(`bearDate${index}`)}
                    minDate={new Date(1900, 0, 1, 0,0,0)}
                    maxDate={new Date()}
                    mode="date"
                    title="????????????"
                    extra="?????????"
                  >
                    <List.Item>???{index + 1}???????????????</List.Item>
                  </DatePicker>
                )
              })
            }
            <Picker
              {...getFieldProps('lastPregnancyStatus')}
              data={data1}
              cols={1}
            >
              <List.Item>??????????????????</List.Item>
            </Picker>
            <List.Item
              extra={<Switch
                {...getFieldProps('abactus', {
                  initialValue: checked1,
                  valuePropName: 'checked',
                })}
                platform="android"
              />}
            >????????????</List.Item>
          </div>
          <Flex className={style.inputTitle}>
            <Flex.Item className={style.inputTitleLeft}>????????????????????????(???????????????)???</Flex.Item>
          </Flex>
          <div>
            <Picker
              {...getFieldProps('lastPregnancyAfterIllnessTime')}
              data={data2}
              cols={1}
            >
              <List.Item>?????????????????????</List.Item>
            </Picker>
            <Picker
              {...getFieldProps('fetusSex')}
              data={data3}
              cols={1}
            >
              <List.Item>????????????</List.Item>
            </Picker>
            <Picker
              {...getFieldProps('confinementStatus')}
              data={data4}
              cols={1}
            >
              <List.Item>???????????????</List.Item>
            </Picker>
          </div>
          <Flex className={style.inputTitle}>
            <Flex.Item className={style.inputTitleLeft}>??????????????????</Flex.Item>
          </Flex>
          <div>
            <List.Item
              extra={<Switch
                {...getFieldProps('lactation', {
                  initialValue: checked2,
                  valuePropName: 'checked',
                })}
                platform="android"
              />}
            >?????????</List.Item>
            <List.Item
              extra={<Switch
                {...getFieldProps('promoteLactation', {
                  initialValue: checked3,
                  valuePropName: 'checked',
                })}
                platform="android"
              />}
            >?????????/????????????</List.Item>
            <List.Item
              extra={<Switch
                {...getFieldProps('mastitis', {
                  initialValue: checked4,
                  valuePropName: 'checked',
                })}
                platform="android"
              />}
            >????????????/??????</List.Item>
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
})(createForm()(withRouter(Maternity)));
