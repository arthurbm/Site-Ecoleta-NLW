function populateUFs() {
    const ufSelect = document.querySelector('select[name=uf]')

    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    //Essa é uma forma simplificada, a forma mesmo seria (res) => {return res.json()}
    .then( res => res.json() )
    .then( states => {

        for(state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }

    })
}

function getcities(event) {
    const citySelect = document.querySelector('select[name=city]')
    const stateInput = document.querySelector('input[name=state]')

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const ufValue = event.target.value

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    fetch(url)
    //Essa é uma forma simplificada, a forma mesmo seria (res) => {return res.json()}
    .then( res => res.json() )
    .then( cities => {

        for(city of cities) {
            citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
        }

        citySelect.disabled = false

    })
}

populateUFs()


document.
   querySelector('select[name=uf]')
   //Não coloca parentese porque a função nao sera executada imediatamente, mas sim, só quando houver o change
    .addEventListener('change', getcities)

