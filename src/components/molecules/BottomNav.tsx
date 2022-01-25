import { useRouter } from "next/router";
import React from "react";

import {
  AiOutlineUser,
  AiOutlineHome,
  AiOutlinePlus,
  AiOutlineRightSquare,
  AiOutlineLogin,
  AiOutlineLogout,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setUserToken } from "../../redux/modules/user";
import { RootState } from "../../redux/store";
import color from "../../styles/colors";
import {
  flexAlignCenter,
  flexCenter,
  flexSpaceBetween,
} from "../../styles/container";
import { mediaQuery, pxToVw } from "../../styles/media";

const Container = styled.div`
  position: fixed;
  background-color: ${color.white};
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

// 반응형 모바일 버전 바텀 네비게이션 컴포넌트
const BottomNav = () => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
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
                router.pathname === "/" ? color.primary : "rgb(26, 26, 26)"
              }`,
            }}
          />
          <NavText
            style={{
              color: `${
                router.pathname === "/" ? color.primary : "rgb(26, 26, 26)"
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
                router.pathname === "/class" ? color.primary : "rgb(26, 26, 26)"
              }`,
            }}
          />
          <NavText
            style={{
              color: `${
                router.pathname === "/class" ? color.primary : "rgb(26, 26, 26)"
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
                router.pathname === "/createclass"
                  ? color.primary
                  : "rgb(26, 26, 26)"
              }`,
            }}
          />
          <NavText
            style={{
              color: `${
                router.pathname === "/createclass"
                  ? color.primary
                  : "rgb(26, 26, 26)"
              }`,
            }}
          >
            강의등록
          </NavText>
        </NavItem>
        {user.token ? (
          <NavItem onClick={() => dispatch(setUserToken(""))}>
            <AiOutlineLogout
              style={{
                width: 22,
                height: 22,
                color: `${color.green}`,
              }}
            />
            <NavText
              style={{
                color: `${color.green}`,
              }}
            >
              로그아웃
            </NavText>
          </NavItem>
        ) : (
          <NavItem
            onClick={() =>
              router.push({
                pathname: `/signin`,
              })
            }
          >
            <AiOutlineLogin
              style={{
                width: 22,
                height: 22,
                color: `${
                  router.pathname === "/signin"
                    ? color.primary
                    : "rgb(26, 26, 26)"
                }`,
              }}
            />
            <NavText
              style={{
                color: `${
                  router.pathname === "/signin"
                    ? color.primary
                    : "rgb(26, 26, 26)"
                }`,
              }}
            >
              로그인
            </NavText>
          </NavItem>
        )}
      </NavContainer>
    </Container>
  );
};

export default BottomNav;
