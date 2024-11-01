import { ToastId, UseToastOptions } from "@chakra-ui/react";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

interface IONCHANGE<T> {
  e: ChangeEvent<HTMLInputElement>;
  setValues: Dispatch<SetStateAction<T>>;
  setInvalid: Dispatch<SetStateAction<T>>
}

export interface ValidationError {
  path: string[];
  message: string;
}

export const onChange = <T>({ e, setValues, setInvalid }: IONCHANGE<T>) => {
  const { name, value } = e.target;
  setInvalid(prev => ({ ...prev, [name]: "" }))
  setValues(prev => ({ ...prev, [name]: value }));
};

export const showToast = (toast: (options?: UseToastOptions) => ToastId, title: string, description: string, status: "success" | "error") => {
  toast({
    title,
    description,
    status,
    position: 'top',
    duration: 4000,
    isClosable: true,
  });
};

export const handleValidationErrors = <T extends Record<string, string>>(
  errors: ValidationError[],
  setInvalid: Dispatch<SetStateAction<T>>
) => {
  const newInvalid = {} as T;

  errors.forEach(({ path, message }) => {
    const field = path[0] as keyof T;
    if (field) newInvalid[field] = message as T[keyof T]; 
  });

  setInvalid((prev) => ({ ...prev, ...newInvalid }));
};