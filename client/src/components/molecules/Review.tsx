import styled from "styled-components";
import { mediaQuery } from "../../styles/media";

const Container = styled.div`
  width: 100%;
  min-height: 50vh;

  display: flex;
  flex-direction: column;
  ${mediaQuery(640)} {
    /* justify-content: center */
    flex-direction: row;
    width: 100%;
    margin: 0 auto;
  }
`;

const ReviewTitle = styled.div``;
const Review = () => {
  return (
    <Container>
      <ReviewTitle>수강평</ReviewTitle>
    </Container>
  );
};

export default Review;
