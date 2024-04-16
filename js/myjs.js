

$("#openlist").click(function(){
    $("#list").toggle(1000)
   })

   $(document).ready(() =>{
      $("#list").fadeOut(300)
      getAllMeals()
   })

async function getAllMeals( ){

   let mealsApi = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
   let finalresult = (await mealsApi.json()).meals;
   disPlayMeals(finalresult)
   

}




// function search(){
//    getMeals(`www.themealdb.com/api/json/v1/1/categories.php`);

//}

//console.log(search());

// async function menio ()
// {
//    await getMeals('')
//    await getMeals('Arrabiata')
//    await getMeals('Categories')
//    await getMeals('Area')
//    await getMeals('Ingredients')
// }

const rowData = document.getElementById('rowData')
const rowData2 = document.getElementById('rowData2')
function disPlayMeals(x){
   
   let mealBox = ``;
   for(i=0;i< x.length;i++){
      mealBox+=`<div  class="col-md-3 my-3 text-white">
      <div class="card bg-black position-relative" onclick="getMealDetails(${x[i].idMeal})">
        <img src="${x[i].strMealThumb}" class="card-img-top" alt="...">
        <div id="backg" class="meal-layer position-absolute d-flex align-items-center text-black p-2" ">
        <h3 class="position-absolute top-50">${x[i].strMeal}</h3>
        </div>
      </div>
    </div>`
   }
   rowData.innerHTML = mealBox
}

async function getMealDetails(mealId){
   let result = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
   let data = await result.json()
   displayMealDetails(data.meals[0])
}

function displayMealDetails(mealItem){
   rowData.innerHTML = ``;
   const ingBox = handleIngredients(mealItem);
   
   let mealBox = `
   <div class="col-md-4">
   <img class="w-100 rounded-3" src="${mealItem.strMealThumb}" alt="">
       <h2>${mealItem.strMeal}</h2>
</div>
<div class="col-md-8 text-white">
   <h2>Instructions</h2>
   <p>${mealItem.strInstructions}</p>
   <h3><span class="fw-bolder">Area : </span>${mealItem.strArea}</h3>
   <h3><span class="fw-bolder">Category : </span>${mealItem.strCategory}</h3>
   <h3>Recipes :</h3>
   <ul class="list-unstyled d-flex g-3 flex-wrap">
      ${ingBox}
    </ul>

   <h3>Tags :</h3>
   <ul class="list-unstyled d-flex g-3 flex-wrap">          
<li class="alert alert-danger m-2 p-1">${mealItem.strTags}</li>
   </ul>

   <a target="_blank" href="${mealItem.strSource}" class="btn btn-success">Source</a>
   <a target="_blank" href="${mealItem.strYoutube}" class="btn btn-danger">Youtube</a>
</div>
`
rowData.innerHTML = mealBox;

}

function handleIngredients(mealItem){
   let ingBox = ``
   for(let i=1;i<=20;i++){
      let ingName = "strIngredient"+i;
      let currentIng = mealItem[ingName]
      if(currentIng == "") break
      ingBox +=`<li class="alert alert-info m-2 p-1">${currentIng}</li>`

   }
   return ingBox;
}


async function getMealCategories()
{
   let mealsApi = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
   data = await mealsApi.json()
   console.log(data);
   getCategories(data.categories)
}


function getCategories(mealItem)
{
   rowData.innerHTML = ``
   let mealBox = ``

   for(i = 0; i < mealItem.length; i++ )
   {
      mealBox += `<div class="col-md-3 text-white">
       <div onclick="getTypeOfMeals('${mealItem[i].strCategory}')" class="card bg-black position-relative">
           <img class="w-100" src="${mealItem[i].strCategoryThumb}" alt="" srcset="">
           <div id="backg" class="meal-layer position-absolute d-flex flex-column text-black p-2">
               <h3 class="text-center">${mealItem[i].strCategory}</h3>
               <p>${mealItem[i].strCategoryDescription}</p>
           </div>
       </div>
    </div>`

   }
rowData.innerHTML = mealBox
// console.log(rowData);
}



