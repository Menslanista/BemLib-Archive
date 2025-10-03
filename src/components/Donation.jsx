
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Coffee, Book, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const Donation = () => {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');

  const amounts = [5, 10, 25, 50, 100];

  const handleDonate = () => {
    const amount = selectedAmount || customAmount;
    if (!amount) {
      toast({
        title: "Please select an amount",
        description: "Choose a preset amount or enter a custom amount to continue.",
        duration: 3000,
      });
      return;
    }

    toast({
      title: "🚧 Payment Integration Coming Soon!",
      description: "We're setting up secure payment processing. Thank you for your generous support! 💜",
      duration: 5000,
    });
  };

  return (
    <section className="pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="inline-block mb-6"
          >
            <Heart className="w-20 h-20 text-pink-400 fill-pink-400" />
          </motion.div>

          <h1 className="text-5xl md:text-6xl font-bold mb-4 gradient-text">
            Support BookVerse
          </h1>
          <p className="text-xl text-purple-200">
            Your donations help us keep knowledge accessible to everyone
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-effect rounded-2xl p-8 md:p-12 shadow-2xl mb-8"
        >
          <div className="text-center mb-8">
            <Sparkles className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Donations are Optional</h2>
            <p className="text-lg text-purple-200 leading-relaxed">
              BookVerse is committed to providing free access to knowledge. While donations are completely optional, they help us maintain our servers, expand our collection, and keep the platform running smoothly for everyone.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="glass-effect rounded-xl p-6 text-center"
            >
              <Coffee className="w-10 h-10 text-amber-400 mx-auto mb-3" />
              <h3 className="font-bold mb-2">Buy Us Coffee</h3>
              <p className="text-sm text-purple-200">Keep our team energized</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="glass-effect rounded-xl p-6 text-center"
            >
              <Book className="w-10 h-10 text-blue-400 mx-auto mb-3" />
              <h3 className="font-bold mb-2">Add More Books</h3>
              <p className="text-sm text-purple-200">Expand our library</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="glass-effect rounded-xl p-6 text-center"
            >
              <Sparkles className="w-10 h-10 text-purple-400 mx-auto mb-3" />
              <h3 className="font-bold mb-2">Improve Platform</h3>
              <p className="text-sm text-purple-200">Better features for all</p>
            </motion.div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-lg font-semibold mb-4 text-center">
                Choose an Amount (USD)
              </label>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                {amounts.map((amount) => (
                  <motion.button
                    key={amount}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSelectedAmount(amount);
                      setCustomAmount('');
                    }}
                    className={`py-4 rounded-xl font-bold text-lg transition-all ${
                      selectedAmount === amount
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                        : 'glass-effect hover:bg-white/20'
                    }`}
                  >
                    ${amount}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="text-center">
              <span className="text-purple-200">or</span>
            </div>

            <div>
              <label className="block text-lg font-semibold mb-3 text-center">
                Custom Amount
              </label>
              <div className="relative max-w-xs mx-auto">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-purple-300">
                  $
                </span>
                <input
                  type="number"
                  min="1"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount(null);
                  }}
                  placeholder="Enter amount"
                  className="w-full pl-10 pr-4 py-4 bg-white/5 border-2 border-purple-400/30 rounded-xl text-white text-xl text-center focus:border-purple-400 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <Button
              onClick={handleDonate}
              size="lg"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-xl py-6 shadow-2xl"
            >
              <Heart className="w-5 h-5 mr-2 fill-white" />
              Donate Now
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-purple-200"
        >
          <p className="text-sm">
            💜 Every contribution, no matter how small, makes a huge difference. Thank you for supporting BookVerse!
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Donation;
  