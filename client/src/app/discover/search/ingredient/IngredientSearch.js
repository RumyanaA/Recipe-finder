/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable no-unused-vars */
import { React, useState, useCallback, useEffect } from 'react';
import debounce from 'lodash.debounce';
import Spinner from 'react-bootstrap/esm/Spinner';
import { Button, SearchedRecipeCard, IngridientCard, Title, InputField, ErrorMessage } from '../../../../components';
import { fetchIngredients, fetchRecipesByIngredients } from '../../../../service';
import './ingredientSearch.scss';
import '../../../../sharedStyles.scss';

function IngredientSearch() {
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const [ingredients, setIngredients] = useState([]);

  const [recipes, setRecipes] = useState([]);

  const [hasInputValue, setHasInputValue] = useState(false);

  const [ingredientsLoading, setIngredientsLoading] = useState(false);

  const [recipesLoading, setRecipesLoading] = useState(false);

  const [keyword, setKeyword] = useState('');

  const handleDebounce = useCallback(
    debounce(
      (value) => setKeyword(value),
      1000,
    ),
    [],
  );

  const handleChange = (value) => {
    setHasInputValue(!!value);
    setIngredientsLoading(true);
    handleDebounce(value);
  };

  useEffect(() => {
    fetchIngredients({ keyword })
      .then((response) => response.json())
      .then(({ results }) => setIngredients(results))
      .finally(() => setIngredientsLoading(false));
  }, [keyword]);

  const addIngridient = (item) => {
    setSelectedIngredients([...selectedIngredients, item]);
  };

  const removeIngridient = (item) => {
    const currentIngredients = selectedIngredients;

    const indexToRemove = currentIngredients.findIndex(
      (ingridient) => ingridient.id === item.id,
    );
    currentIngredients.splice(indexToRemove, 1);

    setSelectedIngredients([...currentIngredients]);
  };

  const searchRecipe = async () => {
    setRecipesLoading(true);
    const ingredientsName = selectedIngredients.map((item) => item.name);

    fetchRecipesByIngredients({ ingredients: ingredientsName })
      .then((response) => response.json())
      .then((result) => setRecipes(result))
      .finally(() => setRecipesLoading(false));
  };
  return (
    <>
      <div className="searchInput-Button-container">
        <InputField
          placeholder="Search ingridients..."
          onChange={(e) => handleChange(e.target.value)}
        />
        <Button
          onClick={searchRecipe}
          label="Search recipe"
        />
      </div>
      <Title title="All Ingridients" />
      <div className="ingridients-container">
        {!hasInputValue
          ? <div className="ingridients-img-container">
            <img
              className="ingridients-img"
              alt="ingridients"
              src="img/ingridients.jpg"
            />
          </div> : ingredientsLoading
            ? <div className="spinner-div">
              <Spinner
                data-testid="ingridients-spinner"
                animation="grow"
                variant="primary"
              />
            </div>
            : ingredients?.map((item, index) => (
              <IngridientCard
                testId={`ingridient-testid-${index}`}
                key={index}
                props={item}
                addIngridient={addIngridient}
                selectedIngridient={false}
              />
            ))}
        {hasInputValue && !ingredients.length && !ingredientsLoading ? <ErrorMessage
          testid="no-ingridients-found"
          message="No Ingridients Found"
        /> : null}
      </div>
      <Title title="My Ingridients" />
      <div className="selected-ingridients-container">
        {selectedIngredients.length === 0 ? (
          <div className="ingridients-img-container">
            <img
              className="ingridients-img"
              alt="ingridients"
              src="img/fridge.jpg"
            />
          </div>
        ) : selectedIngredients?.map((item, index) => (
          <IngridientCard
            testId={`selectedIngridient-testid-${index}`}
            key={index}
            props={item}
            removeIngridient={removeIngridient}
            selectedIngridient
            divTestId={`div-X-testid-${index}`}
          />
        ))}
      </div>
      <Title title="Found Recipes" />
      <div className="spinner-div">
        {recipesLoading && <Spinner
          data-testid="recipes-spinner"
          animation="grow"
          variant="primary"
        />}
      </div>
      <div className="recipe-cards-container">
        {!ingredients?.length ? (
          <div className="ingridients-img-container">
            <img
              className="ingridients-img"
              alt="recipes"
              src="img/recipes.jpg"
            />
          </div>
        )
          : recipes?.map((recipe, index) => (
            <SearchedRecipeCard
              testId={`recipe-testId-${index}`}
              key={index}
              props={recipe}
            />
          ))}
      </div>
    </>
  );
}

export default IngredientSearch;
