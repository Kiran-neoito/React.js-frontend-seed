import { useEffect, useRef, useState } from 'react';
import { useField } from 'formik';
import Calendar from 'react-calendar';
import { format } from 'date-fns';
import { CalendarBlack, CalendarWhite } from '@/assets/images';
import './DayPickerComponent.scss';
import 'react-calendar/dist/Calendar.css';
import useOnClickOutside from '@/hooks/useClickOutside';

interface Props {
  name: string;
  placeHolder?: string;
  value?: string;
  minimum?: string;
  maximum?: string;
}

const DayPickerComponent = (props: Props) => {
  const { name, placeHolder, value, minimum, maximum } = props;
  const [field, meta, helpers] = useField({ name });

  const [isPopperOpen, setIsPopperOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<Date>();
  const [inputValue, setInputValue] = useState<string>('');
  const [minDate, setMinDate] = useState<Date>();
  const [maxDate, setMaxDate] = useState<Date>();

  const buttonRef = useRef<HTMLButtonElement>(null);
  const calendarPopRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(calendarPopRef, () => setIsPopperOpen(false));

  const handleDaySelect = (date?: Date) => {
    setSelected(date);
    if (date) {
      setInputValue(format(date, 'dd/MM/y'));
      helpers.setValue(format(date, 'dd/MM/y'));
      setIsPopperOpen(false);
    } else {
      setInputValue('');
    }
  };
  const handleButtonClick = () => {
    setIsPopperOpen(!isPopperOpen);
  };

  useEffect(() => {
    setInputValue(value || '');
  }, [value]);

  useEffect(() => {
    if (maximum) {
      const [dd, mm, yyyy] = maximum.split('/');
      setMaxDate(new Date(`${mm}/${dd}/${yyyy}`));
    }
  }, [maximum]);

  useEffect(() => {
    if (minimum) {
      const [dd, mm, yyyy] = minimum.split('/');
      setMinDate(new Date(`${mm}/${dd}/${yyyy}`));
    }
  }, [minimum]);

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
          className={`w-8 h-8 flex justify-center items-center rounded ${
            isPopperOpen ? 'bg-primary' : 'bg-gray-variant-7'
          }`}
          aria-label="Pick a date"
          onClick={handleButtonClick}
        >
          <img
            src={isPopperOpen ? CalendarWhite : CalendarBlack}
            alt="calender"
            className="w-3.5"
          />
        </button>
        {isPopperOpen ? (
          <div className="day-picker-input">
            <Calendar
              onChange={handleDaySelect}
              value={selected}
              calendarType="US"
              minDate={minDate || undefined}
              maxDate={maxDate || undefined}
            />
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

export default DayPickerComponent;
