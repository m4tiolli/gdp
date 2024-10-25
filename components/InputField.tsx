import { FormControl, FormLabel, FormErrorMessage, Input } from "@chakra-ui/react";
import { ChangeEvent } from "react";
interface IInputField {
  label: string;
  name: string;
  type: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isInvalid: boolean;
  errorMessage: string;
}

const InputField = ({ label, name, type, value, onChange, isInvalid, errorMessage }: IInputField) => (
  <FormControl isInvalid={isInvalid}>
    <FormLabel color="blue.700">{label}</FormLabel>
      <Input type={type} name={name} value={value} onChange={onChange} focusBorderColor="azul.500" />
    {isInvalid && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
  </FormControl>
);

export default InputField