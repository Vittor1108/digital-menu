import { AppContext } from "@/Contexts/AppContext";
import { BaseLayout } from "@components/BaseLayout";
import React from "react";

export const HomeComponent = () => {
  const { state } = React.useContext(AppContext);

  React.useEffect(() => {
    console.log(state);
  }, []);

  return (
    <>
      <BaseLayout isLoading={[false]}>
        <h1>Home</h1>
      </BaseLayout>
    </>
  );
};
