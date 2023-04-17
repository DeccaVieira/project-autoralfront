import { BrowserRouter, Routes, Route } from "react-router-dom";
import View from "./screens/View";
import Signup from "./pages/SignUp.page";
import "./assets/styles/reset.css";
import "./assets/styles/style.css";
import ProfessionalRegistration from "./pages/ProfessionalRegistration.page";
import MainPage from "./pages/Main.page";
import PersonalDataRegistration from "./pages/PersonalDataRegistration";
import SchedulePage from "./pages/Schedule.page";
import ScheduleProfessional from "./pages/ScheduleProfessional";
import SchedulePatient from "./pages/SchedulePatient";
import MedicalRecord from "./pages/MedicalRecord";
import { useState } from "react";
import PatientRecord from "./pages/PatientRecord";
function App() {
  const [scheduleInfo, setScheduleInfo] = useState({
    professional_id: 0,
    patient_id: 0,
    cbo: 0
  })
  return (
    <BrowserRouter>
      <View>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/agenda" element={<SchedulePage scheduleInfo={scheduleInfo} setScheduleInfo={setScheduleInfo}/>} />
          <Route
            path="/cadastro-profissional"
            element={<ProfessionalRegistration />}
          />
          <Route
            path="/complementares"
            element={<PersonalDataRegistration />}
          />
          <Route
            path="/agenda-profissional"
            element={<ScheduleProfessional />}
          />
            <Route
            path="/agenda-paciente"
            element={<SchedulePatient/>}
          />
            <Route
            path="/prontuario"
            element={<MedicalRecord scheduleInfo={scheduleInfo} setScheduleInfo={setScheduleInfo}/>}
          />
           <Route
            path="/prontuario-paciente"
            element={<PatientRecord/>}
          />
        </Routes>
      </View>
    </BrowserRouter>
  );
}

export default App;
