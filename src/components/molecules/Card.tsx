import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import auth from "../../lib/axios";
import { mediaQuery, pxToVw } from "../../styles/media";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import color from "../../styles/colors";
import { flexAlignCenter } from "../../styles/container";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Container = styled.div`
  width: 49%;
  cursor: pointer;
  padding-bottom: 20px;
  ${mediaQuery(640)} {
    width: 30%;
    margin: 0 auto;
  }
  ${mediaQuery(1080)} {
    width: 23%;
    margin: 0 auto;
  }
`;

const CardCoverImage = styled.div`
  width: 100%;
  /* display: flex; */
  overflow: hidden;
  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 8px;
    transform: scale(1);
    transition: transform 0.3s ease 0s, opacity 0.1s linear 0s !important;

    :hover {
      transform: scale(1.1);
      transition: transform 0.3s ease 0s, opacity 0.1s linear 0s !important;
    }
    ${mediaQuery(640)} {
      height: 200px;
    }
    ${mediaQuery(1080)} {
      height: 300px;
    }
  }
`;

const CardBody = styled.div``;

const CardName = styled.div`
  font-size: ${pxToVw(11)};
  font-weight: 700;
  padding: 5px 0px;
  ${mediaQuery(640)} {
    font-size: 11px;
  }
`;

const CardTitle = styled.div`
  font-size: ${pxToVw(14)};
  margin: ${pxToVw(4)} 0 ${pxToVw(8)} 0;
  height: ${pxToVw(30)};
  ${mediaQuery(640)} {
    font-size: 14px;
    margin: 4px 0 8px 0;
    height: 40px;
  }
`;

const CardItem = styled.div`
  ${flexAlignCenter}
  font-size: 11px;
  color: ${color.grayscale.gray04};
`;

const LikeButton = styled.div`
  z-index: 20;
  position: absolute;
`;

// 리스트에 뿌려주는 카드 컴포넌트
const Card = ({ ...items }: any) => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);

  // 좋아요 업데이트 함수
  const Like = async () => {
    if (!user.token) {
      alert("로그인이 필요한 서비스입니다. \n로그인 화면으로 이동합니다.");
      router.push("/signin");
    }
    if (user.token) {
      try {
        await auth.post("/api/like/like", {
          lectureId: items._id,
        });
        items.handleLike();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <Container>
        <CardCoverImage>
          <LikeButton onClick={Like}>
            {items.likeUser.includes(user.userId) ? (
              <AiFillHeart
                style={{
                  width: 22,
                  height: 22,
                  color: color.primary,
                }}
              />
            ) : (
              <AiOutlineHeart
                style={{
                  width: 22,
                  height: 22,
                  color: color.primary,
                }}
              />
            )}
          </LikeButton>
          <img
            onClick={() => router.push(`/classdetails/${items._id}`)}
            src={items.imageFile}
            alt="lecture_image"
          />
        </CardCoverImage>
        <CardBody>
          <CardName>{items.name}</CardName>
          <CardTitle>{items.title}</CardTitle>
          <CardItem>
            <AiFillHeart
              style={{
                width: 12,
                height: 12,
                marginRight: 3,
              }}
            />
            <span>{items.like}</span>
          </CardItem>
        </CardBody>
      </Container>
    </>
  );
};

export default Card;
