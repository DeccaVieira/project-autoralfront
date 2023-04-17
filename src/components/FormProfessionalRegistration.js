import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function FormProfessionalRegistration() {
  const [form, setForm] = useState(0);
  const [ProfessionalRegistration, setProfessionalRegistration] = useState({
    name: "",
    email: "",
    cpf: "",
    ufRegistration: "",
    registrationType: "",
    professionalNumber: "",
    phoneNumber: "",
  });
  const [disable, setDisable] = useState(false);
  const [success, setSuccess] = useState(false);

  function registration() {
    const URL = `${process.env.REACT_APP_API_BASE_URL}/professional-registration`;
    setDisable(true);
    const promise = axios.post(URL, ProfessionalRegistration);
    promise.then((res) => {
      setDisable(false);
      setSuccess(true);
      setForm(form + 1)
    });
    promise.catch((err) => {
      setDisable(false);
      alert(err.response);
      console.log(err.response);
    });
  }

  function handleProfessionalRegistration(e) {
    setProfessionalRegistration({
      ...ProfessionalRegistration,
      [e.target.name]: e.target.value,
    });
  }
  function ProfessionalRegistrationApp(e) {
    e.preventDefault();
  }

  return (
    <>
      <form onSubmit={ProfessionalRegistrationApp}>
        {form === 0 && (
          <Banner>
            {" "}
            <h2>
              Declaro estar ciente de que os dados por mim enviados, passarão
              por um processo de análise e validação. Afirmo que meu registro
              está regular e apto para a prestação de serviços e manuseio de
              pacientes. Expresso neste ato meu compromisso em disponibilizar
              todos os dados necessários que comprovem minha especialidade, a
              fim de viabilizar a minha prestação de serviço.
            </h2>
            <button
              onClick={() => {
                setForm(form + 1);
              }}
            >
              <h2>Concordo</h2>
            </button>
            <Link to={"/"}>
              <button>
                <h2>Cancelar</h2>
              </button>
            </Link>
          </Banner>
        )}

        {form === 1 && (
          <Banner>
            <h2>Digite o seu nome completo</h2>
            <input
              name="name"
              value={ProfessionalRegistration.name}
              onChange={handleProfessionalRegistration}
              placeholder="Nome Completo"
              type="name"
              required/>
            <button
              onClick={() => {
                setForm(form + 1);
              }}
            >
              <h2>Próximo</h2>
            </button>
            <button
              onClick={() => {
                setForm(form - 1);
              }}
            >
              <h2>Voltar</h2>
            </button>
          </Banner>
        )}

        {form === 2 && (
          <Banner>
            <h2>Digite o seu email</h2>
            <input
              name="email"
              value={ProfessionalRegistration.email}
              onChange={handleProfessionalRegistration}
              type="email"
              placeholder="Email"
              required/>
            <button
              onClick={() => {
                setForm(form + 1);
              }}
            >
              <h2>Próximo</h2>
            </button>
            <button
              onClick={() => {
                setForm(form - 1);
              }}
            >
              <h2>Voltar</h2>
            </button>
          </Banner>
        )}

        {form === 3 && (
          <Banner>
            <h2>Digite o seu cpf</h2>
            <input
              name="cpf"
              value={ProfessionalRegistration.cpf}
              onChange={handleProfessionalRegistration}
              type="cpf"
              placeholder="CPF"
              required/>
            <button
              onClick={() => {
                setForm(form + 1);
              }}
            >
              <h2>Próximo</h2>
            </button>
            <button
              onClick={() => {
                setForm(form - 1);
              }}
            >
              <h2>Voltar</h2>
            </button>
          </Banner>
        )}
        {form === 4 && (
          <Banner>
            <h2>Digite o UF do seu Registro Profissional</h2>
            <select
              name="ufRegistration"
              onChange={handleProfessionalRegistration}
            >
              <option selected value={ProfessionalRegistration.ufRegistration}>
                Escolha o UF do Conselho Profissional
              </option>
              <option value="ac">Acre</option>
              <option value="al">Alagoas</option>
              <option value="am">Amazonas</option>
              <option value="ap">Amapá</option>
              <option value="ba">Bahia</option>
              <option value="ce">Ceará</option>
              <option value="df">Distrito Federal</option>
              <option value="es">Espirito Santo</option>
              <option value="go">Goiás</option>
              <option value="ma">Maranhão</option>
              <option value="ms">Mato Grosso do Sul</option>
              <option value="mt">Mato Grosso</option>
              <option value="mg">Minas Gerais</option>
              <option value="pa">Pará</option>
              <option value="pb">Paraíba</option>
              <option value="pr">Paraná</option>
              <option value="pe">Pernambuco</option>
              <option value="pi">Piauí</option>
              <option value="rj">Rio de Janeiro</option>
              <option value="rn">Rio Grande do Norte</option>
              <option value="rs">Rio Grande do Sul</option>
              <option value="ro">Rondônia</option>
              <option value="rr">Roraima</option>
              <option value="sc">Santa Catarina</option>
              <option value="sp">São Paulo</option>
              <option value="se">Sergipe</option>
              <option value="to">Tocantins</option>
            </select>
            <button
              onClick={() => {
                setForm(form + 1);
              }}
            >
              <h2>Próximo</h2>
            </button>
            <button
              onClick={() => {
                setForm(form - 1);
              }}
            >
              <h2>Voltar</h2>
            </button>
          </Banner>
        )}

        {form === 5 && (
          <Banner>
            <h2>Em qual conselho profissional está inscrito?</h2>
            <select
              name="registrationType"
              onChange={handleProfessionalRegistration}
            >
              <option
                selected
                value={ProfessionalRegistration.registrationType}
              >
                Escolha o Conselho Profissional
              </option>
              <option value="crefito">
                Conselho Regional de Fisioterapia e Ter. Ocupacional
              </option>
              <option value="crefono">
                Conselho Regional de Fonoaudiologia
              </option>
              <option value="crp">Conselho Regional de Psicologia</option>
              <option value="crn">Conselho Regional de Nutrição</option>
            </select>
            <button
              onClick={() => {
                setForm(form + 1);
              }}
            >
              <h2>Próximo</h2>
            </button>
            <button
              onClick={() => {
                setForm(form - 1);
              }}
            >
              <h2>Voltar</h2>
            </button>
          </Banner>
        )}

        {form === 6 && (
          <Banner>
            <h2>Qual o número da sua inscrição no conselho responsável?</h2>
            <input
              name="professionalNumber"
              value={ProfessionalRegistration.professionalNumber}
              onChange={handleProfessionalRegistration}
              type="number"
              placeholder="Número de inscrição no Conselho Profissional"
              required/>
            <button
              onClick={() => {
                setForm(form + 1);
              }}
            >
              <h2>Próximo</h2>
            </button>
            <button
              onClick={() => {
                setForm(form - 1);
              }}
            >
              <h2>Voltar</h2>
            </button>
          </Banner>
        )}

        {form === 7 && (
          <Banner>
            <h2>Digite o seu telefone para contato</h2>
            <input
              name="phoneNumber"
              value={ProfessionalRegistration.phoneNumber}
              onChange={handleProfessionalRegistration}
              type="phoneNumber"
              placeholder="Telefone para contato"
              required/>
            <button
              onClick={() => {
                setForm(form + 1);
              }}
            >
              <h2>Próximo</h2>
            </button>
            <button
              onClick={() => {
                setForm(form - 1);
              }}
            >
              <h2>Voltar</h2>
            </button>
          </Banner>
        )}
        {form === 8 && (
          <Banner>
            {disable ? (
              <button className="Loading...">
                <h2>{`Loading...`}</h2>
              </button>
            ) : (
              <>
                <h2>
                  Iremos analisar os seus dados e em breve entraremos em
                  contato!
                </h2>
                <ButtonForm
                  onClick={registration}
                  type="submit"
                  disabled={disable}
                >
                  <h2>Enviar</h2>
                </ButtonForm>
                <Link to="/">
                  <button><h2>Cancelar</h2></button>
                </Link>
              </>
            )}
          </Banner>
        )}
        {success === true && (
          <Banner>
            <>
              <h2>Dados enviados com sucesso!</h2>

              <Link to="/">
                <h2>Voltar para a Home</h2>
              </Link>
            </>
          </Banner>
        )}
      </form>
    </>
  );
}

const Banner = styled.div`
  width: 600px;
  height: 398px;
  background: #ffffff;
  margin-left: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  box-shadow: 4px 4px 4px 4px rgba(0, 0, 0, 0.25);
  word-break: break-word;
  padding: 10px;

  h2 {
    text-align: center;
    font-family: "Lato";
    font-weight: 800px;
    font-size: 15px;
    line-height: 30px;
    color: gray;

  }
  button {
    height: 35px;
    width: 100px;
    margin-top: 15px;
    margin-bottom:20px;
    border-radius: 6px;
    border: none;
    background-color: #54b8b6;
    cursor: pointer;
    display: flex;
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

const ButtonForm = styled.button`
  width: 50px;
  heigth: 70px;
  border-radius: 6px;
  border: none;
  background-color: #54b8b6;
  display:flex;
  flex-direction:rows;
`;
