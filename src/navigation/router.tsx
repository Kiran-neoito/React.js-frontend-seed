import { createBrowserRouter, Navigate } from 'react-router-dom';
// import { lazy } from 'react';
import Home from '../Pages/HomeInsurance/HomeInsurance';
import { ProtectedRoute } from './ProtectedRoute';
import {
  AUTOMOTIVE_INSURANCE,
  CREATE_HOME_INSURANCE,
  RESET_PASSWORD,
  HOME_INSURANCE,
  LOGIN,
  FORGOT_PASSWORD,
  CREATE_AUTOMOTIVE_INSURANCE_SINGLE,
  // CREATE_AUTOMOTIVE_INSURANCE_MULTI,
  USER_MANAGEMENT,
  AUTOMOTIVE_INSURANCE_MULTI,
  ORGANISATION,
  ORGANISATIONUSERS,
} from '../common/urlConstants';
import UserManagement from '@/Pages/UserManagement/UserManagement';
import Organisation from '@/Pages/Organisation/Organisation';
// import CreateMultiAutomotiveInsurance from '@/Pages/CreateMultiAutomotiveInsurance/CreateMultiAutomotiveInsurance';
// const CreateHomeInsurance = lazy(
//   () => import('../Pages/CreateHomeInsurance/CreateHomeInsurance')
// );
// const Login = lazy(() => import('../Pages/Login/Login'));
// const ResetPassword = lazy(
//   () => import('../Pages/ResetPassword/ResetPassword')
// );
// const CreatePassword = lazy(
//   () => import('../Pages/CreatePassword/CreatePassword')
// );
// const AutomotiveInsurance = lazy(
//   () => import('../Pages/AutomotiveInsurance/AutomotiveInsurance')
// );
// const AutomotiveInsuranceMulti = lazy(
//   () => import('../Pages/AutomotiveInsurance/AutomotiveInsuranceMulti.js')
// );
// const CreateSingleAutomotiveInsurance = lazy(
//   () =>
//     import(
//       '../Pages/CreateSingleAutomotiveInsurance/CreateSingleAutomotiveInsurance'
//     )
// );

import AutomotiveInsurance from '@/Pages/AutomotiveInsurance/AutomotiveInsurance';
import CreateSingleAutomotiveInsurance from '@/Pages/CreateSingleAutomotiveInsurance/CreateSingleAutomotiveInsurance';
import CreateHomeInsurance from '@/Pages/CreateHomeInsurance/CreateHomeInsurance';
import AutomotiveInsuranceMulti from '@/Pages/AutomotiveInsurance/AutomotiveInsuranceMulti.js';
import Login from '@/Pages/Login/Login';
import ResetPassword from '@/Pages/ResetPassword/ResetPassword';
import CreatePassword from '@/Pages/CreatePassword/CreatePassword';

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        path: '/',
        element: <ProtectedRoute />,
        children: [
          {
            path: '/',
            element: <Navigate to={HOME_INSURANCE} />,
          },
          {
            path: HOME_INSURANCE,
            element: <Home />,
          },
          {
            path: CREATE_HOME_INSURANCE,
            element: <CreateHomeInsurance />,
          },
          {
            path: AUTOMOTIVE_INSURANCE,
            element: <AutomotiveInsurance />,
          },
          {
            path: AUTOMOTIVE_INSURANCE_MULTI,
            element: <AutomotiveInsuranceMulti />,
          },
          {
            path: CREATE_AUTOMOTIVE_INSURANCE_SINGLE,
            element: <CreateSingleAutomotiveInsurance />,
          },
          {
            path: USER_MANAGEMENT,
            element: <UserManagement />,
          },
          {
            path: ORGANISATION,
            element: <Organisation />,
          },
          {
            path: ORGANISATIONUSERS,
            element: <Organisation />,
          },
        ],
      },
      {
        path: LOGIN,
        element: <Login />,
      },
      {
        path: FORGOT_PASSWORD,
        element: <ResetPassword />,
      },
      {
        path: RESET_PASSWORD,
        element: <CreatePassword />,
      },
    ],
  },
]);

export default router;
