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
      {showError && <ErrorBox>{error} Co?? posz??o nie tak :/</ErrorBox>}
      <Wrapper onLoad={() => setShowError(error)}>
        <ItemList>
          <h1>Lista komend domy??lnych</h1>
          <Item>
            <CommandTitle>!dynamix</CommandTitle>
            <p>Komenda sprawdzaj??ca, czy aktualnie bot dzia??a. Powinno zwr??ci?? "Bot Works!"</p>
          </Item>
          <Item>
            <CommandTitle>!slots</CommandTitle>
            <p>Zwraca losowanie 3 emotek, szansa na wygranie 2%, cooldown 3 min na osob??</p>
          </Item>
          <Item>
            <CommandTitle>!pogoda [city]</CommandTitle>
            <p>Zwraca dane dotycz??ce temperatury, zachmurzenia oraz pr??dko??ci wiatru</p>
          </Item>
          <Item>
            <CommandTitle>!wordle [word]</CommandTitle>
            <p>
              Gra polegaj??ca na odgadni??ciu 5 literowego s??owa (u??ycie '!wordle' zdradza wi??cej
              szczeg??????w)
            </p>
          </Item>
          <Item>
            <CommandTitle>!on [command]/ !off [command]</CommandTitle>
            <p>
              Wy????cza/w????cza dan?? komend??/grup?? komend na kanale (tft, chess, pogoda, wordle, slots,
              song)
            </p>
          </Item>
          <Item>
            <CommandTitle>piramidka [emote]</CommandTitle>
            <p>Tworzy piramidk?? 4 stopnia z podanej emotki</p>
          </Item>
          <Item>
            <p>
              Ustawienie Nagrody kana??u, kt??ra automatyczne wykona !slots, mo??na ustawi??, ??e za
              przegran?? osoba dostanie t/o
            </p>
          </Item>
        </ItemList>
        <ItemList>
          <h1>Integracja z Spotify i StreamElements</h1>
          <Item>
            <CommandTitle>!song</CommandTitle>
            <p>
              Komenda zwraca nazw??, autora oraz link do piosenki ( zwr??ci utw??r z Spotify albo
              Stream Elements w zale??no??ci, z kt??rej strony otwarzany jest w tym momencie utw??r)
            </p>
          </Item>
          <Item>
            <CommandTitle>!playlist/!playlista</CommandTitle>
            <p>Wy??wietla playlist?? spotify, na kt??rej aktualnie jest streamer</p>
          </Item>
          <Item>
            <CommandTitle>volume [0-100]</CommandTitle>
            <p>Zmienia g??o??no???? na spotify. Tylko dla moderator??w</p>
          </Item>
          <Item>
            <CommandTitle>!next</CommandTitle>
            <p>Pomija piosenk?? na spotify/SR. Tylko dla moderator??w</p>
          </Item>
          <Item>
            <p>
              Automatycznie usuwa piosenki z kolejki, kt??re s?? niedost??pne w Polsce albo zosta??y
              zablokowane
            </p>
          </Item>
          <Item>
            <p>
              Ustawienie Nagrody kana??u, kt??ra automatyczne dodaje piosenk?? za pkt kana??u do kolejki
              StreamElements (zatrzymuje Spotify po zakupieniu nagrody i wraca do piosenki po
              zako??czeniu listy SR)
            </p>
          </Item>
          <Item>
            <p>
              Ustawienie Nagrody kana??u, kt??ra automatyczne pomija piosenk?? z SR/Spotify po
              zakupnieniu nagrody
            </p>
          </Item>
          <Item>
            <p>
              Ustawienie Nagrody kana??u, kt??ra automatyczne podg??a??nia Spotify i SR do wybranej
              g??osno??ci na wybrany czas
            </p>
          </Item>
        </ItemList>
        <ItemList>
          <h1>Komendy po po????czeniu z Riot Games</h1>
          <Item>
            <CommandTitle>!ranking [server]</CommandTitle>
            <p>Komenda zwraca top 10 serwera tft, bez podania [server] zwraca dla serwera EUW</p>
          </Item>
          <Item>
            <CommandTitle>!mecze [nickname], [server]</CommandTitle>
            <p>
              Komenda zwraca ostatnie 10 gier tft z dzisiaj u??ytkownika, bez podania [server]
              wybiera EUW, bez podania [nickname] zwraca nick streamera np. !mecze dynam1x, euw
            </p>
          </Item>
          <Item>
            <CommandTitle>!mecz [nr], [nickname], [server]</CommandTitle>
            <p>
              Komenda zwraca dok??adny stan boardu u??ytkownika, bez podania [server] wybiera EUW, bez
              podania [nickname] zwraca nick streamera np. !mecz 1 dynam1x, euw
            </p>
          </Item>
          <Item>
            <CommandTitle>!staty [nickname], [server]</CommandTitle>
            <p>
              Komenda zwraca statystyki u??ytkownika w tft, bez podania [server] wybiera EUW, bez
              podania [nickname] zwraca nick streamera np. !staty dynam1x, euw
            </p>
          </Item>
        </ItemList>
        <ItemList>
          <h1>Komendy z Chess.com</h1>
          <Item>
            <CommandTitle>!chessuser [nickname]/ !szachista [nickname] </CommandTitle>
            <p>Komenda zwraca statystyki u??ytkownika na chess.com</p>
          </Item>
          <Item>
            <CommandTitle>!chesslast [nickname]</CommandTitle>
            <p>Komenda zwraca link do ostatniej gry na chess.com</p>
          </Item>
        </ItemList>
        <ItemList>
          <h1>Dodatkowe Informacje</h1>
          <Item>
            <p>Bot musi by?? moderatorem czatu, aby dzia??a?? poprawnie</p>
          </Item>
          <Item>
            <p>
              Aby bot dzia??a?? poprawnie z nagrodami za punkty kana??u, nagrody te musz?? mie??
              mo??liwo???? wpisania tekstu
            </p>
          </Item>
          <Item>
            <p>Wi??cej informacji mo??esz znale???? w zak??adce opcje po zalogowaniu.</p>
          </Item>
        </ItemList>
      </Wrapper>
      <Footer>
        <h3>
          W sprawie pomys????w oraz probrem??w, prosz?? pisa?? do DynaM1X1 na twitch albo Dynamix #1054
          na discord
        </h3>
        <p>Dynamix-bot wersja: Beta 0.6.1</p>
      </Footer>
    </PageTemplate>
  );
};

export default HomePage;
