import { FormControl, FormLabel, FormErrorMessage, Input, InputRightElement, InputGroup } from "@chakra-ui/react";
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { ChangeEvent, Dispatch, SetStateAction } from "react";
interface IPasswordField {
  label: string;
  name: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isInvalid: boolean;
  errorMessage: string;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>
}

const PasswordField = ({ label, name, value, onChange, isInvalid, errorMessage, show, setShow }: IPasswordField) => (
  <FormControl isInvalid={isInvalid}>
    <FormLabel color="blue.700">{label}</FormLabel>
    <InputGroup>
      <Input type={show ? 'text' : 'password'} name={name} value={value} onChange={onChange} focusBorderColor="azul.500" />
      <InputRightElement w={'fit-content'}>
        {!show ? <FaEye onClick={() => setShow(!show)} className="text-lg cursor-pointer transition-all hover:opacity-70 mr-3" /> : <FaEyeSlash onClick={() => setShow(!show)} className="text-lg cursor-pointer transition-all hover:opacity-70 mr-3" />}
      </InputRightElement>
    </InputGroup>
    {isInvalid && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
  </FormControl>
);

export default PasswordField