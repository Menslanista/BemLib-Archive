
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Sparkles, Users, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = ({ setCurrentPage }) => {
  return (
    <section className="pt-32 pb-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-block mb-6"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 blur-3xl opacity-50"></div>
              <BookOpen className="w-24 h-24 text-purple-400 relative" />
            </div>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text">
            Welcome to BemLib Archive
          </h1>

          <p className="text-xl md:text-2xl text-purple-200 mb-8 leading-relaxed">
            Your gateway to unlimited knowledge and imagination. Explore thousands of books across diverse categories, from cutting-edge science to ancient wisdom.
          </p>

          <div className="glass-effect rounded-2xl p-8 mb-12 shadow-2xl">
            <h2 className="text-3xl font-bold mb-4 text-white">Our Mission</h2>
            <p className="text-lg text-purple-100 leading-relaxed">
              At BemLib Archive, we believe knowledge should be accessible to everyone. Our platform brings together a curated collection of books spanning Physics, History, Spirituality, Science, Mathematics, Technology, Energy, Spells & Magic, Religion, and General topics. Whether you're a curious learner or a dedicated scholar, we're here to fuel your intellectual journey.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="glass-effect rounded-xl p-6 shadow-xl"
            >
              <Sparkles className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Curated Collection</h3>
              <p className="text-purple-200">Handpicked books across 10+ categories</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="glass-effect rounded-xl p-6 shadow-xl"
            >
              <Users className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Community Driven</h3>
              <p className="text-purple-200">Request books and shape our library</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="glass-effect rounded-xl p-6 shadow-xl"
            >
              <Globe className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Freemium Access</h3>
              <p className="text-purple-200">Browse free, subscribe for downloads</p>
            </motion.div>
          </div>

          <Button
            size="lg"
            onClick={() => setCurrentPage('library')}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-lg px-8 py-6 shadow-2xl"
          >
            Start Exploring
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
