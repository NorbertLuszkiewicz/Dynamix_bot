import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PageTemplate from 'templates/PageTemplates';
import { useDispatch, useSelector } from 'react-redux';
import { getAccount } from '../actions';

const Wrapper = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  max-width: 1200px;
  margin: 0 auto 20px;

  @media only screen and (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ItemList = styled.div`
  display: grid;
  text-align: center;
  background-color: ${({ theme }) => theme.lighter};
  border-radius: 30px;
  margin: 20px;
  padding: 20px;

  & > h2 {
    margin-top: 30px;
  }
`;

const Item = styled.div`
  display: grid;
  margin: 5px;
  border-radius: 20px;
  transition: background-color 0.3s;

  & > h4 {
    color: ${({ theme }) => theme.mainColor};
  }

  :hover {
    background-color: ${({ theme }) => theme.lighter};
  }
`;

const CommandTitle = styled.h4`
  color: #aaa;
`;

const Footer = styled.div`
  text-align: center;
  padding: 15px 0 15px;
  margin-top: 15px;
  border-top: 4px solid white;
`;

const ErrorBox = styled.div`
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  height: 150px;
  border: 3px solid ${({ theme }) => theme.mainColor};
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.mainBackground};
`;

const HomePage = () => {
  const [showError, setShowError] = useState(false);
  const account = useSelector((state) => state?.user?.account);
  const name = localStorage.getItem('name');
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();
  const urlParams = new URLSearchParams(window.location.search);
  const error = urlParams.get('error');

  const closeHandler = () => {
    setShowError(false);
  };

  useEffect(() => {
    !account && dispatch(getAccount(name, token));

    document.body.addEventListener('click', closeHandler);
    return () => {
      window.removeEventListener('click', closeHandler);
    };
  }, [account, dispatch, name, token]);

  return (
    <PageTemplate>
      {showError && <ErrorBox>{error} Coś poszło nie tak :/</ErrorBox>}
      <Wrapper onLoad={() => setShowError(error)}>
        <ItemList>
          <h1>Lista komend</h1>
          <Item>
            <CommandTitle>!dynamix</CommandTitle>
            <p>Komenda sprawdzająca czy aktualnie bot działa. Powinno zwrócić "Bot Works!"</p>
          </Item>
          <Item>
            <CommandTitle>piramidka [emote]</CommandTitle>
            <p>Tworzy piramidkę 4 stopnia z podanej emotki</p>
          </Item>
          <h2>Komendy po połączeniu z Spotify i StreamElements</h2>
          <Item>
            <CommandTitle>!song</CommandTitle>
            <p>
              Komenda zwraca nazwe, autora oraz link do piosenki, w zależności co aktualnie leci czy
              spotify czy SR zwrócu prawidłowy utwór
            </p>
          </Item>
          <Item>
            <CommandTitle>!playlist/!playlista</CommandTitle>
            <p>Wyświetla playliste spotify na której aktualnie jest streamer</p>
          </Item>
          <Item>
            <CommandTitle>volume [0-100]</CommandTitle>
            <p>Zmienia głosność na spotify. Tylko dla moderatorów</p>
          </Item>
          <Item>
            <CommandTitle>!next</CommandTitle>
            <p>Pomija piosneke na spotify/SR. Tylko dla moderatorów</p>
          </Item>
        </ItemList>
        <ItemList>
          <h1>Możliwości bota</h1>
          <Item>
            <p>Automatyczne dodaje piosenkę za pkt kanału do kolejki StreamElements</p>
            <small>
              Po połączeniu z Spotify I StreamElements dodatkowo zatrzymuje Spotify przy zakupieniu
              nagrody i wraca do piosenki po zakończeniu listy SR
            </small>
          </Item>
          <Item>
            <p>Automatyczne pomija piosenkę z SR przy wukupieniu nagrody za pkt kanału </p>
            <small>
              Po połączeniu z Spotify I StreamElements dodatkowo pomija piosenki na Spotify
            </small>
          </Item>
          <h2>Dodatkowe Informacje</h2>
          <Item>
            <p>
              Aby bot działał z nagrodami za punkty, nagrody te muszą być z możliwością wpisania
              tekstu
            </p>
          </Item>
          <Item>
            <p>Bot musi być moderatorem czatu aby działał poprawnie</p>
          </Item>
          <Item>
            <p>Akutualnie prace trwają nad dodaniem integracji z Riot games</p>
          </Item>
        </ItemList>
      </Wrapper>
      <Footer>
        <h3>
          W sprawie kolejnych pomysłów co można dodać do bota, proszę pisać do DynaM1X1 na twitch
          albo Dynamix #1054 na Discord
        </h3>
        <p>Dynamix-bot wersja: Beta 0.4.1</p>
      </Footer>
    </PageTemplate>
  );
};

export default HomePage;