async function getTypeOfMeals(x)
{
   let beefApi = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${x}`)
   let result = await beefApi.json()

   disPlayMeals(result.meals)
   

}








async function getAreaMeal()
{
   let getArea = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
   let result = await getArea.json()
   console.log(result);
   (displayAriameals(result.meals))
}
console.log( getAreaMeal());


function displayAriameals(x)
{
   let mealBox= ``;
   rowData.innerHTML = ``
   for(i=0;i<x.length ;i++)
   {
      mealBox +=`<div class="col-md-3 text-white">
    <div onclick="getMealsForAria('${x[i].strArea}')" class="rounded-2 text-center cursor-pointer">
            <i class="fa-solid fa-house-laptop fa-4x"></i>
            <h3>${x[i].strArea}</h3>
    </div>
</div>`
   }
   rowData.innerHTML = mealBox
}

async function getMealsForAria(x)
{
   let getAreas = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${x}`)
   let result = await getAreas.json()
   console.log(result);
   disPlayMeals(result.meals)
}




async function getInGredients(x)
{
   let getGred = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=${x}`)
   let result = await getGred.json()
   console.log(result);
   displaygetGred(result.meals)

}



function displaygetGred(x)
{
   let mealBox= ``;
   rowData.innerHTML = ``
   for(i=0;i<x.length ;i++)
   {
      if(x[i].idIngredient > 25){
         continue
      }
      mealBox +=`<div class="col-md-3 text-white d">
    <div onclick="getIngredientsMeals('${x[i].strIngredient}')"" class="rounded-2 text-center cursor-pointer">
            <i class="fa-solid fa-drumstick-bite fa-4x"></i>
            <h3>${x[i].strIngredient}<h3>
            <h3 class="h3-h3">${x[i].strDescription?.substring(0, 100)}</h3>
    </div>
</div>`
   }
   rowData.innerHTML = mealBox
}




async function getIngredientsMeals(x)
{
   geting = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${x}`)
   result = await geting.json()
   console.log(result);
   disPlayMeals(result.meals)
   searchByName(result.meals)

}


let meals = [];
async function getBysearch()
{
   search = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
   result = await search.json()
   meals = result.meals
   console.log(result.meals)
      showSearchInputs(result.meals)
}
getBysearch()




function searchByName(x)
{
   rowData2.innerHTML = ``
   box =``
   for(i=0;i<x.length;i++)
   {
      box+=`<div  class="col-md-3 my-3 text-white">
      <div class="card bg-black position-relative" onclick="getMealDetails(${x[i].idMeal})">
      <img src="${x[i].strMealThumb}" class="card-img-top" alt="...">
        <div id="backg" class="meal-layer position-absolute d-flex align-items-center text-black p-2" ">
        <h3 class="position-absolute top-50">${x[i].strMeal}</h3>
        </div>
      </div>
    </div>`
    
   }
   rowData2.innerHTML = box 
   console.log(box);
   
}

function showSearchInputs()
{
   rowData.innerHTML=``
   searchBox = ``
   mealBox = ``
      searchBox +=`
      <div class="row py-4 ">
          <div class="col-md-6 ">
              <input onkeyup="searchMealByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
          </div>
          <div class="col-md-6">
              <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
          </div>
      </div>`
   rowData.innerHTML = searchBox
}

function searchMealByName(string) {

   rowData2.innerHTML = ``
   box =``
   for(i=0;i<meals.length;i++)
   {
      if(meals[i].strMeal.includes(string)) {
      
               box+=`<div  class="col-md-3 my-3 text-white">
      <div class="card bg-black position-relative" onclick="getMealDetails(${meals[i].idMeal})">
      <img src="${meals[i].strMealThumb}" class="card-img-top" alt="...">
        <div id="backg" class="meal-layer position-absolute d-flex align-items-center text-black p-2" ">
        <h3 class="position-absolute top-50">${meals[i].strMeal}</h3>
        </div>
      </div>
    </div>`
      }
      
   }
   rowData2.innerHTML = box 

  }

  function searchByFLetter(string) { 
   rowData2.innerHTML = ``
   box =``
   for(i=0;i<meals.length;i++)
   {
      if(Array.from(meals[i].strMeal)[0].toLowerCase() === string.toLowerCase()) {
      
               box+=`<div  class="col-md-3 my-3 text-white">
      <div class="card bg-black position-relative" onclick="getMealDetails(${meals[i].idMeal})">
      <img src="${meals[i].strMealThumb}" class="card-img-top" alt="...">
        <div id="backg" class="meal-layer position-absolute d-flex align-items-center text-black p-2" ">
        <h3 class="position-absolute top-50">${meals[i].strMeal}</h3>
        </div>
      </div>
    </div>`
      }
   
   }
   rowData2.innerHTML = box 
   }