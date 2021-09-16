import PatientPage from './PatientPage';
import UserPage from "./UserPage";
import DoctorPage from "./DoctorPage";
import PatientRegisterPage from "./PatientRegisterPage"
import DoctorPatientList from './DoctorPatientList'
import MedicalHistory from './MedicalHistory'
import CheckPatient from './CheckPatient'
import DoctorList from './DoctorList'
import UserPageDetail from "./UserPageDetail";
import CompleteHistoryForm from './CompleteHistoryForm'
import UpdateDoctor from './UpdateDoctor'

export default [
  {path:"/",component:PatientPage},
  {path:"/patientRegister",component:PatientRegisterPage},
  {path:"/user",component:UserPage},
  {path:"/userDetail",component:UserPageDetail},
  {path:"/doctor",component:DoctorPage},
  {path:"/doctorPatientList",component:DoctorPatientList},
  {path:"/medicalHistory",component:MedicalHistory},
  {path:"/checkPatient",component:CheckPatient},
  {path:"/doctorList",component:DoctorList},
  {path:"/completeForm",component:CompleteHistoryForm},
  {path:"/updateDoctor",component:UpdateDoctor},
];
