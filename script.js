//https://api.openbrewerydb.org/breweries                 http://localhost:8088/food



// fetch("https://api.openbrewerydb.org/breweries")  
// .then(breweries => breweries.json())
// .then(parseBreweriesArray => {
//     console.table(parseBreweriesArray)

//     console.log("this is the console.log", parseBreweriesArray)

// })

// fetch("http://localhost:8088/food")
// .then(r =>r.json())
// .then(function(responseArray){

//     console.log(responseArray[0].name)
//     console.log(responseArray[1].name)

//     // for (let i = 0; i < responseArray.length; i++){
//     //     console.log(responseArray[1].name)
//     // }

//     // responseArray.forEach(singleItem => {
//     //     console.log(singleItem.name)
//     // })

// })

// Practice: Displaying Foods
// fetch("http://localhost:8088/food")
//     .then(foods => foods.json())
//     .then(parsedFoods => {
       
//         // console.table(parsedFoods)
//         let foodHTMLString = ``

//         parsedFoods.forEach(food => {
//              foodHTMLString += `<div class = "column">
//              <h3>${food.name}</h3>
//              <p>${food.category}</p>
//              <p>${food.ethnicity}</p> </div>`
//         })

//         document.querySelector(".foodList").innerHTML += foodHTMLString
//     })

//Practice: Fetching other people's data
fetch("http://localhost:8088/food")
    .then(response => response.json())
    .then(myParsedFoods => {
        myParsedFoods.forEach(food => {

            fetch(`https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`)
                .then(response => response.json())
                .then(productInfo => {
                    console.log(productInfo.product)

                    //'Ingredients'
                    if (productInfo.product.ingredients_text) {
                      food.ingredients = productInfo.product.ingredients_text

                    } else {
                      food.ingredients = "no ingredients listed"
                    }

                    //'Country of Origin'
                    if (productInfo.product.countries) {
                        food.country = productInfo.product.countries
                    }
                    else{
                        food.country = "content not found"
                    }

                    //'Calories per serving'
                    if (productInfo.product.nutriments.energy) {
                        food.calories = productInfo.product.nutriments.energy
                    }
                    else{
                        food.calories = "content not found"
                    }

                    //'Fat per serving'
                    if (productInfo.product.nutriments.fat) {
                        food.fat = productInfo.product.nutriments.fat
                    }
                    else{
                        food.fat = "content not found"
                    }

                    //'Sugar per serving'
                    if (productInfo.product.nutriments.sugars) {
                        food.sugar = productInfo.product.nutriments.sugars
                    }
                    else{
                        food.sugar = "content not found"
                    }

                    // Build HTML string for individual food
                    let foodHTMLString = `<div class = "column">
                        <h3>${food.name}</h3>
                        <p><strong>Category: </strong>${food.category}</p>
                        <p><strong>Cuisine: </strong>${food.ethnicity}</p>
                        <p><strong>Country of Origin: </strong>${food.country}</p>
                        <p><strong>Ingredients: </strong>${food.ingredients}</p>
                        <p><strong>Calories per serving: </strong>${food.calories}</p> 
                        <p><strong>Fat per serving: </strong>${food.fat}</p> 
                        <p><strong>Sugar per serving: </strong>${food.sugar}</p> 
                        </div>`

                    
                    // Add HTML string to DOM
                    document.querySelector(".foodList").innerHTML += foodHTMLString
                    
                })
        })
    })