import { Outlet } from 'react-router-dom';
import { Footer, Header } from 'src/app/components';
function RootLayout() {
  return (
    <>
      <Header />
      <div className="w-[90%] mx-auto">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default RootLayout;
