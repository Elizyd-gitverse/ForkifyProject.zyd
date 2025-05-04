import ParentView from './ParentView';
import icons from '../../img/icons.svg'
import fracty from 'fracty'


console.log('icon not visible i need to update it')

class RenderRecipeView extends ParentView {
    _parentElement =  document.querySelector('.recipe');
    _errMessage = 'No Recipe found for your Query, Please Try something else ;)'

     addHanlderLoad(handler) {       
       ['load', 'hashchange'].forEach(function(event) {return window.addEventListener(event, handler)})
     }

     addHandlerUpdateServing(handler) {
       this._parentElement.addEventListener('click', function(e) {
        const clicked = e.target.closest('.btn--tiny')
        console.log(clicked)
        if(!clicked) return
        const updateto = +clicked.dataset.updateto;
        if(updateto > 0) handler(updateto)
       })
     }

     addHandlerBookmark(handler) {
       this._parentElement.addEventListener('click', function(e) {
        const clicked = e.target.closest('.btn--bookmark')
        if(!clicked) return
        handler()
       })
     }


    _generateHTML() {
        return `
        <figure class="recipe__fig">
           <img src="${this._data.image}" alt="${this._data.title}" class="recipe__img" />
           <h1 class="recipe__title">
             <span>${this._data.title}</span>
           </h1>
         </figure>
 
         <div class="recipe__details">
           <div class="recipe__info">
             <svg class="recipe__info-icon">
               <use href="${icons}#icon-clock"></use>
             </svg>
             <span class="recipe__info-data recipe__info-data--minutes">${this._data.cookingTime}</span>
             <span class="recipe__info-text">minutes</span>
           </div>
           <div class="recipe__info">
             <svg class="recipe__info-icon">
               <use href="${icons}#icon-users"></use>
             </svg>
             <span class="recipe__info-data recipe__info-data--people">${this._data.servings}</span>
             <span class="recipe__info-text">servings</span>
 
             <div class="recipe__info-buttons">
               <button class="btn--tiny btn--increase-servings" data-updateto=${this._data.servings - 1}>
                 <svg>
                   <use href="${icons}#icon-minus-circle"></use>
                 </svg>
               </button>
               <button class="btn--tiny btn--increase-servings" data-updateto=${this._data.servings + 1}>
                 <svg>
                   <use href="${icons}#icon-plus-circle"></use>
                 </svg>
               </button>
             </div>
           </div>
 
           <div class="recipe__user-generated">
             <svg>
               <use href="${icons}#icon-user"></use>
             </svg>
           </div>
           <button class="btn--bookmark btn--round">
             <svg class="">
               <use href="${icons}#icon-bookmark${this._data.bookmarked === true ? '-fill' : ''}"></use>
             </svg>
           </button>
         </div>
 
         <div class="recipe__ingredients">
           <h2 class="heading--2">Recipe ingredients</h2>
           <ul class="recipe__ingredient-list">
            ${this._data.ingredients.map(function(ing) {
              return`
              <li class="recipe__ingredient">
               <svg class="recipe__icon">
                 <use href="${icons}#icon-check"></use>
               </svg>
               <div class="recipe__quantity">${ing.quantity ? fracty(ing.quantity).toString() : ''}</div>
               <div class="recipe__description">
                 <span class="recipe__unit">${ing.unit}</span>
                ${ing.description}
               </div>
             </li>
              `
            }).join('')} 
           </ul>
         </div>
 
         <div class="recipe__directions">
           <h2 class="heading--2">How to cook it</h2>
           <p class="recipe__directions-text">
             This recipe was carefully designed and tested by
             <span class="recipe__publisher">${this._data.publisher}</span>. Please check out
             directions at their website.
           </p>
           <a
             class="btn--small recipe__btn"
             href="${this._data.sourceUrl}"
             target="_blank"
           >
             <span>Directions</span>
             <svg class="search__icon">
               <use href="${icons}#icon-arrow-right"></use>
             </svg>
           </a>
         </div>
       `
    }
}

export default new RenderRecipeView()