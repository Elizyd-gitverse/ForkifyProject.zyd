import { mark } from 'regenerator-runtime'
import icons from '../../img/icons.svg'
console.log(icons)




export default class ParentView {
  _data
  render(data) {
    if(data && (Array.from(data) && data.length === 0)) return this.renderErr()
    this._data = data
    const html = this._generateHTML()
    this._parentElement.innerHTML = ''
    this._parentElement.insertAdjacentHTML('afterbegin', html)
  }

  update(data) {
    this._data = data
    const markupHTML = this._generateHTML()
    const Dom = document.createRange().createContextualFragment(markupHTML)
    const newElement = Array.from(Dom.querySelectorAll('*'))
    const curElement = Array.from(this._parentElement.querySelectorAll('*'))

    newElement.forEach(function(newEl, key) {
        const curEl = curElement[key]

        if(!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== '') {
            curEl.textContent = newEl.textContent
        }

        if(!newEl.isEqualNode(curEl)) {
            Array.from(newEl.attributes).forEach(function(attr) {
              curEl.setAttribute(attr.name, attr.value)
            })
        }
    })
  }
    
  renderSpinner() {
    const html = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div> `
    
    this._parentElement.innerHTML = ''
    this._parentElement.insertAdjacentHTML('afterbegin', html)
  }
    
  renderErr(errMessage = this._errMessage) {
    const html = `
    <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${errMessage}</p>
      </div>
    `
    this._parentElement.innerHTML = ''
    this._parentElement.insertAdjacentHTML('afterbegin', html)
  }
}

