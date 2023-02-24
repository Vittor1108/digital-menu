import { IButtonProps } from "./interfaces/IButtonProps";
import { Button as ButtonStyled } from "./styled";

export const Button = ({
  children,
  bgColor,
  fontColor,
  width,
}: IButtonProps): JSX.Element => {
  return (
    <ButtonStyled bgColor={bgColor} fontColor={fontColor} width={width}>
      {children}
    </ButtonStyled>
  );
};
