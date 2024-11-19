import { JSONSchema } from "../hooks/useJSONSchema";

export const validateJSON = (json: string): { valid: boolean; errorMessage: string } => {
  try {
     const parsed: JSONSchema = JSON.parse(json);
     console.log(parsed);
    return { valid: true, errorMessage: "" };
  } catch (error) {
    return { valid: false, errorMessage: "Invalid JSON structure" };
  }
};
