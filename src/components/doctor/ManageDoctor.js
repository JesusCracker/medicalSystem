import React, { PureComponent } from "react";
import { Flex, NavBar, Icon, Button, InputItem, List, Switch, Toast } from 'antd-mobile';
import { connect } from 'dva';
import style from './CompleteHistory.less'
import { createForm } from 'rc-form';

@connect(({ doctor, loading }) => ({
    doctor,
    loading: loading.models.doctor,
}))
class ManageDoctor extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    saveDoctor = () => {
        const { form, location, dispatch, history } = this.props
        const { state } = location
        const { validateFields } = form;
        validateFields({ force: true }, (error) => {
            if (!error) {
                const doctorInformation = form.getFieldsValue()
                doctorInformation.admin = doctorInformation.admin === true ? 2 : 1
                doctorInformation.status = doctorInformation.status === true ? 1 : 2
                doctorInformation.type = 2
                if (state !== null && state.e) {
                    doctorInformation.id = state.e.id
                }
                dispatch({
                    type: 'doctor/addDoctor',
                    payload: { ...doctorInformation },
                }).then((res) => {
                    if (res && res.data.status === 1 && res.data.message === '成功') {
                        Toast.success('编辑成功', 1);
                        history.back()
                    } else {
                        Toast.fail(res.data.message, 1);
                    }
                })
            } else {
                Toast.info("请确认表单内容填写是否正确");
            }
        })
    }

    render() {
        const { history, form, location } = this.props
        const { state } = location
        const { getFieldProps } = form;
        return (
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="cross" />}
                    onLeftClick={() => history.back()}
                    className={style.header}>IGM病史登记表</NavBar>
                <List className={style.FormContent}>
                    <div>
                        <Flex className={style.inputTitle}>
                            <Flex.Item className={style.inputTitleLeft}>添加/修改医生：</Flex.Item>
                        </Flex>
                        <div>
                            <InputItem
                                {...getFieldProps('username', {
                                    initialValue: state !== null ? state.e.username : null,
                                    rules: [{ required: true }],
                                })}
                                placeholder="请输入"
                            ><span style={{ color: 'red' }}>*</span>医生姓名</InputItem>
                            <InputItem
                                {...getFieldProps('account', {
                                    initialValue: state !== null ? state.e.account : null,
                                    rules: [{ required: true }],
                                })}
                                type="number"
                                placeholder="请输入"
                            ><span style={{ color: 'red' }}>*</span>手机号码</InputItem>
                            <List.Item
                                extra={<Switch
                                    {...getFieldProps('admin', {
                                        initialValue: state !== null ? state.e.admin === 2 ? true : false : false,
                                        valuePropName: 'checked',
                                    })}
                                    platform="android"
                                />}
                            >管理员</List.Item>
                            <List.Item
                                extra={<Switch
                                    {...getFieldProps('status', {
                                        initialValue: state !== null ? state.e.status === 1 ? true : false : false,
                                        valuePropName: 'checked',
                                    })}
                                    platform="android"
                                />}
                            >状态</List.Item>
                        </div>
                    </div>
                    <div className={style.btnContent}>
                        <Button onClick={() => history.back()} className={style.doctorBtn1}>取消</Button>
                        <Button onClick={this.saveDoctor} className={style.doctorBtn2}>保存</Button>
                    </div>
                </List>

            </div>
        )
    }
}


export default createForm()(ManageDoctor);
