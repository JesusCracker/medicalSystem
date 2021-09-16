import {getMedicalHistoryList, postPatientHistory} from '../services/patient'

export default {
  namespace: 'patientRegister',
  state: {
    notPost: [],
    hasPost: []
  },

  effects: {
    *getList({payload}, {call, put}) {
      const {data} = yield call(getMedicalHistoryList, payload);
      data.data && data.data.length > 0 && data.data[0].commitStatus === 1 ? (
        yield put({
          type: 'saveNotPost',
          payload: data.data
        })
      ) : (
        yield put({
          type: 'saveHasPost',
          payload: data.data
        })
      )
    },
    *postHistory({payload}, {call}) {
      const {data} =  yield call(postPatientHistory, payload);
      return data
    }
  },

  reducers: {
    saveNotPost(state, {payload}) {
      return {
        ...state,
        notPost: payload
      }
    },
    saveHasPost(state,{payload}) {
      return {
        ...state,
        hasPost: payload
      }
    }
  }
}
