import { ReactNode } from "react";

export default function Card({children}: { children: ReactNode}) {
  return <div className="m-2 rounded-md bg-bkg p-2 shadow-i-sm md:p-4">
    {children}
  </div>
}