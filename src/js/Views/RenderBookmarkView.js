import ParentView from "./ParentView";

class RenderBookmarkView extends ParentView {
    _parentElement =  document.querySelector('.bookmarks__list');
    _errMessage = 'No Bookmarked yet'

    addHandlerBookmarked(handler) {
      window.addEventListener('load', handler)
    }

    _generateHTML() {
     const id = window.location.hash.slice(1)

     return this._data.map(function(recipe) {
      return `
          <li class="preview">
            <a class="preview__link ${recipe.id === id ? 'preview__link--active' : ''}" href="#${recipe.id}">
              <figure class="preview__fig">
                <img src="${recipe.image}" alt="Test" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${recipe.title}</h4>
                <p class="preview__publisher">${recipe.publisher}</p>
              </div>
            </a>
          </li>
            `
        })
    }
}

export default new RenderBookmarkView()