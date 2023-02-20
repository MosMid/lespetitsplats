import {recipes} from './recipes.js';

//Creation des cartes recette
let recipeList = recipes
const searchResults = document.getElementById('results')
recipes.forEach(recipe => {
    const card = document.createElement("div")
    card.setAttribute("id", recipe.id)
    card.setAttribute("class", "cartes")
    searchResults.appendChild(card)
    card.style.paddingTop = card.offsetWidth/2+"px"
    const info  = document.createElement("div")
    info.setAttribute("class", "infoContainer")
    card.appendChild(info)
    const name = document.createElement("h2")
    name.setAttribute("class", "recipeName")
    name.innerHTML = recipe.name
    info.appendChild(name)
    const time = document.createElement("p")
    const clock = document.createElement("i")
    clock.setAttribute("class", "fa-regular fa-clock clock")
    time.setAttribute("class", "time")
    info.appendChild(clock)
    time.innerHTML = recipe.time+" min"
    info.appendChild(time)
    const recipeIngredients = document.createElement("ul")
    recipeIngredients.setAttribute("class", "recipeIngredients")
    info.appendChild(recipeIngredients)
    recipe.ingredients.forEach(element => {
        const eachIngredient = document.createElement("li")
        if(element.unit) eachIngredient.innerHTML = "<span>"+element.ingredient+"</span>: "+element.quantity+" "+element.unit
        else eachIngredient.innerHTML = "<span>"+element.ingredient+"</span>: "+element.quantity
        recipeIngredients.appendChild(eachIngredient)
    });
    const description = document.createElement("p")
    description.setAttribute("class", "description")
    description.innerHTML = recipe.description
    info.appendChild(description)
});

// filtrage des resultats
let results = document.querySelectorAll('.cartes')
function filtreResults(){
    results.forEach(result => {
        const correspondingCard = recipes[result.id-1]
        if(recipeList.includes(correspondingCard)){
            result.style.display = ""
        } else {
            result.style.display = "none"
        }
    });
    results = document.querySelectorAll('.cartes')
    if(keyWords.childNodes.length > 0){
        keyWords.childNodes.forEach(keyWord =>{
            results.forEach(result =>{
                if(result.style.display == ""){
                    const correspondingCard = recipes[result.id-1]
                    let nono = []
                    correspondingCard.ingredients.some(obj => Object.values(obj).some(val => {
                        nono.push(val)
                    }))
                    if(correspondingCard.ustensils.includes(keyWord.firstChild.innerHTML)){
                        nono.push(keyWord.firstChild.innerHTML)
                    }
                    if(correspondingCard.appliance.includes(keyWord.firstChild.innerHTML)){
                        nono.push(keyWord.firstChild.innerHTML)
                    }
                    if(nono.includes(keyWord.firstChild.innerHTML)){
                        result.style.display = ""
                    }else{
                        result.style.display = "none"
                    }
                }
            })
        })
    }
}

// Suppression des mots clés
const deleteItemFunction = e => {
    const index = selected.indexOf(e.target.parentNode.firstChild.innerHTML)
    selected.splice(index,1)
    e.target.parentNode.remove()
    document.getElementById(e.target.parentNode.firstChild.innerHTML).style.color = "white"
    filtreResults()
}

// Ajout de mots clés
const keyWords = document.querySelector('#key-words')
let selected = []
const selectItem = e => {
    if(!selected.includes(e.target.innerHTML)){
        e.target.setAttribute("id" , e.target.innerHTML)
        e.target.style.color = "#bababa"
        selected.push(e.target.innerHTML)
        let itemName = e.target.innerHTML
        let selectedItem = document.createElement("p")
        selectedItem.innerHTML = itemName
        let keyWord = document.createElement("div")
        keyWord.appendChild(selectedItem)
        keyWord.setAttribute("class", "keyWord")
        let deleteItem = document.createElement("i")
        deleteItem.setAttribute("class", "fa-regular fa-circle-xmark deleteItem")
        deleteItem.addEventListener("click", deleteItemFunction)
        keyWord.appendChild(deleteItem)
        keyWords.appendChild(keyWord)
        if(e.target.parentNode == ustensilListElement) keyWord.style.backgroundColor = '#ED6454'
        if(e.target.parentNode == appareilListElement) keyWord.style.backgroundColor = '#68D9A4'
        filtreResults()
    }
}

// Creation des menus des filtres
const ingredientListElement = document.querySelector('#ingredientList');
let ingredientList =[];
function createIngredient(){
    recipeList.forEach(recipe => {
        let ingredients = recipe.ingredients;
        ingredients.forEach(ingredient =>{
            let newIngredient = ingredient.ingredient;
            if(!ingredientList.includes(newIngredient)){
                ingredientList.push(newIngredient)
                let ingredientName = document.createElement("p");
                ingredientName.innerHTML = newIngredient
                ingredientName.setAttribute("class", "itemName")
                ingredientName.addEventListener("click", selectItem);
                ingredientListElement.appendChild(ingredientName)
            }
        })
    });
};
createIngredient()

