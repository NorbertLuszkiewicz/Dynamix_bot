import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled, { css } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import PageTemplate from 'templates/PageTemplates';
import { Redirect } from 'react-router';
import { getAccount } from 'actions';
import spotifyLogo from 'assets/spotify.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import {
  connectStreamElements,
  addChangeVolumeAward,
  addRiotAccount,
  addSlotsAward,
} from '../actions';
import SwitchCommand from '../components/SwitchCommand/SwitchCommand';
import SlotsList from '../components/SlotsList/SlotsList';

const Wrapper = styled.main`
  display: grid;
  margin-top: 20px;
  max-width: 1200px;
  margin: auto;
  text-align: center;
`;

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffffff10;
  border-radius: 30px;
  margin: 20px;
  padding: 20px;
`;

const GridBox = styled.div`
  display: grid;
  grid-template-columns: 1fr;

  @media only screen and (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Button = styled.button`
  background-color: #4f226b;
  height: 40px;
  width: 240px;
  border: none;
  border-radius: 18px;
  color: white;
  font-size: ${({ theme }) => theme.fontSize.m};
  cursor: pointer;
  transition: background-color 0.3s;
  text-align: center;
  line-height: 40px;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  margin: 20px auto;

  :hover {
    background-color: #6f428b;
  }

  ${({ isSpotify }) =>
    isSpotify &&
    css`
      background-color: #1cb954;
      width: 160px;

      :hover {
        background-color: #1ed760;
      }
    `}
`;

const Icon = styled.img`
  height: 20px;
  padding-right: 7px;
`;

const Status = styled.div`
  position: relative;
  padding-left: 18px;

  ::before {
    content: '';
    width: 12px;
    height: 12px;
    background-color: ${({ theme }) => theme.mainColor};
    position: absolute;
    top: 3px;
    left: 0;
    background-color: #d40d40;
    border-radius: 50%;
    box-shadow: #000 0 -1px 4px 1px, inset #600 0 -1px 4px, #f00 0 2px 7px;

    ${({ isActive }) =>
      isActive &&
      css`
        background-color: #66dd00;
        box-shadow: #000 0 -1px 4px 1px, inset #460 0 -1px 4px, #7d0 0 2px 7px;
      `}
  }
`;

const StatusBox = styled.div`
  margin: 20px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Input = styled.input`
  margin: 10px 10px;
  height: 30px;
  border-radius: 20px;
  min-width: 250px;
  padding-left: 10px;
`;

const Form = styled.form`
  max-width: 600px;
  width: 100%;
  min-width: 250px;
  display: grid;
  margin: auto;
`;

const Select = styled.select`
  width: 140px;
  margin: 10px;
  height: 30px;
  border-radius: 20px;
  padding-left: 10px;
`;

const Label = styled.label`
  width: 100%;
  display: grid;
  margin: 10px auto;

  & > input {
    margin: 10px;
  }

  & > span {
    font-size: ${({ theme }) => theme.fontSize.m};
  }
`;

const CheckBoxWrapper = styled.div`
  position: relative;
`;
const CheckBoxLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 52px;
  height: 26px;
  border-radius: 15px;
  background: #bebebe;
  cursor: pointer;
  &::after {
    content: '';
    display: block;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    margin: 3px;
    background: #ffffff;
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
`;
const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 52px;
  height: 26px;
  &:checked + ${CheckBoxLabel} {
    background: #4fbe79;
    &::after {
      content: '';
      display: block;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      margin-left: 31px;
      transition: 0.2s;
    }
  }
`;

const RequiredMessage = styled.span`
  color: ${({ theme }) => theme.mainColor};
  font-size: ${({ theme }) => theme.fontSize.s};
`;

const DashboardPage = (props) => {
  const account = useSelector((state) => state.user.account);
  const dispatch = useDispatch();

  const urlParams = new URLSearchParams(window.location.search);
  const name = urlParams.get('name');
  const token = urlParams.get('token');

  const [min, setMin] = useState(account?.volumeSongID?.min ? account.volumeSongID.min : 40);
  const [max, setMax] = useState(account?.volumeSongID?.max ? account.volumeSongID.max : 80);
  const [minSR, setMinSR] = useState(
    account?.volumeSongID?.minSR ? account.volumeSongID.minSR : 20,
  );
  const [maxSR, setMaxSR] = useState(
    account?.volumeSongID?.maxSR ? account.volumeSongID.maxSR : 60,
  );
  const [time, setTime] = useState(account?.volumeSongID?.time ? account.volumeSongID.time : 45);
  const [slotsEmotes, setSlotsEmotes] = useState(7);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { clientID: '', token: '' } });

  const { register: registerAward, handleSubmit: handleSubmitAward, getValues } = useForm();
  const { register: registerRiot, handleSubmit: handleSubmitRiot } = useForm();
  const { register: registerSlots, handleSubmit: handleSubmitSlots } = useForm();

  const connectStreamElementsSubmit = ({ clientID, token }) => {
    dispatch(connectStreamElements(clientID, token, account.streamer));
    reset();
  };

  const addChangeVolumeAwardSubmit = ({ min, max, minSR, maxSR, time }) => {
    dispatch(addChangeVolumeAward(min, max, minSR, maxSR, time, account.streamer));
  };

  const addRiotSubmit = ({ name, server }) => {
    dispatch(addRiotAccount(name, server, account.streamer));
    dispatch(getAccount(name, token));
  };

  const addSlotsSubmit = ({ name, emotes, withBan }) => {
    dispatch(addSlotsAward(name, emotes, withBan, account.streamer));
    dispatch(getAccount(name, token));
  };

  const connectSpotify = () => {
    window.location.href = `https://dynamix-bot.glitch.me/spotify?user=${account.streamer}`;
  };

  const handleOnChange = (e) => {
    if (e.target?.name === 'emotes' && e.target.value) {
      setSlotsEmotes(parseInt(e.target.value));
    }
  };

  useEffect(() => {
    !account && dispatch(getAccount(name, token));
  }, [account, name, dispatch, token]);

  return account ? (
    <PageTemplate>
      <Wrapper>
        <StatusBox>
          <Status isActive={account.twitchAccessToken}>Twitch</Status>
          <Status isActive={account.spotifyRefreshToken}>Spotify</Status>
          <Status isActive={account.clientSongRequestSecret}>Stream Elements</Status>
          <Status isActive={account.riotAccountList?.length > 0}>Riot Games</Status>
        </StatusBox>
        <h3>Włącz/wyłącz grupe komend na swoim kanale</h3>
        <SwitchCommand account={account} />
        <h3>Połącz się ze Spotify i Stream Elements, aby mieć kontrole nad przepływem piosenek.</h3>
        <p>
          Korzyści jakie daję połączenie bota z kontami Spotify i Stream Elements są wypisane w
          zakładce Home.
        </p>
        <GridBox>
          <FlexBox>
            <p>Połącz się z Spotify, klikając przycisk poniżej</p>
            <p>
              <strong>Ważne</strong> na pv na discord {'(Dynamix #1054)'} wyślij mi email, na którym
              jest spotify, aby sprawdzić kliknij na spotify w prawym górnym rogu na swój nick 👉🏻
              konto 👉🏻 email
            </p>
            <Button isSpotify={true} onClick={connectSpotify}>
              <Icon src={spotifyLogo} alt="logo Spotify" /> Spotify
            </Button>
          </FlexBox>
          <FlexBox>
            <Form onSubmit={handleSubmit(connectStreamElementsSubmit)}>
              <p>
                Aby połączyć bota z kontem Stream Elements musisz wprowadzić obie wartości poniżej
              </p>
              <small style={{ margin: '10px 0 15px' }}>
                {'Account ID jak i JWT Token znajdziesz pod adresem '}
                <a
                  href="https://streamelements.com/dashboard/account/channels"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  https://streamelements.com/dashboard/account/channels
                </a>
                <br />
                {' po kliknięciu w "Show secrets" z prawej strony'}
              </small>
              <label>
                {'Account ID'}
                <Input type="text" {...register('clientID', { required: true })} />
                {errors.clientID && <RequiredMessage>⚠ Required</RequiredMessage>}
              </label>
              <label>
                {'JWT Token '}
                <Input type="text" {...register('token', { required: true })} />
                {errors.token && <RequiredMessage>⚠ Required</RequiredMessage>}
              </label>

              <Button type="submit">Stream Elements</Button>
            </Form>
          </FlexBox>
        </GridBox>
        <GridBox>
          <FlexBox>
            <h3>
              Aby Aktywować automatyczne dodawanie piosenek do SR za nagrodę kanału, po stworzeniu
              jej na twitch kup ją, a jako tekst podaj "add-song-award".
            </h3>
          </FlexBox>
          <FlexBox>
            <h3>
              Aby Aktywować automatyczne pomijanie piosenek za nagrodę kanału, po stworzeniu jej na
              twitch kup ją, a jako tekst podaj "skip-song-award".
            </h3>
          </FlexBox>
        </GridBox>
        <FlexBox>
          <h3>
            Aby Aktywować automatyczną zmianę głośności przy zakupie nagrody kanału. Ustaw poniżej
            odpowiednie wartości a następnie kup tę nagrodę na swoim kanale, a jako tekst podaj
            <br />
            "change-volume-song-award".
          </h3>
          <Form
            style={{ maxWidth: '800px' }}
            onSubmit={handleSubmitAward(addChangeVolumeAwardSubmit)}
          >
            <GridBox style={{ marginTop: '25px' }}>
              <Label>
                {'Domyślna głośność na Spotify'}
                <input
                  type="range"
                  min={0}
                  max={100}
                  defaultValue={min}
                  onChangeText={() => setMin(getValues('min'))}
                  onMouseUp={(event) => setMin(event.target.value)}
                  {...registerAward('min')}
                />
                {<RequiredMessage>{min}</RequiredMessage>}
              </Label>
              <Label>
                {'Głosność po użyciu nagrody na Spotify'}
                <input
                  type="range"
                  min={0}
                  max={100}
                  defaultValue={max}
                  onChange={() => setMax(getValues('max'))}
                  onMouseUp={(event) => setMax(event.target.value)}
                  {...registerAward('max')}
                />
                {<RequiredMessage>{max}</RequiredMessage>}
              </Label>
            </GridBox>
            <GridBox>
              <Label>
                {'Domyślna głośność na StreamElements'}
                <input
                  type="range"
                  min={0}
                  max={100}
                  defaultValue={minSR}
                  onChange={() => setMinSR(getValues('minSR'))}
                  onMouseUp={(event) => setMinSR(event.target.value)}
                  {...registerAward('minSR')}
                />
                {<RequiredMessage>{minSR}</RequiredMessage>}
              </Label>
              <Label>
                {'Głosność po użyciu nagrody na StreamElements'}
                <input
                  type="range"
                  min={0}
                  max={100}
                  defaultValue={maxSR}
                  onChange={() => setMaxSR(getValues('maxSR'))}
                  onMouseUp={(event) => setMaxSR(event.target.value)}
                  {...registerAward('maxSR')}
                />
                {<RequiredMessage>{maxSR}</RequiredMessage>}
              </Label>
            </GridBox>
            <Label style={{ maxWidth: '300px' }}>
              {'Czas trwania w sekundach'}
              <Input
                type="number"
                defaultValue={time}
                onChange={() => setTime(getValues('time'))}
                {...registerAward('time', { required: true })}
              />
            </Label>

            <Button type="submit">Save options</Button>
          </Form>
        </FlexBox>
        <h3>
          Połącz się z kontem Riot Games, aby mieć możliwość używania komend: !ranking, !staty,
          !mecze, !mecz
        </h3>
        <FlexBox>
          <Form onSubmit={handleSubmitRiot(addRiotSubmit)}>
            <GridBox>
              <Input
                style={{ width: '400px' }}
                type="text"
                placeholder="nickname"
                {...registerRiot('name', { required: true })}
              />
              <Select {...registerRiot('server')}>
                <option value={'EUW1'}>EUW</option>
                <option value={'EUN1'}>EUNE</option>
                <option value={'NA1'}>NA</option>
                <option value={'KR'}>KR</option>
              </Select>
            </GridBox>
            <Button type="submit">Add account</Button>
          </Form>
          <div>
            <h3>Lista kont:</h3>
            {account.riotAccountList.map((riotAccount) => (
              <p>
                {riotAccount.name} {'(' + riotAccount.server + ')'}
              </p>
            ))}
          </div>
        </FlexBox>
        <h3>Dodaj nagrody typu slots</h3>
        <FlexBox>
          <p>
            Aby Aktywować nagrodę z Slots, stwórz ją na twitch, następnie wypełnij i wyślij
            formularz poniżej, kolejnie kup tę nagrodę na twitch, a jako tekst podaj [Award name],
            który podałeś w formularzu poniżej
          </p>
          <Form
            style={{ maxWidth: '800px', width: 'auto' }}
            onChange={handleOnChange}
            onSubmit={handleSubmitSlots(addSlotsSubmit)}
          >
            <StatusBox style={{ marginBottom: '0' }}>
              <Input
                style={{ width: '200px' }}
                type="text"
                placeholder="Award name"
                {...registerSlots('name', { required: true })}
              />

              <StatusBox>
                <label style={{ marginTop: '-15px' }}>
                  Liczba emotek
                  <Input
                    style={{ width: '200px' }}
                    type="number"
                    max={10}
                    min={1}
                    defaultValue={7}
                    placeholder="Number of emotes"
                    {...registerSlots('emotes', { required: true })}
                  />
                </label>
                <RequiredMessage style={{ marginRight: '15px' }}>
                  win:{((1 / slotsEmotes / slotsEmotes) * 100).toFixed(2)}%
                </RequiredMessage>
              </StatusBox>

              <p data-tip="10min t/o przy przegranej, nic przy 2/3 emotek">
                Timeout za przegranie <FontAwesomeIcon icon={faQuestionCircle} />
              </p>
              <CheckBoxWrapper>
                <CheckBox {...registerSlots('withBan')} id="checkbox" type="checkbox" />
                <CheckBoxLabel htmlFor="checkbox" />
              </CheckBoxWrapper>
            </StatusBox>
            <Button type="submit">Add slots award</Button>
          </Form>
          {account.slotsID && (
            <div>
              <h3>Lista nagród slots:</h3>
              <SlotsList slots={account.slotsID} streamer={account.streamer} />
            </div>
          )}
        </FlexBox>
      </Wrapper>
    </PageTemplate>
  ) : (
    <Redirect to={'/'} />
  );
};

export default DashboardPage;
