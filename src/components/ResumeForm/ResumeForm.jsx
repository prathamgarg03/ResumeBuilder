import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { motion } from 'framer-motion';
import FoldingCard from '../FoldingCard/FoldingCard';
import Section from '../Section/Section';
const ResumeForm = ({ onSubmit }) => {
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      contactInfo: {
        fullName: '',
        phoneNumber: '',
        address: '',
        email: '',
        extraLinks: [{ label: '', url: '' }]
      },
      summary: '',
      education: [{ degree: '', school: '', duration: '', description: '' }],
      workExperience: [{ jobTitle: '', from: '', to: '', employer: '', location: '', description: '' }],
      customSections: []
    }
  });

  const { fields: extraLinkFields, append: appendExtraLink, remove: removeExtraLink } = useFieldArray({
    control,
    name: 'contactInfo.extraLinks'
  });

  const { fields: educationFields, append: appendEducation, remove: removeEducation } = useFieldArray({
    control,
    name: 'education'
  });

  const { fields: workExperienceFields, append: appendWorkExperience, remove: removeWorkExperience } = useFieldArray({
    control,
    name: 'workExperience'
  });

  const { fields: customSections, append: appendCustomSection, update: updateCustomSection, remove: removeCustomSection } = useFieldArray({
    control,
    name: 'customSections'
  });

  const addCustomSection = () => {
    const title = prompt("Enter the title of the new section:");
    if (title) {
      appendCustomSection({
        title,
        items: [{ title: '', description: '' }]
      });
    }
  };

  const addCustomSectionItem = (index) => {
    const updatedSection = { ...customSections[index], items: [...customSections[index].items, { title: '', description: '' }] };
    updateCustomSection(index, updatedSection);
  };

  const removeSection = (index) => {
    removeCustomSection(index);
  };

  const submitForm = (data) => {
    onSubmit(data);
  };

  return (
    <div className="container mx-auto py-8">
      <motion.form
        onSubmit={handleSubmit(submitForm)}
        className="max-w-2xl mx-auto bg-white shadow-md rounded-2xl px-8 pt-6 pb-8 mb-4"
        layout
      >
        <FoldingCard title="Contact Info">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <input
              type="text"
              {...register('contactInfo.fullName')}
              placeholder="Full Name"
              className="w-full px-3 py-2 border rounded mb-2"
            />
            <input
              type="text"
              {...register('contactInfo.phoneNumber')}
              placeholder="Phone Number"
              className="w-full px-3 py-2 border rounded mb-2"
            />
            <input
              type="text"
              {...register('contactInfo.address')}
              placeholder="Address"
              className="w-full px-3 py-2 border rounded mb-2"
            />
            <input
              type="email"
              {...register('contactInfo.email')}
              placeholder="Email"
              className="w-full px-3 py-2 border rounded mb-2"
            />

            <div className="mb-4">
              <label className="block text-gray-700">Links</label>
              {extraLinkFields.map((item, index) => (
                <div key={item.id} className="flex mb-2">
                  <input
                    {...register(`contactInfo.extraLinks.${index}.label`)}
                    placeholder="Label"
                    className="w-1/3 px-3 py-2 border rounded mr-2"
                  />
                  <input
                    {...register(`contactInfo.extraLinks.${index}.url`)}
                    placeholder="URL"
                    className="w-2/3 px-3 py-2 border rounded"
                  />
                  <button
                    type="button"
                    onClick={() => removeExtraLink(index)}
                    className="ml-2 text-red-500"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => appendExtraLink({ label: '', url: '' })}
                className="mt-2 w-full bg-green-500 text-white py-2 rounded"
              >
                Add Link
              </button>
            </div>
          </motion.div>
        </FoldingCard>

        <FoldingCard title="Summary">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <textarea
              type="text"
              {...register('summary')}
              placeholder="Summary"
              className="w-full px-3 py-2 border rounded mb-2"
            />
          </motion.div>
        </FoldingCard>

        <Section
          title="Education"
          fields={educationFields}
          register={register}
          append={appendEducation}
          remove={removeEducation}
          defaultValues={{ degree: '', school: '', duration: '', description: '' }}
          name="education"
        />

        <Section
          title="Experience"
          fields={workExperienceFields}
          register={register}
          append={appendWorkExperience}
          remove={removeWorkExperience}
          defaultValues={{ jobTitle: '', from: '', to: '', employer: '', location: '', description: '' }}
          name="workExperience"
        />

        {customSections.map((customSection, index) => (
          <Section
            key={customSection.id}
            title={customSection.title}
            fields={customSection.items}
            register={register}
            append={() => addCustomSectionItem(index)}
            remove={(itemIndex) => {
              const updatedItems = customSection.items.filter((_, i) => i !== itemIndex);
              updateCustomSection(index, { ...customSection, items: updatedItems });
            }}
            removeSection={() => removeSection(index)}
            defaultValues={{ title: '', description: '' }}
            name={`customSections.${index}.items`}
          />
        ))}

        <button
          type="button"
          onClick={addCustomSection}
          className="mt-4 w-full bg-purple-500 text-white py-2 rounded"
        >
          Add Section
        </button>

        <motion.button
          type="submit"
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Submit
        </motion.button>
      </motion.form>
    </div>
  );
};

export default ResumeForm;
