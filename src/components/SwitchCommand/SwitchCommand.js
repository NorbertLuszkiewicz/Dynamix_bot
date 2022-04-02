import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
//import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { changeCommandSwitch } from '../../actions';
import Toggle from '../Toggle/Toggle';
import ReactTooltip from 'react-tooltip';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 10px;
  width: 100%;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.xs};
  padding: 10px;
  background-color: ${({ theme }) => theme.mainBackground};
`;

const OptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledP = styled.p`
  margin: 2px 7px 5px 0;
`;

const SwitchCommand = ({ account }) => {
  const [weather, setWeather] = useState(account.commandSwitch.weather);
  const [tft, setTft] = useState(account.commandSwitch.tft);
  const [chess, setChess] = useState(account.commandSwitch.chess);
  const [wordle, setWordle] = useState(account.commandSwitch.wordle);
  const [slots, setSlots] = useState(account.commandSwitch.slots);
  const [song, setSong] = useState(account.commandSwitch.song);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeCommandSwitch(account.streamer, { weather, tft, chess, wordle, slots, song }));
  }, [weather, tft, chess, wordle, slots, song, account.streamer, dispatch]);

  return (
    <Wrapper>
      <OptionWrapper>
        <Toggle id="weather" checked={weather} onClick={() => setWeather(!weather)} />
        <StyledP data-place="bottom" data-tip="komendy: !pogoda, !horoskop">
          Pogoda
        </StyledP>
      </OptionWrapper>
      <OptionWrapper>
        <Toggle id="tft" checked={tft} onClick={() => setTft(!tft)} />
        <StyledP data-place="bottom" data-tip="komendy: !mecze, !mecz, !staty, !ranking">
          TFT
        </StyledP>
      </OptionWrapper>
      <OptionWrapper>
        <Toggle id="chess" checked={chess} onClick={() => setChess(!chess)} />
        <StyledP data-place="bottom" data-tip="komendy: !chessuser, !chesslast">
          Szachy
        </StyledP>
      </OptionWrapper>
      <OptionWrapper>
        <Toggle id="wordle" checked={wordle} onClick={() => setWordle(!wordle)} />
        <StyledP data-place="bottom" data-tip="komenda: !wordle">
          Wordle
        </StyledP>
      </OptionWrapper>
      <OptionWrapper>
        <Toggle id="slots" checked={slots} onClick={() => setSlots(!slots)} />
        <StyledP data-place="bottom" data-tip="komenda: !slots">
          Slots
        </StyledP>
      </OptionWrapper>
      <OptionWrapper>
        <Toggle id="song" checked={song} onClick={() => setSong(!song)} />
        <StyledP data-place="bottom" data-tip="komendy: !song, !playlist">
          Song
        </StyledP>
      </OptionWrapper>
      <ReactTooltip />
    </Wrapper>
  );
};

export default SwitchCommand;
