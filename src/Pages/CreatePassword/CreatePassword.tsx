import { lazy, useRef, useState } from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import { Formik, FormikProps } from 'formik';
import { PuffLoader, PulseLoader } from 'react-spinners';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { LOGIN } from '@/common/urlConstants';
import { Logo } from '../../assets/images';
import { CreatePassFormSchema } from '../../services/validation';
import { resetPassword, verifyResetToken } from '@/services/apis/auth';
const PasswordInput = lazy(
  () => import('../../components/FormFields/PasswordInput/PasswordInput')
);
const InputBox = lazy(
  () => import('../../components/FormFields/InputBox/InputBox')
);
const LoginLayout = lazy(() => import('../../Layout/LoginLayout'));
interface FormValues {
  password: string;
  confirmPassword: string;
}

const CreatePassword = (): JSX.Element => {
  const formikRef = useRef<FormikProps<FormValues>>(null);
  const navigate = useNavigate();
  const [apiError, setApiError] = useState<string>('');
  const [matched, setMatched] = useState<boolean>(false);
  const [urlValid, setUrlValid] = useState<boolean>(false);
  const [passSubmit, setPassSubmit] = useState<string>('');
  const [searchParams] = useSearchParams();

  const { isLoading: verifyLoading } = useQuery({
    queryKey: ['auth', 'verify-reset', { token: searchParams.get('confirm') }],
    queryFn: () => {
      if (searchParams.get('confirm'))
        return verifyResetToken({ id: searchParams.get('confirm') ?? '' });
    },
    onError: () => setUrlValid(false),
    onSuccess: () => setUrlValid(true),
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: resetPassword,
    onSuccess: (res: AxiosResponse<{ message: string }>) => {
      setPassSubmit(res.data.message);
      setTimeout(() => navigate(LOGIN), 5000);
    },
    onError: (err: AxiosError<{ message: string }>) => {
      if (err.response?.data?.message) setApiError(err.response.data.message);
    },
  });

  const initialValues = {
    password: '',
    confirmPassword: '',
  };

  const onSubmit = (values: typeof initialValues) =>
    mutate({ ...values, token: searchParams.get('confirm') ?? '' });

  const checkMatch = (values: typeof initialValues) => {
    if (values.password === values.confirmPassword) {
      setMatched(true);
    } else {
      setMatched(false);
    }
  };

  const checkMatchConfirm = (values: typeof initialValues) => {
    formikRef?.current?.setFieldTouched('confirmPassword');
    checkMatch(values);
  };

  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={CreatePassFormSchema}
    >
      {({ handleSubmit, values, errors, touched }) => {
        return (
          <LoginLayout>
            <div className="w-[37.5%] max-w-xl h-screen flex flex-col justify-center bg-white rounded-5 p-20">
              {verifyLoading ? (
                <div className="flex items-center justify-center">
                  <PuffLoader color="#415D80" size={100} />
                </div>
              ) : !urlValid ? (
                <>
                  <img src={Logo} alt="logo" className="mb-3 w-15" />
                  <p className="text-error font-normal text-xl">
                    Invalid Link! Please try with a valid URL.
                  </p>
                  <Link
                    to={LOGIN}
                    className="text-primary text-xl font-medium leading-6 underline"
                  >
                    Login
                  </Link>
                </>
              ) : (
                <>
                  <img src={Logo} alt="logo" className="mb-3 w-15" />
                  {passSubmit.length ? (
                    <>
                      <p className="text-xl leading-6 font-normal opacity-70 mb-6">
                        {passSubmit}
                      </p>
                      <Link
                        to={LOGIN}
                        className="text-primary text-xl font-medium leading-6 underline"
                      >
                        Login
                      </Link>
                      <p className="text-xl leading-6 font-normal opacity-70 mt-2">
                        Or you will be redirected in 5 seconds
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="auth-head mb-7">Create New Password</p>
                      <div
                        className={`${
                          errors.password && touched.password ? 'mb-1' : 'mb-6'
                        }`}
                      >
                        <PasswordInput
                          name="password"
                          placeholder="New Password"
                          type="password"
                          onKeyUp={() => checkMatch(values)}
                        />
                      </div>
                      <div
                        className={`${
                          errors.confirmPassword && touched.confirmPassword
                            ? 'mb-1'
                            : 'mb-6'
                        }`}
                      >
                        <InputBox
                          name="confirmPassword"
                          placeholder="Confirm New Password"
                          type="password"
                          onKeyUp={() => checkMatchConfirm(values)}
                        />
                        {!errors.confirmPassword && values.password ? (
                          <>
                            <div
                              className={`text-left text-sm first-letter:uppercase bg-white py-1 ${
                                !matched && 'text-error'
                              } ${matched && 'text-success'}`}
                            >
                              {matched ? 'Password Match!' : null}
                              {!matched ? 'Password Mismatch!' : null}
                            </div>
                          </>
                        ) : null}
                      </div>
                      <div className="relative">
                        {apiError ? (
                          <div className="text-error text-left text-sm first-letter:uppercase bg-white py-1">
                            {apiError}
                          </div>
                        ) : null}
                        <button
                          onClick={() => {
                            if (
                              values.password &&
                              values.confirmPassword &&
                              !errors.password &&
                              !errors.confirmPassword &&
                              matched
                            )
                              handleSubmit();
                          }}
                          type="submit"
                          disabled={isLoading}
                          className={`primary-btn btn w-full h-11 ${
                            (!values.password && !values.confirmPassword) ||
                            errors.password ||
                            errors.confirmPassword ||
                            !matched
                              ? 'disabled-btn'
                              : ''
                          } `}
                        >
                          {isLoading ? (
                            <PulseLoader size={10} color="#FFF" />
                          ) : (
                            'Change Password'
                          )}
                        </button>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </LoginLayout>
        );
      }}
    </Formik>
  );
};

export default CreatePassword;
