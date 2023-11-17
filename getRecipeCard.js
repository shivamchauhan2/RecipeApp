export default function getRecipe(recipes){
  let recipeArr= recipes.map(recipe=>{
    return `
    <div class="card shadow">
      <div class="card-image-container">
        <img
          class="card-image"
          src=${recipe["image-url"]}
          alt=${recipe.TranslatedRecipeName}
          data-id=${recipe.ID}
        />
      </div>
      <div class="recipe-details">
        <div class="title">${recipe.TranslatedRecipeName}</div>
        <div class="ratings">
          <div><span>Cuisine: ${recipe.Cuisine}</span></div>
          <div class="star-rating">
            <span class="time material-icons-outlined">timer</span
            ><span>${recipe.TotalTimeInMins} mins</span>
          </div>
        </div>
      </div>
    </div>
    `
  })
  recipeArr= recipeArr.join("")
  return recipeArr
}