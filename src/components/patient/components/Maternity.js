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
    // 处理生育次数参数
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
        label: '生育',
        value: '生育',
      },
      {
        label: '引产',
        value: '引产',
      },
      {
        label: '人流或药流',
        value: '人流或药流',
      },
      {
        label: '自然流产',
        value: '自然流产',
      },
    ]

    const data2 = [
      {
        label: '1年之内',
        value: '1年之内',
      },
      {
        label: '1-2年',
        value: '1-2年',
      },
      {
        label: '2-3年',
        value: '2-3年',
      },
      {
        label: '3-4年',
        value: '3-4年',
      },
      {
        label: '4年以上',
        value: '4年以上',
      },
    ]

    const data3 = [
      {
        label: '男',
        value: '男',
      },
      {
        label: '女',
        value: '女',
      },
      {
        label: '已流产或引产',
        value: '已流产或引产',
      },
    ]

    const data4 = [
      {
        label: '休息好，心情好',
        value: '休息好，心情好',
      },
      {
        label: '没休息好，也心情郁闷',
        value: '没休息好，也心情郁闷',
      },
      {
        label: '休息还可以，但心情郁闷',
        value: '休息还可以，但心情郁闷',
      },
      {
        label: '没休息好，但心情愉悦',
        value: '没休息好，但心情愉悦',
      },
    ]

    return (
      <div className={style.patientFormContent}>
        <div>
          <Flex className={style.inputTitle}>
            <Flex.Item className={style.inputTitleLeft}>孕产数量：</Flex.Item>
          </Flex>
          <div>
            <InputItem
              {...getFieldProps('pregnancyNo')}
              placeholder="请输入数字"
              type="number"
            >怀孕次数</InputItem>
            <InputItem
              {...getFieldProps('bearNo')}
              placeholder="请输入数字"
              type="number"
              onChange={(res) => this.renderPicker(res)}
            >生育次数</InputItem>
            {
              times.map((_, index) => {
                return (
                  <DatePicker
                    key={index}
                    {...getFieldProps(`bearDate${index}`)}
                    minDate={new Date(1900, 0, 1, 0,0,0)}
                    maxDate={new Date()}
                    mode="date"
                    title="选择日期"
                    extra="请选择"
                  >
                    <List.Item>第{index + 1}次生育日期</List.Item>
                  </DatePicker>
                )
              })
            }
            <Picker
              {...getFieldProps('lastPregnancyStatus')}
              data={data1}
              cols={1}
            >
              <List.Item>上次怀孕情况</List.Item>
            </Picker>
            <List.Item
              extra={<Switch
                {...getFieldProps('abactus', {
                  initialValue: checked1,
                  valuePropName: 'checked',
                })}
                platform="android"
              />}
            >人工流产</List.Item>
          </div>
          <Flex className={style.inputTitle}>
            <Flex.Item className={style.inputTitleLeft}>最近一次妊娠情况(生育或流产)：</Flex.Item>
          </Flex>
          <div>
            <Picker
              {...getFieldProps('lastPregnancyAfterIllnessTime')}
              data={data2}
              cols={1}
            >
              <List.Item>离本次发病时间</List.Item>
            </Picker>
            <Picker
              {...getFieldProps('fetusSex')}
              data={data3}
              cols={1}
            >
              <List.Item>胎儿性别</List.Item>
            </Picker>
            <Picker
              {...getFieldProps('confinementStatus')}
              data={data4}
              cols={1}
            >
              <List.Item>坐月子情况</List.Item>
            </Picker>
          </div>
          <Flex className={style.inputTitle}>
            <Flex.Item className={style.inputTitleLeft}>哺乳期情况：</Flex.Item>
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
            >哺乳史</List.Item>
            <List.Item
              extra={<Switch
                {...getFieldProps('promoteLactation', {
                  initialValue: checked3,
                  valuePropName: 'checked',
                })}
                platform="android"
              />}
            >通乳师/暴力通乳</List.Item>
            <List.Item
              extra={<Switch
                {...getFieldProps('mastitis', {
                  initialValue: checked4,
                  valuePropName: 'checked',
                })}
                platform="android"
              />}
            >患乳腺炎/脓肿</List.Item>
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
})(createForm()(withRouter(Maternity)));
