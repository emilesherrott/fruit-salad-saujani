// Select key DOM elements:
// - the form where the user inputs a fruit name
// - the unordered list where fruits will be displayed
// - the paragraph where total calories will be shown
const fruitForm = document.querySelector("#inputSection form")
const fruitList = document.querySelector("#fruitSection ul")
const fruitNutrition = document.querySelector("#nutritionSection p")

// When the form is submitted, run extractFruit instead of refreshing the page
fruitForm.addEventListener("submit", extractFruit)

// Keeps track of the total calories of all added fruits
let calories = 0

// Object to store calories for each fruit by name
// Example: { apple: 52, banana: 89 }
const fruitCalories = {}

// Handles form submission
function extractFruit(e) {
    // Prevent page reload
    e.preventDefault()

    // Get the value from the input field (first element in the form)
    // and fetch data for that fruit
    fetchFruitData(e.target[0].value)

    // Clear the input field after submission
    e.target[0].value = ""
}

// Fetch fruit data from the API
async function fetchFruitData(fruit){
    try {
        // Send request to API using the fruit name
        const response = await fetch(`https://fruit-api-5v0j.onrender.com/fruits/${fruit}`)

        // Convert response into JSON format
        const data = await response.json()

        // Add the fruit to the UI and update calories
        addFruit(data)
    } catch (error) {
        // Log any errors (e.g. network issues or invalid fruit)
        console.log(error)
    }
}

// Adds a fruit to the list and updates calorie tracking
function addFruit(fruit) {
    // Create a new list item
    const li = document.createElement("li")

    // Display the fruit's name inside the list item
    li.textContent = fruit.name

    // When the list item is clicked, remove it (only once)
    li.addEventListener("click", removeFruit, {once: true})

    // Add the list item to the page
    fruitList.appendChild(li)

    // Store this fruit's calories using its name as the key
    fruitCalories[fruit.name] = fruit.nutritions.calories

    // Add this fruit's calories to the total
    calories += fruit.nutritions.calories

    // Update the displayed total calories
    fruitNutrition.textContent = calories
}

// Removes a fruit from the list and updates calories
function removeFruit(e) {
    // Get the fruit name from the clicked list item's text
    const fruitName = e.target.textContent

    // Subtract that fruit's calories from the total
    calories -= fruitCalories[fruitName]

    // Update the displayed total calories
    fruitNutrition.textContent = calories

    // Remove this fruit from the tracking object
    delete fruitCalories[fruitName]

    // Remove the list item from the page
    e.target.remove()
}