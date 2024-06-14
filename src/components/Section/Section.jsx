import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FoldingCard from '../FoldingCard/FoldingCard';

const Section = ({ title, fields, register, append, remove, removeSection, defaultValues, name }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleAppend = () => {
    append(defaultValues);
    setIsOpen(true);
  };

  const handleRemove = (index) => {
    remove(index);
    setIsOpen(true);
  };

  const handleRemoveSection = () => {
    removeSection();
    setIsOpen(true);
  };

  return (
    <FoldingCard title={title} isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="mb-4">
        <label className="block text-gray-700">{title}</label>
        <AnimatePresence>
          {fields.map((item, index) => (
            <motion.div
              key={item.id}
              className="mb-4 border p-2 rounded"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {Object.keys(defaultValues).map((key) => (
                <div key={key} className="mb-2">
                  <input
                    {...register(`${name}.${index}.${key}`)}
                    placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                    className="w-full px-3 py-2 border rounded mb-2"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="text-red-500"
              >
                Remove Item
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
        <button
          type="button"
          onClick={handleAppend}
          className="mt-2 w-full bg-green-500 text-white py-2 rounded"
        >
          Add {title}
        </button>

        {removeSection && <button
          type="button"
          onClick={handleRemoveSection}
          className="mt-2 w-full bg-red-500 text-white py-2 rounded"
        >
          Remove {title} Section
        </button>}
      </div>
    </FoldingCard>
  );
};

export default Section;
