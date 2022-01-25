import styled from "styled-components";
import color from "../../styles/colors";
import { mediaQuery, pxToVw } from "../../styles/media";

const Container = styled.div`
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
    background-color: ${color.primary};
    border: none;
  }
`;

const ProgressText = styled.div`
  font-size: ${pxToVw(11)};
  font-weight: 700;
  padding: 5px 0px;
  ${mediaQuery(640)} {
    font-size: 11px;
  }
`;

const ProgressModal = ({ value }: any) => {
  return (
    <Container>
      <ProgressText>비디오 업로드 진행중입니다...</ProgressText>

      <progress value={value} max={100} />
      <ProgressText>{`${value}%`}</ProgressText>
    </Container>
  );
};

export default ProgressModal;
