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
  display: flex;
  flex-direction: column;
  text-align: center;
  background-color: ${({ theme }) => theme.lighter};
  border-radius: 30px;
  margin: 20px;
  padding: 20px;
  justify-content: flex-start;

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

  & > small {
    padding-bottom: 10px;
    color: #bba;
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
          <h1>Lista komend domyślnych</h1>
          <Item>
            <CommandTitle>!dynamix</CommandTitle>
            <p>Komenda sprawdzająca, czy aktualnie bot działa. Powinno zwrócić "Bot Works!"</p>
          </Item>
          <Item>
            <CommandTitle>!slots</CommandTitle>
            <p>Zwraca losowanie 3 emotek, szansa na wygranie 2%, cooldown 3 min na osobę</p>
          </Item>
          <Item>
            <CommandTitle>!pogoda [city]</CommandTitle>
            <p>Zwraca dane dotyczące temperatury, zachmurzenia oraz prędkości wiatru</p>
          </Item>
          <Item>
            <CommandTitle>!wordle [word]</CommandTitle>
            <p>
              Gra polegająca na odgadnięciu 5 literowego słowa (użycie '!wordle' zdradza więcej
              szczegółów)
            </p>
          </Item>
          <Item>
            <CommandTitle>!on [command]/ !off [command]</CommandTitle>
            <p>
              Wyłącza/włącza daną komendę/grupę komend na kanale (tft, chess, pogoda, wordle, slots,
              song)
            </p>
          </Item>
          <Item>
            <CommandTitle>piramidka [emote]</CommandTitle>
            <p>Tworzy piramidkę 4 stopnia z podanej emotki</p>
          </Item>
          <Item>
            <p>
              Ustawienie Nagrody kanału, która automatyczne wykona !slots, można ustawić, że za
              przegraną osoba dostanie t/o
            </p>
          </Item>
        </ItemList>
        <ItemList>
          <h1>Integracja z Spotify i StreamElements</h1>
          <Item>
            <CommandTitle>!song</CommandTitle>
            <p>
              Komenda zwraca nazwę, autora oraz link do piosenki ( zwróci utwór z Spotify albo
              Stream Elements w zależności, z której strony otwarzany jest w tym momencie utwór)
            </p>
          </Item>
          <Item>
            <CommandTitle>!playlist/!playlista</CommandTitle>
            <p>Wyświetla playlistę spotify, na której aktualnie jest streamer</p>
          </Item>
          <Item>
            <CommandTitle>volume [0-100]</CommandTitle>
            <p>Zmienia głośność na spotify. Tylko dla moderatorów</p>
          </Item>
          <Item>
            <CommandTitle>!next</CommandTitle>
            <p>Pomija piosenkę na spotify/SR. Tylko dla moderatorów</p>
          </Item>
          <Item>
            <p>
              Automatycznie usuwa piosenki z kolejki, które są niedostępne w Polsce albo zostały
              zablokowane
            </p>
          </Item>
          <Item>
            <p>
              Ustawienie Nagrody kanału, która automatyczne dodaje piosenkę za pkt kanału do kolejki
              StreamElements (zatrzymuje Spotify po zakupieniu nagrody i wraca do piosenki po
              zakończeniu listy SR)
            </p>
          </Item>
          <Item>
            <p>
              Ustawienie Nagrody kanału, która automatyczne pomija piosenkę z SR/Spotify po
              zakupnieniu nagrody
            </p>
          </Item>
          <Item>
            <p>
              Ustawienie Nagrody kanału, która automatyczne podgłaśnia Spotify i SR do wybranej
              głosności na wybrany czas
            </p>
          </Item>
        </ItemList>
        <ItemList>
          <h1>Komendy po połączeniu z Riot Games</h1>
          <Item>
            <CommandTitle>!ranking [server]</CommandTitle>
            <p>Komenda zwraca top 10 serwera tft, bez podania [server] zwraca dla serwera EUW</p>
          </Item>
          <Item>
            <CommandTitle>!mecze [nickname], [server]</CommandTitle>
            <p>
              Komenda zwraca ostatnie 10 gier tft z dzisiaj użytkownika, bez podania [server]
              wybiera EUW, bez podania [nickname] zwraca nick streamera np. !mecze dynam1x, euw
            </p>
          </Item>
          <Item>
            <CommandTitle>!mecz [nr], [nickname], [server]</CommandTitle>
            <p>
              Komenda zwraca dokładny stan boardu użytkownika, bez podania [server] wybiera EUW, bez
              podania [nickname] zwraca nick streamera np. !mecz 1 dynam1x, euw
            </p>
          </Item>
          <Item>
            <CommandTitle>!staty [nickname], [server]</CommandTitle>
            <p>
              Komenda zwraca statystyki użytkownika w tft, bez podania [server] wybiera EUW, bez
              podania [nickname] zwraca nick streamera np. !staty dynam1x, euw
            </p>
          </Item>
        </ItemList>
        <ItemList>
          <h1>Komendy z Chess.com</h1>
          <Item>
            <CommandTitle>!chessuser [nickname]/ !szachista [nickname] </CommandTitle>
            <p>Komenda zwraca statystyki użytkownika na chess.com</p>
          </Item>
          <Item>
            <CommandTitle>!chesslast [nickname]</CommandTitle>
            <p>Komenda zwraca link do ostatniej gry na chess.com</p>
          </Item>
        </ItemList>
        <ItemList>
          <h1>Dodatkowe Informacje</h1>
          <Item>
            <p>Bot musi być moderatorem czatu, aby działał poprawnie</p>
          </Item>
          <Item>
            <p>
              Aby bot działał poprawnie z nagrodami za punkty kanału, nagrody te muszą mieć
              możliwość wpisania tekstu
            </p>
          </Item>
          <Item>
            <p>Więcej informacji możesz znależć w zakładce opcje po zalogowaniu.</p>
          </Item>
        </ItemList>
      </Wrapper>
      <Footer>
        <h3>
          W sprawie pomysłów oraz probremów, proszę pisać do DynaM1X1 na twitch albo Dynamix #1054
          na discord
        </h3>
        <p>Dynamix-bot wersja: Beta 0.5.1</p>
      </Footer>
    </PageTemplate>
  );
};

export default HomePage;
