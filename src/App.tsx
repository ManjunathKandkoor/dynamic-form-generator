import React, { useState } from 'react';
import JSONEditor from './components/JSONEditor';
import FormPreview from './components/FormPreview';

const App: React.FC = () => {
  const [jsonSchema, setJsonSchema] = useState<string>('');
  const [parsedSchema, setParsedSchema] = useState<any>(null);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const handleJsonChange = (json: string) => {
    setJsonSchema(json);
    
    try {
      const parsed = JSON.parse(json);
      setParsedSchema(parsed);
    } catch (error) {
      setParsedSchema(null);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}>

      <div className="flex justify-between p-4">
        <button onClick={toggleDarkMode} className="px-4 py-2 bg-green-500 text-white rounded-md">
          Toggle Dark Mode
        </button>
      </div>

      <div className="flex space-x-4 p-8">
        <div className="w-1/2">
          <JSONEditor json={jsonSchema} onChange={handleJsonChange} />
          <button onClick={() => navigator.clipboard.writeText(jsonSchema)} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">
            Copy Form JSON
          </button>
        </div>

        <div className="w-1/2">
          {parsedSchema ? (
            <FormPreview schema={parsedSchema} />
          ) : (
            <p className="text-red-500 flex justify-center align-middle">Invalid JSON Schema</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
