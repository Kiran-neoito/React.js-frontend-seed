import InputBox from '@/components/FormFields/InputBox/InputBox';
import { InviteUserFormSchema } from '@/services/validation';
import { Formik, FormikProps } from 'formik';
import { useRef, useState } from 'react';
import Popup from 'reactjs-popup';

interface FormValues {
  name: string;
  email: string;
}
type Props = {
  onClose: () => void;
  onSubmitInvite: (data: FormValues) => void;
};

const InviteUserPop: React.FC<Props> = ({ onClose, onSubmitInvite }) => {
  const formikRef = useRef<FormikProps<FormValues>>(null);

  const [apiError, setApiError] = useState<string>('');

  const initialValues = {
    name: '',
    email: '',
  };

  const onSubmit = (values: FormValues) => {
    onSubmitInvite(values);
    setApiError('');
  };

  const contentStyle = {
    maxWidth: '440px',
    width: '100%',
  };

  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={InviteUserFormSchema}
    >
      {({ handleSubmit, errors, touched }) => {
        return (
          <Popup
            open
            modal
            contentStyle={contentStyle}
            closeOnDocumentClick={false}
            closeOnEscape={false}
          >
            <main className="flex-grow h-full w-full bg-white shadow-2xl p-10 rounded-5">
              <div className="font-medium text-lg leading-[22px] text-black mb-7">
                Invite Users
              </div>
              <div
                className={`${errors.name && touched.name ? 'mb-1' : 'mb-3'}`}
              >
                <InputBox type="text" name="name" placeholder="Company Name" />
              </div>
              <div
                className={`${errors.email && touched.email ? 'mb-1' : 'mb-3'}`}
              >
                <InputBox type="text" name="email" placeholder="Email" />
              </div>
              <div className="relative pt-10">
                {apiError ? (
                  <div className="text-error text-left text-sm first-letter:uppercase bg-white absolute inset-0 h-fit">
                    {apiError}
                  </div>
                ) : null}
                <div className="flex">
                  <button
                    type="submit"
                    className="primary-btn h-11 px-3 text-sm leading-17 font-medium rounded-5 border border-primary"
                    onClick={() => {
                      handleSubmit();
                    }}
                  >
                    Sent Invite
                  </button>
                  <button
                    type="button"
                    className="text-sm leading-17 font-medium text-primary-gray hover:opacity-75 text ml-5"
                    onClick={() => onClose()}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </main>
          </Popup>
        );
      }}
    </Formik>
  );
};

export default InviteUserPop;
