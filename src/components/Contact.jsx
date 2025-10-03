
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://formsubmit.co/ajax/your-email@example.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ ...formData, _subject: `BemLib Archive Contact: ${formData.subject}` })
      });
      if (response.ok) {
        toast({ title: "✅ Message Sent!", description: "We'll get back to you soon!" });
        setFormData({ name: '', email: '', subject: '', message: '' });
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
          <h1 className="text-5xl md:text-6xl font-bold mb-4 gradient-text">Get In Touch</h1>
          <p className="text-xl text-purple-200">We'd love to hear from you!</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-effect rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-purple-200">Name</label>
              <Input required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Your name" className="bg-white/5 border-purple-400/30 text-white placeholder:text-purple-300/50" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-purple-200">Email</label>
              <Input required type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="your@email.com" className="bg-white/5 border-purple-400/30 text-white placeholder:text-purple-300/50" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-purple-200">Subject</label>
              <Input required value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} placeholder="What's this about?" className="bg-white/5 border-purple-400/30 text-white placeholder:text-purple-300/50" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-purple-200">Message</label>
              <Textarea required value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Tell us what's on your mind..." rows={5} className="bg-white/5 border-purple-400/30 text-white placeholder:text-purple-300/50" />
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"><Send className="w-4 h-4 mr-2" />Send Message</Button>
          </form>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-12 glass-effect rounded-2xl p-8 text-center shadow-2xl">
          <Mail className="w-12 h-12 text-purple-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">Direct Email</h3>
          <p className="text-purple-200 mb-4">Prefer to email us directly? Reach out anytime!</p>
          <a href="mailto:contact@bemlib.com" className="text-purple-300 hover:text-purple-200 underline text-lg">contact@bemlib.com</a>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
