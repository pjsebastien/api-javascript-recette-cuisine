const searchInput = document.getElementById("searchInput");
const results = document.getElementById("results");
const randomMeal = document.getElementById("randomMeal");

let search = "";


const fetchSearch = async(url) => {
    meals = await fetch(
    `https://www.themealdb.com/api/json/v1/1/${url}`)
    .then(res=> res.json())
    .then(res=> res.meals)
}

//Search

const searchDisplay = async() => {
    await fetchSearch(search);

    if (meals == null){
        results.innerHTML = `<span class="noResult">Aucun résultat</span>`
    }

    results.innerHTML = (
        meals.map(meal => (
            `
            <div class="searchContainer">
                <h2>${meal.strMeal}</h2>
                <div class="infos">
                    <div>Origine : ${meal.strArea}</div>
                    <div>Catégorie : ${meal.strCategory}</div>
                </div>
                <img src='${meal.strMealThumb}'/><br>
                <a href='${meal.strYoutube}' target= 'blank'><i class='fab fa-youtube'></i></a>
            </div>
            `

        )).join('')
    )
}

searchInput.addEventListener('input', (e)=>{
    search = `search.php?s=${e.target.value}`;
    searchDisplay();
})

//Random meal 

const randomMealDisplay = async() => {
    await fetchSearch(`random.php`)

    results.innerHTML = (
        meals.map(meal => (
            `
            <div class="randomContainer">
                <h2>${meal.strMeal}</h2>
                <div class="infos">
                    <div>Origine : ${meal.strArea}</div>
                    <div>Catégorie : ${meal.strCategory}</div>
                </div>
                <img src='${meal.strMealThumb}'/>
                <p>${meal.strInstructions}</p>
                <a href='${meal.strYoutube}' target= 'blank'><i class='fab fa-youtube'></i></a>
            </div>
            `

        ))
    )
}

randomMeal.addEventListener('click', (e)=>{
    randomMealDisplay();
})
randomMealDisplay()


