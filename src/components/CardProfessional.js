import styled from "styled-components";

export default function CardProfessional({c, handle}) {
 
  return (
    
    <ProfessionalDiv value={c.id} onClick={()=>handle(c.id)}>
      <img src={c.picture_professional} alt="Professional" />
      <h1>{c.name}</h1>
      <h2>Conselho Profissional</h2>
      <h2>{c.professional_number}</h2>
    </ProfessionalDiv>
   
  );

}
const ProfessionalDiv = styled.div`
  display: flex;
  width: 140px;
  height: 180px;
  padding: 10px;
  flex-direction: column;
  align-items: center;
  border-radius: 3px;
  background-color: #ffffff;
  margin: 8px 15px;
  box-shadow: 0px 2px 4px 2px #0000001a;
  box-sizing: border-box;
  h1 {
    font-size: 15px;
    color: black;
    margin-top: 5px;
    line-height: 22px;
  }
  h2 {
    font-size: 15px;
    color: #262e3d;
    margin-bottom: 9px;
  }
  img {
    width: 80px;
    height: 40px;
    border-radius: 8px;
  
    margin-bottom: 10px;
  }
`;
const Main = styled.main`
width: 100%;
background-color:red;
display:flex;
flex-direction:row;

`
