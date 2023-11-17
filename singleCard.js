import getRecipe from "./getRecipeCard.js";
let cardParentContainer=document.querySelector(".main")
let cardInformation=document.querySelector(".cuisine-filter")
let cardIngredients=document.querySelector(".ingredients")
let id=localStorage.getItem("id")

const RECIPEURL = `https://recipeapi.prakashsakari.repl.co/api/recipes/${id}`;

let getData=async (url)=>{
    try {
        let {data}= await axios.get(url)
        return data
    } catch (error) {
        console.log(error)
    }
}

let recipe= await getData(RECIPEURL)
cardParentContainer.innerHTML=getRecipe(recipe)
cardInformation.innerHTML= recipe[0].TranslatedInstructions
let ingredients= recipe[0].TranslatedIngredients.split(",").join("<br>")
cardIngredients.innerHTML=`${ingredients}`

