import { useField } from "formik";
import styled from "styled-components";

type InputProps = {
  width?: number;
  placeholder: string;
  type: string;
  name: string;
};

const StyledInput = styled.input<InputProps>`
  border-radius: 50px;
  padding: 20px;
  width: ${(props) => (props.width ? `${props.width}px` : "200px")};
  background-color: white;
  color: black;
`;

const InputEM = ({ width, ...props }: InputProps) => {
  const [field, meta] = useField(props.name); //hook z formika - automatycznie pobiera value , onchange itp dla Formika

  return <StyledInput {...field} {...props} width={width} />;
};

export default InputEM;
