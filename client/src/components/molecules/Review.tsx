import { Button, Rating, TextField } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import auth from '../../lib/axios';
import { RootState } from '../../redux/store';
import color from '../../styles/colors';
import { mediaQuery, pxToVw } from '../../styles/media';
import { Heading2 } from '../../styles/typography';
import { AiOutlineSend } from 'react-icons/ai';

import ReviewCard from './ReviewCard';

const Container = styled.div`
  width: 100%;
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  ${mediaQuery(640)} {
    flex-direction: column;
    width: 100%;
    margin: 0 auto;
  }
`;

const ReviewTitle = styled(Heading2)`
  color: ${color.primary};
  border-bottom: 1px solid ${color.grayscale.gray03};
  padding: 16px 0;
  span {
    color: ${color.grayscale.gray04};
    font-size: ${pxToVw(14)};
    ${mediaQuery(640)} {
      font-size: 14px;
    }
  }
`;

const UserInputBox = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 30px 0;
`;

const TopBox = styled.div`
  display: flex;
  align-items: center;
`;

const BottomBox = styled.form`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 8px;
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

const Review = () => {
  const user = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const lectureId = router.query.id;
  const [rate, setRate] = useState<number | null>(0);
  const [text, setText] = useState('');
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

  const handleReviewSubmit = async (e: any) => {
    if (e.key === 'Enter') {
      try {
        await auth.post('/api/review/createreview', reviewData);
        setText('');
        await getReviewList();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Container>
      <ReviewTitle>
        수강평 <span>총{reviewList.length}개</span>
      </ReviewTitle>
      {reviewList.map((card: any) => {
        return <ReviewCard key={card._id} {...card} />;
      })}
      <UserInputBox>
        <TopBox>
          <UserId>{user.email}</UserId>
          <Rating
            name='simple-controlled'
            value={rate}
            onChange={(event, newValue) => {
              setRate(newValue);
            }}
          />
        </TopBox>
        <BottomBox onKeyPress={handleReviewSubmit}>
          <TextField
            id='outlined-multiline-static'
            label='수강평을 작성해주세요.'
            multiline
            rows={4}
            // defaultValue="Default Value"
            value={text}
            style={{ width: '85%' }}
            onChange={(e) => setText(e.target.value)}
          />
          <Button
            type='submit'
            variant='contained'
            endIcon={<AiOutlineSend />}
            style={{ width: '10%' }}
          >
            작성
          </Button>
        </BottomBox>
      </UserInputBox>
    </Container>
  );
};

export default Review;
