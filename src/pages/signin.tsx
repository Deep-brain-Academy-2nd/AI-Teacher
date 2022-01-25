import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Formik, Field, Form } from 'formik';

import * as Yup from 'yup';

import { useRouter } from 'next/router';
import { InputField } from '../components/atoms/InputField';
import { mediaQuery, pxToVw } from '../styles/media';
import color from '../styles/colors';
import { flexCenter, flexSpaceBetween } from '../styles/container';
import SubmitButton from '../components/atoms/SubmitButton';
import { useDispatch } from 'react-redux';
import { setUserEmail, setUserId, setUserToken } from '../redux/modules/user';

interface Values {
  email: string;
  password: string;
}

// 로그인 라우터
const Signin = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  // submit 버튼이 눌러지면 yup을 통해 모든 validation이 진행된 다음 signin api를 호출합니다.
  const login = async (values: Values) => {
    try {
      const response = await axios.post(
        `${process.env.BASE_URL}/api/auth/signin`,
        values
      );
      const token = response.data;

      // 나중에 쓰일 토큰, 유저아이디, 이메일 값을 스토어에 저장해둡니다.
      dispatch(setUserToken(token));
      dispatch(setUserEmail(response.data.result.email));
      dispatch(setUserId(response.data.result._id));

      // 로그인이 완료되면 메인으로 이동시켜줍니다.
      router.push({
        pathname: `/`,
      });
    } catch (error) {
      /* @ts-ignore */
      alert(error.response.data.message);
    }
  };

  return (
    <Container>
      <LoginWrapper>
        <LoginForm>
          <LoginTitle>로그인</LoginTitle>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email('이메일이 일치하지 않습니다')
                .required('이메일이 필요합니다.'),
              password: Yup.string()
                .min(1, '비밀번호가 최소 1자 이상이여야 합니다.')
                .required('비밀번호가 필요합니다.'),
            })}
            onSubmit={(values) => {
              login(values);
            }}
          >
            {({ errors, status, touched }) => (
              <Form>
                <Field
                  id='email'
                  name='email'
                  type='email'
                  label='이메일'
                  placeholder='이메일을 입력해주세요.'
                  className={
                    'form-control' +
                    (errors.email && touched.email ? ' is-invalid' : '')
                  }
                  component={InputField}
                />
                <Field
                  id='password'
                  name='password'
                  label='비밀번호'
                  placeholder='비밀번호를 입력해주세요.'
                  type='password'
                  component={InputField}
                />
                <SubmitButton type='submit' label='로그인'></SubmitButton>
              </Form>
            )}
          </Formik>
        </LoginForm>
        <LinkContainer>
          <GoTo
            onClick={() =>
              router.push({
                pathname: `/signup`,
              })
            }
          >
            회원 가입하기
          </GoTo>
        </LinkContainer>
      </LoginWrapper>
    </Container>
  );
};

export default Signin;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 10%;
  width: 100%;
`;

const LoginWrapper = styled.div`
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

const LoginForm = styled.div``;

const LoginTitle = styled.span`
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

const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const GoTo = styled.a`
  margin-top: ${pxToVw(20)};
  font-size: ${pxToVw(14)};
  color: #666;
  text-decoration: none;
  cursor: pointer;

  ${mediaQuery(640)} {
    margin-top: 20px;
    font-size: 14px;
  }
`;
