import { createContext } from "react";

interface props {
    counter: number, 
    updateCounter?: (type: string) => void
}

const defaultValue =  {
    counter: 0
}

export const CounterContext = createContext<props>(defaultValue)