
import React, { useState } from 'react';
    import { Helmet } from 'react-helmet';
    import Header from '@/components/Header';
    import Hero from '@/components/Hero';
    import Categories from '@/components/Categories';
    import Contact from '@/components/Contact';
    import RequestBook from '@/components/RequestBook';
    import Donation from '@/components/Donation';
    import Footer from '@/components/Footer';
    import AdminPanel from '@/components/AdminPanel';
    import Library from '@/components/Library';
    import { Toaster } from '@/components/ui/toaster';

    function App() {
      const [currentPage, setCurrentPage] = useState('home');
      const [libraryCategory, setLibraryCategory] = useState('All');

      const navigateToLibrary = (category) => {
        setLibraryCategory(category);
        setCurrentPage('library');
      };

      const renderPage = () => {
        switch(currentPage) {
          case 'home':
            return (
              <>
                <Hero setCurrentPage={setCurrentPage} />
                <Categories navigateToLibrary={navigateToLibrary} />
              </>
            );
          case 'contact':
            return <Contact />;
          case 'request-book':
            return <RequestBook />;
          case 'donation':
            return <Donation />;
          case 'admin':
            return <AdminPanel />;
          case 'library':
            return <Library initialCategory={libraryCategory} />;
          default:
            return (
              <>
                <Hero setCurrentPage={setCurrentPage} />
                <Categories navigateToLibrary={navigateToLibrary} />
              </>
            );
        }
      };

      return (
        <>
          <Helmet>
            <title>BemLib Archive - Your Digital Library</title>
            <meta name="description" content="Discover thousands of books across Physics, History, Spirituality, Science, Mathematics, Technology, Energy, Spells & Magic, Religion and more. Join our freemium library today!" />
          </Helmet>
          <div className="min-h-screen">
            <Header currentPage={currentPage} setCurrentPage={setCurrentPage} navigateToLibrary={navigateToLibrary} />
            {renderPage()}
            <Footer setCurrentPage={setCurrentPage} />
            <Toaster />
          </div>
        </>
      );
    }

    export default App;
