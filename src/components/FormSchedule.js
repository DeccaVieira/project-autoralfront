import React, { useState } from "react";
import styled from "styled-components";
import { useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../providers/auth";
import CardProfessional from "./CardProfessional";
import Calendar from "react-calendar";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

export default function FormSchedule() {
  const { token, userId } = React.useContext(AuthContext);
  const [cbo, setCbo] = useState([]);
  const [professionalId, setProfessionalId] = useState(0);

  const [quantity, setQuantity] = useState(0);
  const [scheduleData, setscheduleData] = useState({
    cbo: 0,
    health_professional_id: professionalId,
    date_schedule: dayjs(0),
    schedule_hour: "",
    share_data: 0,
    quantityProcedure: quantity,
  });
  const [success, setSuccess] = useState(false);
  console.log(scheduleData);
  const [professionals, setProfessionals] = useState([]);
  const [availableSchedules, setAvailableSchedules] = useState([]);
  const [hour, setHour] = useState([]);
  const [date, setDate] = useState("");
  const [medicalOrder, setMedicalOrder] = useState(false);
  const [shareData, setShareData] = useState(false);
  const [scheduled, setScheduled] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  //pega a especialidade
  useEffect(() => {
    const URL = `${process.env.REACT_APP_API_BASE_URL}/cbo`;

    const promise = axios.get(URL);

    promise.then((res) => {
      setCbo(res.data);
      //  setSuccess(false)
    });
    promise.catch((err) => {
      console.log(err.response);
    });
  }, []);

  //pega o profissional
  useEffect(() => {
    const URL = `${process.env.REACT_APP_API_BASE_URL}/professional-registration/${scheduleData.cbo}`;

    const promise = axios.get(URL);

    promise.then((res) => {
      setProfessionals(res.data);
    });
    promise.catch((err) => {
      console.log(err.response);
    });
  }, [scheduleData.cbo]);

  useEffect(() => {
    const URL = `${process.env.REACT_APP_API_BASE_URL}/scheduling-exists/${scheduleData.cbo}`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const promise = axios.get(URL, config);

    promise.then((res) => {
      setQuantity(res.data.quantity);
    });
    promise.catch((err) => {
      console.log(err.response);
    });
  }, [scheduleData.cbo]);

  function showOpt() {
    setscheduleData({ ...scheduleData, quantityProcedure: quantity });
    setShowOptions(true);
  }
  useEffect(() => {
    const URL = `${
      process.env.REACT_APP_API_BASE_URL
    }/schedule/${+scheduleData.health_professional_id}`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const promise = axios.get(URL, config);

    promise.then((res) => {
      setAvailableSchedules(res.data);
    });
    promise.catch((err) => {
      console.log(err.response);
    });
  }, [scheduleData.health_professional_id]);

  useEffect(() => {
    const URL = `${process.env.REACT_APP_API_BASE_URL}/date/${dayjs(
      scheduleData.date_schedule
    ).toISOString()}/${scheduleData.health_professional_id}`;
    console.log(URL, "url importante");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const promise = axios.get(URL, config);

    promise.then((res) => {
      console.log(res.data, "importante");
      setHour(res.data);
    });
    promise.catch((err) => {
      console.log(err.response);
    });
  }, [scheduleData.date_schedule]);

  function registration() {
    const URL = `${process.env.REACT_APP_API_BASE_URL}/scheduling`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const promise = axios.post(URL, scheduleData, config);
    promise.then((res) => {
      setScheduled(true);
    });
    promise.catch((err) => {
      alert(err.response);
      console.log(err.response);
    });
  }

  function ScheduleApp(e) {
    e.preventDefault();
  }
  function handleCbo(id) {
    setscheduleData({
      ...scheduleData,
      cbo: id,
    });
  }
  function handleDisabled(date) {
    dayjs(date).isSame(dayjs(), "day");
    let available = true;
    const dayjsSchedules = availableSchedules.map((item) =>
      dayjs(item.date_schedule)
    );

    dayjsSchedules.forEach((item) => {
      if (dayjs(date).isSame(item, "day")) {
        available = false;
        return;
      }
    });
    return available;
  }

  function handleSchedule(e) {
    setscheduleData({
      ...scheduleData,
      [e.target.name]: e.target.value,
    });
  }
  function handle(id) {
    setProfessionalId(id);
    setscheduleData({ ...scheduleData, health_professional_id: id });
  }
  return (
    <>
      {scheduled === false ? (
        <form onSubmit={ScheduleApp}>
          <Banner>
            <h2>Selecione a especialidade que deseja agendar</h2>

            <ul>
              {cbo.map((c) => {
                return (
                  <li onClick={() => handleCbo(c.id)} value={c.id}>
                    {c.role}
                  </li>
                );
              })}
            </ul>
          </Banner>
          {scheduleData.cbo && (
            <BannerProfessional>
              <h2>Selecione o Profissional</h2>

              <div
                className="wrapper"
                name="health_professional_id"
                onChange={handleSchedule}
              >
                {professionals &&
                  professionals.map((c) => {
                    return (
                      <CardProfessional value={c.id} c={c} handle={handle}>
                        {c.name}
                      </CardProfessional>
                    );
                  })}
              </div>
            </BannerProfessional>
          )}
          {scheduleData.health_professional_id && (
            <Banner>
              <h2>Selecione a data desejada</h2>
              <Calendar
                value={date}
                onClickDay={(e) => {
                  setSuccess(true);
                  setscheduleData({
                    ...scheduleData,
                    date_schedule: e,
                  });
                }}
                tileDisabled={({ date }) => handleDisabled(date)}
              />
            </Banner>
          )}
          {success && (
            <Banner>
              <h2>Selecione a hora desejada</h2>
              <BannerHour>
                {hour &&
                  hour.map((h) => (
                    <p
                      onClick={() =>
                        setscheduleData({
                          ...scheduleData,
                          schedule_hour: h.hour,
                        })
                      }
                    >
                      <>
                        {h.available === true ? (
                          <button>
                            <h1>{h.hour}</h1>
                          </button>
                        ) : (
                          <button disabled={true}>{h.hour}</button>
                        )}
                      </>
                    </p>
                  ))}
              </BannerHour>
            </Banner>
          )}
          {scheduleData.schedule_hour && (
            <Banner>
              <>
                <>
                  <h2>
                    Respeitamos a sua privacidade, abaixo escolha a quais
                    informações do seu prontuário o profissional que irá te
                    atender terá acesso!
                  </h2>
                </>
                <button onClick={showOpt}>Escolher as opções</button>
              </>
              {showOptions === true && (
                <Options>
                  <button
                    onClick={() =>
                      setscheduleData({ ...scheduleData, share_data: 1 })
                    }
                  >
                    Todos os dados do prontuário
                  </button>
                  <button
                    onClick={() =>
                      setscheduleData({ ...scheduleData, share_data: 2 })
                    }
                  >
                    Somente atendimentos da mesma especialidade
                  </button>

                  <button
                    onClick={() =>
                      setscheduleData({ ...scheduleData, share_data: 3 })
                    }
                  >
                    {" "}
                    Somente os atendimento desse mesmo profissional
                  </button>
                </Options>
              )}
            </Banner>
          )}
          {scheduleData.share_data & (quantity !== 0) ? (
            <Banner>
              <h2>Quantidade de sessão restante à realizar : {quantity}</h2>
            </Banner>
          ) : (
            <>
              {scheduleData.share_data && (
                <>
                  <>
                    <Banner>
                      <h2>
                        Lembre-se que para realizar procedimentos seriados é
                        necessário a apresentação de um pedido médico.
                      </h2>
                      <h2>
                        Você possui pedido médico? confirme para prosseguir com
                        o agendamento
                      </h2>
                      <button onClick={() => setMedicalOrder(true)}>
                        Confirmar
                      </button>
                    </Banner>
                  </>
                </>
              )}
            </>
          )}
          {medicalOrder && (
            <Banner>
              <h2>Quantas sessões foram solicitadas pelo seu médico?</h2>
              <input
                name="quantityProcedure"
                value={scheduleData.quantityProcedure}
                onChange={handleSchedule}
                type="quantityProcedure"
                placeholder="Quantidade Solicitada"
              />
            </Banner>
          )}
          {scheduleData.share_data && (
            <Banner>
              <Button onClick={registration} type="submit">
                <h2>Enviar</h2>
              </Button>
            </Banner>
          )}
        </form>
      ) : (
        <Banner>
          <>
            <h2>Consulta agendada com sucesso!</h2>
            <Link to={"/"}>
              <Button>
                <h2>Voltar a Página Principal</h2>
              </Button>
            </Link>
          </>
        </Banner>
      )}
    </>
  );
}

const Container = styled.main``;
const Options = styled.div`
  display: flex;
  button {
    margin: 40px;
  }
`;

const Banner = styled.div`
  width: 900px;
  background: #ffffff;
  margin-left: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  box-shadow: 4px 4px 4px 4px rgba(0, 0, 0, 0.25);

  h5 {
    text-align: center;
    cursor: pointer;
    font-family: "Lato";
    font-weight: 800px;
    font-size: 17px;
    line-height: 20px;
    color: red;
  }
  h2 {
    text-align: center;
    cursor: pointer;
    font-family: "Lato";
    font-weight: 800px;
    font-size: 17px;
    line-height: 20px;
    color: black;
  }
  p {
    text-align: center;
    cursor: pointer;
    font-family: "Lato";
    font-weight: 800px;
    font-size: 17px;
    line-height: 20px;
    color: black;
  }
  li {
    text-align: center;
    cursor: pointer;
    font-family: "Lato";
    font-weight: 800px;
    font-size: 17px;
    line-height: 20px;
    color: gray;
  }
  button {
    height: 65px;
    width: 100px;
    margin-top: 33px;
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
const Card = styled.div`
  width: 140px;
  height: 135px;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  margin-bottom: 30px;
  color: black;
`;
const BannerHour = styled.div`
  width: 900px;
  background: #ffffff;
  display: flex;
  flex-wrap:wrap;
  align-items:flex-end;
  border-radius: 8px;
  box-shadow: 4px 4px 4px 4px rgba(0, 0, 0, 0.25);
  button {
    height: 35px;
    width: 100px;
    margin-top: 20px;
    border-radius: 6px;
    border: none;
    background-color: #54b8b6;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    h2 {
      font-family: "Oswald";
      color: black;
      font-size: 19px;
      line-height: 40px;
    }
`;
const ButtonForm = styled.button`
  width: 50px;
  heigth: 70px;
  border-radius: 6px;
  border: none;
  background-color: #54b8b6;
`;
const BannerProfessional = styled.div`
  width: 900px;

  background: #ffffff;
  margin-left: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  box-shadow: 4px 4px 4px 4px rgba(0, 0, 0, 0.25);
  .wrapper {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  h2 {
    text-align: center;
    cursor: pointer;
    font-family: "Lato";
    font-weight: 800px;
    font-size: 17px;
    line-height: 20px;
    color: gray;
  }
  button {
    height: 35px;
    width: 100px;
    margin-top: 33px;
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
const Button = styled.button`
  height: 85px;
  width: 100px;
  margin-top: 33px;
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
`;
