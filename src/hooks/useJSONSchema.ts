export interface FormField {
  type: string;
  label: string;
  name: string;
  required: boolean;
  options?: string[];
}

export interface JSONSchema {
  fields: FormField[];
}
