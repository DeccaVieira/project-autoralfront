import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { AuthContext } from "../providers/auth";
import { useNavigate } from "react-router-dom";

export default function ScheduleViewButton() {
 

  return (
    <Banner>
      <h2>Área do Paciente</h2>
<Link to={"/agenda-paciente"}>
      <button >
        <h2>Meus agendamentos</h2>
      </button>
</Link>
    </Banner>
  );
}

const Banner = styled.div`
  width: 200px;
  height: 198px;
  background: linear-gradient(to left top, #8ad7ed, #b3dab9);
  margin-left: 1060px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  box-shadow: 4px 4px 4px 4px rgba(0, 0, 0, 0.25);

  h2 {
    text-align: center;
    font-family: "Lato";
    font-weight: 800px;
    font-size: 17px;
    line-height: 20px;
    color: #ffffff;
  }
  button {
 
    cursor: pointer;

    margin-top: 33px;
    border-radius: 6px;
    border: none;
    background-color: #54b8b6;
    cursor: pointer;
  
    align-items: center;
    justify-content: center;

    h2 {
      font-family: "Oswald";
      color: #ffffff;
      font-size: 19px;
      line-height: 40px;
    }
  }
`;
