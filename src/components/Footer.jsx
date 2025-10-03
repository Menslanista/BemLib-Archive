
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Mail, Heart, Github, Twitter, Facebook } from 'lucide-react';

const Footer = ({ setCurrentPage }) => {
  return (
    <footer className="glass-effect mt-20 py-12 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-6 h-6 text-purple-400" />
              <span className="text-xl font-bold gradient-text">BemLib Archive</span>
            </div>
            <p className="text-purple-200 text-sm">
              Your gateway to unlimited knowledge and imagination.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-purple-200">
              <li><button onClick={() => setCurrentPage('home')} className="hover:text-purple-300 transition-colors">Home</button></li>
              <li><button onClick={() => setCurrentPage('contact')} className="hover:text-purple-300 transition-colors">Contact</button></li>
              <li><button onClick={() => setCurrentPage('request-book')} className="hover:text-purple-300 transition-colors">Request a Book</button></li>
              <li><button onClick={() => setCurrentPage('donation')} className="hover:text-purple-300 transition-colors">Donate</button></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Categories</h3>
            <ul className="space-y-2 text-purple-200 text-sm">
              <li>Physics & Science</li>
              <li>History & Religion</li>
              <li>Technology & Math</li>
              <li>Spirituality & Magic</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Connect</h3>
            <div className="flex gap-4 mb-4">
              <motion.a whileHover={{ scale: 1.1 }} href="#" className="w-10 h-10 rounded-full glass-effect flex items-center justify-center hover:bg-white/20 transition-colors"><Twitter className="w-5 h-5 text-purple-300" /></motion.a>
              <motion.a whileHover={{ scale: 1.1 }} href="#" className="w-10 h-10 rounded-full glass-effect flex items-center justify-center hover:bg-white/20 transition-colors"><Facebook className="w-5 h-5 text-purple-300" /></motion.a>
              <motion.a whileHover={{ scale: 1.1 }} href="#" className="w-10 h-10 rounded-full glass-effect flex items-center justify-center hover:bg-white/20 transition-colors"><Github className="w-5 h-5 text-purple-300" /></motion.a>
            </div>
            <a href="mailto:contact@bemlib.com" className="flex items-center gap-2 text-purple-200 hover:text-purple-300 transition-colors text-sm"><Mail className="w-4 h-4" />contact@bemlib.com</a>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-purple-200 text-sm flex items-center justify-center gap-2">
            Made with <Heart className="w-4 h-4 text-pink-400 fill-pink-400" /> by BemLib Team
          </p>
          <p className="text-purple-300 text-xs mt-2">
            © 2025 BemLib Archive. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
