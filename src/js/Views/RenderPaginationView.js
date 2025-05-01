import ParentView from "./ParentView";
import icons from 'url:../../img/icons.svg'

class RenderPaginationView extends ParentView {
    _parentElement =  document.querySelector('.pagination');

    addHandlerPage(handler) {
       this._parentElement.addEventListener('click', function(e) {
        const clicked = e.target.closest('.btn--inline');
        if(!clicked) return
        console.log(clicked)
        const gotopage = +clicked.dataset.gotopage
        return handler(gotopage)
       })

    }

    _generateHTML() {
        console.log(this._data)
        const curPage = this._data.page
        const numPage = Math.ceil(this._data.results.length / this._data.resultPerPage)
        console.log(curPage, numPage)

        if(curPage === 1 && numPage > curPage) {
          return `
             <button class="btn--inline pagination__btn--next" data-gotopage= ${curPage + 1}>
                <span>Page ${curPage + 1}</span>
                <svg class="search__icon">
                  <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>
            `
        }

        if(curPage < numPage) {
            return `
            <button class="btn--inline pagination__btn--prev" data-gotopage= ${curPage - 1}>
               <svg class="search__icon">
                 <use href="${icons}#icon-arrow-left"></use>
               </svg>
               <span>Page ${curPage - 1}</span>
             </button>
             <button class="btn--inline pagination__btn--next" data-gotopage= ${curPage + 1}>
               <span>Page ${curPage + 1}</span>
               <svg class="search__icon">
                 <use href="${icons}#icon-arrow-right"></use>
               </svg>
             </button>
           `
        }

        if(curPage === numPage && numPage > 1) {
            return `
           <button class="btn--inline pagination__btn--prev" data-gotopage= ${curPage - 1}>
               <svg class="search__icon">
                 <use href="${icons}#icon-arrow-left"></use>
               </svg>
               <span>Page ${curPage - 1}</span>
             </button> 
            `
        }

        return '';  
    }
}

export default new RenderPaginationView()