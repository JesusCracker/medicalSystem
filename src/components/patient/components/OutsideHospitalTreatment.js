import React, { PureComponent } from "react";
import { Flex, Button, InputItem, List, Modal, Checkbox } from 'antd-mobile';
import style from './Maternity.less'
import { createForm } from 'rc-form';
import {connect} from "dva";
import {withRouter} from "dva/router";

const CheckboxItem = Checkbox.CheckboxItem;
class OutsideHospitalTreatment extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      modal1: false,
      MedicalName: '',
      MedicalData: [
        {
          label: '输液',
          value: '输液',
          checked: false
        },
        {
          label: '口服抗生素',
          value: '口服抗生素',
          checked: false
        },
        {
          label: '中药或中成药',
          value: '中药或中成药',
          checked: false
        },
        {
          label: '激素类药(泼尼松，地塞米松或其他)',
          value: '激素类药(泼尼松，地塞米松或其他)',
          checked: false
        },
        {
          label: '溴隐亭',
          value: '溴隐亭',
          checked: false
        },
        {
          label: '三联抗结核药',
          value: '三联抗结核药',
          checked: false
        },
        {
          label: '其他药物',
          value: '其他药物',
          checked: false
        },
      ],
      OperateName:'',
      OpetateData: [
        {
          label: '穿刺活检',
          value: '穿刺活检',
          checked: false
        },
        {
          label: '穿刺抽脓',
          value: '穿刺抽脓',
          checked: false
        },
        {
          label: '切开引流',
          value: '切开引流',
          checked: false
        },
        {
          label: '乳管冲洗',
          value: '乳管冲洗',
          checked: false
        },
        {
          label: '热敷',
          value: '热敷',
          checked: false
        },
        {
          label: '其他',
          value: '其他',
          checked: false
        },
      ]
    };
  }

  showModal = key => (e) => {
    e.preventDefault();
    this.setState({
      [key]: true,
    });
  }

  onClose = key => () => {
    this.setState({
      [key]: false,
    });
  }

  //操作详情多选
  addOperate = (e, i) => {
    const {form} = this.props;
    const { OpetateData } = this.state;
    const newData = JSON.parse(JSON.stringify(OpetateData));
    newData[i].checked = !(e.checked);
    const checkedLab = [];
    newData.forEach((item) => {
      if (item.checked === true) {
        checkedLab.push(item.label);
      }
    });
    form.setFieldsValue({
      operateStatus: checkedLab.join('/')
    })
    this.setState({
      OpetateData: newData,
      OperateName: checkedLab.join('/'),
    });
  };

  //用药情况多选
  addMedical = (e, i) => {
    const {form} = this.props;
    const { MedicalData } = this.state;
    const newData = JSON.parse(JSON.stringify(MedicalData));
    newData[i].checked = !(e.checked);
    const checkedLab = [];
    newData.forEach((item) => {
      if (item.checked === true) {
        checkedLab.push(item.label);
      }
    });
    form.setFieldsValue({
      medicationStatus: checkedLab.join('/')
    })
    this.setState({
      MedicalData: newData,
      MedicalName: checkedLab.join('/'),
    });
  };

  handleSave = (type) => {
    const {form, dispatch, location, history} = this.props;
    const {getFieldsValue} = form;
    // medicationStatus, transfuseMedicineName, operateStatus, antibioticName
    const {...params} = getFieldsValue(['medicationStatus', 'transfuseMedicineName', 'operateStatus', 'antibioticName']);
    if (location.state && location.state.id) {
      params.id = location.state.id
    }
    params.userId = JSON.parse(localStorage.getItem('patientInfo')).id;
    params.step = 9;
    dispatch({
      type: 'historyCollection/postPatientHistory',
      payload: params
    }).then(res => {
      if (res && res.status === 1) {
        if(type === 'close') {
          history.push('/patientRegister')
        } else {
          history.push('/historyCollection/onsetAndTreatment', {id: location.state.id})
        }
      }
    })
  }

  componentDidMount() {
    const {location, dispatch, form} = this.props;
    const {MedicalData, OpetateData} = this.state;
    if (location.state && location.state.id) {
      dispatch({
        type: 'historyCollection/getPatientHistoryDetail',
        payload: {
          id: location.state.id
        }
      }).then(res => {
        const {medicationStatus, transfuseMedicineName, operateStatus, antibioticName} = res.data;
        if (medicationStatus) {
          medicationStatus.split('/').forEach(medicationStatusItem => {
            MedicalData.forEach(item => {
              if (item.value === medicationStatusItem) {
                item.checked = true
              }
            })
          })
        }
        if (operateStatus) {
          operateStatus.split('/').forEach(operateStatusItem => {
            OpetateData.forEach(item => {
              if (item.value === operateStatusItem) {
                item.checked = true
              }
            })
          })
        }
        form.setFieldsValue({
          medicationStatus,
          transfuseMedicineName,
          operateStatus,
          antibioticName
        })
      })
    }
  }

  render() {
    const { form } = this.props
    const { getFieldProps } = form;
    const { MedicalData,MedicalName,OperateName,OpetateData } = this.state

    return (
      <div className={style.patientFormContent}>
        <div>
          <Flex className={style.inputTitle}>
            <Flex.Item className={style.inputTitleLeft}>治疗经过：</Flex.Item>
          </Flex>
          <div>
            <InputItem
              {...getFieldProps('medicationStatus',{
                initialValue:MedicalName
              })}
              placeholder="请选择"
              editable={false}
              onClick={this.showModal('modal')}
            >用药情况</InputItem>
            <Modal
              popup
              visible={this.state.modal}
              onClose={this.onClose('modal')}
              animationType="slide-up"
            >
              <List renderHeader={() => <div>用药情况</div>} className="popup-list">
                {MedicalData.map((e, i) => (
                  <CheckboxItem key={e.value} checked={e.checked} onChange={() => this.addMedical(e, i)}>
                    {e.label}
                  </CheckboxItem>
                ))}
                <List.Item>
                  <Button type="primary" onClick={this.onClose('modal')}>确定</Button>
                </List.Item>
              </List>
            </Modal>
            <InputItem
              {...getFieldProps('transfuseMedicineName')}
              placeholder="请输入"
            >输液药剂名称</InputItem>
            <InputItem
              {...getFieldProps('antibioticName')}
              placeholder="请输入"
            >抗生素名称</InputItem>
            <InputItem
              {...getFieldProps('operateStatus',{
                initialValue:OperateName
              })}
              placeholder="请选择"
              editable={false}
              onClick={this.showModal('modal1')}
            >操作情况</InputItem>
            <Modal
              popup
              visible={this.state.modal1}
              onClose={this.onClose('modal1')}
              animationType="slide-up"
            >
              <List renderHeader={() => <div>操作情况</div>} className="popup-list">
                {OpetateData.map((e, i) => (
                  <CheckboxItem key={e.value} checked={e.checked} onChange={() => this.addOperate(e, i)}>
                    {e.label}
                  </CheckboxItem>
                ))}
                <List.Item>
                  <Button type="primary" onClick={this.onClose('modal1')}>确定</Button>
                </List.Item>
              </List>
            </Modal>
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
})(createForm()(withRouter(OutsideHospitalTreatment)));
