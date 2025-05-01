import { getJson } from "./helperFunction.js"
import { API_URL } from './config.js'
export const state = {
    recipe: {},
    search: {
        results: [],
        page: 1,
        resultPerPage: 10
    },
    bookmarkArr: []
}

export const loadRecipe = async function(id) {
    try {
         const data = await getJson(`${API_URL}${id}`)
              
         const { recipe } = data.data
         state.recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url.replace('http://', 'https://'),
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients,
          }
          console.log(state.recipe)

          if(state.bookmarkArr.some(function(bookmark) {return bookmark.id === id})) state.recipe.bookmarked = true
          else state.recipe.bookmarked = false
        
    }catch(err) {
        throw err
    }
}

export const loadSearch = async function(query) {
    try{
      const data = await getJson(`${API_URL}?search=${query}`)  
     
      state.search.results = data.data.recipes.map(function(recipe) {
        return {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            image: recipe.image_url.replace('http://', 'https://'),
        }
      })
    }catch(err) {
       throw err
    }
}

export const searchPerPage = function(page = state.search.page) {
 state.search.page = page
 const start = (page - 1) * state.search.resultPerPage
 const end = page * state.search.resultPerPage
 return state.search.results.slice(start, end)
}

export const updateServing = function(updateserve) {
  state.recipe.ingredients.map(function(ing) {
    return ing.quantity = (ing.quantity * updateserve) / state.recipe.servings
  })

  return state.recipe.servings = updateserve
}

const storeBookmark = function() {
    localStorage.setItem('bookmarkarr', JSON.stringify(state.bookmarkArr))
}

export const addBookmark = function(recipe) {
  console.log(recipe)
  state.bookmarkArr.push(recipe)
  if(state.recipe.id === recipe.id) return state.recipe.bookmarked = true
  storeBookmark()
}

export const removeBookmark = function(id) {
    const index = state.bookmarkArr.findIndex(function(bookmark) {
        return bookmark.id === id
    })

    state.bookmarkArr.splice(index, 1)
    if(state.recipe.id === id) return state.recipe.bookmarked = false
    storeBookmark()
}

const getstoreBookmark = function() {
    const data = JSON.parse(localStorage.getItem('bookmarkarr'))
    console.log(data)
    if(data) state.bookmarkArr = data
}
getstoreBookmark()



