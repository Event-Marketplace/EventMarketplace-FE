import { useField } from "formik";
import styled from "styled-components";

type InputProps = {
  width?: number;
  placeholder: string;
  type: string;
  name: string;
  textarea?: boolean;
};

const StyledInput = styled.input<InputProps>`
  border-radius: 10px;
  padding: 20px;
  width: ${(props) => (props.width ? `${props.width}px` : "100%")};
  background-color: white;
  color: black;
  height: 36px;
`;

const StyledTextarea = styled.textarea<InputProps>`
  border-radius: 10px;
  padding: 20px;
  width: ${(props) => (props.width ? `${props.width}px` : "100%")};
  background-color: white;
  color: black;
  border: 1px solid #ccc;
  resize: vertical; /* pozwala użytkownikowi zmieniać wysokość */
  min-height: 200px;
`;

const InputEM = ({ width, textarea = false, ...props }: InputProps) => {
  //const [field, meta] = useField(props.name); //hook z formika - automatycznie pobiera value , onchange itp dla Formika

  if (textarea) {
    return <StyledTextarea {...props} width={width} />;
  }
  return <StyledInput {...props} width={width} />;
};

export default InputEM;
