import router from './navigation/router';
import React, { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import Spinner from '@/components/Loader/SuspenseLoader';

function App() {
  return (
    <div className="App">
      <Suspense fallback={<Spinner />}>
        <RouterProvider router={router} />
      </Suspense>
    </div>
  );
}

export default App;
