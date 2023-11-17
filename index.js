import getRecipe from "./getRecipeCard.js";
import getCuisine from "./getCuisine.js";
const cardParentContainer = document.querySelector(".main");
const cuisineParentContainer = document.querySelector(".cuisine-filter");
const searchBox = document.querySelector(".input");

const RECIPEURL = "https://recipeapi.prakashsakari.repl.co/api/recipes";
const CUISINEURL =
  "https://recipeapi.prakashsakari.repl.co/api/recipes/cuisines";

let searchValue = "";
let filteredArrOfRecipes = [];
let arrOfSelectedCuisine = [];

let getdata = async (url) => {
  try {
    let { data } = await axios.get(url);
    return data;
  } catch (err) {
    console.log(err);
  }
};
let recipes = await getdata(RECIPEURL);
let cuisines = await getdata(CUISINEURL);

let getFilteredData = () => {
  filteredArrOfRecipes =
    searchValue?.trim().length > 0
      ? recipes.filter((recipe) =>
          recipe.TranslatedRecipeName.toLowerCase().includes(searchValue)
        )
      : recipes;
  if(arrOfSelectedCuisine?.length>0){
    filteredArrOfRecipes=searchValue?.trim().length>0?filteredArrOfRecipes:recipes
    filteredArrOfRecipes=filteredArrOfRecipes.filter(recipe=>arrOfSelectedCuisine.includes(recipe.Cuisine))
  }
  return filteredArrOfRecipes;
};
function handleSearch(event) {
  searchValue = event.target.value.toLowerCase();
  filteredArrOfRecipes = getFilteredData();
  cardParentContainer.innerHTML = "";
  cardParentContainer.innerHTML = getRecipe(filteredArrOfRecipes);
}
function debounce(callback, delay) {
  let timerId;
  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}
let debounceInput = debounce(handleSearch, 850);
searchBox.addEventListener("keyup", debounceInput);

function handleCheck(event) {
  let id = event.target.dataset.id;
  let isSelected = event.target.checked;
  let selectedCuisin = cuisines.reduce(
    (acc, cur) => (cur.ID === acc ? cur.Cuisine : acc),
    id
  );
  arrOfSelectedCuisine = isSelected
    ? [...arrOfSelectedCuisine, selectedCuisin]
    : arrOfSelectedCuisine.filter((cuisine) => cuisine !== selectedCuisin);
  filteredArrOfRecipes=getFilteredData()
  cardParentContainer.innerHTML=""
  cardParentContainer.innerHTML=getRecipe(filteredArrOfRecipes)
}

cuisineParentContainer.addEventListener("click", handleCheck);

function handleSingleCard(event){
  let id=event.target.dataset.id
  localStorage.clear()
  localStorage.setItem("id",id)
  location.href="./singleCard.html"
}

cardParentContainer.addEventListener("click",handleSingleCard)
cardParentContainer.innerHTML = getRecipe(recipes);
cuisineParentContainer.innerHTML = getCuisine(cuisines);
console.log(recipes)