import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled, { css } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import PageTemplate from 'templates/PageTemplates';
import { Redirect } from 'react-router';
import { getAccount } from 'actions';
import spotifyLogo from 'assets/spotify.svg';
import { connectStreamElements, addChangeVolumeAward, addRiotAccount } from '../actions';

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
  min-width: 280px;
  padding-left: 10px;
`;

const Form = styled.form`
  max-width: 600px;
  width: 100%;
  min-width: 280px;
  display: grid;
  margin: auto;
`;

const Select = styled.select`
  width: 140px;
  margin: 10px;
  height: 30px;
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

const RequiredMessage = styled.span`
  color: ${({ theme }) => theme.mainColor};
  font-size: ${({ theme }) => theme.fontSize.xs};
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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { clientID: '', token: '' } });

  const { register: registerAward, handleSubmit: handleSubmitAward, getValues } = useForm();
  const { register: registerRiot, handleSubmit: handleSubmitRiot } = useForm();

  const connectStreamElementsSubmit = ({ clientID, token }) => {
    dispatch(connectStreamElements(clientID, token, account.streamer));
    reset();
  };

  const addChangeVolumeAwardSubmit = ({ min, max, minSR, maxSR, time }) => {
    dispatch(addChangeVolumeAward(min, max, minSR, maxSR, time, account.streamer));
  };

  const addRiotSubmit = ({ name, server }) => {
    dispatch(addRiotAccount(name, server, account.streamer));
  };

  const connectSpotify = () => {
    window.location.href = `https://dynamix-bot.glitch.me/spotify?user=${account.streamer}`;
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
          <Status isActive={null}>Riot Games</Status>
        </StatusBox>
        <h3>Połącz się ze Spotify i Stream Elements, aby mieć kontrole nad przepływem piosenek.</h3>
        <p>
          Korzyści jakie daję połącze bora z kontami Spotify i Stream Elements są wypisane w
          zakładce Home.
        </p>
        <GridBox>
          <FlexBox>
            <p>Połącz się z Spotify klikając przycisk poniżej</p>
            <p>
              Ważne na pv na discord {'(Dynamix #1054)'} wyślij mi email na którym jest spotify aby
              sprawdzić kliknij w prawym górnym rogu na swój nick {'->'} konto
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
              Aby Aktywować automatyczne dodawanie piosenek do SR za nagrodę kanału kup ją, a jako
              tekst podaj "add-song-award".
            </h3>
          </FlexBox>
          <FlexBox>
            <h3>
              Aby Aktywować automatyczne pomijanie piosenek za nagrode kanału kup ją, a jako tekst
              podaj "skip-song-award".
            </h3>
          </FlexBox>
        </GridBox>
        <FlexBox>
          <h3>
            Aby Aktywować automatyczną zmiane głosności przy zakupie nagrody kanału. Ustaw poniżej
            odpowiednie wartości na nastpępnie kup tą nagrode na swoim kanale a jako tekst podaj
            <br />
            "change-volume-song-award".
          </h3>
          <Form onSubmit={handleSubmitAward(addChangeVolumeAwardSubmit)}>
            <Label>
              {'Domyślna głośność na Spotify'}
              <input
                type="range"
                min={0}
                max={100}
                defaultValue={min}
                onChange={() => setMin(getValues('min'))}
                onMouseUp={(event) => setMin(event.target.value)}
                {...registerAward('min')}
              />
              {<RequiredMessage>{min}</RequiredMessage>}
            </Label>
            <Label>
              {'Głosność po urzyciu nagrody na Spotify'}
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
              {'Głosność po urzyciu nagrody na Spotify'}
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
            <Label style={{ maxWidth: '300px' }}>
              {'Czas trwania w sekundach'}
              <Input
                type="number"
                defaultValue={time}
                onChange={() => setTime(getValues('time'))}
                {...registerAward('time', { required: true })}
              />
            </Label>

            <Button type="submit">Zapamiętaj ustawienia</Button>
          </Form>
        </FlexBox>
        <h3>
          Połącz się z kontem Riot Games, aby móc puszczać automatyczne reklamy po zakończonym meczu
          oraz, aby móc korzystać z komend !matches i !match
        </h3>
        <FlexBox>
          <Form onSubmit={handleSubmitRiot(addRiotSubmit)}>
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

            <Button type="submit">Add account</Button>
          </Form>
          <div>
            <h3>Lista kont:</h3>
            {account.riotAccountList.forEach((riotAccount) => (
              <p>
                {riotAccount.name} {'(' + riotAccount.name + ')'}
              </p>
            ))}
          </div>
        </FlexBox>
        <h3>
          Dodaj skandowanie w wybranych przez siebie momentach np. koniec meczu, subskrybcja w
          prezencie, raid.
        </h3>
        <p>Możliwe do wprowadzenia dopiero jak opcja /chant na twitch będzie ogólnodostępna. </p>
      </Wrapper>
    </PageTemplate>
  ) : (
    <Redirect to={'/'} />
  );
};

export default DashboardPage;
