import styled from "styled-components";
import color from "../../styles/colors";
import { mediaQuery, pxToVw } from "../../styles/media";

const SwiperImage = styled.img`
  height: ${pxToVw(350)};
  width: 100%;
  height: 250px;
  object-fit: contain;
  ${mediaQuery(640)} {
    height: 350px;
    width: 30%;
  }
`;

const SwiperBox = styled.div`
  display: flex;
  justify-content: center;
  height: 500px;
  flex-direction: column-reverse;
  background-color: ${color.primary};
  padding: 20px;
  ${mediaQuery(640)} {
    flex-direction: row;
    padding: 20px;
    height: 100%;
  }
`;

const SwiperContent = styled.div`
  font-size: ${pxToVw(20)};
  color: ${color.white};
  font-weight: 600;
  width: 100%;

  padding: ${pxToVw(20)};
  ${mediaQuery(640)} {
    font-size: 20px;
    padding: 50px;
    width: 30%;
  }
`;

const Tag = styled.div`
  display: inline-block;
  font-size: ${pxToVw(8)};
  padding: ${pxToVw(5)};
  background-color: ${color.green};
  border-radius: 8px;
  ${mediaQuery(640)} {
    font-size: 14px;
    padding: 5px;
  }
`;

const SwiperText = styled.div`
  font-size: ${pxToVw(16)};
  padding: ${pxToVw(16)} 0px;
  ${mediaQuery(640)} {
    font-size: 32px;
    padding: 16px 0px;
  }
`;

const SwiperDescipText = styled.div`
  font-size: ${pxToVw(10)};
  font-weight: 500;
  ${mediaQuery(640)} {
    font-size: 24px;
  }
`;

const SwiperItem = ({ ...items }) => {
  return (
    <SwiperBox
      style={{
        backgroundColor: items.title.includes("한글 맞춤법 잘 알기")
          ? items.color[0]
          : items.color[1],
      }}
    >
      <SwiperImage src={items.imageFile} />
      <SwiperContent>
        {items.title.includes("한글 맞춤법 잘 알기") ? (
          <Tag>{items.tag[0]}</Tag>
        ) : (
          <Tag>{items.tag[1]}</Tag>
        )}
        <SwiperText>{items.title}</SwiperText>
        <SwiperDescipText>{items.description}</SwiperDescipText>
      </SwiperContent>
    </SwiperBox>
  );
};

export default SwiperItem;
