
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Atom, Clock, Sparkles, Microscope, Calculator, Cpu, Zap, Wand2, Church, BookMarked, Lock, FileText, Volume2, Search, BookOpenCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useOpenAI } from '@/hooks/useOpenAI';
import { shuffle } from '@/lib/utils';

const allBooks = [
  { title: 'The Elegant Universe', category: 'Physics' }, { title: 'A Brief History of Time', category: 'Physics' },
  { title: 'Sapiens: A Brief History of Humankind', category: 'History' }, { title: 'Guns, Germs, and Steel', category: 'History' },
  { title: 'The Power of Now', category: 'Spirituality' }, { title: 'Be Here Now', category: 'Spirituality' },
  { title: 'The Selfish Gene', category: 'Science' }, { title: 'Cosmos', category: 'Science' },
  { title: 'Gödel, Escher, Bach', category: 'Mathematics' }, { title: 'Fermat\'s Enigma', category: 'Mathematics' },
  { title: 'The Innovators', category: 'Technology' }, { title: 'Clean Code', category: 'Technology' },
  { title: 'The Prize: The Epic Quest for Oil, Money, and Power', category: 'Energy' }, { title: 'Energy and Civilization: A History', category: 'Energy' },
  { title: 'Harry Potter and the Sorcerer\'s Stone', category: 'Spells & Magic' }, { title: 'Jonathan Strange & Mr Norrell', category: 'Spells & Magic' },
  { title: 'The Case for Christ', category: 'Religion' }, { title: 'Mere Christianity', category: 'Religion' },
  { title: 'How to Win Friends and Influence People', category: 'General' }, { title: 'Thinking, Fast and Slow', category: 'General' }
];

const categoryDetails = {
  'Physics': { icon: Atom, color: 'from-blue-500 to-cyan-500' }, 'History': { icon: Clock, color: 'from-amber-500 to-orange-500' },
  'Spirituality': { icon: Sparkles, color: 'from-purple-500 to-pink-500' }, 'Science': { icon: Microscope, color: 'from-green-500 to-emerald-500' },
  'Mathematics': { icon: Calculator, color: 'from-red-500 to-rose-500' }, 'Technology': { icon: Cpu, color: 'from-indigo-500 to-blue-500' },
  'Energy': { icon: Zap, color: 'from-yellow-500 to-amber-500' }, 'Spells & Magic': { icon: Wand2, color: 'from-violet-500 to-purple-500' },
  'Religion': { icon: Church, color: 'from-teal-500 to-cyan-500' }, 'General': { icon: BookMarked, color: 'from-pink-500 to-rose-500' }
};
const categories = ['All', ...Object.keys(categoryDetails)];

