import { Link } from 'react-router-dom';
import Header from '../Header/Header';

export const NotFound = () => {
  return (
    <div
      className="min-h-screen flex flex-col  items-end justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80')`, // Replace with your image URL
      }}
    >
      <Header />
      <div className="text-center mr-[270px]">
        <p className="text-2xl text-gray-600 mb-8">Page Not Found</p>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="px-8 py-3 bg-black text-white rounded-full text-lg  transition-colors"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;