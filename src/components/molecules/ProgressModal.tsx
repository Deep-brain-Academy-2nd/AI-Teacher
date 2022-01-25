import styled from 'styled-components';
import color from '../../styles/colors';

const Container = styled.div`
  position: absolute;
  z-index: 9999;
  background-color: ${color.primary};
  width: 300px;
  height: 300px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  progress {
  }
  progress[value] {
    width: 100%;
    -webkit-appearance: none;
    appearance: none;
  }
  progress[value]::-webkit-progress-bar {
    height: 6px;
    border-radius: 3px;
    background-color: #e5e5e7;
    border: none;
  }
  progress[value]::-webkit-progress-value {
    height: 6px;
    border-radius: 3px;
    background-color: ${color.primary}
    border: none;
  }
`;
const ProgressModal = (value: any) => {
  return (
    <Container>
      <progress value={value} max={100} />
    </Container>
  );
};

export default ProgressModal;
