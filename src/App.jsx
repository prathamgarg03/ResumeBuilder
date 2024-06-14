import React, { useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import ResumeForm from './components/ResumeForm/ResumeForm';
import Pdf from './components/Pdf/Pdf';

const App = () => {
  const [formDataFromForm, setFormDataFromForm] = useState(null);

  const receiveFormData = (data) => {
    setFormDataFromForm(data);
  };

  const downloadPdf = async () => {
    const blob = await pdf(<Pdf formData={formDataFromForm} />).toBlob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resume.pdf';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Resume Builder</h1>
        <ResumeForm onSubmit={receiveFormData} />

        {formDataFromForm && (
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Your Resume is Ready</h2>
            <button
              onClick={downloadPdf}
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
            >
              Download PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
