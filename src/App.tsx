import './App.css'
import SnowfallBackground from "./components/snowfall-background/snowfall-background.tsx";
import {ChristmasTree} from "./components/christmas-tree/christmas-tree.tsx";

function App() {

  return (
    <>
      <h1>Decorate your Christmas tree</h1>
      <ChristmasTree/>
      <SnowfallBackground/>
    </>
  )
}

export default App
