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

    citySelect.innerHTML = "<option value>Selecione a cidade</option>";
    citySelect.disabled = true;

    fetch(url)
    //Essa é uma forma simplificada, a forma mesmo seria (res) => {return res.json()}
    .then( res => res.json() )
    .then( cities => {
        for(city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false

    })
}

populateUFs()


document.
   querySelector('select[name=uf]')
   //Não coloca parenteses porque a função nao sera executada imediatamente, mas sim, só quando houver o change
    .addEventListener('change', getcities);

//Itens de coleta
//Pegar todos os li
const itensToCollect = document.querySelectorAll('.itens-grid li')

for (const item of itensToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

let selectedItems = [];
const collectedItens = document.querySelector('input[name=itens]');


function handleSelectedItem(event) {
    const itemLi = event.target;
    //Adicionar OU remover uma classe com javascript (Se tiver ele adiciona, se não tiver ele remove)
    itemLi.classList.toggle("selected");
    
    const itemId = itemLi.dataset.id;

    //Verificar se existem items selecionados, se sim
    //pegar os items selecionados

    //Podia ser assim: const alreadySelected = selectedItems.findIndex(item => item == itemId);
    const alreadySelected = selectedItems.findIndex(item => {
        const itemFound = item == itemId; 
        return itemFound;
    });

    
    if (alreadySelected >= 0) {
        //Tirar da seleção
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId;
            //Se for true, pode adicionar no novo array, se for false não pode
            //Na prática, ele só vai tirar o ítem que está sendo clicado
            return itemIsDifferent;
        })

        selectedItems = filteredItems;
    } else {
        selectedItems.push(itemId);
    }
    
    //Atualizar o campo escondido com os items selecionados
    collectedItens.value = selectedItems;
}
