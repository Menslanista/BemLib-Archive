
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';

const RequestBook = () => {
  const [requestData, setRequestData] = useState({ name: '', email: '', bookTitle: '', author: '', details: '' });

  const handleBookRequest = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://formsubmit.co/ajax/your-email@example.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ ...requestData, _subject: `Book Request: ${requestData.bookTitle}` })
      });
      if (response.ok) {
        toast({ title: "📚 Request Submitted!", description: "We'll review it and add the book soon!" });
        setRequestData({ name: '', email: '', bookTitle: '', author: '', details: '' });
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      toast({
        title: "🚧 Feature Not Configured",
        description: "To enable emails, replace 'your-email@example.com' in the code.",
        variant: "destructive"
      });
    }
  };

  return (
    <section className="pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 gradient-text">Request a Book</h1>
          <p className="text-xl text-purple-200">Can't find a book? Let us know!</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-effect rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleBookRequest} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-purple-200">Your Name</label>
              <Input required value={requestData.name} onChange={(e) => setRequestData({ ...requestData, name: e.target.value })} placeholder="Your name" className="bg-white/5 border-purple-400/30 text-white placeholder:text-purple-300/50" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-purple-200">Your Email</label>
              <Input required type="email" value={requestData.email} onChange={(e) => setRequestData({ ...requestData, email: e.target.value })} placeholder="your@email.com" className="bg-white/5 border-purple-400/30 text-white placeholder:text-purple-300/50" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-purple-200">Book Title</label>
              <Input required value={requestData.bookTitle} onChange={(e) => setRequestData({ ...requestData, bookTitle: e.target.value })} placeholder="The book you're looking for" className="bg-white/5 border-purple-400/30 text-white placeholder:text-purple-300/50" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-purple-200">Author (Optional)</label>
              <Input value={requestData.author} onChange={(e) => setRequestData({ ...requestData, author: e.target.value })} placeholder="Author name" className="bg-white/5 border-purple-400/30 text-white placeholder:text-purple-300/50" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-purple-200">Additional Details</label>
              <Textarea value={requestData.details} onChange={(e) => setRequestData({ ...requestData, details: e.target.value })} placeholder="Any extra info, like ISBN, publisher, etc." rows={3} className="bg-white/5 border-purple-400/30 text-white placeholder:text-purple-300/50" />
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"><BookPlus className="w-4 h-4 mr-2" />Submit Request</Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default RequestBook;
