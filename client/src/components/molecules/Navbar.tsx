import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import styled from 'styled-components';
import color from '../../styles/colors';
import {
  flexAlignCenter,
  flexCenter,
  flexSpaceBetween,
} from '../../styles/container';
import { mediaQuery, pxToVw } from '../../styles/media';
import { Heading4, Heading5 } from '../../styles/typography';

const Container = styled.div`
  ${flexCenter}
  width: 100%;
  padding: ${pxToVw(16)} ${pxToVw(32)};
  box-shadow: 0 2px 4px 0 hsl(0deg 0% 81% / 50%);

  ${mediaQuery(640)} {
    ${flexSpaceBetween}
    padding: 16px 32px;
  }
`;

const NavContainer = styled.div`
  ${mediaQuery(640)} {
    ${flexAlignCenter}
  }
`;

const NavLogo = styled(Heading4)`
  color: ${color.primary};
  cursor: pointer;
`;

const NavItem = styled(Heading5)`
  display: none;

  ${mediaQuery(640)} {
    display: block;
    color: ${color.grayscale.gray05};
    cursor: pointer;
    :hover {
      color: ${color.primary};
    }
    :nth-child(1) {
      margin-right: 20px;
    }
  }
`;

const Navbar = () => {
  const router = useRouter();
  return (
    <Container>
      <NavLogo
        onClick={() =>
          router.push({
            pathname: `/`,
          })
        }
      >
        에티
      </NavLogo>
      <NavContainer>
        <NavItem
          onClick={() =>
            router.push({
              pathname: `/class`,
            })
          }
          style={{
            color: `${
              router.pathname === '/class'
                ? color.primary
                : color.grayscale.gray05
            }`,
          }}
        >
          강의 목록
        </NavItem>
        <NavItem
          onClick={() =>
            router.push({
              pathname: `/createclass`,
            })
          }
          style={{
            color: `${
              router.pathname === '/createclass'
                ? color.primary
                : color.grayscale.gray05
            }`,
          }}
        >
          강의 등록
        </NavItem>
      </NavContainer>
      <NavContainer>
        <NavItem
          onClick={() =>
            router.push({
              pathname: `/signin`,
            })
          }
          style={{
            color: `${
              router.pathname === '/signin'
                ? color.primary
                : color.grayscale.gray05
            }`,
          }}
        >
          로그인
        </NavItem>
      </NavContainer>
    </Container>
  );
};

export default Navbar;
