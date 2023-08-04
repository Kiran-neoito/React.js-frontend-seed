import { SIDE_NAV_TABS } from '../common/utility/sidenav';
import { Link } from 'react-router-dom';
import { Logout } from '@/assets/images';
import { useEffect, useRef, useState } from 'react';
import LogoutConfirm from '@/components/LogoutConfirmation/LogoutConfirm';
import useOnClickOutside from '@/hooks/useClickOutside';

const SideNav = () => {
  const current = window.location.pathname;
  const [logoutModal, setLogoutModal] = useState<boolean>(false);
  const [showLogout, setshowLogout] = useState<boolean>(false);
  const profileRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(profileRef, () => setshowLogout(false));

  const profileClicked = () => {
    setshowLogout(!showLogout);
  };

  useEffect(() => {
    const img = new Image();
    img.src = Logout;
  }, []);

  return (
    <div className="w-14 min-w-[3.5rem] bg-[#E8E8E8] flex flex-col justify-between items-center">
      {logoutModal ? (
        <LogoutConfirm
          onClose={() => {
            setLogoutModal(false);
            setshowLogout(false);
          }}
        />
      ) : null}
      <ul className="mt-10">
        {SIDE_NAV_TABS.map((tab) => (
          <li className="my-3" key={tab.name}>
            <Link to={tab.url}>
              <div
                className={`flex items-center justify-center text-sm py-4 px-3 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap ${
                  current.includes(tab.url)
                    ? ' text-gray-900 bg-gray-100 border-r-2 border-[#384AF1]'
                    : ' hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out'
                }`}
                data-mdb-ripple="true"
                data-mdb-ripple-color="dark"
              >
                <img src={tab.image} />
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex flex-col gap-3 items-center py-3">
        <div
          className="w-10 h-10 text-primary border-2 border-primary rounded-full font-bold flex items-center justify-center text-base bg-white cursor-pointer relative"
          ref={profileRef}
          onClick={() => profileClicked()}
        >
          SA
          {showLogout ? (
            <button
              onClick={() => setLogoutModal(true)}
              className="absolute -top-3 left-full ml-2 bg-white p-3 flex items-center border border-gray-variant-8 shadow-md rounded-5 z-20"
            >
              <span className="text-primary-gray">Logout</span>
              <div className="w-4 ml-3">
                <img className="w-full" src={Logout} alt="logout" />
              </div>
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SideNav;
