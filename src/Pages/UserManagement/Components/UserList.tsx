import { CrossBlack } from '@/assets/images';
import Popup from 'reactjs-popup';

type Props = {
  onClose: () => void;
  roleName: string;
  roleId: string;
  isUsers: boolean;
};

const UserList: React.FC<Props> = ({ onClose, roleName }) => {
  const contentStyle = {
    maxWidth: '440px',
    width: '100%',
  };

  const UserListDummy = [
    {
      id: 1,
      name: 'Tissa',
      email: 'tissa@insr.com',
    },
    {
      id: 2,
      name: 'Sander',
      email: 'sander@insr.com',
    },
    {
      id: 3,
      name: 'Amanda',
      email: 'amanda@insr.com',
    },
    {
      id: 1,
      name: 'Tissa',
      email: 'tissa@insr.com',
    },
    {
      id: 2,
      name: 'Sander',
      email: 'sander@insr.com',
    },
    {
      id: 3,
      name: 'Amanda',
      email: 'amanda@insr.com',
    },
    {
      id: 1,
      name: 'Tissa',
      email: 'tissa@insr.com',
    },
    {
      id: 2,
      name: 'Sander',
      email: 'sander@insr.com',
    },
    {
      id: 3,
      name: 'Amanda',
      email: 'amanda@insr.com',
    },
  ];
  return (
    <Popup
      open
      modal
      contentStyle={contentStyle}
      closeOnDocumentClick={false}
      closeOnEscape={false}
    >
      <main className="flex-grow h-full w-full bg-white shadow-2xl p-10 pr-6 pb-0 rounded-5">
        <div className="font-medium text-lg leading-[22px] text-black mb-5">
          {roleName}
        </div>
        <div className="absolute right-[18px] top-[18px]" onClick={onClose}>
          <div
            onClick={onClose}
            className="w-9 h-9 flex justify-center items-center bg-gray-variant-7 cursor-pointer rounded"
          >
            <img src={CrossBlack} alt="close" />
          </div>
        </div>
        <div className="flex flex-col overflow-auto max-h-[320px] pr-2 scroll-bar-user">
          {UserListDummy?.map((user, index) => (
            <div
              key={user.id}
              className={`flex items-center justify-between px-4 py-3 border border-tertiary-gray rounded ${
                UserListDummy?.length === index + 1 ? 'mb-10' : 'mb-2'
              }`}
            >
              <div className="text-sm font-medium leading-17 text-black">
                {user.name}
              </div>
              <div className="text-sm font-medium leading-17 text-black/[0.64]">
                {user.email}
              </div>
            </div>
          ))}
        </div>
      </main>
    </Popup>
  );
};

export default UserList;
