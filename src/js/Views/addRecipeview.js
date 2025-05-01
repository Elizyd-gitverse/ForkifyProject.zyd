import ParentView from "./ParentView";

class AddRecipeView extends ParentView {
     _parentElement =  document.querySelector('.upload');
    _errMessage = 'No Bookmarked yet'
    _btnOpen = document.querySelector('.nav__btn--add-recipe')
    _btnClose = document.querySelector('.btn--close-modal')
    _modal = document.querySelector('.add-recipe-window')
    _overlay = document.querySelector('.overlay')

    constructor() {
        super()
        this._btnOpenModal()
        this._btnCloseModal()
    }


    _toggelModal() {
        this._modal.classList.toggle('hidden')
        this._overlay.classList.toggle('hidden')
    }

    _btnOpenModal() {
        this._btnOpen.addEventListener('click', this._toggelModal.bind(this))
    }

    _btnCloseModal() {
        this._btnClose.addEventListener('click', this._toggelModal.bind(this))
    }
}


export default new AddRecipeView