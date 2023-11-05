import React from 'react'
import PrizeList from './components/PrizeList'
import MultipleWinners from './components/MultipleWinnersList'
import styled from 'styled-components';

const Container=styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;
`;
const Header=styled.header`
  background-color: #f2f2f2;
  color: black;
  padding: 10px 0;
  border:1px solid gray;
  border-radius: 10px;
  width: 80%;
`;
const Title=styled.h1``;
const Content=styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
  border: 1px solid transparent;
  border-radius: 8px;
`;
const List=styled.div`
  flex: 1;
  background-color: #f2f2f2;
  padding: 20px;
  border: 1px solid #ddd;
`;
const Multiples=styled.div`
  flex: 1;
  height: 50%;
  background-color: #f2f2f2;
  padding: 20px;
  border: 1px solid #ddd;
`;

const App = () => {
  return (
    <div>
        <Container>
          <Header>
            <Title>Noble Prize Winners</Title>
          </Header>
          <Content>
            <List>
              <PrizeList/>
            </List>
            <Multiples>
              <MultipleWinners/>
            </Multiples>
          </Content>
        </Container>
    </div>
  )
}

export default App