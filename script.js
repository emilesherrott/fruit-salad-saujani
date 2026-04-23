const fruitForm = document.querySelector("#inputSection form")
const fruitList = document.querySelector("#fruitSection ul")
const fruitNutrition = document.querySelector("#nutritionSection p")

fruitForm.addEventListener("submit", extractFruit)

let calories = 0
// ! NEW CODE
const fruitCalories = {}

function extractFruit(e) {
    e.preventDefault()
    fetchFruitData(e.target[0].value)
    e.target[0].value = ""
}

function fetchFruitData(fruit){
    fetch(`https://fruit-api-5v0j.onrender.com/fruits/${fruit}`)
        .then(processResponse)
        .then((data)=> addFruit(data))
        .catch((error)=> console.log(error))
}

function processResponse(response){
    if (response.status === 200){
        return response.json()
    } else {
        throw "Error: https status code " + response.status
    }
}

function addFruit(fruit) {
    const li = document.createElement("li")
    li.textContent = fruit.name
    li.addEventListener("click", removeFruit, {once: true})
    fruitList.appendChild(li)

    // ! NEW CODE
    fruitCalories[fruit.name] = fruit.nutritions.calories
    calories += fruit.nutritions.calories
    fruitNutrition.textContent = calories
}

function removeFruit(e) {
    // ! NEW CODE
    console.log(e.target.textContent)
    const fruitName = e.target.textContent
    calories -= fruitCalories[fruitName]
    fruitNutrition.textContent = calories
    delete fruitCalories[fruitName]

    e.target.remove()
}