import React, {PureComponent} from "react";
import DoctorLogin from './Header'
import styles from './LoginPage.less'
import {InputItem, Button, Toast} from 'antd-mobile'
import {withRouter} from 'dva/router'
import {createForm} from 'rc-form';
import {connect} from 'dva'

@createForm()
class LoginPage extends PureComponent {

  state = {
    time: 59,
    loading: false
  }

  timer = null;

  // waitOneMinute:等待一分钟
  waitOneMinute = (timer, time, loading) => {
    /*
      timer: string,需要再class的this声明, 保存定时器, 用于组件销毁之前清除定时器
      time: string,需要再state中声明,用于显示倒计时
      loading: string,需要再state中声明, 用于控制按钮loading
    */
    let sec = 59;
    this.setState({
      [loading]: true,
      [time]: sec
    })
    this[timer] = setInterval(() => {
      if (sec > 0) {
        this.setState({
          [time]: sec -= 1
        })
      } else {
        clearInterval(this[timer])
        this.setState({
          [loading]: false
        })
      }
    }, 1000)
  }

  sendMessage = () => {
    const {form,dispatch} = this.props;
    const {validateFields} = form;
    validateFields(['phone'], (err, val) => {
      if (!err) {
        // 发送短信
        dispatch({
          type: 'login/getVerify',
          payload: {
            account: val.phone
          }
        })
        this.waitOneMinute('timer', 'time', 'loading');
      }
    })
  }

  handleLogin = () => {
    const {location, history, form, dispatch} = this.props;
    const {validateFields} = form;

    validateFields((err, val) => {
      if (!err) {
        const data = {
          account: val.phone,
          verifyCode: val.code
        }

        if (location.pathname === '/') {
          dispatch({
            type: 'login/patientLogin',
            payload: data
          }).then(res => {
            if(res && res.status === 1) {
              localStorage.setItem('token', res.data.token);
              localStorage.setItem('patientInfo', JSON.stringify(res.data));
              Toast.success('成功登录', 1);
              history.push('/patientRegister')
            } else {
              Toast.fail('登录失败', 1);
            }
          })
        } else if (location.pathname === '/doctor') {
          dispatch({
            type: 'login/doctorLogin',
            payload: data
          }).then(res => {
            if(res && res.status === 1) {
              localStorage.setItem('token', res.data.token);
              localStorage.setItem('doctorInfo', JSON.stringify(res.data));
              Toast.success('成功登录', 1);
              history.push('/doctorPatientList')
            } else {
              Toast.fail('登录失败', 1);
            }
          })
        }
      }
    })

  }

  render() {
    const {title, form} = this.props;
    const {loading, time} = this.state;
    const {getFieldProps, getFieldError} = form;
    let errors;
    return (
      <div>
        <DoctorLogin
          titleNavbar='病史采集系统'
        />

        <div className={styles.container}>

          <div
            style={{marginBottom: '20px'}}
          >
            {title}登录
          </div>

          <InputItem
            {...getFieldProps('phone', {
              rules: [{
                required: true, message: '请输入手机号码'
              }, {
                min: 11, message: '手机号不足11位'
              }, {
                max: 11, message: '手机号超过11位'
              }
              ]})
            }
            type="number"
            style={{border: '1px solid rgba(0,0,0,.2)', padding: '8px'}}
            placeholder="请输入手机号码"
          />
          <span style={{color: 'red'}}>{(errors = getFieldError('phone')) ? errors.join(',') : null}</span>
          <div className={styles.messageBox}>
            <div className={styles.message}>
              <InputItem
                {...getFieldProps('code', {
                  rules: [{
                    required: true, message: '请输入验证码', trigger: 'onBlur'
                  }],
                })}
                style={{border: '1px solid rgba(0,0,0,.2)', padding: '8px', width: '50vw', marginRight: '4vw'}}
                placeholder="请输入验证码"
              />
              <Button
                type='warning' style={{width: '30vw', height: '42px', lineHeight: '42px', fontSize: '16px'}}
                size='small'
                onClick={() => this.sendMessage()}
                loading={loading}
                disabled={loading}
              >
                {loading ? `${time} 秒` : '获取验证码'}
              </Button>
            </div>
            <span style={{color: 'red'}}>{(errors = getFieldError('code')) ? errors.join(',') : null}</span>
          </div>

          <Button
            type='primary'
            style={{borderRadius: '50px'}}
            onClick={() => this.handleLogin()}
          >
            登录
          </Button>
        </div>
      </div>
    )
  }
}

export default connect((state,loading) => {
  return {
    login: state.login,
    loading
  };
})(withRouter(LoginPage));
