import Footer from "../../components/Footer/footer";
import Header from "../../components/Header/header";
import RecipeGrid from "./Recipes/RecipeGrid"

const Home = () =>{
    return(
        <>
        <Header/>
        <RecipeGrid/>
        <Footer/>
        </>
    )
}

export default Home;