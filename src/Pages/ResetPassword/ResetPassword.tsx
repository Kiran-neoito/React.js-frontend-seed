import { Logo } from '../../assets/images';
import { Formik, FormikProps } from 'formik';
import { lazy, useRef, useState } from 'react';
import { ForgotPassFormSchema } from '../../services/validation';
import { useMutation } from '@tanstack/react-query';
import { sendResetLink } from '@/services/apis/auth';
import { AxiosError, AxiosResponse } from 'axios';
import { PulseLoader } from 'react-spinners';
const InputBox = lazy(
  () => import('../../components/FormFields/InputBox/InputBox')
);
const LoginLayout = lazy(() => import('../../Layout/LoginLayout'));
interface FormValues {
  email: string;
}

const ResetPassword = (): JSX.Element => {
  const formikRef = useRef<FormikProps<FormValues>>(null);

  const [apiError, setApiError] = useState<string>('');
  const [emailSubmit, SetEmailSubmit] = useState<string>('');

  const { mutate, isLoading } = useMutation({
    mutationFn: sendResetLink,
    onSuccess: (res: AxiosResponse<{ message: string }>) => {
      SetEmailSubmit(res.data.message);
    },
    onError: (err: AxiosError<{ message: string }>) => {
      if (err.response?.data?.message) setApiError(err.response.data.message);
    },
  });

  const initialValues = {
    email: '',
  };

  const onSubmit = (values: typeof initialValues) => {
    mutate(values.email);
  };

  const keyPressSubmit = (e: React.KeyboardEvent) => {
    setApiError('');
    if (e.key === 'Enter') {
      formikRef.current?.handleSubmit();
    }
  };

  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={ForgotPassFormSchema}
    >
      {({ handleSubmit, values, errors, touched }) => {
        return (
          <LoginLayout>
            <div className="w-[37.5%] max-w-xl h-screen flex flex-col justify-center bg-white rounded-5 p-20">
              <img src={Logo} alt="logo" className="mb-3 w-15" />
              {emailSubmit.length ? (
                <>
                  <p className="text-xl leading-6 font-normal opacity-70">
                    {emailSubmit}
                  </p>
                </>
              ) : (
                <>
                  <p className="auth-head mb-7">Forgot Password?</p>
                  <div
                    className={`${
                      (errors.email && touched.email) ||
                      (!errors.email && apiError)
                        ? 'mb-1'
                        : 'mb-4'
                    }`}
                  >
                    <InputBox
                      type="text"
                      name="email"
                      placeholder="Enter your registered e-mail"
                      onKeyUp={(e: React.KeyboardEvent) => keyPressSubmit(e)}
                    />
                  </div>
                  <div className="relative">
                    {!errors.email && apiError ? (
                      <div className="text-error text-left text-sm first-letter:uppercase bg-white pb-2">
                        {apiError}
                      </div>
                    ) : null}
                    <button
                      onClick={() => {
                        if (values.email && !errors.email) handleSubmit();
                      }}
                      type="submit"
                      disabled={isLoading}
                      className={`primary-btn  btn w-full h-11 ${
                        !values.email || errors.email ? 'disabled-btn' : ''
                      } `}
                    >
                      {isLoading ? (
                        <PulseLoader size={10} color="#FFF" />
                      ) : (
                        'Reset Password'
                      )}
                    </button>
                  </div>
                </>
              )}
            </div>
          </LoginLayout>
        );
      }}
    </Formik>
  );
};

export default ResetPassword;
