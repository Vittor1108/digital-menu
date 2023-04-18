import { Section } from "./styled";

export const CardSection = ({
  children,
}: {
  children: React.ReactElement[] | React.ReactElement;
}): JSX.Element => {
  return <Section>{children}</Section>;
};
