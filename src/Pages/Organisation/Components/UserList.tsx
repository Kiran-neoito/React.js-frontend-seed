import { CreateRole } from '@/services/types/rbac';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import InviteUserPop from './InviteUserPop';
import { ThreeDot } from '@/assets/images';
import useOnClickOutside from '@/hooks/useClickOutside';

// interface Props {}

const UserList: React.FC = () => {
  const [openMoreFirst, setOpenMoreFirst] = useState<string>('');
  const morePopRef = useRef<HTMLDivElement>(null);
  const [inviteOpen, setInviteOpen] = useState(false);
  useOnClickOutside(morePopRef, () => setOpenMoreFirst(''));

  const inviteUserPop = () => {
    setInviteOpen(true);
  };
  const onInviteUser = (values: CreateRole) => {
    console.log(values, 'invite values');
    setInviteOpen(false);
  };

  const dummySet2 = [
    {
      id: '11',
      name: 'Tissa',
      email: 'tissa@insr.tech',
      role: 'admin',
      status: 'active',
    },
    {
      id: '22',
      name: 'Sander',
      email: 'sander@insr.tech',
      role: 'Accounts Manager',
      status: 'pending',
    },
    {
      id: '33',
      name: 'Jibin M',
      email: 'Jibin@insr.tech',
      role: 'Support',
      status: 'expired',
    },
    {
      id: '44',
      name: 'Tissa',
      email: 'tissa@insr.tech',
      role: 'admin',
      status: 'active',
    },
  ];

  return (
    <div className="mt-9">
      <div className="flex justify-between items-center">
        <h4 className="text-black font-medium text-sm leading-17">
          Organization list
        </h4>
        <div className="flex items-center">
          <button
            onClick={inviteUserPop}
            className="bg-main-blue text-sm rounded-md text-white px-3 py-2 h-11 font-medium flex gap-2 items-center"
          >
            <img src="/src/assets/images/icon/Add.svg" alt="add" />
            <span>Invite User</span>
          </button>
          {inviteOpen ? (
            <InviteUserPop
              onClose={() => setInviteOpen(false)}
              onSubmitInvite={(values) => onInviteUser(values)}
            />
          ) : null}
        </div>
      </div>
      <table className="table-auto w-full bg-white mt-4 shadow-md">
        <thead>
          <tr className="h-12">
            <th className="px-3 border-b border-gray-variant-8 text-left text-black font-medium text-sm leading-17">
              Organization Name
            </th>
            <th className="px-3 border-b border-gray-variant-8 text-left text-black font-medium text-sm leading-17">
              Organization E-mail
            </th>
            <th className="px-3 border-b border-gray-variant-8 text-left text-black font-medium text-sm leading-17">
              Status
            </th>
            <th className="px-3 border-b border-gray-variant-8 text-left text-black font-medium text-sm leading-17">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {dummySet2?.length ? (
            <>
              {dummySet2?.map((row, i) => (
                <tr key={i + row?.id} className="h-[68px]">
                  <td className="px-3 text-left text-black font-medium text-sm leading-17">
                    <p className="truncate max-w-[104px]">{row.name}</p>
                  </td>
                  <td className="px-3 text-left text-black font-medium text-sm leading-17">
                    {row.email}
                  </td>
                  <td className="px-3 text-left text-black font-medium text-sm leading-17">
                    <div>
                      <span
                        className={`font-medium text-sm leading-17 capitalize ${
                          row.status === 'active' ? 'text-success' : ''
                        } ${row.status === 'expired' ? 'text-error' : ''} ${
                          row.status === 'pending' ? 'text-black/50' : ''
                        }`}
                      >
                        {row.status}
                      </span>
                      {row.status !== 'active' ? (
                        <Link
                          to="#"
                          className="text-primary underline font-medium text-xs ml-3"
                        >
                          Resend Invite
                        </Link>
                      ) : null}
                    </div>
                  </td>
                  <td className="px-3 text-left text-black font-medium text-sm leading-17">
                    <div className="relative" ref={morePopRef}>
                      <button
                        onClick={() => setOpenMoreFirst(row?.id)}
                        className={`w-9 h-9 hover:bg-gray-variant-7 rounded flex justify-center items-center ${
                          openMoreFirst === row?.id
                            ? 'bg-gray-variant-7'
                            : 'bg-white'
                        }`}
                      >
                        <img src={ThreeDot} alt="more" />
                      </button>
                      {openMoreFirst === row?.id ? (
                        <div className="absolute top-full left-0 bg-white rounded-5 px-5 py-4 border shadow-sm z-10 flex flex-col items-start">
                          <button className="font-normal text-xs mb-3">
                            Disable
                          </button>
                          <button className="font-normal text-xs">Edit</button>
                        </div>
                      ) : null}
                    </div>
                  </td>
                </tr>
              ))}
            </>
          ) : (
            <tr>
              <td
                colSpan={4}
                className="text-center py-10 px-3 text-gray-400 font-medium text-sm leading-17"
              >
                No data to show
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
