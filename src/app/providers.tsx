"use client";
import { createContext, Dispatch, ReactNode, useState} from 'react';

export type theme = {
    focus: boolean;
    isActive: boolean;
    light1: string | undefined;
    light2: string | undefined;
    dark1: string | undefined;
    dark2: string | undefined;
}

const defaultTheme: theme = {
    focus: false,
    isActive: false,
    light1: "#f5f5f5",
    light2: "#e0e0e0",
    dark1: "#333333",
    dark2: "#1a1a1a",
}

export const BGContext = createContext(defaultTheme);
export const BGDispatchContext = createContext(null as unknown as Dispatch<React.SetStateAction<typeof defaultTheme>>);

const BGProvider = ({ children }:  { children: ReactNode }) => {
    const [theme, setTheme] = useState(defaultTheme)
    return (
        <BGContext.Provider value={theme}>
            <BGDispatchContext.Provider value={setTheme}>
                {children}
            </BGDispatchContext.Provider>
        </BGContext.Provider>
    );

}
    
export default function Providers({ children }: { children: ReactNode }) {
    return (
        <BGProvider>
            {children}
        </BGProvider>
    );
};