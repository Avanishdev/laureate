import React, { useState, useEffect } from 'react';
import { fetchPrizes } from '../api.js';
import styled from 'styled-components';

const Container=styled.div`
background-color: #fff;
box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
border-radius: 5px;
padding: 20px;
margin: 20px;
/* overflow: scroll; */
`;
const Title=styled.h2`
margin-bottom: 10px;
`;
const Ul=styled.ul`
list-style: none;
padding: 0;
`;
const Li=styled.li`
margin: 5px 0px;
border: 1px solid gray;
border-radius: 10px;
padding: 10px;
font-size: 15px;
font-weight:600 ;
cursor: pointer;
&:hover{
    background: #f2f2f2;
    /* color: black; */
}
`;
const Div=styled.div`
margin: 10px;
`;
const Label=styled.label`

`;
const Select=styled.select`

`;
const Option=styled.option`

`;
const Input=styled.input`
outline: none;
padding: 3px 10px;
font-size: 15px;
`;


const PrizeList = () => {

const [prizes, setPrizes] = useState([]);
const [selectedYear, setSelectedYear] = useState(0); // By default 0 for all years
const [selectedCategory, setSelectedCategory] = useState('');

useEffect(() => {
    const fetchPrizesData = async () => {
    try {
        const data = await fetchPrizes();
        setPrizes(data);
        // console.log(data);
    } catch (error) {
        console.error(error);
    }
    };
    fetchPrizesData();
}, [selectedYear, selectedCategory]);

return (
    <div>
        <Container>
        <Title>Prize Winners</Title>
        <Div>
        <Label>Filter by Year: </Label>
        <Select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
        >
            <Option value={0}>All</Option>
            {Array.from({ length: 2019 - 1900 }, (_, i) => 1900 + i).map(
                (year) => (
                <Option key={year} value={year}>
                    {year}
                </Option>
                )
            )}
        </Select>
        </Div>
        <Div>
            <Label>Filter by Category: </Label>
            <Input
            type="text"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            />
        </Div>
        <Ul>
            {prizes.filter(
            (prize) =>
                (selectedYear === 0 || prize.year === selectedYear) &&
                (selectedCategory === '' ||
                    prize.category.toLowerCase().includes(selectedCategory.toLowerCase()))
            ).slice(0,100).map((prize, index) => (
            <Li key={index}>
                Category: {prize.category}<br />
                Year:{prize.year}
                <ul style={{listStyle:"none",padding:"0px"}}>
                {prize.laureates.map(laureate => (
                    <li key={laureate.id}>
                    {laureate.firstname} {laureate.surname}<br />
                    </li>
                ))}
                </ul>
            </Li>
            ))}
        </Ul>
        </Container>
    </div>
);
};

export default PrizeList;
