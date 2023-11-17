export default function getCuisine(cuisines){
    let cuisineArray=cuisines.map(cuisine=>{
        return `
        <div class="filter" ${cuisine.ID}>
      <label
        class="cusine-label d-flex align-items-center gap-sm"
        data-id=${cuisine.ID}
        ><input
          type="checkbox"
          class="checkbox"
          data-id=${cuisine.ID}
        /><span data-id=${cuisine.ID}>${cuisine.Cuisine}</span
        ></label
      >
    </div>`
    })
    cuisineArray=cuisineArray.join("")
    return cuisineArray
}