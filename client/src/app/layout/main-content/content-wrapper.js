import Header from "../header/header";
import Card from "../../shared-components/navigation-card/card";
import "./content-wrapper-style.scss";
import RecipeCard from "../../shared-components/recipe-cards/recipeCards";
import InputField from "../../../shared/input/input-component";
import {FaArrowDown} from 'react-icons/fa';
import SearchedRecipeCard from "../../shared-components/searchedRecipeCard/searched-recipe-card";

const Wrapper = ({
  menuCards,
  recipes,
  searchedRecipes,
  handleChange,
  placeholder,
}) => {
  return (
    <div>
      <Header />
      <div className="wrapper">
        {handleChange ? (
          <div className="search-container">
            <InputField
              placeholder={placeholder}
              onChange={(e) => handleChange(e.target.value)}
            />
             <div className="filters-container"><FaArrowDown className="arrow-down" /></div>
          </div>
        ) : null}
        {menuCards ? (
          <div className="nav-cards">
            {menuCards?.map((card, index) => {
              return (
                <Card
                  key={index}
                  title={card.title}
                  description={card.description}
                  routerLink={card.routerLink}
                />
              );
            })}
            <h5 className="daily-recipes">Daily Recipes</h5>
          </div>
        ) : null}
        {recipes ? (
          <div className="recipe-cards-container">
            {recipes?.map((recipe, index) => {
              return <RecipeCard key={index} props={recipe} />;
            })}
          </div>
        ) : null}
        {searchedRecipes ? (
          <div className="recipe-cards-container">
            {searchedRecipes?.map((recipe, index) => {
              return <SearchedRecipeCard key={index} props={recipe} />;
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default Wrapper;
