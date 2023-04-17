import styled from 'styled-components';
import { Link } from 'react-router-dom';
export function RegistrationProfessional(){
  return (
    <Banner>
<h2>É um profissional da saúde?</h2>
<h2>Venha fazer parte do nosso time!</h2>

<Link to="/cadastro-profissional">
<button><h2>Se inscreva</h2></button>
        </Link>
    </Banner>
  )
}

const Banner = styled.div`
width: 200px;
height: 198px;
background: linear-gradient(to left top, #8ad7ed, #b3dab9);
margin-left: 1060px;
margin-top: 20px;
display:flex;
flex-direction:column;
align-items: center;
justify-content:center;
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
  height: 35px;
  width: 100px;
  margin-top: 33px;
  border-radius: 6px;
  border: none;
  background-color: #54b8b6;
  cursor: pointer;
  display:flex;
  align-items:center;
  justify-content:center;
  cursor: pointer;

  h2 {
    font-family: "Oswald";
    color: #ffffff;
    font-size: 19px;
    line-height: 40px;
  }
}
`