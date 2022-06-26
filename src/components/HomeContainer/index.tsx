import { ReactNode } from "react";
import Header from "./Header";

const Index = ({
  children,
  textInput,
}: {
  children: ReactNode;
  textInput: any;
}) => {
  return (
    <div className="flex flex-col">
      <Header textInput={textInput} />
      <div className="p-3 box-border">{children}</div>
    </div>
  );
};

export default Index;
