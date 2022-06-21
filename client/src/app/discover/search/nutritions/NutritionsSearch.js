/* eslint-disable no-nested-ternary */
import { React, useCallback, useState } from 'react';
import debounce from 'lodash.debounce';
import Spinner from 'react-bootstrap/esm/Spinner';
import { Button, SearchedRecipeCard, Title } from '../../../../components';
import { fetchRecipesByNutrition } from '../../../../service';
import './nutritionsSearch.scss';

function NutritionsSearch() {
  const [nutrition, setNutrition] = useState({
    carbs: 55,
    protein: 55,
    calories: 400,
    fat: 50,
  });

  const [recipes, setRecipes] = useState([]);

  const [recipesLoading, setRecipesLoading] = useState(false);

  const handleChange = (name) => ({ target: { value } }) => {
    setNutrition({ ...nutrition, [name]: value });
  };

  const handleDebounce = useCallback(
    debounce(
      (nutritions) => {
        fetchRecipesByNutrition({ ...nutritions })
          .then((response) => response.json())
          .then(setRecipes)
          .finally(setRecipesLoading(false));
      },
      1000,
    ),
    [],
  );

  const fetchRecipes = () => {
    setRecipesLoading(true);
    handleDebounce(nutrition);
  };

  return (
    <>
      <div className="sliders-wrapper">
        <p className="nutrition-value">
          {nutrition.carbs}
          g
        </p>
        <div className="slider-container">
          <label className="label-style" htmlFor="carbs">
            Max Carbs (between 10 and 100):
          </label>
          <input
            className="slider"
            type="range"
            id="carbs"
            name="carbs"
            min="10"
            max="100"
            value={nutrition.carbs}
            onChange={handleChange('carbs')}
          />
        </div>
        <p className="nutrition-value">
          {nutrition.protein}
          g
        </p>
        <div className="slider-container">
          <label className="label-style" htmlFor="protein">
            Max Protein (between 10 and 100):
          </label>
          <input
            className="slider"
            type="range"
            id="protein"
            name="protein"
            min="10"
            max="100"
            value={nutrition.protein}
            onChange={handleChange('protein')}
          />
        </div>
        <p className="nutrition-value">
          {nutrition.calories}
          kcal
        </p>
        <div className="slider-container">
          <label className="label-style" htmlFor="calories">
            {' '}
            Max Calories (between 50 and 800):
          </label>
          <input
            className="slider"
            type="range"
            id="calories"
            name="calories"
            min="50"
            max="800"
            value={nutrition.calories}
            onChange={handleChange('calories')}
          />
        </div>
        <p className="nutrition-value">
          {nutrition.fat}
          g
        </p>
        <div className="slider-container">
          <label className="label-style" htmlFor="fat">
            Max Fat (between 1 and 100):
          </label>
          <input
            className="slider"
            type="range"
            id="fat"
            name="fat"
            min="1"
            max="100"
            value={nutrition.fat}
            onChange={handleChange('fat')}
          />
        </div>
      </div>
      <div className="button-container">
        {' '}
        <Button onClick={fetchRecipes} label="Search Recipes" />
      </div>
      <Title title="Found Recipes" />
      <div className="recipe-cards-container">
        {
          recipes.length && !recipesLoading
            ? recipes?.map((recipe, index) => (
              <SearchedRecipeCard
                testId={`recipe-card-testid-${index}`}
                key={index}
                props={recipe}
              />
            ))
            : recipesLoading
              ? (
                <div className="spinner-div">
                  <Spinner
                    data-testid="ingridients-spinner"
                    animation="grow"
                    variant="primary"
                  />
                </div>
              )
              : recipes.length === 0 && !recipesLoading
                ? (
                  <div className="ingridients-img-container">
                    <img className="ingridients-img" alt="recipes" src="img/recipes.jpg" />
                  </div>
                )
                : null
        }

      </div>
    </>
  );
}

export default NutritionsSearch;
