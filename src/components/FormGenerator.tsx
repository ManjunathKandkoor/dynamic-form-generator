
import { useForm, SubmitHandler } from 'react-hook-form';

interface Field {
  id: string;
  type: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  validation?: { pattern: string; message: string };
}

interface FormSchema {
  formTitle: string;
  formDescription: string;
  fields: Field[];
}

const FormGenerator: React.FC<{ schema: FormSchema }> = ({ schema }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit: SubmitHandler<any> = data => {
    console.log(data);
    alert('Form submitted successfully!');
  };

  return (
    <div>
      <h1>{schema.formTitle}</h1>
      <p>{schema.formDescription}</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {schema.fields.map(field => (
          <div key={field.id}>
            <label>{field.label}</label>
            {field.type === 'select' || field.type === 'radio' ? (
              field.options?.map(option => (
                <div key={option.value}>
                  <input
                    type={field.type}
                    value={option.value}
                    {...register(field.id, { required: field.required })}
                  />
                  <label>{option.label}</label>
                </div>
              ))
            ) : (
              <input
                type={field.type}
                placeholder={field.placeholder}
                {...register(field.id, { required: field.required })}
                className="border"
              />
            )}
            {errors[field.id] && <p className="text-red-500">This field is required</p>}
          </div>
        ))}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">Submit</button>
      </form>
    </div>
  );
};

export default FormGenerator;
