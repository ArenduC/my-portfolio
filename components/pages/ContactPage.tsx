import React, { useState } from 'react';
// FIX: Import the Transition type from framer-motion.
import { motion, type Transition } from 'framer-motion';

const FormInput = ({ label, name, type = 'text', value, onChange, error }) => (
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
                rows={4}
                className={`w-full bg-[#3c3c39]/60 border ${error ? 'border-red-500/50' : 'border-gray-700/50'} rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-[#F1D500]/50 transition-shadow`}
            />
        ) : (
            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                className={`w-full bg-[#3c3c39]/60 border ${error ? 'border-red-500/50' : 'border-gray-700/50'} rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-[#F1D500]/50 transition-shadow`}
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

// FIX: Explicitly type pageTransition to fix TypeScript error where the 'type' property was being widened to 'string'.
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

    // FIX: Provide a specific type for the errors state object to prevent TypeScript errors on property access.
    const [errors, setErrors] = useState<Record<string, string | null>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error for a field once user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };
    
    const validate = () => {
        // FIX: Provide a specific type for the newErrors object.
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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);
        
        if (Object.keys(validationErrors).length === 0) {
            console.log("Form Submitted Successfully:", formData);
            setIsSubmitted(true);
            // Here you would typically send the data to a server
            // For now, we'll just log it and show a success message.
            setFormData({ name: '', email: '', subject: '', message: '' }); // Reset form
            setTimeout(() => setIsSubmitted(false), 5000); // Hide message after 5s
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
                    Have a question or want to work together? Leave your details and I'll get back to you as soon as possible.
                </p>
                
                {isSubmitted ? (
                    <div className="bg-green-500/20 backdrop-blur-sm border border-green-500/50 text-green-300 rounded-lg p-8 md:p-10">
                        Thank you for your message! I'll be in touch shortly.
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} noValidate className="bg-[#3c3c39]/60 backdrop-blur-sm border border-gray-700/50 rounded-lg p-8 md:p-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormInput label="Name" name="name" value={formData.name} onChange={handleChange} error={errors.name} />
                            <FormInput label="Email" name="email" type="email" value={formData.email} onChange={handleChange} error={errors.name} />
                        </div>
                        <FormInput label="Subject" name="subject" value={formData.subject} onChange={handleChange} error={errors.subject} />
                        <FormInput label="Message" name="message" type="textarea" value={formData.message} onChange={handleChange} error={errors.message} />

                        <button
                            type="submit"
                            className="w-full bg-[#F1D500] text-gray-900 font-bold px-8 py-3 rounded-md transition-transform hover:scale-105"
                        >
                            Send Message
                        </button>
                    </form>
                )}
            </div>
        </motion.div>
    );
};