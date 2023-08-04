import { Logo } from '../../assets/images';
import { Formik, FormikProps } from 'formik';
import React, { lazy, useRef, useState } from 'react';
import { loginFormSchema } from '../../services/validation';
import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
const InputBox = lazy(
  () => import('../../components/FormFields/InputBox/InputBox')
);
const PasswordInput = lazy(
  () => import('../../components/FormFields/PasswordInput/PasswordInput')
);
// const LoginLayout = lazy(() => import('../../Layout/LoginLayout'));

import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../services/apis/auth';
import { setLocalStorage } from '../../helpers/utils';
import { FORGOT_PASSWORD } from '@/common/urlConstants';
import { PulseLoader } from 'react-spinners';
import LoginLayout from '@/Layout/LoginLayout';

interface FormValues {
  email: string;
  password: string;
}

const Login = (): JSX.Element => {
  const navigate = useNavigate();
  const formikRef = useRef<FormikProps<FormValues>>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [apiError, setApiError] = useState<string>('');

  const initialValues = {
    email: '',
    password: '',
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: login,
    onSuccess: (res: AxiosResponse) => {
      setLocalStorage('AUTH_DETAILS', res.data.data.token);
      navigate('/home-insurance');
    },
    onError: (err: AxiosError<{ message: string }>) => {
      if (err.response?.data?.message) setApiError(err.response.data.message);
    },
  });

  const onSubmit = (values: typeof initialValues) => {
    mutate(values);
  };

  const keyPressSubmit = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      formikRef.current?.handleSubmit();
    }
  };

  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={loginFormSchema}
    >
      {({ handleSubmit, values, errors, touched }) => {
        return (
          <LoginLayout>
            <div className="w-[37.5%] max-w-xl h-screen flex flex-col justify-center bg-white rounded-5 p-20">
              <img src={Logo} alt="logo" className="mb-3 w-15" />
              <p className="auth-head mb-7">Login to your account</p>
              <div
                className={`${errors.email && touched.email ? 'mb-1' : 'mb-6'}`}
              >
                <InputBox
                  type="text"
                  name="email"
                  placeholder="Email"
                  onKeyUp={(e: React.KeyboardEvent) => keyPressSubmit(e)}
                />
              </div>
              <div
                className={`${
                  errors.password && touched.password ? 'mb-1' : 'mb-5'
                }`}
              >
                <PasswordInput
                  name="password"
                  placeholder="Password"
                  type="password"
                  onKeyUp={(e: React.KeyboardEvent) => keyPressSubmit(e)}
                />
              </div>
              <div className="text-xs font-medium mb-10">
                <span>Forgot password?</span>{' '}
                <Link to={FORGOT_PASSWORD} className="text-primary underline">
                  Reset Here
                </Link>
              </div>
              <div className="relative">
                {/* error after api call goes here .. pass apiError as error */}
                {apiError ? (
                  <div className="text-error text-left text-sm first-letter:uppercase bg-white mb-2">
                    {apiError}
                  </div>
                ) : null}
                <button
                  onClick={() => {
                    if (
                      values.email &&
                      values.password &&
                      !errors.email &&
                      !errors.password
                    )
                      handleSubmit();
                  }}
                  type="submit"
                  disabled={isLoading}
                  className={`primary-btn btn w-full h-11 ${
                    (!values.email && !values.password) ||
                    errors.email ||
                    errors.password
                      ? 'disabled-btn'
                      : ''
                  } `}
                >
                  {isLoading ? <PulseLoader size={10} color="#FFF" /> : 'Login'}
                </button>
              </div>
            </div>
          </LoginLayout>
        );
      }}
    </Formik>
  );
};

export default Login;
