import {recipes} from './recipes.js';

let recipeList = recipes

const deleteItemFunction = e => {
    const index = selected.indexOf(e.target.parentNode.firstChild.innerHTML)
    selected.splice(index,1)
    e.target.parentNode.remove()
    document.getElementById(e.target.parentNode.firstChild.innerHTML).style.color = "white"
}

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
    }
}

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
        if(!ustensilList.includes(ustensil)){
            ustensilList.push(ustensil)
            let ustensilName = document.createElement("p");
            ustensilName.innerHTML = ustensil
            ustensilName.setAttribute("class", "itemName")
            ustensilName.addEventListener("click", selectItem);
            ustensilListElement.appendChild(ustensilName)
        }
    });
}
createUstensil()

const input = document.getElementById("ingredientSearch");
const appareilInput = document.getElementById('appareilSearch')
const ustensilInput = document.getElementById('ustensilSearch')
input.addEventListener("input", searchFunction)
appareilInput.addEventListener("input", searchFunction)
ustensilInput.addEventListener("input", searchFunction)
let itemsToShow = document.querySelectorAll(".itemName");
function searchFunction(e) {
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

const searchInput = document.getElementById("mainSearch");
searchInput.addEventListener("input", mainSearchFunction)
let recipeBuffer = []
function mainSearchFunction(){
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
}