import { Control } from "react-hook-form";

export interface InputData {
  form: {
    control: Control<any>;
  };
  name: string,
  label: string,
  placeholder: string,
  type?: string
}