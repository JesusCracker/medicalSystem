import React, { Fragment, PureComponent } from "react";
import { Flex, NavBar, Icon, Button } from 'antd-mobile';
import { connect } from 'dva';
import { imgUrlPath } from '../global';
import moment from 'moment'
import style from './PatientDetails.less'


@connect(({ doctor, loading }) => ({
    doctor,
    loading: loading.models.doctor,
}))
@connect(({ historyCollection, loading }) => ({
    historyCollection,
    loading: loading.models.historyCollection,
}))
class PatientDetails extends PureComponent {

    componentDidMount() {
        const { dispatch, location } = this.props;
        const { state } = location
        if (state.type === 'doctor') {
            dispatch({
                type: 'doctor/fetchMedcialHostoryDetail',
                payload: { id: state.id },
            });
        } else if (state.type === 'patient') {
            dispatch({
                type: 'historyCollection/getPatientHistoryDetail',
                payload: { id: state.id },
            });
        }

    }

    render() {
        const { history, location, doctor: { MedcialHostoryDetail }, historyCollection: { historyDetail } } = this.props
        const { state } = location
        const detailData = state.type === 'doctor' ? MedcialHostoryDetail : state.type === 'patient' ? historyDetail : {}
        return (
            <Fragment>
                <NavBar
                    mode="light"
                    icon={<Icon type="cross" />}
                    onLeftClick={() => history.back()}
                    className={style.header}>IGM病史登记表</NavBar>
                <div className={style.moudleContent}>
                    <div>
                        {state.type === 'doctor' &&
                            <div>
                                <Flex className={style.rowDetail}>
                                    <Flex.Item className={style.detailTitle}>登记号：</Flex.Item>
                                    <Flex.Item>{detailData.treatNo || ''}</Flex.Item>
                                </Flex>
                                <Flex className={style.rowDetail}>
                                    <Flex.Item className={style.detailTitle}>住院号：</Flex.Item>
                                    <Flex.Item>{detailData.hospitalNo || ''}</Flex.Item>
                                </Flex>
                                <Flex className={style.rowDetail}>
                                    <Flex.Item className={style.detailTitle}>卡号：</Flex.Item>
                                    <Flex.Item>{detailData.treatCardNo || ''}</Flex.Item>
                                </Flex>
                            </div>
                        }
                        <Flex className={style.rowDetail}>
                            <Flex.Item className={style.detailTitle}>我院首次就诊日期：</Flex.Item>
                            <Flex.Item>{detailData.treatDate || ''}</Flex.Item>
                        </Flex>
                        <Flex className={style.rowDetail}>
                            <Flex.Item className={style.detailTitle}>填表日期：</Flex.Item>
                            <Flex.Item>{detailData.createdDate || ''}</Flex.Item>
                        </Flex>
                    </div>
                    <div className={style.moudleTitle}>基本情况</div>
                    <div>
                        <Flex className={style.rowDetail}>
                            <Flex.Item className={style.detailTitle}>姓名：</Flex.Item>
                            <Flex.Item>{detailData.name || ''}</Flex.Item>
                        </Flex>
                        <Flex className={style.rowDetail}>
                            <Flex.Item className={style.detailTitle}>年龄：</Flex.Item>
                            <Flex.Item>{detailData.age || ''}</Flex.Item>
                        </Flex>
                        <Flex className={style.rowDetail}>
                            <Flex.Item className={style.detailTitle}>身份证号：</Flex.Item>
                            <Flex.Item>{detailData.idCard || ''}</Flex.Item>
                        </Flex>
                        <Flex className={style.rowDetail}>
                            <Flex.Item className={style.detailTitle}>籍贯：</Flex.Item>
                            <Flex.Item>{detailData.nativePlace || ''}</Flex.Item>
                        </Flex>
                        <Flex className={style.rowDetail}>
                            <Flex.Item className={style.detailTitle}>居住地址：</Flex.Item>
                            <Flex.Item>{detailData.address ? detailData.provinceName + detailData.cityName + detailData.countyName + detailData.address : ''}</Flex.Item>
                        </Flex>
                        <Flex className={style.rowDetail}>
                            <Flex.Item className={style.detailTitle}>本人手机：</Flex.Item>
                            <Flex.Item>{detailData.mobile || ''}</Flex.Item>
                        </Flex>
                        <Flex className={style.rowDetail}>
                            <Flex.Item className={style.detailTitle}>家属电话：</Flex.Item>
                            <Flex.Item>{detailData.familyMobile || ''}</Flex.Item>
                        </Flex>
                    </div>
                    <div className={style.moudleTitle}>生活工作情况</div>
                    <div>
                        <Flex className={style.rowDetail}>
                            <Flex.Item className={style.detailTitle}>婚姻状态：</Flex.Item>
                            <Flex.Item>{detailData.maritalStatus || ''}</Flex.Item>
                        </Flex>
                        <Flex className={style.rowDetail}>
                            <Flex.Item className={style.detailTitle}>文化程度：</Flex.Item>
                            <Flex.Item>{detailData.educationLevel || ''}</Flex.Item>
                        </Flex>
                        <Flex className={style.rowDetail}>
                            <Flex.Item className={style.detailTitle}>职业：</Flex.Item>
                            <Flex.Item>{detailData.job || ''}</Flex.Item>
                        </Flex>
                        <Flex className={style.rowDetail}>
                            <Flex.Item className={style.detailTitle}>单位：</Flex.Item>
                            <Flex.Item>{detailData.company || ''}</Flex.Item>
                        </Flex>
                        <Flex className={style.rowDetail}>
                            <Flex.Item className={style.detailTitle}>单位职务：</Flex.Item>
                            <Flex.Item>{detailData.position || ''}</Flex.Item>
                        </Flex>
                        <Flex className={style.rowDetail}>
                            <Flex.Item className={style.detailTitle}>身高(cm)：</Flex.Item>
                            <Flex.Item>{detailData.height || ''}</Flex.Item>
                        </Flex>
                        <Flex className={style.rowDetail}>
                            <Flex.Item className={style.detailTitle}>体重(kg)：</Flex.Item>
                            <Flex.Item>{detailData.weight || ''}</Flex.Item>
                        </Flex>
                    </div>
                    <div className={style.moudleTitle}>首次发病情况</div>
                    <div>
                        <Flex className={style.rowDetail}>
                            <Flex.Item className={style.detailTitle}>发病日期：</Flex.Item>
                            <Flex.Item>{detailData.illnessDate? moment(detailData.illnessDate).format('yyyy-MM-DD') :''}</Flex.Item>
                        </Flex>
                        <Flex className={style.rowDetail}>
                            <Flex.Item className={style.detailTitle}>发病时段：</Flex.Item>
                            <Flex.Item>{detailData.illnessPeriod || ''}</Flex.Item>
                        </Flex>
                        <Flex className={style.rowDetail}>
                            <Flex.Item className={style.detailTitle}>离现在的时间：</Flex.Item>
                            <Flex.Item>{detailData.illnessTimeForNow || ''}</Flex.Item>
                        </Flex>
                        <Flex className={style.rowDetail}>
                            <Flex.Item className={style.detailTitle}>发病位置：</Flex.Item>
                            <Flex.Item>{detailData.illnessPosition || ''}</Flex.Item>
                        </Flex>
                        <Flex className={style.rowDetail}>
                            <Flex.Item className={style.detailTitle}>发病最初表现：</Flex.Item>
                            <Flex.Item>{detailData.illnessExpression || ''}</Flex.Item>
                        </Flex>
                        <Flex className={style.rowDetail}>
                            <Flex.Item className={style.detailTitle}>肿块大小：</Flex.Item>
                            <Flex.Item>{detailData.tumorSize || ''}</Flex.Item>
                        </Flex>
                        <Flex className={style.rowDetail}>
                            <Flex.Item className={style.detailTitle}>皮肤红肿：</Flex.Item>
                            <Flex.Item>{detailData.inflamedSkin ? detailData.inflamedSkin === 1 ? '否' : '是' : ''}</Flex.Item>
                        </Flex>
                        <Flex className={style.rowDetail}>
                            <Flex.Item className={style.detailTitle}>下肢红斑：</Flex.Item>
                            <Flex.Item>{detailData.lowerLimbsErythema ? detailData.lowerLimbsErythema === 1 ? '否' : '是' : ''}</Flex.Item>
                        </Flex>
                        <Flex className={style.rowDetail}>
                            <Flex.Item className={style.detailTitle}>关节疼痛：</Flex.Item>
                            <Flex.Item>{detailData.arthralgia ? detailData.arthralgia === 1 ? '无' : '有' : ''}</Flex.Item>
                        </Flex>
                        <Flex className={style.rowDetail}>
                            <Flex.Item className={style.detailTitle}>妊娠期发病：</Flex.Item>
                            <Flex.Item>{detailData.gestationOnset ? detailData.gestationOnset === 1 ? '否' : '是' : ''}</Flex.Item>
                        </Flex>
                        <Flex className={style.rowDetail}>
                            <Flex.Item className={style.detailTitle}>哺乳期发病：</Flex.Item>
                            <Flex.Item>{detailData.lactationOnset ? detailData.lactationOnset === 1 ? '否' : '是' : ''}</Flex.Item>
                        </Flex>
                        <Flex className={style.rowDetail}>
                            <Flex.Item className={style.detailTitle}>月经期发病：</Flex.Item>
                            <Flex.Item>{detailData.menstruationOnset || ''}</Flex.Item>
                        </Flex>
                        <Flex className={style.rowDetail}>
                            <Flex.Item className={style.detailTitle}>饮食情况：</Flex.Item>
                            <Flex.Item>{detailData.dietaryStatus || ''}</Flex.Item>
                        </Flex>
                        <Flex className={style.rowDetail}>
                            <Flex.Item className={style.detailTitle}>发病速度：</Flex.Item>
                            <Flex.Item>{detailData.illnessSpeed || ''}</Flex.Item>
                        </Flex>
                    </div>
                    <div className={style.moudleTitle}>发病后情况</div>
                    <div>
                        <Flex className={style.rowDetail}>
                            <Flex.Item className={style.detailTitle}>热敷：</Flex.Item>
                            <Flex.Item>{detailData.hotCompress ? detailData.hotCompress === 1 ? '无' : '有' : ''}</Flex.Item>
                        </Flex>
                        <Flex className={style.rowDetail}>
                            <Flex.Item className={style.detailTitle}>按摩：</Flex.Item>
                            <Flex.Item>{detailData.massage ? detailData.massage === 1 ? '无' : '有' : ''}</Flex.Item>
                        </Flex>
                        <Flex className={style.rowDetail}>
                            <Flex.Item className={style.detailTitle}>皮肤破溃：</Flex.Item>
                            <Flex.Item>{detailData.skinFestered ? detailData.skinFestered === 1 ? '否' : '是' : ''}</Flex.Item>
                        </Flex>
                        <Flex className={style.rowDetail}>
                            <Flex.Item className={style.detailTitle}>就诊时间：</Flex.Item>
                            <Flex.Item>{detailData.treatAfterIllnessTime || ''}</Flex.Item>
                        </Flex>
                        <Flex className={style.rowDetail}>
                            <Flex.Item className={style.detailTitle}>首次就诊医院：</Flex.Item>
                            <Flex.Item>{detailData.treatHospotal || ''}</Flex.Item>
                        </Flex>
                        <Flex className={style.rowDetail}>
                            <Flex.Item className={style.detailTitle}>首次就诊科室：</Flex.Item>
                            <Flex.Item>{detailData.treatDepartment || ''}</Flex.Item>
                        </Flex>
                    </div>
                    <div className={style.moudleTitle}>孕产情况</div>
                    <div>
                        <Flex className={style.rowDetail}>
                            <Flex.Item className={style.detailTitle}>怀孕次数：</Flex.Item>
                            <Flex.Item>{detailData.pregnancyNo || ''}</Flex.Item>
                        </Flex>
                        <Flex className={style.rowDetail}>
                            <Flex.Item className={style.detailTitle}>生育次数：</Flex.Item>
                            <Flex.Item>{detailData.bearNo || ''}</Flex.Item>
                        </Flex>
                        <Flex className={style.rowDetail}>
                            <Flex.Item className={style.detailTitle}>生育日期：</Flex.Item>
                            <Flex.Item>{detailData.bearDate || ''}</Flex.Item>
                        </Flex>
                        <Flex className={style.rowDetail}>
                            <Flex.Item className={style.detailTitle}>上次怀孕情况：</Flex.Item>
                            <Flex.Item>{detailData.lastPregnancyStatus || ''}</Flex.Item>
                        </Flex>
                        <Flex className={style.rowDetail}>
                            <Flex.Item className={style.detailTitle}>人工流产：</Flex.Item>
                            <Flex.Item>{detailData.abactus ? detailData.abactus === 1 ? '无' : '有' : ''}</Flex.Item>
                        </Flex>
                        <Flex className={style.rowDetail}>
                            <Flex.Item className={style.detailTitle}>最近一次妊娠时间：</Flex.Item>
                            <Flex.Item>{detailData.lastPregnancyAfterIllnessTime || ''}</Flex.Item>
                        </Flex>
                        <Flex className={style.rowDetail}>
                            <Flex.Item className={style.detailTitle}>胎儿性别：</Flex.Item>
                            <Flex.Item>{detailData.fetusSex || ''}</Flex.Item>
                        </Flex>
                        <Flex className={style.rowDetail}>
                            <Flex.Item className={style.detailTitle}>坐月子情况：</Flex.Item>
                            <Flex.Item>{detailData.confinementStatus || ''}</Flex.Item>
                        </Flex>
                        <Flex className={style.rowDetail}>
                            <Flex.Item className={style.detailTitle}>哺乳史：</Flex.Item>
                            <Flex.Item>{detailData.lactation ? detailData.lactation === 1 ? '无' : '有' : ''}</Flex.Item>
                        </Flex>
                        <Flex className={style.rowDetail}>
                            <Flex.Item className={style.detailTitle}>通乳师通乳/暴力通乳：</Flex.Item>
                            <Flex.Item>{detailData.promoteLactation ? detailData.promoteLactation === 1 ? '无' : '有' : ''}</Flex.Item>
                        </Flex>
                        <Flex className={style.rowDetail}>
                            <Flex.Item className={style.detailTitle}>哺乳期患乳腺炎/脓肿：</Flex.Item>
                            <Flex.Item>{detailData.mastitis ? detailData.mastitis === 1 ? '无' : '有' : ''}</Flex.Item>
                        </Flex>
                    </div>
                    <div className={style.moudleTitle}>既往情况</div>
                    <div>
                        <Flex className={style.rowDetail}>
                            <Flex.Item className={style.detailTitle}>服用避孕药：</Flex.Item>
                            <Flex.Item>{detailData.tookPill || ''}</Flex.Item>
                        </Flex>
                        <Flex className={style.rowDetail}>
                            <Flex.Item className={style.detailTitle}>卡介苗注射：</Flex.Item>
                            <Flex.Item>{detailData.injectedBCGVaccine || ''}</Flex.Item>
                        </Flex>
                        <Flex className={style.rowDetail}>
                            <Flex.Item className={style.detailTitle}>长期服药：</Flex.Item>
                            <Flex.Item>{detailData.longTermMedication || ''}</Flex.Item>
                        </Flex>
                        <Flex className={style.rowDetail}>
                            <Flex.Item className={style.detailTitle}>本次发病前乳房外伤：</Flex.Item>
                            <Flex.Item>{detailData.breastInjury ? detailData.breastInjury === 1 ? '无' : '有' : ''}</Flex.Item>
                        </Flex>
                        <Flex className={style.rowDetail}>
                            <Flex.Item className={style.detailTitle}>内分泌疾病：</Flex.Item>
                            <Flex.Item>{detailData.endocrineDisease || ''}</Flex.Item>
                        </Flex>
                        <Flex className={style.rowDetail}>
                            <Flex.Item className={style.detailTitle}>乳腺疾病：</Flex.Item>
                            <Flex.Item>{detailData.breastDisease || ''}</Flex.Item>
                        </Flex>
                        <Flex className={style.rowDetail}>
                            <Flex.Item className={style.detailTitle}>甲状腺疾病：</Flex.Item>
                            <Flex.Item>{detailData.thyroidDisease || ''}</Flex.Item>
                        </Flex>
                        <Flex className={style.rowDetail}>
                            <Flex.Item className={style.detailTitle}>免疫性疾病：</Flex.Item>
                            <Flex.Item>{detailData.immuneDisease || ''}</Flex.Item>
                        </Flex>
                        <Flex className={style.rowDetail}>
                            <Flex.Item className={style.detailTitle}>过敏史：</Flex.Item>
                            <Flex.Item>{detailData.allergicHistory ? detailData.allergicHistory === 1 ? '无' : '有' : ''}</Flex.Item>
                        </Flex>
                        <Flex className={style.rowDetail}>
                            <Flex.Item className={style.detailTitle}>吸烟史：</Flex.Item>
                            <Flex.Item>{detailData.smokingHistory ? detailData.smokingHistory === 1 ? '无' : '有' : ''}</Flex.Item>
                        </Flex>
                        <Flex className={style.rowDetail}>
                            <Flex.Item className={style.detailTitle}>养宠物：</Flex.Item>
                            <Flex.Item>{detailData.feedCat ? detailData.feedCat === 1 ? '无' : '有' : ''}</Flex.Item>
                        </Flex>
                        <Flex className={style.rowDetail}>
                            <Flex.Item className={style.detailTitle}>乳癌家族史：</Flex.Item>
                            <Flex.Item>{detailData.breastCancerFamilyHistory ? detailData.breastCancerFamilyHistory === 1 ? '无' : '有' : ''}</Flex.Item>
                        </Flex>
                        <Flex className={style.rowDetail}>
                            <Flex.Item className={style.detailTitle}>个人认为的发病原因：</Flex.Item>
                            <Flex.Item>{detailData.illnessReason || ''}</Flex.Item>
                        </Flex>
                    </div>
                    <div className={style.moudleTitle}>外院治疗经过</div>
                    <div>
                        <Flex className={style.rowDetail}>
                            <Flex.Item className={style.detailTitle}>用药情况：</Flex.Item>
                            <Flex.Item>{detailData.medicationStatus || ''}</Flex.Item>
                        </Flex>
                        <Flex className={style.rowDetail}>
                            <Flex.Item className={style.detailTitle}>操作情况：</Flex.Item>
                            <Flex.Item>{detailData.operateStatus || ''}</Flex.Item>
                        </Flex>
                    </div>
                    <div className={style.moudleTitle}>发病及治疗详情</div>
                    <div>
                        <Flex className={style.rowDetail}>
                            <Flex.Item className={style.detailTitle}>发病及治疗经过：</Flex.Item>
                            <Flex.Item>{detailData.illnessAndTreatHistory || ''}</Flex.Item>
                        </Flex>
                        <Flex className={style.rowDetail}>
                            <Flex.Item className={style.detailTitle}>就诊感想：</Flex.Item>
                            <Flex.Item>{detailData.treatImpression || ''}</Flex.Item>
                        </Flex>
                    </div>
                    {state.type === 'doctor' &&
                        <div>
                            <div className={style.moudleTitle}>首诊查体情况</div>
                            <div>
                                <Flex className={style.rowDetail}>
                                    <Flex.Item className={style.detailTitle}>首诊查体日期：</Flex.Item>
                                    <Flex.Item>{detailData.docTreatCheckDate || ''}</Flex.Item>
                                </Flex>
                                <Flex className={style.rowDetail}>
                                    <Flex.Item className={style.detailTitle}>乳头内陷：</Flex.Item>
                                    <Flex.Item>{detailData.docNippleRetraction ? detailData.docNippleRetraction === 1 ? '否' : '是' : ''}</Flex.Item>
                                </Flex>
                                <Flex className={style.rowDetail}>
                                    <Flex.Item className={style.detailTitle}>皮肤红肿：</Flex.Item>
                                    <Flex.Item>{detailData.docInflamedSkin ? detailData.docInflamedSkin === 1 ? '否' : '是' : ''}</Flex.Item>
                                </Flex>
                                <Flex className={style.rowDetail}>
                                    <Flex.Item className={style.detailTitle}>皮肤破溃：</Flex.Item>
                                    <Flex.Item>{detailData.docSkinFestered ? detailData.docSkinFestered === 1 ? '否' : '是' : ''}</Flex.Item>
                                </Flex>
                                <Flex className={style.rowDetail}>
                                    <Flex.Item className={style.detailTitle}>浅表脓肿：</Flex.Item>
                                    <Flex.Item>{detailData.docSuperficialAbscess ? detailData.docSuperficialAbscess === 1 ? '否' : '是' : ''}</Flex.Item>
                                </Flex>
                                <Flex className={style.rowDetail}>
                                    <Flex.Item className={style.detailTitle}>乳头溢液：</Flex.Item>
                                    <Flex.Item>{detailData.docNippleDischarge ? detailData.docNippleDischarge === 1 ? '否' : '是' : ''}</Flex.Item>
                                </Flex>
                                <Flex className={style.rowDetail}>
                                    <Flex.Item className={style.detailTitle}>硬块范围：</Flex.Item>
                                    <Flex.Item>{detailData.dicLumpScopePic ? '见下图' : '暂无图片'}</Flex.Item>
                                </Flex>
                                {detailData.dicLumpScopePic && <div className={style.picture}>
                                    <img src={imgUrlPath + detailData.dicLumpScopePic} alt="硬块范围图片" style={{ width: '100%' }} />
                                </div>}
                                <Flex className={style.rowDetail}>
                                    <Flex.Item className={style.detailTitle}>引流管数：</Flex.Item>
                                    <Flex.Item>{detailData.docDrainageTubeNo || ''}</Flex.Item>
                                </Flex>
                                <Flex className={style.rowDetail}>
                                    <Flex.Item className={style.detailTitle}>下肢红斑：</Flex.Item>
                                    <Flex.Item>{detailData.docLowerLimbsErythema ? detailData.docLowerLimbsErythema === 1 ? '否' : '是' : ''}</Flex.Item>
                                </Flex>
                                <Flex className={style.rowDetail}>
                                    <Flex.Item className={style.detailTitle}>其他：</Flex.Item>
                                    <Flex.Item>{detailData.docOther || ''}</Flex.Item>
                                </Flex>
                                <Flex className={style.rowDetail}>
                                    <Flex.Item className={style.detailTitle}>处理：</Flex.Item>
                                    <Flex.Item>{detailData.docDeal || ''}</Flex.Item>
                                </Flex>
                            </div>
                        </div>
                    }
                    <div className={style.btnContent} >
                        <Button onClick={() => history.back()} className={style.closeBtn}>关闭</Button>
                    </div>
                </div>
            </Fragment>
        )
    }
}


export default PatientDetails;