const Library = ({ initialCategory = 'All' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [summaryModalOpen, setSummaryModalOpen] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);
  const { summary, isGeneratingSummary, generateSummary, ttsAudio, isGeneratingTts, generateTts, resetOpenAI } = useOpenAI();
  
  const filteredBooks = useMemo(() => {
    return allBooks.filter(book =>
      (selectedCategory === 'All' || book.category === selectedCategory) &&
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, selectedCategory]);
  
  const suggestedBooks = useMemo(() => {
    if (selectedCategory === 'All') return [];
    const otherBooks = allBooks.filter(book => book.category !== selectedCategory);
    return shuffle(otherBooks).slice(0, 4);
  }, [selectedCategory]);

  const handleDownload = () => setShowSubscriptionModal(true);
  const handleReadFullBook = () => setShowSubscriptionModal(true);

  const handleReadSummary = async (book) => {
    setCurrentBook(book);
    setSummaryModalOpen(true);
    await generateSummary(book.title);
  };
  
  const handlePlayAudio = async () => {
    if (summary) await generateTts(summary);
  };

  const closeSummaryModal = () => {
    setSummaryModalOpen(false);
    setCurrentBook(null);
    resetOpenAI();
  };

  const MainIcon = selectedCategory !== 'All' ? categoryDetails[selectedCategory].icon : BookOpenCheck;

  return (
    <section className="pt-32 pb-20 px-4">
      <div className="container mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <MainIcon className="w-20 h-20 text-purple-400 mx-auto mb-4" />
            <h1 className="text-5xl md:text-6xl font-bold mb-4 gradient-text">
                {selectedCategory === 'All' ? 'Full Library' : `Books in ${selectedCategory}`}
            </h1>
            <p className="text-xl text-purple-200">Search and discover your next great read.</p>
        </motion.div>

        <div className="mb-12 flex flex-col md:flex-row gap-4 items-center glass-effect p-4 rounded-xl">
          <div className="relative w-full md:flex-1">
            <Input type="text" placeholder="Search by book title..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="bg-white/5 border-purple-400/30 text-white placeholder:text-purple-300/50 pl-10" />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-300/50" />
          </div>
          <Select onValueChange={setSelectedCategory} value={selectedCategory}>
            <SelectTrigger className="w-full md:w-[200px] bg-white/5 border-purple-400/30 text-white"><SelectValue /></SelectTrigger>
            <SelectContent className="glass-effect border-purple-400/30 text-white">
              {categories.map(cat => <SelectItem key={cat} value={cat} className="cursor-pointer hover:bg-white/10">{cat}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map((book, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} whileHover={{ scale: 1.05, y: -5 }} className="glass-effect rounded-2xl p-6 shadow-2xl group flex flex-col justify-between">
              <div>
                <img alt={`Book cover for ${book.title}`} className="rounded-lg mb-4 aspect-[2/3] object-cover w-full" src="https://images.unsplash.com/photo-1692984501845-a344a7fe38a8" />
                <h4 className="text-xl font-bold mb-2 text-white">{book.title}</h4>
                <p className="text-sm text-purple-300">{book.category}</p>
              </div>
              <div className="space-y-2 mt-4">
                <Button onClick={() => handleReadSummary(book)} variant="outline" className="w-full border-purple-400 text-purple-300 hover:bg-purple-500/20">Read Summary <Sparkles className="w-4 h-4 ml-2" /></Button>
                <Button onClick={handleDownload} className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"><Lock className="w-4 h-4 mr-2" />Download</Button>
              </div>
            </motion.div>
          ))}
        </div>
        {filteredBooks.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 glass-effect rounded-2xl">
                <p className="text-2xl text-purple-200">No books found matching your criteria.</p>
                <p className="text-purple-300 mt-2">Try a different search or category!</p>
            </motion.div>
        )}

        {selectedCategory !== 'All' && suggestedBooks.length > 0 && (
            <div className="mt-20">
                <h3 className="text-3xl font-bold text-white mb-8 text-center">You Might Also Like</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {suggestedBooks.map((book, index) => (
                         <motion.div key={index} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} whileHover={{ scale: 1.05, y: -5 }} className="glass-effect rounded-2xl p-6 shadow-2xl group flex flex-col justify-between">
                            <div>
                                <img alt={`Book cover for ${book.title}`} className="rounded-lg mb-4 aspect-[2/3] object-cover w-full" src="https://images.unsplash.com/photo-1692984501845-a344a7fe38a8" />
                                <h4 className="text-xl font-bold mb-2 text-white">{book.title}</h4>
                                <p className="text-sm text-purple-300">{book.category}</p>
                            </div>
                         </motion.div>
                    ))}
                </div>
            </div>
        )}

      </div>
      
      <AlertDialog open={showSubscriptionModal} onOpenChange={setShowSubscriptionModal}>
        <AlertDialogContent className="glass-effect border-purple-400/30 text-white">
          <AlertDialogHeader><AlertDialogTitle className="gradient-text text-2xl">Subscription Required</AlertDialogTitle><AlertDialogDescription className="text-purple-200">To access this feature, you need to be a subscriber. Unlock unlimited access and support our library by subscribing today!</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter><AlertDialogAction className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white w-full">Got it!</AlertDialogAction></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      <Dialog open={summaryModalOpen} onOpenChange={closeSummaryModal}>
        <DialogContent className="glass-effect border-purple-400/30 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="gradient-text text-2xl flex items-center gap-2"><FileText />Summary for {currentBook?.title}</DialogTitle>
            <DialogDescription as="div" className="text-purple-200 mt-4 max-h-[50vh] overflow-y-auto pr-4">
              {isGeneratingSummary ? (
                <div className="flex items-center justify-center py-10"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400"></div><p className="ml-4">Generating summary with AI...</p></div>
              ) : (<p>{summary}</p>)}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-between items-center gap-2">
            <Button onClick={handleReadFullBook} className="bg-blue-500 hover:bg-blue-600 text-white"><BookOpenCheck className="w-4 h-4 mr-2" /> Read Full Book</Button>
            <div className="flex items-center gap-2">
              <Button onClick={handlePlayAudio} disabled={!summary || isGeneratingTts} className="bg-green-500 hover:bg-green-600 text-white">{isGeneratingTts ? 'Generating...' : 'Play Audio'} <Volume2 className="w-4 h-4 ml-2" /></Button>
              {ttsAudio && <audio src={ttsAudio} autoPlay />}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Library;
