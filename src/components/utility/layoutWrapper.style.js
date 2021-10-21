import styled from 'styled-components';

const LayoutContentWrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  flex-flow: row wrap;
  overflow: hidden;

  @media only screen and (max-width: 767px) {
    padding: 10px 20px;
  }

  @media (max-width: 580px) {
    padding: 10px;
  }
`;

export { LayoutContentWrapper };
