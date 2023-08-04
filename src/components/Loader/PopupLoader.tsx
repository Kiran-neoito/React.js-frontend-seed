import React from 'react';
import ClipLoader from 'react-spinners/SyncLoader';

export const PopupLoader = () => {
  return (
    <>
      <ClipLoader size={5} color="#333" loading />
    </>
  );
};

export default PopupLoader;
