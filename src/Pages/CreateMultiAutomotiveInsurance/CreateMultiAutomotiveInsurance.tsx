import Popup from 'reactjs-popup';
import DayPickerComponent from '@/components/DayPickerComponent';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createMultiRoutePolicy } from '@/services/apis/automotive-insurance';
import { Formik, FormikProps } from 'formik';
import { createMultiAutoFormSchema } from '../../services/validation';
import React, { useRef } from 'react';
import InputBox from '@/components/FormFields/InputBox/InputBox';
import { CreateMultiParams } from '@/services/types/automotive-insurance';
import { dateToISO } from '@/helpers/utils';

type Props = {
  onClose: () => void;
};

interface FormValues {
  date: string;
  expiry: string;
}
const CreateMultiAutomotiveInsurance: React.FC<Props> = ({ onClose }) => {
  const contentStyle = {
    maxWidth: '400px',
    width: '100%',
  };
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: createMultiRoutePolicy,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['auto-insr'] }),
  });

  const formikRef = useRef<FormikProps<FormValues>>(null);

  const initialValues = {
    date: '',
    expiry: '',
  };

  const onSubmit = (values: typeof initialValues) => {
    const createdOn = dateToISO(values.date);
    const args: CreateMultiParams = {
      country: 'MR',
      expiry: `${values.expiry}d`,
      createdOn,
    };
    mutate(args);
    onClose();
  };
  const onlyNumber = (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
    formikRef.current?.setFieldValue(
      key,
      e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')
    );
  };

  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={createMultiAutoFormSchema}
    >
      {({ handleSubmit }) => {
        return (
          <Popup
            open
            modal
            contentStyle={contentStyle}
            closeOnDocumentClick={false}
            closeOnEscape={false}
          >
            <main className="flex-grow h-full w-full bg-white shadow-2xl p-10 rounded-xl">
              <div className="font-medium text-lg leading-[22px] mb-7">
                Create Policy
              </div>
              <div className="mb-3">
                <DayPickerComponent name="date" />
              </div>
              <div className="mb-10">
                <div className="relative">
                  <InputBox
                    type="number"
                    name="expiry"
                    placeholder="Expiry"
                    moreclass="pr-14"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      onlyNumber('expiry', e)
                    }
                  />
                  <span className="absolute top-4 right-0 font-medium text-sm leading-17 text-black/50 pr-3">
                    Day(s)
                  </span>
                </div>
              </div>
              <div className="flex">
                <button
                  type="submit"
                  className="btn primary-btn h-11 p-3 mr-3"
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  Create Policy
                </button>
                <button
                  type="button"
                  className="text-primary-gray font-medium text-sm leading-17"
                  onClick={() => onClose()}
                >
                  Cancel
                </button>
              </div>
            </main>
          </Popup>
        );
      }}
    </Formik>
  );
};

export default CreateMultiAutomotiveInsurance;
