import { AppContext } from "@/Contexts/AppContext";
import { EScreens } from "@enums/EScreens";
import React from "react";
import { UseAcessScreenType } from "./types";

export const useAcessScreen = (): UseAcessScreenType => {
    const {state} = React.useContext(AppContext);
    const stringScreens = state.screens.map(e =>  e.name);

    const acessScreen = (screenName: EScreens): boolean => {
        return stringScreens.includes(screenName.toLocaleLowerCase());
    }

    return {
        acessScreen,
    }
}