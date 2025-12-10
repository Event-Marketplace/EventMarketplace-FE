import styled, { css } from "styled-components";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  kind: "primary" | "secondary" | "danger";
  type: "button" | "submit" | "reset";
  width?: number;
  text: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  className?: string;
}

const StyledButton = styled.button<ButtonProps>`
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  width: ${(props) => (props.width ? `${props.width}px` : "auto")};
  transition: background 0.2s;

  ${(props) =>
    props.kind === "primary" &&
    css`
      background-color: #344586;
      &:hover {
        background-color: #0069d9;
      }
    `}

  ${(props) =>
    props.kind === "secondary" &&
    css`
      background-color: #772626;
      &:hover {
        background-color: #b13a3a;
      }
    `}

  ${(props) =>
    props.kind === "danger" &&
    css`
      background-color: #dc3545;
      &:hover {
        background-color: #c82333;
      }
    `}
`;

const ButtonEM = ({
  kind,
  type,
  width,
  text,
  style,
  onClick,
  className,
  ...props
}: ButtonProps) => {
  return (
    <>
      <StyledButton
        kind={kind}
        type={type}
        width={width}
        text=""
        style={style}
        onClick={onClick}
        className={className}
        {...props}
      >
        {text}
      </StyledButton>
    </>
  );
};

export default ButtonEM;
