import React from 'react';
interface JSONEditorProps {
  json: string;
  onChange: (json: string) => void;
}

const JSONEditor: React.FC<JSONEditorProps> = ({ json, onChange }) => {
  return (
    <div>
      <h2 className="text-xl mb-2">Enter JSON Schema</h2>
      <textarea
        value={json}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter JSON schema here"
        className="w-full h-64 p-2 border border-gray-300 rounded-md bg-white text-black placeholder-gray-500 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
      />
    </div>
  );
};

export default JSONEditor;

