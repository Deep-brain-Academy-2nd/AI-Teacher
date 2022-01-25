import styled from "styled-components";
import color from "../../styles/colors";
import { flexCenter } from "../../styles/container";
import { mediaQuery, pxToVw } from "../../styles/media";

interface ButtonProps {
  type: "button" | "submit" | "reset" | undefined;
  label: string;
}

const Button = styled.button`
  ${flexCenter}
  color: ${color.white};
  cursor: pointer;
  text-transform: uppercase;
  width: 100%;
  outline: none !important;
  border: none;
  margin-top: ${pxToVw(30)};
  margin-bottom: ${pxToVw(20)};
  border-radius: ${pxToVw(20)};
  font-size: ${pxToVw(16)};
  padding: 0 ${pxToVw(20)};
  height: ${pxToVw(50)};
  background-image: linear-gradient(to top, #5227ff, #7409fc);
  :hover {
    background-image: linear-gradient(to top, #7409fc, #5227ff);
    opacity: 0.8;
  }
  ${mediaQuery(640)} {
    margin-top: 30px;
    margin-bottom: 20px;
    border-radius: 20px;
    font-size: 16px;
    padding: 0 20px;
    height: 50px;
  }
`;

// 커스텀 submit 버튼
const SubmitButton = ({ ...props }: ButtonProps) => {
  return <Button type={props.type}>{props.label}</Button>;
};

export default SubmitButton;
