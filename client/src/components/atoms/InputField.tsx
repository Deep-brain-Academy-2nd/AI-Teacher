import { ErrorMessage, FieldProps } from 'formik';
import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import styled from 'styled-components';
import { mediaQuery, pxToVw } from '../../styles/media';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* margin-bottom: 23px; */
`;

const Label = styled.div`
  font-size: ${pxToVw(14)};
  color: #333;
  line-height: 1.5;
  padding-left: ${pxToVw(7)};
  ${mediaQuery(640)} {
    padding-left: 7px;
    font-size: 14px;
  }
`;

type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const InputField = ({
  field,
  form: { touched, errors },
  meta,
  ...props
}: FieldProps & InputProps) => {
  return (
    <Container>
      <Label>{props.label}</Label>
      <input
        style={{
          backgroundImage: `url(${
            props.label === '이메일'
              ? '/image/mail_outline_black_24dp.svg'
              : props.label === '이름'
              ? '/image/perm_identity_black_24dp.svg'
              : '/image/lock_black_24dp.svg'
          })`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 10,
          fontSize: 16,
          color: '#333',
          width: '100%',
          height: 55,
          outline: 'none',
          padding: '0 7px 0 43px',
          border: 'none',
          borderBottom: '1px solid #333',
        }}
        {...field}
        {...props}
      />

      <ErrorMessage name={props.id}>
        {(msg) => (
          <div style={{ color: 'red', fontSize: 5, padding: 5 }}>{msg}</div>
        )}
      </ErrorMessage>
    </Container>
  );
};
