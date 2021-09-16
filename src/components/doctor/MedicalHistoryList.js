import { Tabs, Button } from "antd-mobile";
import React, { PureComponent } from "react";
import PropTypes from 'prop-types'
import Header from '../Header'
import PatientCard from '../PatientCard';
import { connect } from 'dva';
import style from './doctor.less'

@connect(({ doctor, loading }) => ({
    doctor,
    loading: loading.models.doctor,
}))

class MedicalHistoryList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            docPerfectStatus: 1,
        };
    }

    componentDidMount() {
        const { dispatch, location } = this.props;
        const { state } = location
        if (state === null) {
            dispatch({
                type: 'doctor/fetchMedcialHostoryList',
                payload: {
                    docPerfectStatus: 1
                },
            })
            dispatch({
                type: 'doctor/fetchMedcialHostoryOk',
                payload: {
                    docPerfectStatus: 2
                },
            })
        } else {
            dispatch({
                type: 'doctor/fetchMedcialHostoryList',
                payload: {
                    docPerfectStatus: 1,
                    mobile: state.e.mobile
                },
            })
            dispatch({
                type: 'doctor/fetchMedcialHostoryOk',
                payload: {
                    docPerfectStatus: 2,
                    mobile: state.e.mobile
                },
            })
        }
    }

    goBank = () => {
        this.props.history.push('/doctorPatientList')
    }

    render() {
        const { doctor: { MedcialHostoryWaitData, MedcialHostoryIngData } } = this.props
        const tabs = [
            { title: `待完善（${MedcialHostoryWaitData.dataTotal || 0}）`, sub: 1 },
            { title: `已完善（${MedcialHostoryIngData.dataTotal || 0}）`, sub: 2 },
        ];
        const MedcialHostoryWaitList = MedcialHostoryWaitData.data || []
        const MedcialHostoryIngList = MedcialHostoryIngData.data || []
        return (
            <div>
                <Header titleNavbar='病史采集系统' titleNoction="请尽快完善病史信息" />
                <Tabs tabs={tabs} initialPage={0}>
                    <div style={{ paddingBottom: '65px', background: '#eeeeee', height: 'calc(100vh - 190px)', overflow: 'scroll' }}>
                        {MedcialHostoryWaitList ? MedcialHostoryWaitList.map(e => {
                            return (
                                <div key={e.id}>
                                    <PatientCard
                                        type={'doctor'}
                                        isFinished={false}
                                        patientInfo={{
                                            id: e.id,
                                            name: e.name,
                                            phone: e.mobile,
                                            fillDate: e.writeDate,
                                            completeDate: e.commitDate
                                        }}
                                    />
                                </div>
                            )
                        }) : ''}
                    </div>
                    <div style={{ paddingBottom: '65px', background: '#eeeeee', height: 'calc(100vh - 190px)', overflow: 'scroll' }}>
                        {MedcialHostoryIngList ? MedcialHostoryIngList.map(e => {
                            return (
                                <div key={e.id}>
                                    <PatientCard
                                        type={'doctor'}
                                        isFinished={true}
                                        patientInfo={{
                                            id: e.id,
                                            name: e.name,
                                            phone: e.mobile,
                                            fillDate: e.writeDate,
                                            completeDate: e.commitDate
                                        }}
                                    />
                                </div>
                            )
                        }) : ''}
                    </div>
                </Tabs>
                <div>
                    <div className={style.btnContent}>
                        <Button className={style.goBankPatient} onClick={this.goBank}>返回患者列表</Button>
                    </div>
                </div>
            </div >
        )
    }
}

MedicalHistoryList.propTypes = {
    doctor: PropTypes.object
};
MedicalHistoryList.defaultProps = {
    doctor: {
        MedcialHostoryWaitData: {},
        MedcialHostoryIngData: {}
    },
};

export default MedicalHistoryList;
