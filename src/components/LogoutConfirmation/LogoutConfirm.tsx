import { LOGIN } from '@/common/urlConstants';
import { logout } from '@/services/apis/auth';
import { useMutation } from '@tanstack/react-query';
// import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import Popup from 'reactjs-popup';

const LogoutConfirm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const navigate = useNavigate();
  // const [buttonText, setButtonText] = useState<string>('Yes, Logout');
  const contentStyle = {
    maxWidth: '440px',
    width: '100%',
  };

  const { isLoading, mutate } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      window.localStorage.clear();
      navigate(LOGIN);
    },
    // onError: (err: AxiosError<{ message: string }>) =>
    // onError: () =>
    //   // setError(err.response?.data.message ?? 'Logout Failed'),
    //   setButtonText('Try again'),
  });

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
          Are you sure you want to logout?
        </div>
        <div className="font-medium text-sm text-black opacity-50 my-8">
          Click cancel to stay logged in.
        </div>
        <div className="flex">
          <button
            type="submit"
            className="btn danger-btn h-8 p-3 mr-3 min-w-[143px]"
            onClick={() => mutate()}
          >
            {isLoading ? <PulseLoader size={10} color="#FFF" /> : 'Yes, Logout'}
          </button>
          <button
            type="button"
            className="btn light-btn h-8 p-3"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </main>
    </Popup>
  );
};

export default LogoutConfirm;
