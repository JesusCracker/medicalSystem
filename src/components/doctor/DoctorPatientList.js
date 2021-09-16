import { Card, Tabs, Button } from "antd-mobile";
import React, { Fragment, PureComponent } from "react";
import PropTypes from 'prop-types'
import Header from '../Header'
import { connect } from 'dva';
import style from './doctor.less'

@connect(({ doctor, loading }) => ({
    doctor,
    loading: loading.models.doctor,
}))

class DoctorPatientList extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
        };
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'doctor/fetchPatientTotal',
            payload: {},
        });
        dispatch({
            type: 'doctor/fetchPatientList',
            payload: {},
        }).then((res) => {
            if (res && res.data.status === 1 && res.data.message === '成功') {
                this.setState({ refreshing: false });
            }
        });
    }

    onChange = (tab, index) => {
        if (tab.sub === 2) {
            this.props.history.push('/medicalHistory')
        }
    }

    manageDoctor = () => {
        this.props.history.push('/doctorList')
    }

    render() {
        const { history, doctor: { PatientListData, PatientTotalData } } = this.props
        const totalList = PatientListData && PatientTotalData.data ? PatientTotalData.data : {}
        const tabs = [
            { title: `患者(${PatientListData.dataTotal || 0})`, sub: 1 },
            { title: `病历(${totalList.countNo || 0})`, sub: 2 },
        ];

        const dataList = PatientListData.data ? PatientListData.data : []

        return (
            <Fragment>
                <Header
                    titleNavbar='病史采集系统'
                    titleNoction={
                        `今日已采集病史${totalList.todayNo || 0}份，累计采集病史${totalList.countNo || 0}份`
                    } />
                <Card className={style.listCard}>
                    <Tabs
                        tabs={tabs}
                        width='80%'
                        initialPage={0}
                        onChange={this.onChange}
                    >
                        
                            <div className={style.listContent}>
                                <table className={style.tableList} >
                                    <thead className={style.tableHead}>
                                        <tr>
                                            <th style={{ width: '33%' }}>患者姓名</th>
                                            <th style={{ width: '33%' }}>患者手机</th>
                                            <th style={{ width: '33%' }}>提交次数</th>
                                        </tr>
                                    </thead>
                                    <tbody className={style.tableBody}>
                                        {dataList.map((e, i) => {
                                            return (
                                                <tr key={i} onClick={() => history.push('/medicalHistory', { e })}>
                                                    <th style={{ width: '33%' }}>{e.name}</th>
                                                    <th style={{ width: '33%' }}>{e.mobile}</th>
                                                    <th style={{ width: '33%' }}>{e.commitNo}</th>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        
                        <div></div>
                    </Tabs>
                </Card>
                {JSON.parse(localStorage.getItem('doctorInfo')).admin === 2 &&
                    <div>
                        <div className={style.btnContent}>
                            <Button onClick={this.manageDoctor} className={style.manageDoctor}>管理医生</Button>
                        </div>
                    </div>
                }
            </Fragment>
        )
    }
}


DoctorPatientList.propTypes = {
    doctor: PropTypes.object
};
DoctorPatientList.defaultProps = {
    doctor: {
        PatientListData: {},
        PatientTotalData: {}
    },
};

export default DoctorPatientList;
