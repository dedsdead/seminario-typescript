import { Route, Routes } from "react-router-dom";
import { Characters } from "./pages/Characters";
import { House } from "./pages/House";
import { Houses } from "./pages/Houses";

export function App(){
  return(
      <Routes>
        <Route path="/" element={<Houses />} />
        <Route path="/houses/*" element={<House />} />
        <Route path="houses/characters/*" element={<Characters />} />
      </Routes>
  )
}