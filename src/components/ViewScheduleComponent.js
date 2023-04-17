import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import { AuthContext } from "../providers/auth";
import dayjs from "dayjs";
import styled from "styled-components";
import { Link } from "react-router-dom";
import MedicalRecord from "../pages/MedicalRecord";

export default function App(scheduleInfo, setScheduleInfo) {
  const [value, onChange] = useState(new Date());
  const { token } = React.useContext(AuthContext);
  const [scheduled, setScheduled] = useState([]);
  const [data, setData] = useState({
    professional_id: 0,
    patient_id: 0,
    cbo_id: 0,
  });
  const [showRecord, setShowRecord] = useState(false);
  //const [date_schedule, setDate_schedule] = useState(value);
  console.log(dayjs(value).toISOString());

  useEffect(() => {
    const URL = `${
      process.env.REACT_APP_API_BASE_URL
    }/scheduling-professional/${dayjs(value).toISOString()}`;
    console.log(URL, "url");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const promise = axios.get(URL, config);
    promise.then((res) => {
      console.log(res.data, "res");
      setScheduled(res.data);
    });
    promise.catch((err) => {
      console.log(err.response);
    });
    console.log(scheduleInfo, "sch inofoooooooooooooooooo");

    // {cbo.map((c) => {
    //   return (
    //     <li onClick={() => handleCbo(c.id)} value={c.id}>
    //       {c.role}
    //     </li>
    //   );
    // })}
    // <button onClick={()=> setSchedulePost({date: value, schedulePost:1})}>Manhã</button>
    // <button onClick={()=> setSchedulePost({date: value, schedulePost:2})}>Tarde</button>
  }, [value]);
  return (
    <Main>
      <Calendar onChange={onChange} value={value} minDate={new Date()} />
      <>
        {scheduled &&
          scheduled.map((e) => {
            return (
              <>
                <Card>
                  <h2>Nome do Paciente: {e.users.name}</h2>

                  <h2>Telefone para Contato: {e.users.phone_number}</h2>

                  <h2>Horário Agendado: {e.hour}</h2>

                  <h2>Quantidade de sessões restantes: {e.quantity}</h2>
{showRecord === false ?
                  <ButtonTwo onClick={()=>setShowRecord(!showRecord)}><h2>Iniciar Atendimento</h2></ButtonTwo>
                  :
                  <ButtonTwo onClick={()=>setShowRecord(!showRecord)}><h2>Cancelar</h2></ButtonTwo>}
                </Card>
                {showRecord === true &&
                <MedicalRecord e={e}/>}
              </>
            );
          })}
      </>
    </Main>
  );
}

const Main = styled.div`
  h2 {
    color: black;
  }
`;
const Card = styled.div`
  width: 348px;
  background-color: #ffffff;
  margin-bottom: 20px;
  border-radius: 8px;
  border:3px;
  h2{
    color:gray;
  }
`;
const ButtonTwo = styled.button`
height: 50px;

  margin-top: 33px;
  border-radius: 6px;
  border: none;
  background-color: #54b8b6;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  h2{
    color: #FFFFFF
  }
`