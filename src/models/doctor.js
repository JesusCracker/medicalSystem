import { getPatienList,getPatienTotal,getMedcialHostoryList,getDoctorList,saveDoctor,getMedcialHostoryDetail,savePatientHistory } from '../services/doctor';

export default {
    namespace: 'doctor',
    state: {
        PatientListData:{},
        PatientTotalData:{},
        MedcialHostoryWaitData:{},
        MedcialHostoryIngData:{},
        DoctorListData:{},
        MedcialHostoryDetail:{}
    },

    effects: {
        //获取病人列表
        * fetchPatientList({ _ }, { call, put }) {
            const response = yield call(getPatienList, _);
            yield put({
                type: 'save',
                payload: response,
            });
            return response;
        },
        //获取病人列表
        * fetchPatientTotal({ _ }, { call, put }) {
            const response = yield call(getPatienTotal, _);
            yield put({
                type: 'saveTotal',
                payload: response,
            });
        },

        //获取病史列表-待完善
        * fetchMedcialHostoryList({ payload }, { call, put }) {
            const response = yield call(getMedcialHostoryList, payload);
            yield put({
                type: 'saveDetailWait',
                payload: response,
            });
        },
         //获取病史列表-已完善
         * fetchMedcialHostoryOk({ payload }, { call, put }) {
            const response = yield call(getMedcialHostoryList, payload);
            yield put({
                type: 'saveDetailIng',
                payload: response,
            });
        },

        //获取医生列表
        * fetchDoctorList({ _ }, { call, put }) {
            const response = yield call(getDoctorList, _);
            yield put({
                type: 'saveDoctor',
                payload: response,
            });
            return response
        },


        //新增，编辑保存医生
        * addDoctor({ payload }, { call, put }) {
            const response = yield call(saveDoctor, payload);
            yield put({
                type: 'saveDoctor',
                payload: response,
            });
            return response;
        },

        //获取患者病史详情
        * fetchMedcialHostoryDetail({ payload }, { call, put }) {
            const response = yield call(getMedcialHostoryDetail, payload);
            yield put({
                type: 'saveHostoryDetail',
                payload: response,
            });
        },

        //医生完善用户病史
        * addPatientHistory({ payload }, { call, put }) {
            const response = yield call(savePatientHistory, payload);
            yield put({
                type: 'saveDetailWait',
                payload: response,
            });
            return response;
        },
    },

    reducers: {
        save(state, action) {
            return {
                ...state,
                PatientListData: action.payload && action.payload.data,
            };
        },
        saveTotal(state, action) {
            return {
                ...state,
                PatientTotalData: action.payload && action.payload.data,
            };
        },
        saveDetailWait(state, action) {
            return {
                ...state,
                MedcialHostoryWaitData: action.payload ? action.payload.data:{data:null,dataTotal:null},
            };
        },
        saveDetailIng(state, action) {
            return {
                ...state,
                MedcialHostoryIngData: action.payload? action.payload.data:{data:null,dataTotal:null},
            };
        },
        saveDoctor(state, action) {
            return {
                ...state,
                DoctorListData: action.payload && action.payload.data,
            };
        },
        saveHostoryDetail(state, action) {
            return {
                ...state,
                MedcialHostoryDetail: action.payload.data && action.payload.data.data,
            };
        },
    },
}
