import React, {PureComponent} from "react";
import moment from "moment";
import {NavBar, Icon, DatePicker, List, InputItem, Button} from "antd-mobile";
import style from "../header.less";
import styles from './RegisterNotice.less';
import {createForm} from 'rc-form';

@createForm()
class RegisterNotice extends PureComponent {
  state = {
    known: false
  }

  // 确认已阅读填表提示
  hasRead = () => {
    const {known} = this.state;
    this.setState({
      known: !known,
      date: ''
    })
  }
  // 点击取消按钮
  handleCancel = () => {
    const { history } = this.props;
    history.back();
  }
  // 开始登记
  handleSubmit = () => {
    const {form, dispatch, history} = this.props;
    const {getFieldsValue} = form;
    const {treatDate, ...data} = getFieldsValue(['treatDate', 'treatNo', 'hospitalNo', 'treatCardNo']);
    data.treatDate = moment(treatDate).format('YYYY-MM-DD');
    data.userId = JSON.parse(localStorage.getItem('patientInfo')).id;
    dispatch({
      type: 'patientRegister/postHistory',
      payload: data
    }).then(res => {
      if (res && res.status === 1) {
        history.push('/historyCollection/baseInfo', {id: res.data.id})
      }
    })
  }

  render() {
    const {history, form} = this.props;
    const {known} = this.state;
    const {getFieldProps} = form;
    return (
      <div>
        <NavBar
          mode="light"
          icon={<Icon type="cross"/>}
          onLeftClick={() => history.back()}
          className={style.header}
        >
          IGM病史登记列表
        </NavBar>
        <div className={styles.container}>
          <div className={styles.textBox}>
            <p className={styles.title}>
              登记须知：
            </p>
            <p>
              病友您好，填表之前请先仔细查看内容，看你理解多少？能正确填写多少？从填表的过程中，您会更加深入的了解您所患的疾病。因每个人的文化程度不同，理解能力也不等，不必勉强填写。真实的病史资料对医生的正确诊治十分重要，所以一定要如实登记。
            </p>
            <p>
              谢谢大家的配合。我们承诺将会对您的信息保密。
            </p>
          </div>
          <div className={styles.itemBox}>
            <div className={known ? styles.isActive : ''}>
              已知晓上述内容
              <Icon className={styles.icon} type='check' onClick={() => this.hasRead()}/>
            </div>
          </div>
          { known ? (
            <div>
              <div className={styles.datePickerBox}>
                我院首次就诊日期：
                <DatePicker
                  {...getFieldProps('treatDate')}
                  minDate={new Date(1900, 0, 1, 0, 0, 0)}
                  maxDate={new Date()}
                  mode="date"
                  title="选择日期"
                  extra="请选择"
                >
                  <List.Item />
                </DatePicker>
              </div>
              {
                form.getFieldValue('treatDate') ? (
                  <div className={styles.otherInfo}>
                    就诊相关信息(选填)：
                    <InputItem
                      {...getFieldProps('treatNo')}
                      placeholder="请输入登记号"
                    />
                    <InputItem
                      {...getFieldProps('hospitalNo')}
                      placeholder="请输入住院号"
                    />
                    <InputItem
                      {...getFieldProps('treatCardNo')}
                      placeholder="请输入卡号"
                    />
                  </div>
                ) : ''
              }

              <div className={styles.btnBox}>
                <Button style={{width: '25vw', marginRight: '3vw'}} onClick={() => this.handleCancel()}>取消登记</Button>
                <Button type="primary" style={{width: '60vw'}} disabled={!form.getFieldValue('treatDate')} onClick={() => this.handleSubmit()}>开始登记</Button>
              </div>
              <div className={styles.footer}>填表日期：{moment().format('YYYY-MM-DD')}</div>
            </div>
          ) : ''}
          <div className={styles.blank} />
        </div>
      </div>
    )
  }
}

export default RegisterNotice;
