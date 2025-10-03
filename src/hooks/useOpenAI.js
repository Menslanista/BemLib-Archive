
import React, { useState, useEffect, useRef } from 'react';
import OpenAI from 'openai';
import { toast } from '@/components/ui/use-toast';

export const useOpenAI = () => {
    const openai = useRef(null);
    const [isApiKeyValid, setIsApiKeyValid] = useState(false);

    const [summary, setSummary] = useState('');
    const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);

    const [coverImageUrl, setCoverImageUrl] = useState('');
    const [isGeneratingCover, setIsGeneratingCover] = useState(false);

    const [ttsAudio, setTtsAudio] = useState(null);
    const [isGeneratingTts, setIsGeneratingTts] = useState(false);

    useEffect(() => {
        const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
        if (apiKey) {
            openai.current = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });
            setIsApiKeyValid(true);
        } else {
            toast({
                title: "✨ OpenAI API Key Needed",
                description: "Please create a .env file and add your VITE_OPENAI_API_KEY.",
                duration: 5000,
            });
            setIsApiKeyValid(false);
        }
    }, []);

    const generateSummary = async (bookTitle) => {
        if (!isApiKeyValid) {
            toast({ title: "API Key Missing", description: "OpenAI API key is not configured." });
            return;
        }
        setIsGeneratingSummary(true);
        setSummary('');
        try {
            const completion = await openai.current.chat.completions.create({
                messages: [{ role: 'system', content: `Provide a concise, one-paragraph summary for the book "${bookTitle}".` }],
                model: 'gpt-3.5-turbo',
            });
            setSummary(completion.choices[0].message.content);
        } catch (error) {
            console.error("Error generating summary:", error);
            toast({ title: "Error", description: "Could not generate summary." });
            setSummary("Failed to generate summary. Please try again.");
        } finally {
            setIsGeneratingSummary(false);
        }
    };

    const generateCover = async (description) => {
        if (!isApiKeyValid) {
             toast({ title: "API Key Missing", description: "OpenAI API key is not configured." });
            return;
        }
        setIsGeneratingCover(true);
        setCoverImageUrl('');
        try {
            const response = await openai.current.images.generate({
                model: "dall-e-3",
                prompt: description,
                n: 1,
                size: "1024x1024",
            });
            setCoverImageUrl(response.data[0].url);
        } catch (error) {
            console.error("Error generating cover:", error);
            toast({ title: "Error", description: "Could not generate book cover." });
        } finally {
            setIsGeneratingCover(false);
        }
    };

    const generateTts = async (text) => {
        if (!isApiKeyValid) {
            toast({ title: "API Key Missing", description: "OpenAI API key is not configured." });
            return;
        }
        setIsGeneratingTts(true);
        setTtsAudio(null);
        try {
            const mp3 = await openai.current.audio.speech.create({
                model: "tts-1",
                voice: "alloy",
                input: text,
            });
            const blob = new Blob([await mp3.arrayBuffer()], { type: "audio/mpeg" });
            const url = URL.createObjectURL(blob);
            setTtsAudio(url);
        } catch (error) {
            console.error("Error generating TTS:", error);
            toast({ title: "Error", description: "Could not generate audio." });
        } finally {
            setIsGeneratingTts(false);
        }
    };

    const resetOpenAI = () => {
        setSummary('');
        setIsGeneratingSummary(false);
        setTtsAudio(null);
        setIsGeneratingTts(false);
    };

    return { 
        isApiKeyValid,
        summary, isGeneratingSummary, generateSummary,
        coverImageUrl, isGeneratingCover, generateCover, setCoverImageUrl,
        ttsAudio, isGeneratingTts, generateTts,
        resetOpenAI,
    };
};
  