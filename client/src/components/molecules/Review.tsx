import { Rating } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import auth from "../../lib/axios";
import { RootState } from "../../redux/store";
import { mediaQuery } from "../../styles/media";
import SubmitButton from "../atoms/SubmitButton";
import ReviewCard from "./ReviewCard";

const Container = styled.div`
  width: 100%;
  min-height: 50vh;

  display: flex;
  flex-direction: column;
  ${mediaQuery(640)} {
    /* justify-content: center */
    flex-direction: column;
    width: 100%;
    margin: 0 auto;
  }
`;

const ReviewTitle = styled.div``;

const UserInputBox = styled.form`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 30px 0;
  border: 1px solid red;
`;

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

const Review = () => {
  const user = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const lectureId = router.query.id;
  const [rate, setRate] = useState<number | null>(0);
  const [text, setText] = useState("");
  const [reviewList, setReviewList] = useState([]);

  let reviewData = {
    lectureId,
    userEmail: user.email,
    rating: rate,
    reviewText: text,
  };

  const getReviewList = async () => {
    try {
      const response = await axios.get(
        `/api/review/getreviews?id=${lectureId}`
      );
      setReviewList(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!router.isReady) return;

    // codes using router.query
    getReviewList();
  }, [router.isReady]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      await auth.post("/api/review/createreview", reviewData);
      setText("");
      await getReviewList();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <ReviewTitle>수강평</ReviewTitle>
      {reviewList.map((card) => {
        return <ReviewCard key={card._id} {...card} />;
      })}
      <UserInputBox onSubmit={handleReviewSubmit}>
        <TopBox>
          <UserId>{user.email}</UserId>
          <Rating
            name="simple-controlled"
            value={rate}
            onChange={(event, newValue) => {
              setRate(newValue);
            }}
          />
        </TopBox>
        <BottomBox>
          <textarea value={text} onChange={(e) => setText(e.target.value)} />
          <button type="submit">수강평 작성</button>
        </BottomBox>
      </UserInputBox>
    </Container>
  );
};

export default Review;
