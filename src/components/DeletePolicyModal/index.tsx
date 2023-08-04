import Popup from 'reactjs-popup';

type Props = {
  onClose: () => void;
  onDelete: (id: string) => void;
  id: string;
};

const DeletePolicyModal: React.FC<Props> = ({ onClose, onDelete, id }) => {
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
      <main className="flex-grow h-full w-full bg-white shadow-2xl px-8 py-10 rounded-xl">
        <div className="font-medium text-xl text-black">
          {`Are you sure you want to delete the policy ${id}?`}
        </div>
        <div className="font-medium text-sm text-black opacity-50 my-8">
          This action cannot be undone
        </div>
        <div className="flex">
          <button
            type="submit"
            className="btn danger-btn h-8 p-3 mr-3"
            onClick={() => {
              onDelete(id);
              onClose();
            }}
          >
            Yes, Delete Record
          </button>
          <button
            type="button"
            className="btn light-btn h-8 p-3"
            onClick={() => onClose()}
          >
            No, Cancel Deletion
          </button>
        </div>
      </main>
    </Popup>
  );
};

export default DeletePolicyModal;
