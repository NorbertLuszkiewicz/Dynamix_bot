import React from 'react';
import styled from 'styled-components';
import logo from 'assets/logo.png';
import twitchLogo from 'assets/twitch_logo.png';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions';

const StyledWrapper = styled.nav`
  position: sticky;
  top: 0;
  left: 0;
  height: 70px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5%;
  background-color: ${({ theme }) => theme.mainBackground};
  z-index: 9;

  ::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: 1px;
    background: #666;
    width: 100%;
  }
`;

const ItemList = styled.ul`
  display: flex;
  list-style-type: none;
  justify-content: center;
  align-items: center;
  padding: 0;
  max-width: 200px;
  font-weight: bold;

  @media only screen and (min-width: 800px) {
    max-width: 300px;
  }
`;

const Item = styled.li`
  position: relative;
  width: 100%;
  text-decoration: none;
  color: white;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.s};
  padding: 15px;
  transition: transform 0.3s;
  padding: 15px 7px;

  &.active {
    color: ${({ theme }) => theme.mainColor};
  }

  :hover::after {
    transform: scaleX(1);
    transition: transform 0.3s;
  }

  ::after {
    content: '';
    width: 100%;
    height: 2px;
    background-color: ${({ theme }) => theme.mainColor};
    position: absolute;
    bottom: 8px;
    left: 0;
    transform: scaleX(0);
    transition: transform 0.3s;
  }

  @media only screen and (min-width: 800px) {
    font-size: ${({ theme }) => theme.fontSize.m};
    padding: 15px 15px;
  }
`;

const LoginButton = styled.a`
  background-color: #6441a5;
  height: 40px;
  width: 100px;
  border: none;
  border-radius: 18px;
  color: white;
  font-size: ${({ theme }) => theme.fontSize.s};
  cursor: pointer;
  transition: background-color 0.3s;
  text-align: center;
  line-height: 40px;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;

  :hover {
    background-color: #8663c7;
  }

  @media only screen and (min-width: 800px) {
    width: 120px;
    font-size: ${({ theme }) => theme.fontSize.m};
  }
`;

const LogoutButton = styled.a`
  background-color: #ddd;
  height: 40px;
  width: 100px;
  border: none;
  border-radius: 18px;
  color: black;
  font-size: ${({ theme }) => theme.fontSize.s};
  cursor: pointer;
  transition: background-color 0.3s;
  text-align: center;
  line-height: 40px;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;

  :hover {
    background-color: #bbb;
  }

  @media only screen and (min-width: 800px) {
    width: 120px;
    font-size: ${({ theme }) => theme.fontSize.m};
  }
`;

const Logo = styled.img`
  height: 40px;
  margin-right: 10px;
`;

const Title = styled.span`
  display: none;

  @media only screen and (min-width: 800px) {
    display: block;
  }
`;

const LogoWrapper = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  cursor: pointer;
`;

const Icon = styled.img`
  height: 20px;
  padding-right: 7px;
`;

const twitchLogin =
  'https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=bhwlcwuvtg51226poslegrqdcm8naz&redirect_uri=https://dynamix-bot.glitch.me/register&scope=viewing_activity_read channel:moderate channel:manage:redemptions channel:read:redemptions user:read:email chat:edit chat:read&state=c3ab8aa609ea11e793ae92361f002671';

const Nav = () => {
  const account = useSelector((state) => state?.user?.account);
  const dispatch = useDispatch();
  const history = useHistory();
  const logoutAccout = () => {
    dispatch(logout());
    history.push('/');
  };

  const checkActive = (match, location) => {
    if (!location) return false;
    const { pathname } = location;
    return pathname === '/';
  };

  return (
    <StyledWrapper>
      <LogoWrapper>
        <Logo src={logo} alt="logo Dynamix-bot" /> <Title>Dynamix Bot</Title>
      </LogoWrapper>

      <ItemList>
        <Item to="/" as={NavLink} activeclass="active" isActive={checkActive}>
          Home
        </Item>
        {account?.twitchAccessToken && (
          <Item to="/dashboard" as={NavLink} activeclass="active">
            Options
          </Item>
        )}
      </ItemList>
      {account ? (
        <LogoutButton onClick={logoutAccout}>Logout</LogoutButton>
      ) : (
        <LoginButton href={twitchLogin}>
          <Icon src={twitchLogo} alt="logo Twitch" /> Login
        </LoginButton>
      )}
    </StyledWrapper>
  );
};

export default Nav;
