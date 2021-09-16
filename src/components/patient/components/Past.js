import React, { PureComponent } from "react";
import { Flex, Button, InputItem, List, Switch, Picker } from 'antd-mobile';
import style from './Maternity.less'
import { createForm } from 'rc-form';
import {connect} from "dva";
import {withRouter} from "dva/router";


class Past extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      checked2: false,
    };
  }

  handleSave = (type) => {
    // tookPill, injectedBCGVaccine, longTermMedication, medicineName, breastInjury, endocrineDisease, breastDisease, thyroidDisease, immuneDisease
    const {form, dispatch, location, history} = this.props
    const {getFieldsValue} = form;
    const {tookPill, injectedBCGVaccine, longTermMedication, medicineName, breastInjury, endocrineDisease, breastDisease, thyroidDisease, immuneDisease} = getFieldsValue(['tookPill', 'injectedBCGVaccine', 'longTermMedication', 'medicineName', 'breastInjury', 'endocrineDisease', 'breastDisease', 'thyroidDisease', 'immuneDisease'])
    const params = {};
    params.tookPill = tookPill && tookPill[0];
    params.injectedBCGVaccine = injectedBCGVaccine && injectedBCGVaccine[0];
    params.longTermMedication = longTermMedication && longTermMedication[0];
    params.medicineName = medicineName;
    params.breastInjury = breastInjury ? 2 : 1;
    params.endocrineDisease = endocrineDisease && endocrineDisease[0];
    params.breastDisease = breastDisease && breastDisease[0];
    params.thyroidDisease = thyroidDisease && thyroidDisease[0];
    params.immuneDisease = immuneDisease && immuneDisease[0];
    if (location.state && location.state.id) {
      params.id = location.state.id
    }
    params.userId = JSON.parse(localStorage.getItem('patientInfo')).id;
    params.step = 7;
    dispatch({
      type: 'historyCollection/postPatientHistory',
      payload: params
    }).then(res => {
      if (res && res.status === 1) {
        if(type === 'close') {
          history.push('/patientRegister')
        } else {
          history.push('/historyCollection/past1', {id: location.state.id})
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
        const {tookPill, injectedBCGVaccine, longTermMedication, medicineName, breastInjury, endocrineDisease, breastDisease, thyroidDisease, immuneDisease} = res.data;
        form.setFieldsValue({
          tookPill: tookPill && [tookPill],
          injectedBCGVaccine: injectedBCGVaccine && [injectedBCGVaccine],
          longTermMedication: longTermMedication && [longTermMedication],
          medicineName,
          breastInjury: breastInjury === 2,
          endocrineDisease: endocrineDisease && [endocrineDisease],
          breastDisease: breastDisease && [breastDisease],
          thyroidDisease: thyroidDisease && [thyroidDisease],
          immuneDisease: immuneDisease && [immuneDisease]
        })
      })
    }
  }

  render() {
    const { form } = this.props
    const { getFieldProps, getFieldValue } = form;
    const { checked2 } = this.state

    const data1 = [
      {
        label: '从不',
        value: '从不',
      },
      {
        label: '偶尔服用紧急避孕药',
        value: '偶尔服用紧急避孕药',
      },
      {
        label: '长时间服用短效避孕药',
        value: '长时间服用短效避孕药',
      },
      {
        label: '其他',
        value: '其他',
      },
    ]

    const data2 = [
      {
        label: '有',
        value: '有',
      },
      {
        label: '无',
        value: '无',
      },
      {
        label: '不清楚',
        value: '不清楚',
      },
    ]

    const data3 = [
      {
        label: '精神分裂症、抑郁焦虑症药物（奥氨平、利培酮等）',
        value: '精神分裂症、抑郁焦虑症药物（奥氨平、利培酮等）',
      },
      {
        label: '其他药物',
        value: '其他药物',
      },
      {
        label: '未服用特殊药物',
        value: '未服用特殊药物',
      },
    ]

    const data4 = [
      {
        label: '垂体瘤',
        value: '垂体瘤',
      },
      {
        label: '高泌乳素血症',
        value: '高泌乳素血症',
      },
      {
        label: '糖尿病',
        value: '糖尿病',
      },
      {
        label: '其他',
        value: '其他',
      },
      {
        label: '无',
        value: '无',
      },
    ]

    const data5 = [
      {
        label: '乳腺增生',
        value: '乳腺增生',
      },
      {
        label: '急性乳腺炎',
        value: '急性乳腺炎',
      },
      {
        label: '纤维腺瘤',
        value: '纤维腺瘤',
      },
      {
        label: '乳癌',
        value: '乳癌',
      },
      {
        label: '无',
        value: '无',
      },
    ]

    const data6 = [
      {
        label: '甲亢',
        value: '甲亢',
      },
      {
        label: '甲减',
        value: '甲减',
      },
      {
        label: '亚甲炎',
        value: '亚甲炎',
      },
      {
        label: '桥甲炎',
        value: '桥甲炎',
      },
      {
        label: '无',
        value: '无',
      },
    ]

    const data7 = [
      {
        label: '风湿或类风湿',
        value: '风湿或类风湿',
      },
      {
        label: '狼疮',
        value: '狼疮',
      },
      {
        label: '干燥综合症',
        value: '干燥综合症',
      },
      {
        label: '其他',
        value: '其他',
      },
      {
        label: '无',
        value: '无',
      },
    ]

    return (
      <div className={style.patientFormContent}>
        <div>
          <Flex className={style.inputTitle}>
            <Flex.Item className={style.inputTitleLeft}>药物史：</Flex.Item>
          </Flex>
          <div>
            <Picker
              {...getFieldProps('tookPill')}
              data={data1}
              cols={1}
            >
              <List.Item onClick={this.onClick}>服用避孕药</List.Item>
            </Picker>
            <Picker
              {...getFieldProps('injectedBCGVaccine')}
              data={data2}
              cols={1}
            >
              <List.Item onClick={this.onClick}>卡介苗注射</List.Item>
            </Picker>
            <p style={{color:'#0099FF',marginLeft:'125px',fontSize:'12px'}}>卡介苗即注射后局部会形成明显瘢痕</p>
            <Picker
              {...getFieldProps('longTermMedication')}
              data={data3}
              cols={1}
            >
              <List.Item onClick={this.onClick}>长期服药</List.Item>
            </Picker>
            <div style={{display: getFieldValue('longTermMedication') && getFieldValue('longTermMedication')[0] !== '未服用特殊药物'? 'block' : 'none'}}>
              <InputItem
                {...getFieldProps('medicineName')}
                placeholder="请输入"
              >
                药物名称
              </InputItem>
            </div>
          </div>
          <Flex className={style.inputTitle}>
            <Flex.Item className={style.inputTitleLeft}>疾病史：</Flex.Item>
          </Flex>
          <div>
            <List.Item
              extra={<Switch
                {...getFieldProps('breastInjury', {
                  initialValue: checked2,
                  valuePropName: 'checked',
                })}
                platform="android"
              />}
            >乳房外伤</List.Item>
            <p style={{color:'#0099FF',marginLeft:'125px',fontSize:'12px'}}>本次发病前有外伤</p>
            <Picker
              {...getFieldProps('endocrineDisease')}
              data={data4}
              cols={1}
            >
              <List.Item onClick={this.onClick}>内分泌疾病</List.Item>
            </Picker>
            <Picker
              {...getFieldProps('breastDisease')}
              data={data5}
              cols={1}
            >
              <List.Item onClick={this.onClick}>乳腺疾病</List.Item>
            </Picker>
            <Picker
              {...getFieldProps('thyroidDisease')}
              data={data6}
              cols={1}
            >
              <List.Item onClick={this.onClick}>甲状腺疾病</List.Item>
            </Picker>
            <Picker
              {...getFieldProps('immuneDisease')}
              data={data7}
              cols={1}
            >
              <List.Item onClick={this.onClick}>免疫性疾病</List.Item>
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
})(createForm()(withRouter(Past)));
