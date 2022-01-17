import { useRouter } from 'next/router';
import React from 'react';

import {
  AiOutlineUser,
  AiOutlineHome,
  AiOutlinePlus,
  AiOutlineRightSquare,
} from 'react-icons/ai';
import styled from 'styled-components';
import color from '../../styles/colors';
import {
  flexAlignCenter,
  flexCenter,
  flexSpaceBetween,
} from '../../styles/container';
import { mediaQuery, pxToVw } from '../../styles/media';

const Container = styled.div`
  position: fixed;
  left: 0px;
  right: 0px;
  bottom: 0px;
  z-index: 1999;
  width: 100vw;
  padding: ${pxToVw(16)} ${pxToVw(32)};
  box-shadow: rgb(0 0 0 / 8%) 0px 0px 1px;

  ${mediaQuery(640)} {
    display: none;
  }
`;

const NavContainer = styled.ul`
  ${flexSpaceBetween}
`;

const NavItem = styled.li`
  ${flexCenter}
  flex-direction: column;
  cursor: pointer;
`;

const NavText = styled.div`
  font-size: ${pxToVw(9)};
  font-weight: 600;
  margin-top: ${pxToVw(8)};
  :hover {
    color: ${color.primary};
  }
`;

const BottomNav = () => {
  const router = useRouter();
  return (
    <Container>
      <NavContainer>
        <NavItem
          onClick={() =>
            router.push({
              pathname: `/`,
            })
          }
        >
          <AiOutlineHome
            style={{
              width: 22,
              height: 22,
              color: `${
                router.pathname === '/' ? color.primary : 'rgb(26, 26, 26)'
              }`,
            }}
          />
          <NavText
            style={{
              color: `${
                router.pathname === '/' ? color.primary : 'rgb(26, 26, 26)'
              }`,
            }}
          >
            홈
          </NavText>
        </NavItem>
        <NavItem
          onClick={() =>
            router.push({
              pathname: `/class`,
            })
          }
        >
          <AiOutlineRightSquare
            style={{
              width: 22,
              height: 22,
              color: `${
                router.pathname === '/class' ? color.primary : 'rgb(26, 26, 26)'
              }`,
            }}
          />
          <NavText
            style={{
              color: `${
                router.pathname === '/class' ? color.primary : 'rgb(26, 26, 26)'
              }`,
            }}
          >
            강의목록
          </NavText>
        </NavItem>
        <NavItem
          onClick={() =>
            router.push({
              pathname: `/createclass`,
            })
          }
        >
          <AiOutlinePlus
            style={{
              width: 22,
              height: 22,
              color: `${
                router.pathname === '/createclass'
                  ? color.primary
                  : 'rgb(26, 26, 26)'
              }`,
            }}
          />
          <NavText
            style={{
              color: `${
                router.pathname === '/createclass'
                  ? color.primary
                  : 'rgb(26, 26, 26)'
              }`,
            }}
          >
            강의등록
          </NavText>
        </NavItem>
        <NavItem
          onClick={() =>
            router.push({
              pathname: `/signin`,
            })
          }
        >
          <AiOutlineUser
            style={{
              width: 22,
              height: 22,
              color: `${
                router.pathname === '/signin'
                  ? color.primary
                  : 'rgb(26, 26, 26)'
              }`,
            }}
          />
          <NavText
            style={{
              color: `${
                router.pathname === '/signin'
                  ? color.primary
                  : 'rgb(26, 26, 26)'
              }`,
            }}
          >
            마이페이지
          </NavText>
        </NavItem>
      </NavContainer>
    </Container>
  );
};

export default BottomNav;
