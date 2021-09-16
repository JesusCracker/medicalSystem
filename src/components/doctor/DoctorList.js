import { Button } from "antd-mobile";
import React, { Fragment, PureComponent } from "react";
import PropTypes from 'prop-types'
import Header from '../Header'
import { connect } from 'dva';
import style from './doctor.less'

@connect(({ doctor, loading }) => ({
    doctor,
    loading: loading.models.doctor,
}))

class DoctorList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
        };
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'doctor/fetchDoctorList',
            payload: {},
        });
    }

    goBankPatient = () => {
        this.props.history.push('/doctorPatientList')
    }

    // 编辑图标
    editIcon = ({
        width = "200",
        height = "200",
        fill = "black"
    }) => (
        <svg t="1608779393628" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="2779" width={width} height={height}>
            <path
                d="M768 981.333333H170.666667c-72.533333 0-128-55.466667-128-128V256c0-72.533333 55.466667-128 128-128h298.666666c25.6 0 42.666667 17.066667 42.666667 42.666667s-17.066667 42.666667-42.666667 42.666666H170.666667c-25.6 0-42.666667 17.066667-42.666667 42.666667v597.333333c0 25.6 17.066667 42.666667 42.666667 42.666667h597.333333c25.6 0 42.666667-17.066667 42.666667-42.666667v-298.666666c0-25.6 17.066667-42.666667 42.666666-42.666667s42.666667 17.066667 42.666667 42.666667v298.666666c0 72.533333-55.466667 128-128 128z"
                p-id="2780" fill={fill} />
            <path
                d="M341.333333 725.333333c-12.8 0-21.333333-4.266667-29.866666-12.8-12.8-8.533333-17.066667-25.6-12.8-38.4l42.666666-170.666666c0-8.533333 4.266667-12.8 12.8-21.333334l405.333334-405.333333C810.666667 25.6 896 25.6 947.2 76.8c51.2 51.2 51.2 136.533333 0 187.733333l-405.333333 405.333334c-4.266667 4.266667-12.8 8.533333-21.333334 12.8l-170.666666 42.666666H341.333333z m81.066667-192l-21.333333 89.6 89.6-21.333333 396.8-396.8c17.066667-17.066667 17.066667-46.933333 0-68.266667-17.066667-17.066667-51.2-17.066667-68.266667 0l-396.8 396.8z m366.933333-426.666666z"
                p-id="2781" fill={fill} />
        </svg>
    )

    updateDoctor = (data) => {
        const { history } = this.props
        history.push('/updateDoctor')
    }

    render() {
        const { history, doctor: { DoctorListData } } = this.props
        const dataList = DoctorListData && DoctorListData.data ? DoctorListData.data : []
        return (
            <Fragment>
                <Header titleNavbar='病史采集系统' />
                <div className={style.listContent}>
                    <table className={style.tableList} >
                        <thead className={style.tableHead}>
                            <tr>
                                <th style={{ width: '30%' }}>医生姓名</th>
                                <th style={{ width: '30%' }}>医生手机</th>
                                <th style={{ width: '30%' }}>状态</th>
                                <th style={{ width: '10%' }}></th>
                            </tr>
                        </thead>
                        <tbody className={style.doctorTableBody}>
                            {dataList.map(e => {
                                return (
                                    <tr key={e.id}>
                                        <th style={{ width: '30%' }}>{e.admin === 2 ? `${e.username}(管理员)` : e.username}</th>
                                        <th style={{ width: '30%' }}>{e.account}</th>
                                        <th style={{ width: '30%' }}>{e.status === 1 ? '在用' : '停用'}</th>
                                        <th style={{ width: '10%' }} onClick={() => history.push('/updateDoctor', { e })}>
                                            {this.editIcon({ width: '1em', height: '1em', fill: 'rgba(204,204,204,1)' })}
                                        </th>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div>
                    <div className={style.btnContent}>
                        <Button onClick={this.goBankPatient} className={style.doctorBtn1}>返回患者列表</Button>
                        <Button onClick={this.updateDoctor} className={style.doctorBtn2}>添加医生</Button>
                    </div>
                </div>
            </Fragment>
        )
    }
}


DoctorList.propTypes = {
    doctor: PropTypes.object
};
DoctorList.defaultProps = {
    doctor: {
        DoctorListData: {},
    },
};


export default DoctorList;
