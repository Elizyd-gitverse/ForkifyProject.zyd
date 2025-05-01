import 'core-js/stable'
import 'regenerator-runtime/runtime'
console.log('working fine')

import * as modal from './modal.js'
import RenderRecipeView from './Views/RenderRecipeView.js'
import SearchQuery from './Views/SearchQuery.js'
import renderSearchView from './Views/renderSearchView.js'
import RenderPaginationView from './Views/RenderPaginationView.js'
import RenderPaginationView from './Views/RenderPaginationView.js'
import RenderBookmarkView from './Views/RenderBookmarkView.js'
import addRecipeview from './Views/addRecipeview.js'


const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.jonas.io

///////////////////////////////////////

const LoadRecipe = async function() {
  try {
    const id = window.location.hash.slice(1)
    if(!id) return;
    RenderRecipeView.renderSpinner()
    await modal.loadRecipe(id)
    RenderRecipeView.render(modal.state.recipe)
    renderSearchView.update(modal.searchPerPage())
    RenderBookmarkView.update(modal.state.bookmarkArr)
  }catch(err) {
    RenderRecipeView.renderErr()
  }
};


const LoadSearchQuery = async function() {
  try{
    const query = SearchQuery.getQuery()
    console.log(query)
    renderSearchView.renderSpinner()
    await modal.loadSearch(query)
    renderSearchView.render(modal.searchPerPage())
    RenderPaginationView.render(modal.state.search)
  }catch(err) {
    renderSearchView.renderErr()
  }
}

const Pagination = function(gotoPage) {
   console.log(gotoPage)
   renderSearchView.render(modal.searchPerPage(gotoPage))
   RenderPaginationView.render(modal.state.search)
}

const UpdateServing = function(updateto) {
  modal.updateServing(updateto)
  RenderRecipeView.update(modal.state.recipe)
}

const controlBookMark = function() { 
    if(!modal.state.recipe.bookmarked) modal.addBookmark(modal.state.recipe)
      else modal.removeBookmark(modal.state.recipe.id)
     RenderRecipeView.update(modal.state.recipe)
     RenderBookmarkView.render(modal.state.bookmarkArr)
}

const controlBookmarked = function() {
  RenderBookmarkView.render(modal.state.bookmarkArr)
}





const init = function() {
  RenderRecipeView.addHanlderLoad(LoadRecipe)
  RenderRecipeView.addHandlerUpdateServing(UpdateServing)
  SearchQuery.addHandlerQuery(LoadSearchQuery)
  RenderPaginationView.addHandlerPage(Pagination)
  RenderRecipeView.addHandlerBookmark(controlBookMark)
  RenderBookmarkView.addHandlerBookmarked(controlBookmarked)
}
init()



