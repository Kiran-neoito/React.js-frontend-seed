import { useEffect, useRef, useState } from 'react';
import useOnClickOutside from '@/hooks/useClickOutside';
import { Down, Up } from '@/assets/images';

interface Props {
  items: string[];
  selectedItem: string;
  onSelectItem: (value: string) => void;
  placeHolder?: string;
  widthClass?: string;
}

const SingleSelect = (props: Props) => {
  const { items, selectedItem, onSelectItem, placeHolder, widthClass } = props;

  const [isPopperOpen, setIsPopperOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>('');

  const singlePopRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(singlePopRef, () => setIsPopperOpen(false));

  useEffect(() => {
    setSelected(selectedItem);
  }, [selectedItem]);

  const selectFilter = (item: string) => {
    setSelected(item);
    onSelectItem(item);
    setIsPopperOpen(false);
  };

  return (
    <>
      <div
        className={`z-30 flex items-center justify-between bg-white border border-tertiary-gray rounded-5 mr-3.5 cursor-pointer relative select-none ${
          widthClass ? 'w-32' : 'w-full'
        }`}
        ref={singlePopRef}
      >
        <div
          className="px-3 w-full flex justify-between items-center h-11"
          onClick={() => setIsPopperOpen(!isPopperOpen)}
        >
          <span className="text-black font-normal text-sm leading-17 whitespace-nowrap truncate capitalize">
            {selected || placeHolder}
          </span>
          <div>
            <img src={isPopperOpen ? Up : Down} alt="arrow" />
          </div>
        </div>
        {isPopperOpen ? (
          <div className="absolute top-full left-0 bg-white min-w-full p-1.5 border rounded-5 mt-1">
            {items?.map((item) => (
              <div
                key={item}
                className={`w-full h-[37px] text-black font-medium text-sm leading-17 flex items-center px-3 capitalize hover:bg-black/[0.04] ${
                  selected === item ? 'bg-black/[0.04]' : ''
                }`}
                onClick={() => selectFilter(item)}
              >
                {item}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default SingleSelect;
