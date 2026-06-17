import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { Footer } from './GalleryFooter';

export default function AppLayout() {
  return (
    <>
      <Navbar />
      <main className="page-shell">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
