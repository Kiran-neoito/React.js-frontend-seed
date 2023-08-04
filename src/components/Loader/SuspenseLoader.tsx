import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

export const Spinner = () => {
  return (
    <>
      <div className="fixed h-full w-full flex items-center justify-center z-50 bg-black bg-opacity-25">
        <ClipLoader size={55} color="#0E278F" loading />
      </div>
    </>
  );
};

export default Spinner;
