import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import styled from 'styled-components';
 


const handleDragStart = (e) => e.preventDefault();
 
const items = [
  <img src="https://media.istockphoto.com/id/471562930/pt/foto/instrutor-assistindo-mulher-idosa-em-exerc%C3%ADcio.jpg?s=612x612&w=0&k=20&c=bjNkJuLQwfNUQHNevQysJe7ZW_5TbQavrf7_MSYM5c8=" onDragStart={handleDragStart} role="presentation" />,
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThqRuWF84ogEvJ8d5oFueKT_zUmZKTKxh-gA&usqp=CAU" onDragStart={handleDragStart} role="presentation" />,
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxCYUKcpxqutFXkxn5yhvedJx7h7gG2UTV6dGiBvq27ClSpaEKQ9M214LnLbissQijqZ4&usqp=CAU" onDragStart={handleDragStart} role="presentation" />,
];
 
const Gallery = () => {
  return (
    <Test>
    <AliceCarousel mouseTracking items={items} />
    </Test>
  );
}

export default Gallery

const Test = styled.li`
width: 990px;
height: 0px;
img{
  width:720px;
  height:480px;
  margin-left:145px;
  margin-bottom:-50px;
  border-radius:10px;
}
`