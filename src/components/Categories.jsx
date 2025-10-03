
import React, { useState } from 'react';
    import { motion } from 'framer-motion';
    import { Atom, Clock, Sparkles, Microscope, Calculator, Cpu, Zap, Wand2, Church, BookMarked, Lock, FileText, Volume2, BookOpenCheck } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
    import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
    import { useOpenAI } from '@/hooks/useOpenAI';

    const categoriesData = [
      { name: 'Physics', icon: Atom, color: 'from-blue-500 to-cyan-500', books: [{ title: 'The Elegant Universe' }, { title: 'A Brief History of Time' }] },
      { name: 'History', icon: Clock, color: 'from-amber-500 to-orange-500', books: [{ title: 'Sapiens: A Brief History of Humankind' }] },
      { name: 'Spirituality', icon: Sparkles, color: 'from-purple-500 to-pink-500', books: [{ title: 'The Power of Now' }] },
      { name: 'Science', icon: Microscope, color: 'from-green-500 to-emerald-500', books: [{ title: 'The Selfish Gene' }] },
    ];

    const Categories = ({ navigateToLibrary }) => {
      const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
      const [summaryModalOpen, setSummaryModalOpen] = useState(false);
      const [currentBook, setCurrentBook] = useState(null);
      const { summary, isGeneratingSummary, generateSummary, ttsAudio, isGeneratingTts, generateTts, resetOpenAI } = useOpenAI();
      
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
      
      return (
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Most Read Books</h2>
              <p className="text-xl text-purple-200">Handpicked selections, loved by our community</p>
            </motion.div>

            <div className="space-y-16">
              {categoriesData.map((category) => {
                const Icon = category.icon;
                return (
                  <div key={category.name}>
                    <div className="flex items-center gap-4 mb-6">
                       <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                          <Icon className="w-7 h-7 text-white" />
                       </div>
                       <h3 className="text-3xl font-bold text-white">{category.name}</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {category.books.map((book, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.05, y: -5 }}
                          className="glass-effect rounded-2xl p-6 shadow-2xl group flex flex-col justify-between"
                        >
                          <div>
                            <img alt={`Book cover for ${book.title}`} className="rounded-lg mb-4 aspect-[2/3] object-cover w-full" src="https://images.unsplash.com/photo-1692984501845-a344a7fe38a8" />
                            <h4 className="text-xl font-bold mb-2 text-white">{book.title}</h4>
                          </div>
                          <div className="space-y-2 mt-4">
                            <Button onClick={() => handleReadSummary(book)} variant="outline" className="w-full border-purple-400 text-purple-300 hover:bg-purple-500/20">Read Summary <Sparkles className="w-4 h-4 ml-2" /></Button>
                            <Button onClick={handleDownload} className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"><Lock className="w-4 h-4 mr-2" />Download</Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                     <div className="text-center mt-8">
                        <Button onClick={() => navigateToLibrary(category.name)} size="lg" variant="outline" className="border-purple-400 text-purple-300 hover:bg-purple-500/20">Load More in {category.name}</Button>
                    </div>
                  </div>
                );
              })}
            </div>
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

    export default Categories;
