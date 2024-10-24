// import logo from './logo.svg';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import SignUp from './pages/Signup/SingUp';
import Home from './pages/Home/Home';
import Login from './pages/Login/LogInForm';
import RecipeDetails from './pages/RecipeDetailsPage/RecipeDetailsPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={< SignUp />} />
        <Route path="login" element={< Login />} />
        <Route path="home" element={<Home />} />
        <Route path="recipedetails/:id" element={<RecipeDetails />} />
      </Routes>
    </>
  );
}

export default App;
