import  { useState, useEffect } from "react";

interface FormPreviewProps {
  schema: any;
}

const FormPreview: React.FC<FormPreviewProps> = ({ schema }) => {
  const [formData, setFormData] = useState<any>({});
  const [formErrors, setFormErrors] = useState<any>({});
  const [schemaError, setSchemaError] = useState<string | null>(null);

  useEffect(() => {
    
    try {
      if (!schema || !Array.isArray(schema.fields)) {
        throw new Error(
          'Invalid schema format. The schema must contain a "fields" array.'
        );
      }
      setSchemaError(null); 
    } catch (error: any) {
      
      setSchemaError(error.message);
    }
  }, [schema]);

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(formData, null, 2)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "form-submission.json";
    link.click();
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const errors: any = {};
    schema.fields.forEach((field: any) => {
      if (field.required && !formData[field.id]) {
        errors[field.id] = `${field.label} is required`;
      }
      if (
        field.validation?.pattern &&
        !new RegExp(field.validation.pattern).test(formData[field.id])
      ) {
        errors[field.id] = field.validation.message;
      }
    });
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form Data Submitted:", formData);
      alert("Form submitted successfully");
    }
  };

  if (schemaError) {
    return <div className="text-red-500 text-sm">{schemaError}</div>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {schema?.fields?.map((field: any, index: number) => {
          // Handled unsupported field types here.
          if (
            !["text", "email", "textarea", "file", "select", "radio"].includes(
              field.type
            )
          ) {
            return (
              <p key={index} className="text-red-500 text-sm">
                Error: Unhandled field type: {field.type}
              </p>
            );
          }

          return (
            <div key={index}>
              <label htmlFor={field.id} className="block text-sm font-medium">
                {field.label}
              </label>

              {field.type === "text" ||
              field.type === "email" ||
              field.type === "textarea" ||
              field.type === "file" ? (
                <input
                  type={field.type}
                  name={field.id}
                  id={field.id}
                  required={field.required}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className="w-full p-2 border border-gray-300 rounded-md bg-white text-black placeholder-gray-500 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                />
              ) : field.type === "select" ? (
                <select
                  name={field.id}
                  id={field.id}
                  required={field.required}
                  onChange={handleChange}
                  className="w-full p-2 border  border-gray-300 rounded-md bg-white text-black placeholder-gray-500 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                >
                  <option value="">-- Please select --</option>
                  {field.options?.map((option: any, idx: number) => (
                    <option key={idx} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : field.type === "radio" ? (
                field.options?.map((option: any, idx: number) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name={field.id}
                      id={`${field.id}-${option.value}`}
                      value={option.value}
                      onChange={handleChange}
                      className="w-4 h-4"
                      required={field.required}
                    />
                    <label htmlFor={`${field.id}-${option.value}`}>
                      {option.label}
                    </label>
                  </div>
                ))
              ) : null}

              {formErrors[field.id] && (
                <p className="text-red-500 text-sm">{formErrors[field.id]}</p>
              )}
            </div>
          );
        })}

        <button
          type="submit"
          className="mt-4 bg-red-600 hover:bg-red-700 text-white p-2 rounded-md"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={handleDownload}
          className="mt-4 ml-4 bg-green-600 hover:bg-green-700 text-white p-2 rounded-md"
        >
          Download
        </button>
      </form>
    </div>
  );
};

export default FormPreview;
