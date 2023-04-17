import React, {useEffect, useState} from 'react';
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import { AuthContext } from "../providers/auth";
import dayjs from 'dayjs';
import styled from 'styled-components';

export default function App() {
  const [value, onChange] = useState(new Date());
  const { token} = React.useContext(AuthContext);
  const [scheduled, setScheduled] = useState([]);

  useEffect(() => {
    const URL = `${process.env.REACT_APP_API_BASE_URL}/scheduling-patient`;
    console.log(URL, 'url');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    
    const promise = axios.get(URL,config);
    promise.then((res) => {
      console.log(res.data, "qqqqqqqqqqqqqqqqqqqqqqqqqqqqq");
setScheduled(res.data[0].scheduling);
    });
    promise.catch((err) => {
      console.log(err.response);
    });
    console.log(scheduled,"sch");
    
      },[]);
  return (
    <Main>
     <>
     
   {scheduled && scheduled.map((e) => {
    return (<>
       <h1>Agendamento</h1>
      <Card>
      <h2>Data Agendada: {dayjs(e.schedule_date).format('DD/MM/YYYY')}</h2>
        <h2>Horário Agendado: {e.hour}</h2>
        </Card>
    </>
    )} )}
   
      </>
    </Main>
  );
}

const Main = styled.div`
h2{
  color:black;
}
`
const Card = styled.div`
width: 348px;
padding:10px;
background-color: #FFFFFF;
margin-bottom: 20px;
border-radius: 8px;
border-radius: 8px;
box-shadow: 4px 4px 4px 4px rgba(0, 0, 0, 0.25);
`