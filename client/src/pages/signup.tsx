import React from 'react';
import styled from 'styled-components';
import { Formik, Field, Form, FormikHelpers, ErrorMessage } from 'formik';

import * as Yup from 'yup';
import axios from 'axios';
import { InputField } from '../components/atoms/InputField';
import { mediaQuery, pxToVw } from '../styles/media';
import color from '../styles/colors';
import { flexCenter, flexSpaceBetween } from '../styles/container';

interface Values {
  email: string;
  name: string;
  password: string;
}

const SignUp = () => {
  const signUp = async (values: Values) => {
    try {
      const response = await axios.post('/api/auth/signup', values);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Container>
      <RegisterWrapper>
        <Title>회원가입</Title>
        <Formik
          initialValues={{
            email: '',
            name: '',
            password: '',
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().required('이름을 입력해주세요.'),
            email: Yup.string()
              .email('이메일 형식에 맞게 입력해주세요.')
              .required('이메일을 입력해주세요.'),
            password: Yup.string()
              .min(6, '비밀번호는 6자 이상으로 입력해주세요.')
              .required('비밀번호를 입력해주세요.'),
          })}
          onSubmit={(values) => {
            signUp(values);
          }}
        >
          {({ errors, status, touched }) => (
            <Form>
              <Field
                id='email'
                name='email'
                type='email'
                label='이메일'
                placeholder='이메일'
                className={
                  'form-control' +
                  (errors.email && touched.email ? ' is-invalid' : '')
                }
                component={InputField}
              />
              <Field
                id='name'
                name='name'
                label='이름'
                placeholder='이름'
                component={InputField}
              />

              <Field
                id='password'
                name='password'
                label='비밀번호'
                placeholder='비밀번호'
                type='password'
                component={InputField}
              />
              {/* <RadioContainer role='group' aria-labelledby='my-radio-group'>
                <div id='my-radio-group'>신분</div>
                <label>
                  <Field type='radio' name='picked' value='teacher' />
                  강사
                </label>
                <label>
                  <Field type='radio' name='picked' value='student' />
                  학생
                </label>
              </RadioContainer> */}
              <SubmitButton type='submit'>회원가입하기</SubmitButton>
            </Form>
          )}
        </Formik>
      </RegisterWrapper>
    </Container>
  );
};

export default SignUp;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 10%;
  width: 100%;
`;

const RegisterWrapper = styled.div`
  width: ${pxToVw(550)};
  height: ${pxToVw(550)};
  padding: ${pxToVw(65)}${pxToVw(55)}${pxToVw(55)}${pxToVw(55)};
  background-color: ${color.white};
  color: ${color.white};
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

  overflow: hidden;

  ${mediaQuery(640)} {
    width: 550px;
    height: 550px;
    padding: 65px 55px 55px 55px;
    box-shadow: rgb(0 0 0 / 70%) 0px 0px 1px 0px,
      rgb(0 0 0 / 50%) 0px 3px 4px -2px;
    border-radius: 16px;
  }
`;

const SubmitButton = styled.button`
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

const Title = styled.div`
  ${flexSpaceBetween}
  font-size: ${pxToVw(39)};
  color: #333;
  line-height: 1.2;
  text-align: center;
  font-weight: bold;
  ${mediaQuery(640)} {
    font-size: 39px;
  }
`;

const RadioContainer = styled.div`
  margin: 10px 0;
  padding-left: 7px;

  label {
    font-family: Roboto;
    font-size: 20px;
    color: red;
  }
`;
