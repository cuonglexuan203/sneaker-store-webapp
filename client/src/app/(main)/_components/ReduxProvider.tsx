"use client";

import { store } from "../_store/store";
import { Provider } from "react-redux";

function ReduxProvider({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
}

export default ReduxProvider;
