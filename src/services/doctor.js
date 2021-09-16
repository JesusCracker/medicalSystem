import request from '../utils/request';

//获取患者列表
export function getPatienList() {
    return request('/api/medical-history/doctoruser/getPatientList', {
        method: 'GET',
    });
}

//获取当日采集病史数和历史总数
export function getPatienTotal() {
    return request('/api/medical-history/doctoruser/getMedicalHistoryCountInfo', {
        method: 'POST',
    });
}

//获取病史列表
export function getMedcialHostoryList(params) {
    return request(`/api/medical-history/doctoruser/getMedcialHostoryList`, {
        method: 'GET',
        params,
    });
}

//获取医生列表
export function getDoctorList() {
    return request('/api/medical-history/sysuser/getDoctorList', {
        method: 'GET',
    });
}

//添加或者修改医生
export async function saveDoctor(params) {
    return request(`/api/medical-history/sysuser/upsertDoctor`, {
        method: 'POST',
        body: {
            ...params,
        },
    });
}

//获取患者病史详情
export function getMedcialHostoryDetail(params) {
    return request(`/api/medical-history/doctoruser/getMedcialHostoryDetail`, {
        method: 'GET',
        params,
    });
}

//医生完善用户病史
export async function savePatientHistory(params) {
    return request(`/api/medical-history/doctoruser/perfectMedicalHistory`, {
        method: 'POST',
        body: {
            ...params,
        },
    });
}