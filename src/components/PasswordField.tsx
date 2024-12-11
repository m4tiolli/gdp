import { Fieldset, Group, Input, InputElement } from "@chakra-ui/react";
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
  <Fieldset.Root>
    <Fieldset.Legend color="blue.700">{label}</Fieldset.Legend>
    <Group>
      <Input type={show ? 'text' : 'password'} name={name} value={value} onChange={onChange} />
      <InputElement width={'fit-content'}>
        {!show ? <FaEye onClick={() => setShow(!show)} className="text-lg cursor-pointer transition-all hover:opacity-70 mr-3" /> : <FaEyeSlash onClick={() => setShow(!show)} className="text-lg cursor-pointer transition-all hover:opacity-70 mr-3" />}
      </InputElement>
    </Group>
    {isInvalid && <Fieldset.ErrorText>{errorMessage}</Fieldset.ErrorText>}
  </Fieldset.Root>
);

export default PasswordField