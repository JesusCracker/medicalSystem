import {getVerifyCode, patientLogin, doctorLogin} from '../services/system';

export default {
  namespace: 'login',
  state: {
    patientInfo: {},
    doctorInfo: {}
  },
  subscriptions: {
    setupHistory({dispatch, history}) {
      history.listen((location) => {
        if (location.pathname === '/user') {
        }
      })
    },
  },

  effects: {
    *getVerify({payload}, {call}) {
      yield call(getVerifyCode, payload);
    },
    *patientLogin({payload}, {call, put}) {
      const {data} = yield call(patientLogin, payload);
      return data
    },
    *doctorLogin({payload}, {call, put}) {
      const {data} = yield call(doctorLogin, payload);
      return data
    }
  },

  reducers: {
    savePatientInfo(state, {payload}) {
      return {
        ...state,
        patientInfo: payload
      }
    },
    saveDoctorInfo(state, {payload}) {
      return {
        ...state,
        doctorInfo: payload
      }
    }
  },
}
