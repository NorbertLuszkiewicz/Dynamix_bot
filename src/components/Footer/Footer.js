import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  position: relative;
  width: 100%;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.xs};
  padding: 10px 0;
  margin-top: 10px;
  background-color: ${({ theme }) => theme.mainBackground};

  ::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 1px;
    background: #666;
    width: 100%;
  }
`;

const year = new Date().getFullYear();

const Footer = () => (
  <StyledFooter>
    Created with <span style={{ color: 'red' }}>♥</span> by Dynamix. Copyright © {year} All rights
    reserved
  </StyledFooter>
);

export default Footer;
