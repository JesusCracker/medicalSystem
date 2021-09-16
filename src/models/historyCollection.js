import {getHistoryList, getProvinceList, getCityList, getCountyList, postPatientHistory, postIDCard} from '../services/patient'

export default {
  namespace: 'historyCollection',
  state: {
    historyDetail: {},
    step: 1,
    provinceList: [],
    cityList: [],
    countyList: []
  },

  effects: {
    // 获取患者登记详情
    * getPatientHistoryDetail({payload}, {call, put}) {
      const {data} = yield call(getHistoryList, payload);
      yield put({
        type: 'saveHistoryDetail',
        payload: data
      })
      return data;
    },
    * postIDCard({payload}, {call}) {
      const {data} = yield call(postIDCard, payload);
      return data && data.data;
    },
    // 省
    * getProvinceList(_, {call, put}) {
      const {data} = yield call(getProvinceList)
      yield put({
        type: 'saveProvinceList',
        payload: data
      })
      return data.data
    },
    // 市
    * getCityList({payload}, {call, put}) {
      const {data} = yield call(getCityList, payload)
      yield put({
        type: 'saveCityList',
        payload: data
      })
      return data
    },
    // 区
    * getCountyList({payload}, {call, put}) {
      const {data} = yield call(getCountyList, payload)
      yield put({
        type: 'saveCountyList',
        payload: data
      })
      return data
    },
    // 提交病史登记表
    * postPatientHistory({payload}, {call}) {
      const {data} = yield call(postPatientHistory, payload);
      return data
    }
  },

  reducers: {
    saveHistoryDetail(state, {payload}) {
      return {
        ...state,
        historyDetail: payload.data,
        step: payload.data && payload.data.step
      }
    },
    saveProvinceList(state, {payload}) {
      return {
        ...state,
        provinceList: payload.data && payload.data.map(item => {
          return {
            value: item.provinceCode,
            label: item.provinceName
          }
        })
      }
    },
    saveCityList(state, {payload}) {
      return {
        ...state,
        cityList: payload.data && payload.data.map(item => {
          return {
            value: item.cityCode,
            label: item.cityName
          }
        })
      }
    },
    saveCountyList(state, {payload}) {
      return {
        ...state,
        countyList: payload.data && payload.data.map(item => {
          return {
            value: item.countyCode,
            label: item.countyName
          }
        })
      }
    },
  }
}
