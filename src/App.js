import './App.css';
import LoginPage from './pages/LoginPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TaskApp from './pages/TaskApp';
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/v1" element={<TaskApp />} />
      </Routes>
    </BrowserRouter>
  )
}


export default App;
