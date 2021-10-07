import React from 'react';
import styled from 'styled-components';
import Nav from 'components/Nav/Nav';
import Footer from 'components/Footer/Footer';

const Wrapper = styled.div`
  width: 90%;
  margin: auto;
`;

const PageTemplates = ({ children }) => (
  <>
    <Nav />
    <Wrapper>{children}</Wrapper>
    <Footer />
  </>
);

export default PageTemplates;
