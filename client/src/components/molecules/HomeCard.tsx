import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import auth from "../../lib/axios";
import { mediaQuery, pxToVw } from "../../styles/media";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import color from "../../styles/colors";
import { flexAlignCenter } from "../../styles/container";

const Container = styled.div`
  width: 100%;
  cursor: pointer;
  padding-bottom: 20px;
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

const HomeCard = ({ ...items }: any) => {
  const router = useRouter();

  return (
    <>
      <Container>
        <CardCoverImage>
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

export default HomeCard;
