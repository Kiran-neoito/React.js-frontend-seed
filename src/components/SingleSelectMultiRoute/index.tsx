import { useEffect, useRef, useState } from 'react';
import { useField } from 'formik';
import useOnClickOutside from '@/hooks/useClickOutside';
import { Down, Up } from '@/assets/images';

interface Props {
  name: string;
  placeHolder?: string;
  value?: string;
}

const SingleSelectMultiRoute = (props: Props) => {
  const { name, placeHolder, value } = props;
  const [field, meta, helpers] = useField({ name });

  const [isPopperOpen, setIsPopperOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');

  const buttonRef = useRef<HTMLButtonElement>(null);
  const calendarPopRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(calendarPopRef, () => setIsPopperOpen(false));
  const setInputField = (item: string) => {
    if (item === 'multi') {
      setInputValue('Mutli Route');
    } else if (item === 'single') {
      setInputValue('Single Route');
    } else {
      setInputValue('');
    }
  };

  const handleSelect = (item?: string) => {
    setSelected(item || '');
    if (item) {
      setInputField(item);
      helpers.setValue(item);
      setIsPopperOpen(false);
    } else {
      setInputValue('');
    }
  };
  const handleButtonClick = () => {
    setIsPopperOpen(!isPopperOpen);
  };

  useEffect(() => {
    setSelected(value || '');
    setInputField(value || '');
  }, [value]);

  const isInError = (meta.touched && meta.error && true) || false;

  return (
    <>
      <div
        className={`relative primary-form ${
          isInError ? 'border-error' : 'border-tertiary-gray'
        }`}
        ref={calendarPopRef}
      >
        <div
          className="w-full cursor-pointer h-full flex items-center"
          onClick={handleButtonClick}
        >
          <input
            {...field}
            disabled
            type="text"
            placeholder={placeHolder || 'Date'}
            value={inputValue}
            className={`bg-white input-no-role pr-3 w-full text-[13px] cursor-pointer-imp border-none ${
              isInError ? 'placeholder:text-error' : ''
            }`}
          />
        </div>
        <button
          ref={buttonRef}
          type="button"
          className="w-8 h-8 flex justify-center items-center rounded"
          aria-label="Pick a date"
          onClick={handleButtonClick}
        >
          <img
            src={isPopperOpen ? Up : Down}
            alt="calender"
            className="w-3.5"
          />
        </button>
        {isPopperOpen ? (
          <div className="absolute top-full mt-1 left-0 bg-white w-full shadow-md rounded-lg z-10 border border-tertiary-gray px-3 py-2 flex flex-col">
            <button
              onClick={() => handleSelect('single')}
              className={`text-black font-medium text-sm leading-17 p-3 flex items-center mb-2 hover:bg-black/[0.04] ${
                selected === 'single' ? 'bg-black/[0.04]' : ''
              }`}
            >
              Single Route
            </button>
            <button
              onClick={() => handleSelect('multi')}
              className={`text-black font-medium text-sm leading-17 p-3 flex items-center mb-2 hover:bg-black/[0.04] ${
                selected === 'multi' ? 'bg-black/[0.04]' : ''
              }`}
            >
              Multi Route
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
      {meta.touched && meta.error ? (
        <div className="text-error text-left text-sm first-letter:uppercase bg-white py-1">
          {meta.error}
        </div>
      ) : null}
    </>
  );
};

export default SingleSelectMultiRoute;
