const searchPrompt = document.querySelector('header .searchbox input');         // Строка поиска
const searchResultBlock = document.querySelector('header .searchbox .result');  // Блок результов поиска

searchPrompt.addEventListener('input', search);

function search(event) {

    let input = event.target.value.toLowerCase();       // Вводимое значение. Символы сразу переводятся в нижний регистр 
    searchResultBlock.innerHTML = '';                   // Очистка результатов поиска перед новым их выводом

    if (input.length > 0) {                             // Если в строке поиска есть текст, то 

        searchResultBlock.style.display = 'flex';       // Включить отображение блоку результатов 
        for (prod in products) {

            if (products[prod].name.toLowerCase().indexOf(input) >= 0) {
                // Поиск по названиям товаров в нижнем регистре
                
                searchResultBlock.insertAdjacentHTML('beforeEnd', `<div>${products[prod].name}</div>`);
                searchResultBlock.lastChild.addEventListener('click', products[prod].showDetails);
                // Если есть совпадение, то добавить строку с результатом поиска
                // Так же добавить этой строке "ссылку" на подробное описание 
            }
        }
    }

    else {
        searchResultBlock.style.display = 'none';
    }
}