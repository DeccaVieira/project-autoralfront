import styled from "styled-components";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import React from "react";
import { AuthContext } from "../providers/auth";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function FormPersonalRegistration({
  personal,
  setPersonal,
  hasData,
  setHasData,
}) {
  const [form, setForm] = useState(0);
  const [personalDataRegistration, setPersonalDataRegistration] = useState({
    medicalInsurance: personal?.medicalInsurance || 0,
    medicalInsurancePlan: personal?.medicalInsurancePlan || 0,
    medicalNumber: personal?.medicalNumber || "",
  });
  const navigate = useNavigate();
  const { token, userId } = React.useContext(AuthContext);
  const [disable, setDisable] = useState(false);
  const [success, setSuccess] = useState(false);
  const [medicalInsurance, setMedicalInsurance] = useState([]);
  const [medicalInsuranceSelected, setMedicalInsuranceSelected] = useState(0);
  const [planMedicalInsurance, setPlanMedicalInsurance] = useState([]);
const [nameInsurance, setNameInsurance] = useState([]);
const [ok, setOk] = useState(false);
  
async function getMedicalInsurance() {
    try {
      const URL = `${process.env.REACT_APP_API_BASE_URL}/medical-insurance`;
      const promise = await axios.get(URL);
      setMedicalInsurance(promise.data);
    
    } catch (error) {
      console.log(error);
    }
  }

useEffect(()=> {
  try {
    const URL = `${process.env.REACT_APP_API_BASE_URL}/personal-data-insurance`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

 
const promise = axios.get(URL, config);
    promise.then((res) => {
      console.log(res.data, "resppp");
    setNameInsurance(res.data);
  
    }) } catch (error) {
    console.log(error);
  }
},[ok])




  useEffect(() => {
    const fetchData = async () => {
      const URL = `${process.env.REACT_APP_API_BASE_URL}/medical-insurance/${personalDataRegistration.medicalInsurance}`;

      try {
        const promise = await axios.get(URL);
        setPlanMedicalInsurance(promise.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [personalDataRegistration.medicalInsurance]);

  useEffect(() => {
    getMedicalInsurance();
  }, [medicalInsurance]);

  function registration() {
    const URL = `${process.env.REACT_APP_API_BASE_URL}/personal-data`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    setDisable(true);
    const promise = axios.post(URL, personalDataRegistration, config);
    promise.then((res) => {
      setDisable(false);
      setSuccess(true);
      
    });
    promise.catch((err) => {
      setDisable(false);
      alert(err.response);
      console.log(err.response);
    });
  }

  function handlePersonalRegistration(e) {
    setPersonalDataRegistration({
      ...personalDataRegistration,
      [e.target.name]: e.target.value,
    });
  }
  function PersonalRegistrationApp(e) {
    e.preventDefault();
  }


  return (
    <>
    {nameInsurance &&
    <Container>
    <h1>Confirme seus dados, se estiver tudo certo,clique em confirmar dados</h1>
      <div>
        <h3>Convênio :<span> {nameInsurance.medical_insurance}</span></h3>
        <h3>Plano : <span> {nameInsurance.medical_insurance_plan}</span></h3>
        <h3>Número da Carteirinha :<span> {nameInsurance.medical_number}</span></h3>
        </div>
        <Link to={"/agenda"}>
    <button><h2>Confirmar Dados</h2></button>
    </Link>
    </Container>}
  

 

      <StyleForm>
      <h3>Precisa atualizar algo? Preencha nosso formulário.</h3>
      
        <form onSubmit={PersonalRegistrationApp}>
          <select name="medicalInsurance" onChange={handlePersonalRegistration}>
            {medicalInsurance.map((plan) => {
              return <option value={plan.id}>{plan.name}</option>;
            })}
          </select>

          <select
            name="medicalInsurancePlan"
            onChange={handlePersonalRegistration}
          >
            {planMedicalInsurance &&
              planMedicalInsurance?.map((plan) => {
                return <option value={plan.id}>{plan.name}</option>;
              })}
          </select>

          <input
            name="medicalNumber"
            value={personalDataRegistration.medicalNumber}
            onChange={handlePersonalRegistration}
            type="number"
            placeholder="Número da carteirinha"
          />
          
          {disable ? (
            <button className="Loading...">
              <h2>{`Loading...`}</h2>
            </button>
          ) : (
            <button onClick={registration} type="submit" disabled={disable}>
              <h2 onClick={()=>setOk(true)}>Atualizar</h2>
            </button>
          )}
        </form>

        <Link to="/">
        <button><h2>Cancelar</h2></button>
        </Link>
      </StyleForm>
    </>
  );
          }

const StyleForm = styled.div`
  width: 37.15%;
  min-width: 230px;
  max-width: 535px;
  padding: 20px 20px 0 20px;
  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 100px;
    width: 100%;
    max-width: 529px;
  }
  h3 {
    text-align: start;
    font-family: "Lato";
    font-weight: 400;
    font-size: 15px;
    line-height: 20px;
    color: gray;
    text-decoration:none;
    word-break:break-word;
  }
  input {
    height: 35px;
    max-width: 429px;
    width: 280px;
    margin: 13px 0 13px 0;
    border-radius: 6px;
    border: none;
    margin-bottom:15px;
    background: #ffffff;
    ::placeholder {
      font-family: "Oswald";
      color: #9f9f9f;
      font-size: 18px;
      line-height: 40px;
      letter-spacing: 0em;
      text-align: left;
    }
  }

  h2 {
    text-decoration: underline #ffffff;
    text-align: center;
    font-family: "Lato";
    font-weight: 400;
    font-size: 17px;
    line-height: 20px;
    color: gray;
    text-decoration:none;
  }
  button {
    height: 35px;
    margin-bottom: 13px;
    border-radius: 6px;
    border: none;
    background-color: #54B8B6;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    h2 {
      font-family: "Oswald";
      color: #ffffff;
      font-size: 19px;
      line-height: 40px;
      text-decoration: none;
    }
  }
  

  @media (max-width: 600px) {
    height: 100vh;
    width: 100%;
    max-width: 100%;
    padding: 40px 6.8%;
  }
`;

const Container = styled.div`
  width: 37.15%;
  min-width: 230px;
  max-width: 535px;
  padding: 20px 20px 0 20px;
  margin-right:40px;
  div{
    width: 270px;
    border-radius: 10px;
    padding-top:15px;
    padding-left:5px;
    border:solid 2px #DFE5E8;
    margin-bottom:15px;
    padding-bottom:8px;
  }
  h2 {
    text-align: start;
    font-family: "Lato";
    font-weight: 400;
    font-size: 15px;
    line-height: 20px;
    color: #ffffff;
    text-decoration:none;
    word-break:break-word;
  }
  h3 {
    text-align: start;
    font-family: "Lato";
    font-weight: 400;
    font-size: 15px;
    line-height: 20px;
    color: gray;
    text-decoration:none;
    word-break:break-word;
  }
  span{
    color:black;
  }
  h1{
    margin-bottom:20px;
    color: gray;
  }
  button{
    height: 35px;
    margin-bottom: 13px;
    border-radius: 6px;
    border: none;
    background-color: #54B8B6;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  `
