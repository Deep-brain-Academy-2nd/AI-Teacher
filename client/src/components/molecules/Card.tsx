import { useRouter } from 'next/router';
import styled from 'styled-components';
import { mediaQuery } from '../../styles/media';

const Container = styled.div`
  width: 49%;
  ${mediaQuery(640)} {
    width: 30%;
    margin: 0 auto;
    padding: 66px 24px;
  }
  ${mediaQuery(1080)} {
    width: 25%;
    margin: 0 auto;
    padding: 66px 24px;
  }
`;

const CardCoverImage = styled.div`
  width: 100%;

  img {
    width: 100%;
    height: 100px;
    object-fit: cover;
    border-radius: 8px;
    ${mediaQuery(640)} {
      height: 200px;
    }
    ${mediaQuery(1080)} {
      height: 300px;
    }
  }
`;

const CardBody = styled.div``;

const CardItem = styled.div``;

const Card = ({ ...items }: any) => {
  const router = useRouter();

  return (
    <Container onClick={() => router.push(`/classdetails/${items._id}`)}>
      <CardCoverImage>
        <img src={items.imageFile} alt='lecture_image' />
      </CardCoverImage>
      <CardBody>
        <CardItem>{items.name}</CardItem>
        <CardItem>{items.clothe}</CardItem>
        <CardItem>{items.title}</CardItem>
        <CardItem>{items.content}</CardItem>
        <CardItem>{items.model}</CardItem>
      </CardBody>
    </Container>
  );
};

export default Card;
