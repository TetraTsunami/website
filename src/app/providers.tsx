"use client";
import { createContext, ReactNode, useState} from 'react';

export const BGContext = createContext({
    theme: {
        isActive: false,
        light1: "#f5f5f5",
        light2: "#e0e0e0",
        dark1: "#333333",
        dark2: "#1a1a1a",
    },
    setTheme: (theme: any) => theme
});

const BGProvider = ({ children }:  { children: ReactNode }) => {
    const [theme, setTheme] = useState({
        isActive: false,
        light1: "#f5f5f5",
        light2: "#e0e0e0",
        dark1: "#333333",
        dark2: "#1a1a1a",
    
    })
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