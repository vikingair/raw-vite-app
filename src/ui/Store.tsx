import React, { ReactNode, useState, useCallback } from 'react';
import { ArticleData } from '../services/Webservice';

type State = { articles?: ArticleData[]; filter?: string };

const initialState: State = { articles: undefined, filter: undefined };

export const Store = React.createContext<State>(initialState);

export const StoreState: { set: (state: Partial<State>) => void } = { set: () => undefined };

export type StoreProviderProps = { children: ReactNode };
export const StoreProvider: React.VFC<StoreProviderProps> = ({ children }) => {
    const [state, setState] = useState<State>(initialState);

    StoreState.set = useCallback((updates: Partial<State>) => {
        setState((prev) => ({ ...prev, ...updates }));
    }, []);

    return <Store.Provider value={state}>{children}</Store.Provider>;
};
