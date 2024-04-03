import { Outlet } from 'react-router-dom';
import { NavBar } from './components/NavBar';

export const App = () => {
  return (
    <>
      <div className="min-h-full">
        <NavBar />
        <main className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </>
  );
};
