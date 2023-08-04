import { CrossBlack } from '@/assets/images';
import Popup from 'reactjs-popup';

type Props = {
  onClose: () => void;
};

const DeleteError: React.FC<Props> = ({ onClose }) => {
  const contentStyle = {
    maxWidth: '440px',
    width: '100%',
  };
  return (
    <Popup
      open
      modal
      contentStyle={contentStyle}
      closeOnDocumentClick={false}
      closeOnEscape={false}
    >
      <main className="flex-grow h-full w-full bg-white shadow-2xl px-[26px] py-10 rounded-xl">
        <div className="font-medium text-xl text-black">
          Could not be deleted!
        </div>
        <div className="absolute right-[18px] top-[18px]" onClick={onClose}>
          <div
            onClick={onClose}
            className="w-9 h-9 flex justify-center items-center bg-gray-variant-7 cursor-pointer rounded"
          >
            <img src={CrossBlack} alt="close" />
          </div>
        </div>
        <div className="font-medium text-sm text-black opacity-50 mt-7">
          Role cannot be deleted because it is assosciated with one or more
          resource.
        </div>
      </main>
    </Popup>
  );
};

export default DeleteError;
