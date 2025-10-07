import React from 'react';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full mt-auto pt-6 flex justify-center items-center">
            <p className="text-sm text-[#7A7A7A]">
                &copy; {currentYear} Arendu Chanda. All Rights Reserved.
            </p>
        </footer>
    );
};

export default Footer;