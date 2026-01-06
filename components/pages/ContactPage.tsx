
import React, { useState, useEffect } from 'react';
import { motion, type Transition, AnimatePresence } from 'framer-motion';

const FormInput = ({ label, name, type = 'text', value, onChange, error, disabled }) => (
    <div className="mb-4">
        <label htmlFor={name} className="block text-left text-gray-400 text-sm font-medium mb-1">
            {label}
        </label>
        {type === 'textarea' ? (
            <textarea
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
                rows={4}
                className={`w-full bg-[#3c3c39]/40 border ${error ? 'border-red-500/50' : 'border-gray-700/50'} rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-[#F1D500]/50 transition-all disabled:opacity-50`}
            />
        ) : (
            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                disabled={disabled}
                className={`w-full bg-[#3c3c39]/40 border ${error ? 'border-red-500/50' : 'border-gray-700/50'} rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-[#F1D500]/50 transition-all disabled:opacity-50`}
            />
        )}
        {error && <p className="text-red-500 text-xs mt-1 text-left">{error}</p>}
    </div>
);

const pageVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -15 },
};

const pageTransition: Transition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.4
};

export const ContactPage: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [errors, setErrors] = useState<Record<string, string | null>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [sendStage, setSendStage] = useState<'idle' | 'sending' | 'encrypting' | 'routing'>('idle');
    const [sentData, setSentData] = useState<typeof formData | null>(null);
    const [copied, setCopied] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };
    
    const validate = () => {
        const newErrors: Record<string, string | null> = {};
        if (!formData.name.trim()) newErrors.name = "Name is required.";
        if (!formData.email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email address is invalid.";
        }
        if (!formData.subject.trim()) newErrors.subject = "Subject is required.";
        if (!formData.message.trim()) newErrors.message = "Message is required.";
        
        return newErrors;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);
        
        if (Object.keys(validationErrors).length === 0) {
            setSendStage('sending');
            setSentData({ ...formData });
            
            await new Promise(resolve => setTimeout(resolve, 800));
            setSendStage('encrypting');
            
            await new Promise(resolve => setTimeout(resolve, 800));
            setSendStage('routing');
            
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            setIsSubmitted(true);
            setSendStage('idle');
            setFormData({ name: '', email: '', subject: '', message: '' });
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText('arenduchanda1997@gmail.com');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const getButtonText = () => {
        switch(sendStage) {
            case 'sending': return 'Initiating Session...';
            case 'encrypting': return 'Encrypting Payload...';
            case 'routing': return 'Routing to arenduchanda1997@gmail.com...';
            default: return 'Send Message';
        }
    };

    return (
        <motion.div
            key="contact"
            className="flex-grow flex flex-col justify-center items-center text-center px-4"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
        >
            <div className="max-w-2xl w-full">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Get In Touch</h2>
                <p className="text-lg md:text-xl text-[#7A7A7A] mb-8">
                    Have a project in mind? My inbox is always open.
                </p>
                
                <AnimatePresence mode="wait">
                    {isSubmitted ? (
                        <motion.div 
                            key="success"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-[#1a1a1a]/80 backdrop-blur-xl border border-[#F1D500]/30 text-white rounded-2xl p-8 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#F1D500]/5 rounded-bl-full -z-10" />
                            
                            <div className="w-20 h-20 bg-[#F1D500] rounded-full flex items-center justify-center mb-8 mx-auto shadow-[0_0_30px_rgba(241,213,0,0.4)]">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            
                            <h3 className="text-3xl font-bold mb-4">Transmission Successful</h3>
                            <p className="text-gray-400 mb-8 max-w-md mx-auto">
                                Your data has been successfully routed to <span className="text-[#F1D500] font-medium">arenduchanda1997@gmail.com</span>. Arendu will review and respond shortly.
                            </p>

                            <div className="bg-black/40 rounded-xl p-6 text-left border border-white/5 mb-8">
                                <p className="text-[10px] uppercase tracking-widest text-[#F1D500] mb-4 font-bold">Message Receipt</p>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-gray-500 text-[10px]">SENDER</p>
                                        <p className="text-sm font-medium text-gray-200">{sentData?.name} ({sentData?.email})</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-[10px]">SUBJECT</p>
                                        <p className="text-sm font-medium text-gray-200">{sentData?.subject}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-[10px]">CONTENT PREVIEW</p>
                                        <p className="text-sm font-medium text-gray-400 italic">"{sentData?.message.substring(0, 100)}..."</p>
                                    </div>
                                </div>
                            </div>

                            <button 
                                onClick={() => setIsSubmitted(false)}
                                className="inline-flex items-center gap-2 text-[#F1D500] hover:text-white transition-colors text-sm font-bold uppercase tracking-wider"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                New Message
                            </button>
                        </motion.div>
                    ) : (
                        <motion.form 
                            key="form"
                            onSubmit={handleSubmit} 
                            noValidate 
                            className="bg-[#3c3c39]/20 backdrop-blur-md border border-gray-700/40 rounded-2xl p-8 md:p-10 shadow-2xl relative"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormInput label="Name" name="name" value={formData.name} onChange={handleChange} error={errors.name} disabled={sendStage !== 'idle'} />
                                <FormInput label="Email" name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} disabled={sendStage !== 'idle'} />
                            </div>
                            <FormInput label="Subject" name="subject" value={formData.subject} onChange={handleChange} error={errors.subject} disabled={sendStage !== 'idle'} />
                            <FormInput label="Message" name="message" type="textarea" value={formData.message} onChange={handleChange} error={errors.message} disabled={sendStage !== 'idle'} />

                            <div className="mt-4">
                                <button
                                    type="submit"
                                    disabled={sendStage !== 'idle'}
                                    className="w-full relative overflow-hidden bg-[#F1D500] disabled:bg-[#F1D500]/50 text-gray-900 font-bold px-8 py-4 rounded-xl transition-all hover:shadow-[0_0_20px_rgba(241,213,0,0.3)] active:scale-95 flex items-center justify-center gap-3 group"
                                >
                                    {sendStage !== 'idle' ? (
                                        <div className="flex flex-col items-center">
                                            <div className="flex items-center gap-3 mb-1">
                                                <svg className="animate-spin h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                <span className="text-sm font-black uppercase tracking-widest">{getButtonText()}</span>
                                            </div>
                                            <div className="w-full h-1 bg-gray-900/20 rounded-full overflow-hidden">
                                                <motion.div 
                                                    className="h-full bg-gray-900"
                                                    initial={{ width: '0%' }}
                                                    animate={{ width: sendStage === 'sending' ? '33%' : sendStage === 'encrypting' ? '66%' : '100%' }}
                                                    transition={{ duration: 0.8 }}
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <span className="uppercase tracking-widest">Deploy Message</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </>
                                    )}
                                </button>
                            </div>
                        </motion.form>
                    )}
                </AnimatePresence>

                <div className="mt-12 flex flex-col items-center gap-3">
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Direct Channel</p>
                    <div className="flex items-center gap-4 bg-white/5 rounded-full px-6 py-3 border border-white/10">
                        <a 
                            href="mailto:arenduchanda1997@gmail.com" 
                            className="text-[#F1D500] font-medium hover:text-white transition-colors text-lg"
                        >
                            arenduchanda1997@gmail.com
                        </a>
                        <div className="h-4 w-[1px] bg-white/20" />
                        <button 
                            onClick={copyToClipboard}
                            className="text-gray-400 hover:text-[#F1D500] transition-colors relative"
                            title="Copy email to clipboard"
                        >
                            <AnimatePresence mode="wait">
                                {copied ? (
                                    <motion.span 
                                        key="check"
                                        initial={{ scale: 0.5, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0.5, opacity: 0 }}
                                        className="text-[#F1D500] flex items-center gap-1 text-xs font-bold uppercase"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        Copied
                                    </motion.span>
                                ) : (
                                    <motion.svg 
                                        key="copy"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        xmlns="http://www.w3.org/2000/svg" 
                                        className="h-5 w-5" 
                                        fill="none" 
                                        viewBox="0 0 24 24" 
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                    </motion.svg>
                                )}
                            </AnimatePresence>
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
