import "./colors.css"
import './App.css'
import { Header } from './components/Header'
import { Hero } from "./components/Hero"
import { Calculator } from "./components/Calculator"

function App() {
  return (
    <div className="container">
      <Header />
      <main>
        <Hero />
        <Calculator />
      </main>
    </div>
  )
}

export default App
