import { BrowserRouter,Routes,Route } from "react-router-dom"
import LandingPage from "./Pages/LandingPage"
import ToDoForm from './Pages/ToDoForm';
import ShowTask from "./Pages/ShowTask";

function App() {


  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/add" element={<ToDoForm/>}/>
        <Route path="/show" element={<ShowTask/>}/>
      </Routes>
    </BrowserRouter>
     
    </>
  )
}

export default App
