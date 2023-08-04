import DayPickerComponent from '@/components/DayPickerComponent';
import { Formik, FormikProps } from 'formik';
import { filterMultiAutoFormSchema } from '../../services/validation';
import React, { useEffect, useRef } from 'react';
import { FilterAuto } from '@/Types/autoMotive';
import SingleSelectMultiRoute from '../SingleSelectMultiRoute';

type Props = {
  onClear: () => void;
  onFilter: (data: FilterAuto) => void;
  filterValues: FilterAuto;
  showType?: boolean;
};

interface FormValues {
  createdAtGte: string;
  createdAtLte: string;
  type?: string;
}
const FilterInsurance: React.FC<Props> = ({
  onClear,
  onFilter,
  filterValues,
  showType = false,
}) => {
  const formikRef = useRef<FormikProps<FormValues>>(null);

  const initialValues = filterValues;

  useEffect(() => {
    formikRef.current?.setValues(filterValues);
  }, [filterValues]);

  const onSubmit = (values: typeof initialValues) => {
    onFilter(values);
  };

  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={filterMultiAutoFormSchema}
    >
      {({ handleSubmit, values }) => {
        return (
          <div className="bg-white p-5 w-96 px-[30px] py-7 rounded-5 shadow-md">
            {showType ? (
              <div className="mb-3">
                <SingleSelectMultiRoute
                  value={values.type}
                  name="type"
                  placeHolder="Type of Insurance"
                />
              </div>
            ) : null}
            <div className="mb-3">
              <DayPickerComponent
                value={values.createdAtGte}
                name="createdAtGte"
                placeHolder="From"
                maximum={values.createdAtLte}
              />
            </div>
            <div className="mb-3">
              <DayPickerComponent
                value={values.createdAtLte}
                name="createdAtLte"
                placeHolder="To"
                minimum={values.createdAtGte}
              />
            </div>
            <div className="flex">
              <button
                type="submit"
                className="btn secondary-btn h-11 p-3 mr-3"
                onClick={() => {
                  handleSubmit();
                }}
              >
                Apply Filter
              </button>
              <button
                type="button"
                className="text-primary-gray font-medium text-sm leading-17 hover:opacity-70"
                onClick={() => onClear()}
              >
                Clear filter
              </button>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default FilterInsurance;
