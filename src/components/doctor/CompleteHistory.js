import React, { PureComponent } from "react";
import { Flex, NavBar, Icon, Button, InputItem, DatePicker, List, Switch, ImagePicker, Toast } from 'antd-mobile';
import PropTypes from 'prop-types'
import style from './CompleteHistory.less'
import { connect } from 'dva';
import moment from 'moment'
import { createForm } from 'rc-form';

@connect(({ doctor, loading }) => ({
    doctor,
    loading: loading.models.doctor,
}))

class CompleteHistory extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            checked1: false,
            checked2: false,
            checked3: false,
            checked4: false,
            checked5: false,
            checked6: false,
            files: [],
        };
    }

    componentDidMount() {
        const { dispatch, location } = this.props;
        const { state } = location
        dispatch({
            type: 'doctor/fetchMedcialHostoryDetail',
            payload: { id: state.id },
        });
    }

    //预览病史
    preview = () => {
        const { history, location } = this.props
        const { state } = location
        history.push('/checkPatient', { type: 'doctor', id: state.id })
    }

    //上传图片
    onChangeFiles = (files, type, index) => {
        if (files && files.length > 0) {
            let file = files[0].file;
            // 选择的文件是图片
            if (file.type.indexOf("image") === 0) {
                // 压缩图片需要的一些元素和对象
                let reader = new FileReader(),
                    //创建一个img对象
                    img = new Image();

                reader.readAsDataURL(file);
                // 文件base64化，以便获知图片原始尺寸
                reader.onload = function (e) {
                    img.src = e.currentTarget.result;
                };
                const that = this;
                // base64地址图片加载完毕后执行
                img.onload = function () {
                    // 缩放图片需要的canvas（也可以在DOM中直接定义canvas标签，这样就能把压缩完的图片不转base64也能直接显示出来）
                    let canvas = document.createElement('canvas');
                    let context = canvas.getContext('2d');

                    // 图片原始尺寸
                    let originWidth = this.width;
                    let originHeight = this.height;

                    // 最大尺寸限制，可通过设置宽高来实现图片压缩程度
                    let maxWidth = this.width * 0.5,
                        maxHeight = this.height * 0.5;
                    // 目标尺寸
                    let targetWidth = originWidth,
                        targetHeight = originHeight;
                    // 图片尺寸超过300x300的限制
                    if (originWidth > maxWidth || originHeight > maxHeight) {
                        if (originWidth / originHeight > maxWidth / maxHeight) {
                            // 更宽，按照宽度限定尺寸
                            targetWidth = maxWidth;
                            targetHeight = Math.round(maxWidth * (originHeight / originWidth));
                        } else {
                            targetHeight = maxHeight;
                            targetWidth = Math.round(maxHeight * (originWidth / originHeight));
                        }
                    }
                    // canvas对图片进行缩放
                    canvas.width = targetWidth;
                    canvas.height = targetHeight;
                    // 清除画布
                    context.clearRect(0, 0, targetWidth, targetHeight);
                    // 图片压缩
                    context.drawImage(img, 0, 0, targetWidth, targetHeight);
                    /*第一个参数是创建的img对象；第二三个参数是左上角坐标，后面两个是画布区域宽高*/
                    //压缩后的图片转base64 url
                    /*canvas.toDataURL(mimeType, qualityArgument),mimeType 默认值是'image/png';
                     * qualityArgument表示导出的图片质量，只有导出为jpeg和webp格式的时候此参数才有效，默认值是0.92*/
                    let newUrl = canvas.toDataURL('image/jpeg', 0.6);//base64 格式
                    that.setState({
                        files: [{ url: newUrl }]
                    })
                }
            } else {
                Toast.fail('请确定图片格式', 3, true)
            }
        } else {
            this.setState({
                files: []
            })
        }
    }

    //保存
    save = () => {
        const { form, location, dispatch, history } = this.props
        const { files } = this.state
        const { state } = location
        const { validateFields } = form;
        validateFields({ force: true }, (error) => {
            if (!error) {
                const HisFormData = form.getFieldsValue()
                HisFormData.docInflamedSkin = HisFormData.docInflamedSkin === true ? 2 : 1
                HisFormData.docLowerLimbsErythema = HisFormData.docLowerLimbsErythema === true ? 2 : 1
                HisFormData.docNippleDischarge = HisFormData.docNippleDischarge === true ? 2 : 1
                HisFormData.docNippleRetraction = HisFormData.docNippleRetraction === true ? 2 : 1
                HisFormData.docSkinFestered = HisFormData.docSkinFestered === true ? 2 : 1
                HisFormData.docSuperficialAbscess = HisFormData.docSuperficialAbscess === true ? 2 : 1
                HisFormData.docTreatCheckDate = HisFormData.docTreatCheckDate ? moment(HisFormData.docTreatCheckDate).format('YYYY-MM-DD') : ''
                HisFormData.dicLumpScopePic = files[0] ? files[0].url : null
                HisFormData.docDeal = HisFormData.docDeal || null
                HisFormData.docDrainageTubeNo = HisFormData.docDrainageTubeNo || null
                HisFormData.docOther = HisFormData.docOther || null
                HisFormData.id = state.id
                Toast.loading('请稍等...', 0, true)
                dispatch({
                    type: 'doctor/addPatientHistory',
                    payload: { ...HisFormData },
                }).then((res) => {
                    Toast.hide()
                    if (res && res.data.status === 1 && res.data.message === '成功') {
                        Toast.success('完善信息成功', 1);
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
        const { history, form, doctor: { MedcialHostoryDetail } } = this.props
        const { getFieldProps } = form;
        const { checked1, checked2, checked3, checked4, checked5, checked6, files } = this.state
        return (
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="cross" />}
                    onLeftClick={() => history.back()}
                    className={style.header}>IGM病史登记表</NavBar>
                <List className={style.FormContent}>
                    <div className={style.contentTitle}>完善病史信息</div>
                    <div>
                        <Flex className={style.inputTitle}>
                            <Flex.Item className={style.inputTitleLeft}>患者信息：</Flex.Item>
                            <Flex.Item className={style.inputTitleRight}><span onClick={this.preview}>预览病史</span></Flex.Item>
                        </Flex>
                        <div>
                            <InputItem
                                {...getFieldProps('treatNo', {
                                    initialValue: MedcialHostoryDetail.treatNo || '',
                                })}
                                placeholder="请输入"
                            >登记号</InputItem>
                            <InputItem
                                {...getFieldProps('hospitalNo', {
                                    initialValue: MedcialHostoryDetail.hospitalNo || '',
                                })}
                                placeholder="请输入"
                            >住院号</InputItem>
                            <InputItem
                                {...getFieldProps('treatCardNo', {
                                    initialValue: MedcialHostoryDetail.treatCardNo || '',
                                })}
                                placeholder="请输入"
                            >卡号</InputItem>
                        </div>
                        <Flex className={style.inputTitle}>
                            <Flex.Item className={style.inputTitleLeft}>首诊查体情况：</Flex.Item>
                        </Flex>
                        <div>
                            <DatePicker
                                {...getFieldProps('docTreatCheckDate', {
                                    rules: [{ required: true }],
                                })}
                                mode="date"
                                maxDate={new Date()}
                                title="选择日期"
                                extra="请选择"
                            >
                                <List.Item><span style={{ color: 'red' }}>*</span>首诊查体日期</List.Item>
                            </DatePicker>
                            <List.Item
                                extra={<Switch
                                    {...getFieldProps('docNippleRetraction', {
                                        initialValue: checked1,
                                        valuePropName: 'checked',
                                    })}
                                    platform="android"
                                />}
                            >乳头内陷</List.Item>
                            <List.Item
                                extra={<Switch
                                    {...getFieldProps('docInflamedSkin', {
                                        initialValue: checked2,
                                        valuePropName: 'checked',
                                    })}
                                    platform="android"
                                />}
                            >皮肤红肿</List.Item>
                            <List.Item
                                extra={<Switch
                                    {...getFieldProps('docSkinFestered', {
                                        initialValue: checked3,
                                        valuePropName: 'checked',
                                    })}
                                    platform="android"
                                />}
                            >皮肤溃破</List.Item>
                            <List.Item
                                extra={<Switch
                                    {...getFieldProps('docSuperficialAbscess', {
                                        initialValue: checked4,
                                        valuePropName: 'checked',
                                    })}
                                    platform="android"
                                />}
                            >浅表脓肿</List.Item>
                            <List.Item
                                extra={<Switch
                                    {...getFieldProps('docNippleDischarge', {
                                        initialValue: checked5,
                                        valuePropName: 'checked',
                                    })}
                                    platform="android"
                                />}
                            >乳头溢液</List.Item>
                            <List.Item
                                extra={<Switch
                                    {...getFieldProps('docLowerLimbsErythema', {
                                        initialValue: checked6,
                                        valuePropName: 'checked',
                                    })}
                                    platform="android"
                                />}
                            >下肢红斑</List.Item>
                            <InputItem
                                {...getFieldProps('docDrainageTubeNo')}
                                placeholder="请输入"
                                type="number"
                            >引流管数</InputItem>
                            <InputItem
                                {...getFieldProps('docOther')}
                                placeholder="请输入"
                            >其他</InputItem>
                            <InputItem
                                {...getFieldProps('docDeal')}
                                placeholder="请输入"
                            >处理</InputItem>
                        </div>
                        <Flex className={style.inputTitle}>
                            <Flex.Item className={style.inputTitleLeft}>硬块范围：</Flex.Item>
                        </Flex>
                        <div>
                            <ImagePicker
                                files={files}
                                onChange={this.onChangeFiles}
                                selectable={files.length < 1}
                            />
                        </div>
                    </div>
                    <div className={style.btnContent}>
                        <Button onClick={() => history.back()} className={style.doctorBtn1}>直接关闭</Button>
                        <Button onClick={this.save} className={style.doctorBtn2}>保存并关闭</Button>
                    </div>
                </List>
            </div>
        )
    }
}


CompleteHistory.propTypes = {
    doctor: PropTypes.object
};
CompleteHistory.defaultProps = {
    doctor: {
        MedcialHostoryDetail: {},
    },
};

export default createForm()(CompleteHistory);
