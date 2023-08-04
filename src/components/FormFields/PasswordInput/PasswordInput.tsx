import { EyeClose, EyeOpen } from '../../../assets/images';
import { lazy, useState } from 'react';
const InputBox = lazy(() => import('../InputBox/InputBox'));

const EyeIcon = () => (
  <img className="mr-4 pr-1 cursor-pointer" src={EyeClose} alt="" />
);

const Hide = () => (
  <img className="mr-4 pr-1 cursor-pointer" src={EyeOpen} alt="" />
);

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
  moreclass?: string;
  onBlur?: () => void;
  onKeyUp?: (e: React.KeyboardEvent) => void;
}

export const PasswordInput = (props: Props) => {
  const [currentType, setCurrentType] = useState('password');

  const onClickRightButton = () => {
    if (currentType === 'password') {
      setCurrentType('text');
    } else {
      setCurrentType('password');
    }
  };
  return (
    <div className="relative">
      <InputBox {...props} type={currentType} />
      <button
        type="button"
        onClick={onClickRightButton}
        className="absolute top-[13px] right-0"
      >
        {currentType === 'password' ? <EyeIcon /> : <Hide />}
      </button>
    </div>
  );
};

export default PasswordInput;
