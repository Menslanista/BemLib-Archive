
import React, { useState } from 'react';
    import { motion } from 'framer-motion';
    import { BookOpen, Menu, X, ChevronDown, Shield, Mail, BookPlus } from 'lucide-react';
    import { Button } from '@/components/ui/button';

    const Header = ({ currentPage, setCurrentPage, navigateToLibrary }) => {
      const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
      const [categoriesOpen, setCategoriesOpen] = useState(false);

      const categories = [
        'Physics', 'History', 'Spirituality', 'Science', 'Mathematics', 'Technology',
        'Energy', 'Spells & Magic', 'Religion', 'General'
      ];

      const handleNavClick = (page) => {
        setCurrentPage(page);
        setMobileMenuOpen(false);
        setCategoriesOpen(false);
      };
      
      const handleCategoryClick = (category) => {
        navigateToLibrary(category);
        setMobileMenuOpen(false);
        setCategoriesOpen(false);
      };

      return (
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="fixed top-0 left-0 right-0 z-50 glass-effect shadow-2xl"
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => handleNavClick('home')}
              >
                <BookOpen className="w-8 h-8 text-purple-400" />
                <span className="text-2xl font-bold gradient-text">BemLib Archive</span>
              </motion.div>

              <nav className="hidden md:flex items-center gap-4">
                <Button variant="ghost" onClick={() => handleNavClick('home')} className="text-white hover:text-purple-300 transition-colors">Home</Button>

                <div className="relative">
                  <Button variant="ghost" onClick={() => setCategoriesOpen(!categoriesOpen)} className="text-white hover:text-purple-300 transition-colors flex items-center gap-1">
                    Categories
                    <ChevronDown className={`w-4 h-4 transition-transform ${categoriesOpen ? 'rotate-180' : ''}`} />
                  </Button>
                  {categoriesOpen && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} onMouseLeave={() => setCategoriesOpen(false)} className="absolute top-full mt-2 glass-effect rounded-lg shadow-2xl p-2 min-w-[200px]">
                      {categories.map((category) => (
                        <button key={category} className="block w-full text-left px-4 py-2 rounded hover:bg-white/10 transition-colors text-white" onClick={() => handleCategoryClick(category)}>
                          {category}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </div>

                <Button variant="ghost" onClick={() => handleNavClick('contact')} className="text-white hover:text-purple-300 transition-colors flex items-center gap-2"><Mail className="w-4 h-4" />Contact</Button>
                <Button variant="ghost" onClick={() => handleNavClick('request-book')} className="text-white hover:text-purple-300 transition-colors flex items-center gap-2"><BookPlus className="w-4 h-4" />Request Book</Button>
                <Button variant="ghost" onClick={() => handleNavClick('donation')} className="text-white hover:text-purple-300 transition-colors">Donate</Button>
                <Button variant="outline" onClick={() => handleNavClick('admin')} className="border-purple-400 text-purple-300 hover:bg-purple-500/20 hover:text-white"><Shield className="w-4 h-4 mr-2" />Admin</Button>
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">Subscribe</Button>
              </nav>

              <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {mobileMenuOpen && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="md:hidden mt-4 space-y-2">
                <Button variant="ghost" onClick={() => handleNavClick('home')} className="w-full text-white justify-start hover:text-purple-300">Home</Button>
                <div className="space-y-1">
                  <Button variant="ghost" onClick={() => setCategoriesOpen(!categoriesOpen)} className="w-full text-white hover:text-purple-300 flex items-center justify-between">Categories<ChevronDown className={`w-4 h-4 transition-transform ${categoriesOpen ? 'rotate-180' : ''}`} /></Button>
                  {categoriesOpen && (
                    <div className="pl-4 space-y-1">
                      {categories.map((category) => (
                        <button key={category} className="block w-full text-left px-4 py-2 rounded hover:bg-white/10 transition-colors text-white text-sm" onClick={() => handleCategoryClick(category)}>
                          {category}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <Button variant="ghost" onClick={() => handleNavClick('contact')} className="w-full text-white justify-start hover:text-purple-300 flex items-center gap-2"><Mail className="w-4 h-4" />Contact Us</Button>
                <Button variant="ghost" onClick={() => handleNavClick('request-book')} className="w-full text-white justify-start hover:text-purple-300 flex items-center gap-2"><BookPlus className="w-4 h-4" />Request a Book</Button>
                <Button variant="ghost" onClick={() => handleNavClick('donation')} className="w-full text-white justify-start hover:text-purple-300">Donate</Button>
                <Button variant="ghost" onClick={() => handleNavClick('admin')} className="w-full text-white justify-start hover:text-purple-300"><Shield className="w-4 h-4 mr-2" />Admin Panel</Button>
                <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">Subscribe</Button>
              </motion.div>
            )}
          </div>
        </motion.header>
      );
    };

    export default Header;
