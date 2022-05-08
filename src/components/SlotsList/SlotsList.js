import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { getAccount, removeSlot } from '../../actions';

const StyledTd = styled.td`
  padding: 5px;
`;

const StyledTh = styled.th`
  padding: 4px 10px;
`;
const StyledButton = styled.button`
  cursor: pointer;
  width: 28px;
  height: 28px;
  background-color: #f25941;
  color: white;
  border-radius: 50%;
  transition: background-color 0.3s;

  :hover {
    background-color: #c23921;
  }
`;

const SlotsList = ({ slots, streamer }) => {
  const dispatch = useDispatch();

  const deleteSlot = (id) => {
    console.log(id);
    dispatch(removeSlot(id, streamer));
    dispatch(getAccount(streamer));
  };

  return (
    <table>
      <thead>
        <tr>
          <StyledTh>Nazwa</StyledTh>
          <StyledTh>T/o za przegraną</StyledTh>
          <StyledTh>Ilość emotek</StyledTh>
          <StyledTh>Użyto</StyledTh>
          <StyledTh>Wygrało</StyledTh>
          <StyledTh>Aktywne</StyledTh>
          <StyledTh>Usuń</StyledTh>
        </tr>
      </thead>
      <tbody>
        {slots.map((slot) => (
          <tr>
            <StyledTd>{slot.name}</StyledTd>
            <StyledTd>{slot.withBan ? 'Włączone' : 'Wyłączone'}</StyledTd>
            <StyledTd>
              {slot.emotes + ` (${((1 / slot.emotes / slot.emotes) * 100).toFixed(2)}% na wina)`}
            </StyledTd>
            <StyledTd>{slot.times}</StyledTd>
            <StyledTd>{slot.wins}</StyledTd>
            <StyledTd>{slot.id ? 'Tak' : 'Nie'}</StyledTd>
            <StyledTd>
              {' '}
              <StyledButton onClick={() => deleteSlot(slot.name)}>X</StyledButton>
            </StyledTd>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SlotsList;
