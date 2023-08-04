import { useField } from 'formik';
import React from 'react';
interface Props {
  labelStyle?: string;
  disabled?: boolean;
  label?: string;
  maxlength?: number;
  type: string;
  placeholder: string;
  name: string;
  fieldid?: string;
  inputClassName?: string;
  value?: string | boolean | number;
  moreclass?: string;
  onBlur?: () => void;
  onKeyUp?: (e: React.KeyboardEvent) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputBox = (props: Props) => {
  let { labelStyle, inputClassName } = props;
  const {
    disabled = false,
    label,
    maxlength,
    type,
    placeholder,
    name,
    fieldid,
    moreclass,
  } = props;
  const [field, meta] = useField({ name });
  const isInError = (meta.touched && meta.error && true) || false;
  inputClassName =
    inputClassName ||
    'bg-white border border-tertiary-gray rounded-5 focus:outline-none focus:text-black py-3 px-3 w-full appearance-none leading-normal text-xs placeholder:text-secondary-gray min-h-[48px]';
  labelStyle = labelStyle || '';
  if (isInError) {
    inputClassName += ' border-error-field';
    labelStyle += ' text-error';
  }
  if (disabled) {
    inputClassName =
      inputClassName +
      'cursor-not-allowed border-gray-300 bg-gray-300 placeholder:text-black';
  }

  return (
    <>
      <div className=" flex flex-col items-start relative">
        {label && <span className={labelStyle}>{label}</span>}
        <div className="relative w-full">
          <input
            {...field}
            {...props}
            autoComplete="off"
            name={name}
            maxLength={maxlength}
            readOnly={disabled === true}
            type={type}
            placeholder={placeholder}
            className={inputClassName + ' ' + moreclass}
            id={fieldid}
          />
        </div>
      </div>
      {meta.touched && meta.error ? (
        <div className="text-error text-left text-sm first-letter:uppercase bg-white py-1">
          {meta.error}
        </div>
      ) : null}
    </>
  );
};

export default InputBox;
