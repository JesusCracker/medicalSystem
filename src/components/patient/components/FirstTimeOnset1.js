import React, { PureComponent } from "react";
import { createForm } from "rc-form";
import style from "./Maternity.less";
import { Button, Flex, InputItem, List, Picker, Switch, Modal, Checkbox } from "antd-mobile";
import {connect} from "dva";
import {withRouter} from "dva/router";

const CheckboxItem = Checkbox.CheckboxItem;
class FirstTimeOnset1 extends PureComponent {
  state = {
    modal:false,
    gestationOnset: false,
    lactationOnset: false,
    foodNameData:[],
    foodName: '',
    foodData: [
      {
        value: '火锅，烧烤或辛辣刺激等食物',
        label: '火锅，烧烤或辛辣刺激等食物',
        checked: false
      },
      {
        value: '海鲜',
        label: '海鲜',
        checked: false
      },
      {
        value: '热带水果(芒果，榴莲等)',
        label: '热带水果(芒果，榴莲等)',
        checked: false
      },
      {
        value: '均无以上',
        label: '均无以上',
        checked: false
      },
      {
        value: '个人认为特殊的食物',
        label: '个人认为特殊的食物',
        checked: false
      },
    ]
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

  addFood = (e, i) => {
    const {form} = this.props;
    const { foodData } = this.state;
    const newData = JSON.parse(JSON.stringify(foodData));
    newData[i].checked = !(e.checked);
    console.log(e);
    if(e.value === '均无以上') {
      for(let index = 0; index < 3; index++) {
        newData[index].checked = false;
      }
    } else if(i < 3) {
      newData[3].checked = false;
    }
    const checkedLab = [];
    newData.forEach((item) => {
      if (item.checked === true) {
        checkedLab.push(item.label);
      }
    });
    form.setFieldsValue({
      dietaryStatus: checkedLab.join('/')
    })
    this.setState({
      foodData: newData,
      foodName: checkedLab.join('/'),
      foodNameData:checkedLab
    });
  };

  handleSave = (type) => {
    const {form, dispatch, location, history} = this.props;
    const {getFieldsValue} = form;
    // gestationOnset, lactationOnset, menstruationOnset, dietaryStatus, specialFood, illnessSpeed
    const {gestationOnset, lactationOnset, menstruationOnset, dietaryStatus, specialFood, illnessSpeed} = getFieldsValue(['gestationOnset', 'lactationOnset', 'menstruationOnset', 'dietaryStatus', 'specialFood', 'illnessSpeed']);
    const params = {};
    params.gestationOnset = gestationOnset ? 2 : 1;
    params.lactationOnset = lactationOnset ? 2 : 1;
    params.menstruationOnset = menstruationOnset && menstruationOnset[0];
    params.dietaryStatus = dietaryStatus;
    params.specialFood = specialFood;
    params.illnessSpeed = illnessSpeed && illnessSpeed[0];
    if (location.state && location.state.id) {
      params.id = location.state.id
    }
    params.userId = JSON.parse(localStorage.getItem('patientInfo')).id;
    params.step = 4;
    dispatch({
      type: 'historyCollection/postPatientHistory',
      payload: params
    }).then(res => {
      if (res && res.status === 1) {
        if(type === 'close') {
          history.push('/patientRegister')
        } else {
          history.push('/historyCollection/afterOnset', {id: location.state.id})
        }
      }
    })
  }


  componentDidMount() {
    const {location, dispatch, form} = this.props;
    const {foodData} = this.state;
    if (location.state && location.state.id) {
      dispatch({
        type: 'historyCollection/getPatientHistoryDetail',
        payload: {
          id: location.state.id
        }
      }).then(res => {
        const {gestationOnset, lactationOnset, menstruationOnset, dietaryStatus, specialFood, illnessSpeed} = res.data;
        this.setState({
          foodNameData:dietaryStatus && dietaryStatus.split('/') || []
        },()=>{
          this.state.foodNameData.forEach(dietaryStatusItem => {
            foodData.forEach(item => {
              if (item.value === dietaryStatusItem) {
                item.checked = true
              }
            })
          })
        })
        form.setFieldsValue({
          gestationOnset: gestationOnset === 2,
          lactationOnset: lactationOnset === 2,
          menstruationOnset: [menstruationOnset],
          dietaryStatus,
          specialFood,
          illnessSpeed: [illnessSpeed]
        })
      })
    }
  }

  render() {
    const { form } = this.props
    const { getFieldProps } = form;
    const { gestationOnset, lactationOnset,foodName,foodData,foodNameData} = this.state;
    const menstrualPeriod = [
      {
        value: '月经期第1周',
        label: '月经期第1周'
      },
      {
        value: '月经期第2周',
        label: '月经期第2周'
      },
      {
        value: '月经期第3周',
        label: '月经期第3周'
      },
      {
        value: '月经期第4周',
        label: '月经期第4周'
      },
      {
        value: '月经期4周以上',
        label: '月经期4周以上'
      },
    ]
    const speed = [
      {
        value: '一周以内突然发现',
        label: '一周以内突然发现'
      },
      {
        value: '一周以内缓慢出现',
        label: '一周以内缓慢出现'
      },
      {
        value: '超过一周以上',
        label: '超过一周以上'
      },
    ]

    return (
      <div className={style.patientFormContent}>
        <div>
          <Flex className={style.inputTitle}>
            <Flex.Item className={style.inputTitleLeft}>特殊时期发病：</Flex.Item>
          </Flex>
          <div>
            <List.Item
              extra={<Switch
                {...getFieldProps('gestationOnset', {
                  initialValue: gestationOnset,
                  valuePropName: 'checked',
                })}
                platform="android"
              />}
            >妊娠期发病</List.Item>
            <List.Item
              extra={<Switch
                {...getFieldProps('lactationOnset', {
                  initialValue: lactationOnset,
                  valuePropName: 'checked',
                })}
                platform="android"
              />}
            >哺乳期发病</List.Item>
            <Picker
              {...getFieldProps('menstruationOnset')}
              data={menstrualPeriod}
              cols={1}
            >
              <List.Item onClick={this.onClick}>月经期发病</List.Item>
            </Picker>
          </div>
          <Flex className={style.inputTitle}>
            <Flex.Item className={style.inputTitleLeft}>发病前饮食情况：</Flex.Item>
          </Flex>
          <div>
            <InputItem
              {...getFieldProps('dietaryStatus', {
                initialValue: foodName
              })}
              placeholder="请选择"
              editable={false}
              onClick={this.showModal('modal')}
            >饮食情况</InputItem>
            <Modal
              popup
              visible={this.state.modal}
              onClose={this.onClose('modal')}
              animationType="slide-up"
            >
              <List renderHeader={() => <div>饮食情况</div>} className="popup-list">
                {foodData.map((e, i) => (
                  <CheckboxItem key={e.value} checked={e.checked} onChange={() => this.addFood(e, i)}>
                    {e.label}
                  </CheckboxItem>
                ))}
                <List.Item>
                  <Button type="primary" onClick={this.onClose('modal')}>确定</Button>
                </List.Item>
              </List>
            </Modal>
            <div style={{display: foodNameData.indexOf('个人认为特殊的食物') !== -1 ? 'block' : 'none'}}>
              <InputItem
                {...getFieldProps('specialFood')}
                placeholder="请输入"
              >
                特殊食物描述
              </InputItem>
            </div>
          </div>
          <Flex className={style.inputTitle}>
            <Flex.Item className={style.inputTitleLeft}>其他情况：</Flex.Item>
          </Flex>
          <div>
            <Picker
              {...getFieldProps('illnessSpeed')}
              data={speed}
              cols={1}
            >
              <List.Item onClick={this.onClick}>发病速度</List.Item>
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
})(createForm()(withRouter(FirstTimeOnset1)));
