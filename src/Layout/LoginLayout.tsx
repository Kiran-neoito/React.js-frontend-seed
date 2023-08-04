import { getLocalStorage } from '../helpers/utils';
import { LoginImage } from '../assets/images';
import { Navigate } from 'react-router';

interface AuthLayoutProps {
  children: JSX.Element;
}

const isAuthenticated = getLocalStorage('AUTH_DETAILS');

const LoginLayout = ({ children }: AuthLayoutProps) => {
  return isAuthenticated ? (
    <Navigate to="/home-insurance" replace />
  ) : (
    <div className="relative">
      <div className="absolute inset-0 w-full h-screen z-0">
        <img
          src={LoginImage}
          alt="login-background"
          className="w-screen h-screen object-cover"
        />
      </div>
      <div className="absolute inset-0 w-full h-screen flex items-center">
        {children}
      </div>
    </div>
  );
};

export default LoginLayout;
