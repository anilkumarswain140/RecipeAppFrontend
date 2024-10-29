import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import SignUp from './pages/Signup/SingUp';
import Home from './pages/Home/Home';
import Login from './pages/Login/LogInForm';
import RecipeDetails from './pages/RecipeDetailsPage/RecipeDetailsPage';
import Header from './components/Header/header';
import Footer from './components/Footer/footer';

function App() {
  const location = useLocation();
  const hideHeaderFooter = location.pathname === '/' || location.pathname === '/login';

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="login" element={<Login />} />
        <Route path="home" element={<Home />} />
        <Route path="recipedetails/:id" element={<RecipeDetails />} />
      </Routes>
      {!hideHeaderFooter && <Footer />}
    </>
  );
}

export default App;
