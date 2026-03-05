import { Routes ,Route, Navigate } from "react-router-dom";
import { planets } from "./data/planets";
import Planet from "./pages/Planet";
import Header from "./components/Header/Header";

function App() {
  return (
    <>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Navigate to={`/planets/${planets[0].slug}`} />} />
          <Route path="/planets/:slug" element={<Planet />} />
        </Routes>
      </main>
    </>
  )
}

export default App