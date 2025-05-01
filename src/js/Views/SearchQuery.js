class SearchQuery {
    _parentElement =  document.querySelector('.search');

    getQuery() {
        const query = this._parentElement.querySelector('.search__field').value
        console.log(query)
        this._parentElement.querySelector('.search__field').value = ''
        return query
    }

    addHandlerQuery(handler) {
        this._parentElement.addEventListener('submit', function(e) {
            e.preventDefault()
            handler()
        })
    }
}
export default new SearchQuery()