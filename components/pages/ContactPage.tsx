
import React, { useState } from 'react';
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
    const [sendStage, setSendStage] = useState<'idle' | 'sending' | 'encrypting' | 'routing' | 'error'>('idle');
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
            const dataToTransmit = { ...formData };
            
            try {
                // Visual progression for branding
                await new Promise(resolve => setTimeout(resolve, 600));
                setSendStage('encrypting');
                
                const response = await fetch('https://portfolio-backend-vercel-six.vercel.app/v1/insert_portfolio_mail_inbox', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dataToTransmit),
                });

                const result = await response.json();

                if (!response.ok || !result.isSuccess) {
                    throw new Error(result.message || 'Failed to send message');
                }

                setSendStage('routing');
                await new Promise(resolve => setTimeout(resolve, 800));
                
                setSentData(dataToTransmit);
                setIsSubmitted(true);
                setSendStage('idle');
                setFormData({ name: '', email: '', subject: '', message: '' });
            } catch (err) {
                console.error("Submission error:", err);
                setSendStage('error');
                setTimeout(() => setSendStage('idle'), 3000);
                setErrors({ general: "Unable to transmit message via Vercel. Please check your connection or contact Arendu directly." });
            }
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
            case 'encrypting': return 'Processing Payload...';
            case 'routing': return 'Routing to Vercel...';
            case 'error': return 'Transmission Failed';
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
                            
                            <h3 className="text-3xl font-bold mb-4">Message Transmitted</h3>
                            <p className="text-gray-400 mb-8 max-w-md mx-auto">
                                Data successfully inserted into the portfolio inbox.
                            </p>

                            <button 
                                onClick={() => setIsSubmitted(false)}
                                className="inline-flex items-center gap-2 text-[#F1D500] hover:text-white transition-colors text-sm font-bold uppercase tracking-wider"
                            >
                                Send another message
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
                                <FormInput label="Name" name="name" value={formData.name} onChange={handleChange} error={errors.name} disabled={sendStage !== 'idle' && sendStage !== 'error'} />
                                <FormInput label="Email" name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} disabled={sendStage !== 'idle' && sendStage !== 'error'} />
                            </div>
                            <FormInput label="Subject" name="subject" value={formData.subject} onChange={handleChange} error={errors.subject} disabled={sendStage !== 'idle' && sendStage !== 'error'} />
                            <FormInput label="Message" name="message" type="textarea" value={formData.message} onChange={handleChange} error={errors.message} disabled={sendStage !== 'idle' && sendStage !== 'error'} />

                            {errors.general && <p className="text-red-500 text-sm mb-4 font-medium">{errors.general}</p>}

                            <div className="mt-4">
                                <button
                                    type="submit"
                                    disabled={sendStage !== 'idle' && sendStage !== 'error'}
                                    className={`w-full relative overflow-hidden ${sendStage === 'error' ? 'bg-red-500' : 'bg-[#F1D500]'} disabled:bg-[#F1D500]/50 text-gray-900 font-bold px-8 py-4 rounded-xl transition-all hover:shadow-[0_0_20px_rgba(241,213,0,0.3)] active:scale-95 flex items-center justify-center gap-3 group`}
                                >
                                    {sendStage !== 'idle' && sendStage !== 'error' ? (
                                        <div className="flex flex-col items-center">
                                            <div className="flex items-center gap-3 mb-1">
                                                <svg className="animate-spin h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                <span className="text-sm font-black uppercase tracking-widest">{getButtonText()}</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <span className="uppercase tracking-widest">{getButtonText()}</span>
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

           
            </div>
        </motion.div>
    );
};
