
import React from 'react';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full mt-auto pt-6 flex flex-col items-center gap-2 border-t border-white/5">
            <p className="text-sm text-[#7A7A7A] text-center">
                &copy; {currentYear} Arendu Chanda. All Rights Reserved.
            </p>
            <div className="flex items-center justify-center">
                <p className="text-xs text-[#333] font-mono tracking-widest uppercase opacity-50">Build v1.4.0</p>
            </div>
        </footer>
    );
};

export default Footer;
