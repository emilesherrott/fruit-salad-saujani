const fruitForm = document.querySelector("#inputSection form")
const fruitList = document.querySelector("#fruitSection ul")
const fruitNutrition = document.querySelector("#nutritionSection p")

fruitForm.addEventListener("submit", extractFruit)

let calories = 0
const fruitCalories = {}

function extractFruit(e) {
    e.preventDefault()
    fetchFruitData(e.target[0].value)
    e.target[0].value = ""
}

async function fetchFruitData(fruit){
    try {
        const response = await fetch(`https://fruit-api-5v0j.onrender.com/fruits/${fruit}`)
        const data = await response.json()
        addFruit(data)
    } catch (error) {
        console.log(error)
    }
}

function addFruit(fruit) {
    const li = document.createElement("li")
    li.textContent = fruit.name
    li.addEventListener("click", removeFruit, {once: true})
    fruitList.appendChild(li)

    fruitCalories[fruit.name] = fruit.nutritions.calories
    calories += fruit.nutritions.calories
    fruitNutrition.textContent = calories
}

function removeFruit(e) {
    const fruitName = e.target.textContent
    calories -= fruitCalories[fruitName]
    fruitNutrition.textContent = calories
    delete fruitCalories[fruitName]

    e.target.remove()
}