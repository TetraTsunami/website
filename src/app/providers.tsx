"use client";
import { createContext, ReactNode, useState} from 'react';

const defaultTheme = {
    focus: false,
    isActive: false,
    light1: "#f5f5f5",
    light2: "#e0e0e0",
    dark1: "#333333",
    dark2: "#1a1a1a",
}

export const BGContext = createContext({
    theme: defaultTheme,
    setTheme: (theme: any) => theme
});

const BGProvider = ({ children }:  { children: ReactNode }) => {
    const [theme, setTheme] = useState(defaultTheme)
    return (
        <BGContext.Provider value={{theme, setTheme}}>
            {children}
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