const appareilListElement = document.querySelector('#appareilList');
let appareilList =[];
function createAppliance(){
    recipeList.forEach(recipe => {
        let appareil = recipe.appliance;
        if(!appareilList.includes(appareil)){
            appareilList.push(appareil)
            let appareilName = document.createElement("p");
            appareilName.innerHTML = appareil
            appareilName.setAttribute("class", "itemName")
            appareilName.addEventListener("click", selectItem);
            appareilListElement.appendChild(appareilName)
        }
    });
}
createAppliance()
const ustensilListElement = document.querySelector('#ustensilList');
let ustensilList =[];
function createUstensil(){
    recipeList.forEach(recipe => {
        let ustensil = recipe.ustensils;
        ustensil.forEach(eachUstensil=>{
            if(!ustensilList.includes(eachUstensil)){
                ustensilList.push(eachUstensil)
                let ustensilName = document.createElement("p");
                ustensilName.innerHTML = eachUstensil
                ustensilName.setAttribute("class", "itemName")
                ustensilName.addEventListener("click", selectItem);
                ustensilListElement.appendChild(ustensilName)
            }
        })
    });
}
createUstensil()

//Filtrage des menus
const input = document.getElementById("ingredientSearch");
const appareilInput = document.getElementById('appareilSearch')
const ustensilInput = document.getElementById('ustensilSearch')
input.addEventListener("input", searchFunction)
appareilInput.addEventListener("input", searchFunction)
ustensilInput.addEventListener("input", searchFunction)
let itemsToShow = document.querySelectorAll(".itemName");
function searchFunction(e) {
    itemsToShow = document.querySelectorAll(".itemName");
    let inputField = e.target
    inputField.addEventListener('keyup', function ( event ) { 
        document.querySelector('#appareilContainer').style.left = document.querySelector('#ingredientDetails').offsetWidth+10+'px'
        document.querySelector('#ustensilContainer').style.left = document.querySelector('#ingredientDetails').offsetWidth+document.querySelector('#appareilDetails').offsetWidth+20+'px'
        event.preventDefault();
    });
    var filter, a, i, txtValue;
    filter = inputField.value.toUpperCase();
    for (i = 0; i < itemsToShow.length; i++) {
        a = itemsToShow[i];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            itemsToShow[i].style.display = "";
        } else {
            itemsToShow[i].style.display = "none";
        }
    }
}

