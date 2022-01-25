import { Rating } from "@mui/material";
import styled from "styled-components";
import color from "../../styles/colors";
import { mediaQuery, pxToVw } from "../../styles/media";

const ReviewBox = styled.div`
  border-bottom: 1px solid ${color.grayscale.gray05};
  padding: 16px 0;
`;

const TopBox = styled.div`
  display: flex;
  align-items: center;
`;

const BottomBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const UserId = styled.div`
  font-size: ${pxToVw(11)};
  font-weight: 600;
  color: ${color.grayscale.gray04};
  margin-right: 8px;
  ${mediaQuery(640)} {
    font-size: 11px;
  }
`;

const ReviewContent = styled.div`
  font-size: ${pxToVw(14)};
  font-weight: 600;
  color: ${color.grayscale.gray04};
  padding: 16px 0;
  ${mediaQuery(640)} {
    font-size: 14px;
  }
`;

const CreatedAt = styled.div`
  font-size: ${pxToVw(11)};
  font-weight: 600;
  color: ${color.grayscale.gray04};

  ${mediaQuery(640)} {
    font-size: 11px;
  }
`;

// 수강평 카드 컴포넌트
const ReviewCard = ({ ...card }) => {
  return (
    <ReviewBox>
      <TopBox>
        <UserId>{card.userEmail}</UserId>
        <Rating name="read-only" value={card.rating} readOnly />
      </TopBox>
      <BottomBox>
        <ReviewContent>{card.reviewText}</ReviewContent>
        <CreatedAt>{card?.createdAt?.slice(0, 10)}</CreatedAt>
      </BottomBox>
    </ReviewBox>
  );
};

export default ReviewCard;
