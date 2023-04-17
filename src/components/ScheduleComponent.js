import React, {useState} from 'react';
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import { AuthContext } from "../providers/auth";
import styled from 'styled-components';


export default function App() {
  const [value, onChange] = useState(new Date());
  const { token} = React.useContext(AuthContext);
const [success, setSuccess] = useState(false);
  const [schedulePost, setSchedulePost] = useState(0)

  async function postSchedule(){
    const URL = `${process.env.REACT_APP_API_BASE_URL}/schedule`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const body ={
      date_schedule: schedulePost.date,
      shift_schedule: schedulePost.schedulePost
    }
  
    const promise = await axios.post(URL,body,config);
    promise.then((res) => {
      setSuccess(true);
      alert("Agenda criada com sucesso")
     
    });
    promise.catch((err) => {
      console.log(err.response);
    });
    console.log(success);
  }
  return (
    <div>
      {success === true ?
      <Banner>
        <h1>Agenda criada com sucesso</h1>
      </Banner>
     :<>
      <Calendar onChange={onChange} value={value} minDate={new Date()}
      
      />
      <>
      <Button onClick={()=> setSchedulePost({date: value, schedulePost:1})}><h2>Manhã</h2></Button>
      <Button onClick={()=> setSchedulePost({date: value, schedulePost:2})}><h2>Tarde</h2></Button>
      <ButtonTwo onClick={postSchedule}><h2>Criar agenda</h2></ButtonTwo>
      </>
      </>
      }
  </div>
  );
}

const Banner = styled.div`
width: 100vw;
height: 200px;
backgorund-color: #FFFFFF;
border-radius: 5px;
h1 {
  font-size:30px;
}
`
const Button = styled.button`
height: 30px;
width:130px;
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
const ButtonTwo = styled.button`
height: 50px;
width:350px;
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