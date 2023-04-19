import { AppContext } from "@/Contexts/AppContext";
import { BaseLayout } from "@components/BaseLayout";
import { useValidationToken } from "@hooks/useValidateToken";
import React from "react";

export const HomeComponent = () => {
  const token = sessionStorage.getItem("token")
    ? sessionStorage.getItem("token")
    : localStorage.getItem("token");
  const { state, setState } = React.useContext(AppContext);
  const { validateToken } = useValidationToken();

  if (token) {
    React.useEffect(() => {
      validateToken.mutate((function () {})(), {
        onSuccess: (res) => {
          setState({
            ...state,
            screens: res.data,
          });
        },
      });
    }, []);
  }

  return (
    <>
      <BaseLayout isLoading={[false]}>
        <h1>Home</h1>
      </BaseLayout>
    </>
  );
};
