import React, { useState, useEffect } from 'react';
import { fetchPrizes } from '../api.js';
import styled from 'styled-components'

const Conatiner=styled.div`
background-color: #fff;
box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
border-radius: 5px;
padding: 20px;
margin: 20px;
`;
const Title=styled.h2`
margin: 10px;
`;
const Ul=styled.ul`
list-style: none;
padding: 0;
`;
const Li=styled.li`
margin: 15px;
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

const MultipleWinners = () => {
  const [multipleWinners, setMultipleWinners] = useState([]);

useEffect(() => {
    const findMultipleWinners = async () => {
        try {
            const data = await fetchPrizes();
            const winners = {};
            // if(!Array.isArray(data)){
            //     console.log('Data not formatted!');
            // }
            data.forEach((prize) => {
            if (winners[prize.laureates]) {
                winners[prize.laureates].count++;
            } else {
                winners[prize.laureates] = {
                count: 1,
                born: prize.year,
                category: prize.category,
                };
            }
            });

            
            const multipleWinnersList = Object.entries(winners)
            .filter(([, info]) => info.count > 1)
            .map(([winner, info]) => ({ winner, ...info }));

            setMultipleWinners(multipleWinnersList);
        } catch (error) {
            console.error(error);
        }
    };
    findMultipleWinners();
}, []);

return (
    <Conatiner>
        <Title>Multiple Nobel Prize Winners</Title>
        <Ul>
            {multipleWinners.map((winner, index) => (
            <Li key={index}>
                <ul>
                    {winner.laureates?.map(laureate=>(
                        <li key={laureate.id}>
                        {laureate.firstname} {laureate.surname}<br />
                        {laureate.id} {laureate.motivation}<br />
                        </li>
                ))}  
                </ul>
                Id: {index} Category: {winner.category} - Won {winner.count} Nobel Prizes
            </Li>
            ))}
        </Ul>
    </Conatiner>
);
};

export default MultipleWinners;
