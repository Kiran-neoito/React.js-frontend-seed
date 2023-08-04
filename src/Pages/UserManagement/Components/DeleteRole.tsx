import PulseLoader from 'react-spinners/PulseLoader';
import Popup from 'reactjs-popup';

type Props = {
  onClose: () => void;
  onDelete: (id: string) => void;
  id: string;
  deleteLoading: boolean;
};

const DeleteRole: React.FC<Props> = ({
  onClose,
  onDelete,
  id,
  deleteLoading,
}) => {
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
          Are you sure you want to delete the role?
        </div>
        <div className="font-medium text-sm text-black opacity-50 my-8">
          This action cannot be undone
        </div>
        <div className="flex">
          <button
            type="submit"
            className="btn danger-btn h-8 p-3 mr-3"
            disabled={deleteLoading}
            onClick={() => {
              onDelete(id);
            }}
          >
            {deleteLoading ? (
              <PulseLoader size={10} color="#FFF" />
            ) : (
              'Yes, Delete'
            )}
          </button>
          <button
            type="button"
            className="btn light-btn h-8 p-3"
            onClick={() => onClose()}
            disabled={deleteLoading}
          >
            No, Cancel Deletion
          </button>
        </div>
      </main>
    </Popup>
  );
};

export default DeleteRole;
