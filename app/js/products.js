const htmlProducts = document.querySelectorAll('.product');     // Выбор всех карточек товаров для дальнейшей обработки
let products = [];          // Список, в котором будут храниться объекты продуктов
let cathegories = [];       // Список категорий, по которому будет происходить сортировка

function Product(prod) {        // Конструктор объекта товара

    this.id = Number(prod.getAttribute('data-product-id'));
    this.price = Number(prod.getAttribute('data-product-price'));
    this.cathegory = prod.getAttribute('data-product-cathegory');       // Получение значений из атрибутов HTML

    // Категория и цена будут отображаться на основе значения атрибутов
    this.name = prod.querySelector('h3').innerText;                 // Получение имени из заголовка товара
    this.htmlCathegory = prod.querySelector('.cathegory span');     // Получение HTML-ссылки на название категории
    this.htmlPrice = prod.querySelector('.price');                  // Цена
    this.buttonBuy = prod.querySelector('.buy');                    // Получение кнопки "Купить"
    this.buttonDetails = prod.querySelector('.details');            // Кнопка "Подробнее"
    
    this.htmlCathegory.innerText = this.cathegory;
    this.htmlPrice.innerText = this.price + ' Р'

    this.buttonBuy.addEventListener('click', () => {
        console.log(this.name + ' added to shopcart');
    });

    this.buttonDetails.addEventListener('click', () => {
        console.log(this.name + ': details are required');
    });
}

function initProducts() {

    products = [];      // Очистка списков на случай,
    cathegories = [];   // если эта функция будет вызываться повторно

    for (let n = 0; n < htmlProducts.length; n++) {
        let prod = new Product(htmlProducts[n]);
        products.push(prod);

        if (cathegories.indexOf(prod.cathegory) === -1) {       // Если категории товара ещё нет в списке, то добавить её
            cathegories.push(prod.cathegory);
        }
    }

}

function initSortButtons() {
    const htmlSortButtons = document.querySelectorAll('.products .headpanel .menu button');
    
    for (let n = 0; n < htmlSortButtons.length; n++) {
        htmlSortButtons[n].addEventListener('click', sortProducts);
    }
}

initProducts();
initSortButtons();

function sortProducts(event) {

    let cathegory = event.target.getAttribute('data-product-cathegory');
    console.log('Sorting by cathegory: ' + cathegory);

    if (cathegory === 'all') {

        for (let n = 0; n < htmlProducts.length; n++) {
            htmlProducts[n].style.display = 'flex';
        }
    }

    else {

        for (let n = 0; n < htmlProducts.length; n++) {
            if (htmlProducts[n].getAttribute('data-product-cathegory') === cathegory) {
                htmlProducts[n].style.display = 'flex';
            }
            else {
                htmlProducts[n].style.display = 'none';
            }
        }
    }
}