// Manipulation du style
onclick = (e) => {
    let clicked = e.target.parentNode
    document.querySelector('#appareilContainer').style.left = document.querySelector('#ingredientDetails').offsetWidth+10+'px'
    document.querySelector('#ustensilContainer').style.left = document.querySelector('#ingredientDetails').offsetWidth+document.querySelector('#appareilDetails').offsetWidth+20+'px'
    if(clicked === document.querySelector('#ingredientDetails')){
        itemsToShow.forEach(item =>{
            item.style.display = ""
            ustensilInput.value = ""
            appareilInput.value = ""
        })
        document.querySelector('#appareilDetails').removeAttribute("open")
        document.querySelector('#ustensilDetails').removeAttribute("open")
        document.querySelector('#appareilContainer').style.left = document.querySelector('#ingredientDetails').offsetWidth+10+'px'
        document.querySelector('#ustensilContainer').style.left = document.querySelector('#ingredientDetails').offsetWidth+document.querySelector('#appareilDetails').offsetWidth+20+'px'
        ustensilInput.setAttribute("placeHolder", "Rechercher un ustensils");
        ustensilInput.setAttribute("disabled", true);
        ustensilInput.style.pointerEvents = "none";
        appareilInput.setAttribute("placeHolder", "Rechercher un appareils");
        appareilInput.setAttribute("disabled", true);
        appareilInput.style.pointerEvents = "none";
        setTimeout(() =>{
            if(document.querySelector('#ingredientDetails').hasAttribute("open")){
                document.querySelector('#appareilContainer').style.left = document.querySelector('#ingredientDetails').offsetWidth+10+'px'
                document.querySelector('#ustensilContainer').style.left = document.querySelector('#ingredientDetails').offsetWidth+document.querySelector('#appareilDetails').offsetWidth+20+'px'
                input.setAttribute("placeHolder", "Rechercher un ingredient");
                input.removeAttribute("disabled");
                input.style.removeProperty("pointer-events");
            }else{
                document.querySelector('#appareilContainer').style.left = document.querySelector('#ingredientDetails').offsetWidth+10+'px'
                document.querySelector('#ustensilContainer').style.left = document.querySelector('#ingredientDetails').offsetWidth+document.querySelector('#appareilDetails').offsetWidth+20+'px'
                input.setAttribute("placeHolder", "Ingredients");
                input.setAttribute("disabled", true);
                input.value = ""
                input.style.pointerEvents = "none";
            }
        }, 100);
    }
    if(clicked == document.getElementById('appareilDetails')) {
        itemsToShow.forEach(item =>{
            item.style.display = ""
            input.value = ""
            ustensilInput.value = ""
        })
        document.querySelector('#ingredientDetails').removeAttribute("open")
        document.querySelector('#ustensilDetails').removeAttribute("open")
        document.querySelector('#appareilContainer').style.left = document.querySelector('#ingredientDetails').offsetWidth+10+'px'
        document.querySelector('#ustensilContainer').style.left = document.querySelector('#ingredientDetails').offsetWidth+document.querySelector('#appareilDetails').offsetWidth+20+'px'
        ustensilInput.setAttribute("placeHolder", "Ustensils");
        ustensilInput.setAttribute("disabled", true);
        ustensilInput.style.pointerEvents = "none";
        input.setAttribute("placeHolder", "Ingredients");
        input.setAttribute("disabled", true);
        input.style.pointerEvents = "none";
        setTimeout(() =>{
            if(document.querySelector('#appareilDetails').hasAttribute("open")){
                document.querySelector('#ustensilContainer').style.left = document.querySelector('#ingredientDetails').offsetWidth+document.querySelector('#appareilDetails').offsetWidth+20+'px'
                appareilInput.setAttribute("placeHolder", "Rechercher un appareil");
                appareilInput.removeAttribute("disabled");
                appareilInput.style.removeProperty("pointer-events");
            }else{
                document.querySelector('#ustensilContainer').style.left = document.querySelector('#ingredientDetails').offsetWidth+document.querySelector('#appareilDetails').offsetWidth+20+'px'
                appareilInput.setAttribute("placeHolder", "Appareils");
                appareilInput.value = ""
                appareilInput.setAttribute("disabled", true);
                appareilInput.style.pointerEvents = "none";
            }
        }, 100);
    }
    if(clicked == document.getElementById('ustensilDetails')){
        itemsToShow.forEach(item =>{
            item.style.display = ""
            input.value = ""
            appareilInput.value = ""
        })
        document.querySelector('#appareilDetails').removeAttribute("open")
        document.querySelector('#ingredientDetails').removeAttribute("open")
        document.querySelector('#appareilContainer').style.left = document.querySelector('#ingredientDetails').offsetWidth+10+'px'
        document.querySelector('#ustensilContainer').style.left = document.querySelector('#ingredientDetails').offsetWidth+document.querySelector('#appareilDetails').offsetWidth+20+'px'
        input.setAttribute("placeHolder", "Ingredients");
        input.setAttribute("disabled", true);
        input.style.pointerEvents = "none";
        appareilInput.setAttribute("placeHolder", "Appareils");
        appareilInput.setAttribute("disabled", true);
        appareilInput.style.pointerEvents = "none";
        setTimeout(() =>{
            if(document.querySelector('#ustensilDetails').hasAttribute("open")){
                ustensilInput.setAttribute("placeHolder", "Rechercher un ustensil");
                ustensilInput.removeAttribute("disabled");
                ustensilInput.style.removeProperty("pointer-events");
            }else{
                ustensilInput.setAttribute("placeHolder", "Ustensils");
                ustensilInput.setAttribute("disabled", true);
                ustensilInput.style.pointerEvents = "none";
                ustensilInput.value = ""
            }
        }, 100);
    }
}

// Fonction de recherche
const searchInput = document.getElementById("mainSearch");
searchInput.addEventListener("input", mainSearchFunction)
let recipeBuffer = []
function mainSearchFunction(){
    if(searchInput.value.length>2){
        searchInput.addEventListener('keyup', function ( event ) { 
            event.preventDefault();
        });
        let filter = searchInput.value.toUpperCase();
        for (let i = 0; i < recipes.length; i++){
            if(recipes[i].name.toUpperCase().includes(filter)){
                recipeBuffer.push(recipes[i])
            }
        }
        for (let i = 0; i < recipes.length; i++){
            if(recipes[i].description.toUpperCase().includes(filter)){
                if(!recipeBuffer.includes(recipes[i])) recipeBuffer.push(recipes[i])
            }
        }
        recipeList = recipeBuffer
    }else{
        recipeList = recipes
    }
    var ingredientChild = ingredientListElement.lastElementChild; 
        while (ingredientChild) {
            ingredientListElement.removeChild(ingredientChild);
            ingredientChild = ingredientListElement.lastElementChild;
        }
        ingredientList = []
        createIngredient()
        var applianceChild = appareilListElement.lastElementChild; 
        while (applianceChild) {
            appareilListElement.removeChild(applianceChild);
            applianceChild = appareilListElement.lastElementChild;
        }
        appareilList = []
        createAppliance()
        var ustensilChild = ustensilListElement.lastElementChild; 
        while (ustensilChild) {
            ustensilListElement.removeChild(ustensilChild);
            ustensilChild = ustensilListElement.lastElementChild;
        }
        ustensilList = []
        createUstensil()
        document.querySelector('#appareilContainer').style.left = document.querySelector('#ingredientDetails').offsetWidth+10+'px'
        document.querySelector('#ustensilContainer').style.left = document.querySelector('#ingredientDetails').offsetWidth+document.querySelector('#appareilDetails').offsetWidth+20+'px'
        recipeBuffer = []
        filtreResults()
    
}