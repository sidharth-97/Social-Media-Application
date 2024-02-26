"use client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Home from "@/components/HomeLayout";
import Feeds from "@/components/Feeds";


export default function App() {
  return (
    <div>
        <ReactQueryDevtools/>
        <Home>
          <Feeds/>
        </Home>
    </div>
  );
}
