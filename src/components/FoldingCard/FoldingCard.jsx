import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FoldingCard = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCard = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mb-4">
      <div 
        className="bg-gray-200 px-4 py-2 flex justify-between items-center cursor-pointer rounded-xl" 
        onClick={toggleCard}
      >
        <h2 className="text-lg font-semibold">{title}</h2>
        <motion.svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
          animate={{ rotate: isOpen ? 90 : 0 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </div>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className="border border-gray-300 p-2 rounded-xl mt-2"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FoldingCard;
