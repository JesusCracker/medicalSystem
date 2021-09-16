import React, { PureComponent } from "react";
import { Flex, Button, TextareaItem } from 'antd-mobile';
//import PropTypes from 'prop-types'
import style from './Maternity.less'
import { createForm } from 'rc-form';
import {connect} from "dva";
import {withRouter} from "dva/router";


class OnsetAndTreatment extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleSave = (type) => {
    const {form, dispatch, location, history} = this.props;
    const {getFieldsValue} = form;
    // illnessAndTreatHistory, treatImpression
    const {...params} = getFieldsValue(['illnessAndTreatHistory', 'treatImpression']);
    if (location.state && location.state.id) {
      params.id = location.state.id
    }
    params.userId = JSON.parse(localStorage.getItem('patientInfo')).id;
    params.step = 10;
    params.commitStatus = type === 'close' ?  1 : 2;
    dispatch({
      type: 'historyCollection/postPatientHistory',
      payload: params
    }).then(res => {
      if (res && res.status === 1) {
        if(type === 'close') {
          history.push('/patientRegister')
        } else {
          history.push('/patientRegister', {id: location.state.id})
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
        const {illnessAndTreatHistory, treatImpression} = res.data;
        form.setFieldsValue({
          illnessAndTreatHistory,
          treatImpression
        })
      })
    }
  }

  render() {
    const { form } = this.props
    const { getFieldProps } = form;

    return (
      <div className={style.patientFormContent}>
        <div>
          <Flex className={style.inputTitle}>
            <Flex.Item className={style.inputTitleLeft}>发病及治疗经过：</Flex.Item>
          </Flex>
          <div>
            <p style={{color:'#666',fontSize:'12px'}}>请按时间顺序排列，诊断何病？如何治疗？特别是用激素，抗结核药的剂量与时间，穿刺与手术的时间、细菌培养和病理结果</p>
            <TextareaItem
            {...getFieldProps('illnessAndTreatHistory')}
            rows={5}
            placeholder='请输入'
          />
          </div>
          <Flex className={style.inputTitle}>
            <Flex.Item className={style.inputTitleLeft}>就诊感想（自愿填写）：</Flex.Item>
          </Flex>
          <div>
            <p style={{color:'#666',fontSize:'12px'}}>通过您的就诊经历，您有何感想？为什么会这么曲折艰难？请您写一段文字吧，字数不限。</p>
            <TextareaItem
            {...getFieldProps('treatImpression')}
            rows={5}
            placeholder='请输入'
          />
          </div>
        </div>

        <div className={style.btnContent}>
          <Button className={style.doctorBtn1} onClick={() => this.handleSave('close')}>保存后关闭</Button>
          <Button className={style.doctorBtn2} onClick={() => this.handleSave()}>保存并提交</Button>
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
})(createForm()(withRouter(OnsetAndTreatment)));
