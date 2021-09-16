import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic'

function RouterConfig({ history,app}) {
  const PatientPage = dynamic({
    app,
    component: () => import('./routes/PatientPage')
  })
  const DoctorPage = dynamic({
    app,
    component: () => import('./routes/DoctorPage')
  })

  const PatientRegisterPage = dynamic({
    app,
    component: () => import('./routes/PatientRegisterPage')
  })

  const DoctorPatientList = dynamic({
    app,
    component: () => import('./routes/DoctorPatientList')
  })
  const MedicalHistory = dynamic({
    component: () => import('./routes/MedicalHistory')
  })
  const CheckPatient = dynamic({
    app,
    component: () => import('./routes/CheckPatient')
  })
  const DoctorList = dynamic({
    app,
    component: () => import('./routes/DoctorList')
  })
  const CompleteHistoryForm = dynamic({
    app,
    component: () => import('./routes/CompleteHistoryForm')
  })
  const UpdateDoctor = dynamic({
    app,
    component: () => import('./routes/UpdateDoctor')
  })
  const RegisterNoticePage = dynamic({
    app,
    component:() => import('./routes/RegisterNoticePage')
  })
  const BaseInfoPage = dynamic({
    app,
    component:() => import('./routes/BaseInfoPage')
  })
  const WorkAndLifePage = dynamic({
    app,
    component:() => import('./routes/WorkAndLifePage')
  })
  const FirstTimeOnsetPage = dynamic({
    app,
    component:() => import('./routes/FirstTimeOnsetPage')
  })
  const FirstTimeOnset1Page = dynamic({
    app,
    component:() => import('./routes/FirstTimeOnset1Page')
  })
  const AfterOnsetPage = dynamic({
    app,
    component:() => import('./routes/AfterOnsetPage')
  })
  const MaternityPage = dynamic({
    app,
    component:() => import('./routes/MaternityPage')
  })
  const PastPage = dynamic({
    app,
    component:() => import('./routes/PastPage')
  })
  const Past1Page = dynamic({
    app,
    component:() => import('./routes/Past1Page')
  })
  const OutsideHospitalTreatmentPage = dynamic({
    app,
    component:() => import('./routes/OutsideHospitalTreatmentPage')
  })
  const OnsetAndTreatmentPage = dynamic({
    app,
    component:() => import('./routes/OnsetAndTreatmentPage')
  })

  return (
    <Router history={history}>
      <Switch>
        {/* 患者-登录 */}
        <Route path="/" exact component={PatientPage} />
        {/* 患者-登记列表 */}
        <Route path="/patientRegister" exact component={PatientRegisterPage} />
        {/* 患者-登记须知 */}
        <Route path='/registerNotice' exact component={RegisterNoticePage} />
        {/* 患者-病史采集-基本情况 */}
        <Route path='/historyCollection/baseInfo' exact component={BaseInfoPage} />
        {/* 患者-病史采集-工作与生活 */}
        <Route path='/historyCollection/workAndLife' exact component={WorkAndLifePage} />
        {/* 患者-病史采集-首次犯病 */}
        <Route path='/historyCollection/firstTimeOnset' exact component={FirstTimeOnsetPage} />
        {/* 患者-病史采集-首次犯病（续） */}
        <Route path='/historyCollection/firstTimeOnset1' exact component={FirstTimeOnset1Page} />
        {/* 患者-病史采集-发病后情况 */}
        <Route path='/historyCollection/afterOnset' exact component={AfterOnsetPage} />
        {/* 患者-病史采集-孕产情况 */}
        <Route path='/historyCollection/maternity' exact component={MaternityPage} />
        {/* 患者-病史采集-既往情况 */}
        <Route path='/historyCollection/past' exact component={PastPage} />
        {/* 患者-病史采集-既往情况 （续） */}
        <Route path='/historyCollection/past1' exact component={Past1Page} />
        {/* 患者-病史采集-外院治疗 */}
        <Route path='/historyCollection/outsideHospitalTreatment' exact component={OutsideHospitalTreatmentPage} />
        {/* 患者-病史采集-发病及治疗情况详情 */}
        <Route path='/historyCollection/onsetAndTreatment' exact component={OnsetAndTreatmentPage} />
        {/* 医生登陆页面 */}
        <Route path="/doctor" exact component={DoctorPage} />
        {/* 医生-病患列表 */}
        <Route path="/doctorPatientList" exact component={DoctorPatientList} />
        {/* 医生-病史列表 */}
        <Route path="/medicalHistory" exact component={MedicalHistory} />
        {/* 医生，用户病患列表 */}
        <Route path="/checkPatient" exact component={CheckPatient} />
        {/* 医生列表 */}
        <Route path="/doctorList" exact component={DoctorList} />
        {/* 医生-病历补填 */}
        <Route path="/completeForm" exact component={CompleteHistoryForm} />
        {/* 管理医生-新增修改 */}
        <Route path="/updateDoctor" exact component={UpdateDoctor} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
