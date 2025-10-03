
import React, { useState } from 'react';
    import { motion } from 'framer-motion';
    import { KeyRound, ShieldCheck, Upload, BookPlus, Sparkles } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Textarea } from '@/components/ui/textarea';
    import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
    import { toast } from '@/components/ui/use-toast';
    import { useOpenAI } from '@/hooks/useOpenAI';
    import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

    const AdminPanel = () => {
      const [isAuthenticated, setIsAuthenticated] = useState(false);
      const [password, setPassword] = useState('');
      const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(true);

      const [bookTitle, setBookTitle] = useState('');
      const [bookCategory, setBookCategory] = useState('');
      const [coverDescription, setCoverDescription] = useState('');

      const { coverImageUrl, isGeneratingCover, generateCover, setCoverImageUrl } = useOpenAI();
      
      const categories = [
        'Physics', 'History', 'Spirituality', 'Science', 'Mathematics', 'Technology',
        'Energy', 'Spells & Magic', 'Religion', 'General'
      ];

      const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (password === 'admin123') {
          setIsAuthenticated(true);
          setIsPasswordModalOpen(false);
          toast({ title: "✅ Access Granted", description: "Welcome to the Admin Panel." });
        } else {
          toast({ title: "❌ Access Denied", description: "Incorrect password.", variant: "destructive" });
        }
        setPassword('');
      };

      const handleBookUpload = (e) => {
        e.preventDefault();
        toast({
          title: "🚧 Feature in Progress",
          description: `Book "${bookTitle}" for category "${bookCategory}" upload initiated! (This is a mock-up)`,
        });
        setBookTitle('');
        setBookCategory('');
        setCoverDescription('');
        setCoverImageUrl('');
      };

      if (!isAuthenticated) {
        return (
          <Dialog open={isPasswordModalOpen} onOpenChange={setIsPasswordModalOpen}>
            <DialogContent className="glass-effect border-purple-400/30 text-white">
              <DialogHeader>
                <DialogTitle className="gradient-text text-2xl flex items-center gap-2">
                  <KeyRound /> Admin Access Required
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handlePasswordSubmit} className="space-y-4 pt-4">
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="bg-white/5 border-purple-400/30 text-white placeholder:text-purple-300/50"
                />
                <Button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                  Unlock
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        );
      }

      return (
        <section className="pt-32 pb-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <ShieldCheck className="w-20 h-20 text-green-400 mx-auto mb-4" />
              <h1 className="text-5xl md:text-6xl font-bold mb-4 gradient-text">Admin Panel</h1>
              <p className="text-xl text-purple-200">Manage your library's collection.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-effect rounded-2xl p-8 shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <BookPlus className="w-8 h-8 text-purple-400" />
                <h2 className="text-3xl font-bold">Upload a New Book</h2>
              </div>

              <form onSubmit={handleBookUpload} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-purple-200">Book Title</label>
                  <Input required value={bookTitle} onChange={(e) => setBookTitle(e.target.value)} placeholder="e.g., The Midnight Library" className="bg-white/5 border-purple-400/30 text-white placeholder:text-purple-300/50" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-purple-200">Category</label>
                   <Select required onValueChange={setBookCategory} value={bookCategory}>
                      <SelectTrigger className="w-full bg-white/5 border-purple-400/30 text-white">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent className="glass-effect border-purple-400/30 text-white">
                        {categories.map(cat => (
                          <SelectItem key={cat} value={cat} className="cursor-pointer hover:bg-white/10">{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-purple-200">AI Book Cover Description</label>
                  <Textarea value={coverDescription} onChange={(e) => setCoverDescription(e.target.value)} placeholder="Describe the cover... e.g., 'A mystical clock floating in a galaxy, glowing with ethereal light.'" rows={3} className="bg-white/5 border-purple-400/30 text-white placeholder:text-purple-300/50" />
                  <Button type="button" onClick={() => generateCover(coverDescription)} disabled={isGeneratingCover || !coverDescription} className="mt-2 w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white">
                    {isGeneratingCover ? 'Generating...' : 'Generate Cover'} <Sparkles className="w-4 h-4 ml-2" />
                  </Button>
                </div>
                
                {(isGeneratingCover || coverImageUrl) && (
                  <div className="text-center p-4 glass-effect rounded-lg">
                    {isGeneratingCover ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400"></div>
                        <p className="ml-4">Generating AI cover...</p>
                      </div>
                    ) : coverImageUrl ? (
                      <img src={coverImageUrl} alt="AI Generated Book Cover" className="rounded-lg mx-auto max-h-64" />
                    ) : null}
                  </div>
                )}

                <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-lg py-6 shadow-2xl">
                  <Upload className="w-5 h-5 mr-2" />
                  Upload Book
                </Button>
              </form>
            </motion.div>
          </div>
        </section>
      );
    };

    export default AdminPanel;
