import { USER_ROLES } from '@/common/utility/user-roles';
import InputBox from '@/components/FormFields/InputBox/InputBox';
import SingleSelect from '@/components/SingleSelect';
import { InviteUserFormSchema } from '@/services/validation';
import { Formik, FormikProps } from 'formik';
import { useRef, useState } from 'react';
import Popup from 'reactjs-popup';

interface FormValues {
  name: string;
  email: string;
  role: string;
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
    role: '',
  };

  const onSubmit = (values: FormValues) => {
    onSubmitInvite(values);
    setApiError('');
  };

  const contentStyle = {
    maxWidth: '440px',
    width: '100%',
  };

  const onSelectItem = (item: string) => {
    formikRef.current?.setFieldValue('role', item);
  };

  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={InviteUserFormSchema}
    >
      {({ handleSubmit, values, errors, touched }) => {
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
                <InputBox
                  type="text"
                  name="name"
                  placeholder="Enter User Name"
                />
              </div>
              <div
                className={`${errors.email && touched.email ? 'mb-1' : 'mb-3'}`}
              >
                <InputBox
                  type="text"
                  name="email"
                  placeholder="Enter E-Mail Address"
                />
              </div>
              <div
                className={`${errors.role && touched.role ? 'mb-0' : 'mb-3'}`}
              >
                <div className="flex flex-col items-start relative">
                  <SingleSelect
                    items={USER_ROLES}
                    selectedItem={values.role}
                    onSelectItem={(value) => onSelectItem(value)}
                    placeHolder="Choose Role"
                  />
                  {touched.role && errors.role ? (
                    <div className="text-error text-left text-sm first-letter:uppercase bg-white py-1">
                      {errors.role}
                    </div>
                  ) : null}
                </div>
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
