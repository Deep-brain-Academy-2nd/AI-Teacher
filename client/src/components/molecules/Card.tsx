import styled from 'styled-components';

const Container = styled.div``;

const CardCoverImage = styled.div``;

const CardBody = styled.div``;

const Card = () => {
  return (
    <Container>
      <CardCoverImage>
        <picture></picture>
      </CardCoverImage>
      <CardBody></CardBody>
    </Container>
  );
};

export default Card;
