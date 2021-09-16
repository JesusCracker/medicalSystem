import request from "../utils/request";

// 获取患者登记历史列表
export function getMedicalHistoryList(params) {
  return request('/api/medical-history/patientuser/getMedicalHistoryList', {
    method: 'GET',
    params
  })
}
// 新增或修改患者病史
export function postPatientHistory(params) {
  return request('/api/medical-history/patientuser/upsertMedicalHistory', {
    method: 'POST',
    body: params
  })
}
// 获取患者登记记录详情
export function getHistoryList(params) {
  return request('/api/medical-history/patientuser/getMedicalHistoryDetail', {
    method: 'GET',
    params
  })
}
// 省
export function getProvinceList() {
  return request('/api/medical-history/patientuser/getProvinceList', {
    method: 'GET'
  })
}
// 市
export function getCityList(params) {
  return request('/api/medical-history/patientuser/getCityList', {
    method: 'GET',
    params
  })
}
// 区
export function getCountyList(params) {
  return request('/api/medical-history/patientuser/getCountyList', {
    method: 'GET',
    params
  })
}

export function postIDCard(params) {
  // http://aisono.cn:7004/bacc/idCard/getIdCardInfoFromBase64
  return request('/api/medical-history/idCard/getIdCardInfoFromBase64', {
    method: 'POST',
    body: params
  })
}
