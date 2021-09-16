import request from '../utils/request';

export function getVerifyCode(payload) {
  return request('/api/medical-history/sysuser/getVerifyCode',{
    method: 'GET',
    params: payload
  });
}

export function patientLogin(payload) {
  return request('/api/medical-history/sysuser/patientLogin', {
    method: 'POST',
    body: payload
  })
}

export function doctorLogin(payload) {
  return request('/api/medical-history/sysuser/doctorLogin', {
    method: 'POST',
    body: payload
  })
}
