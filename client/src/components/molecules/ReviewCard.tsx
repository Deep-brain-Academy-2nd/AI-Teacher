import { Rating } from "@mui/material";
import styled from "styled-components";

const ReviewBox = styled.div``;

const TopBox = styled.div`
  display: flex;
  align-items: center;
`;

const BottomBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  textarea {
    width: 80%;
  }
  button {
    width: 15%;
  }
`;
const UserId = styled.div``;

const ReviewContent = styled.div``;

const CreatedAt = styled.div``;

const ReviewCard = ({ ...card }) => {
  return (
    <ReviewBox>
      <TopBox>
        <UserId>{card.userEmail}</UserId>
        <Rating name="read-only" value={card.rating} readOnly />
      </TopBox>
      <BottomBox>
        <ReviewContent>{card.reviewText}</ReviewContent>
        <CreatedAt>{card.createdAt}</CreatedAt>
      </BottomBox>
    </ReviewBox>
  );
};

export default ReviewCard;
