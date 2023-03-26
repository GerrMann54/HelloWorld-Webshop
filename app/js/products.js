const htmlProducts = document.querySelectorAll('.products .product');     // Выбор всех карточек товаров для дальнейшей обработки
let products = [];          // Список, в котором будут храниться объекты продуктов
let cathegories = [];       // Список категорий, по которому будет происходить сортировка

const blackbanner = document.querySelector('.blackbanner');
const detailsWindow = document.querySelector('.blackbanner .details')

function Product(prod) {        // Конструктор объекта товара

    this.htmlObject = prod;
    this.product_id = Number(prod.getAttribute('data-product-id'));
    this.price = Number(prod.getAttribute('data-product-price'));
    this.cathegory = prod.getAttribute('data-product-cathegory');       // Получение значений из атрибутов HTML

    // Категория и цена будут отображаться на основе значения атрибутов
    this.name = prod.querySelector('h3').innerText;                 // Получение имени из заголовка товара
    this.htmlCathegory = prod.querySelector('.cathegory span');     // Получение HTML-ссылки на название категории
    this.htmlPrice = prod.querySelector('.price');                  // Цена
    this.buttonBuy = prod.querySelector('.buy');                    // Кнопка "Купить"
    this.buttonDetails = prod.querySelector('.details');            // Кнопка "Подробнее"
    
    this.htmlCathegory.innerText = this.cathegory;
    this.htmlPrice.innerText = this.price + ' Р'

    this.closeDetails = () => {

        blackbanner.style.display = 'none';
        detailsWindow.style.display = 'none';       // Отключение видимости блоков

        this.buttonBuyB.classList.remove('inshopcart')
        this.buttonBuyB.innerHTML = 'В корзину';
        this.buttonBuyB.removeEventListener('click', this.addToCart);
        this.buttonCloseDetails.removeEventListener('click', this.closeDetails);
        this.detailsTxtContainer.remove();
        delete this.buttonBuyB;        
        delete this.buttonCloseDetails;
        delete this.detailsWindow;
        delete this.detailsTxtContainer;
        // Удаление всех связей с окном подробной информации
    }

    this.showDetails = () => {

        console.log(this.name + ': details are required');
        blackbanner.style.display = 'flex';
        detailsWindow.style.display = 'block';       // Установка видимости для бока подробной информации

        this.buttonBuyB = document.querySelector('.blackbanner .details .buy');
        this.buttonBuyB.addEventListener('click', this.addToCart);       // Создание ссылки на кнопку "Купить" и добавление ей слушателя событий

        this.buttonCloseDetails = document.querySelector('.blackbanner .details .close');
        this.buttonCloseDetails.addEventListener('click', this.closeDetails);

        document.querySelector('.blackbanner .details .price').innerText = this.price + ' Р';

        this.detailsWindow = document.querySelector('.blackbanner .details .product')       // Место, куда вставлять текстоый контейнер для подробного описания
        this.detailsWindow.insertAdjacentHTML('beforeEnd', `<div class="txt-container"></div>`);
        this.detailsTxtContainer = this.detailsWindow.querySelector('.txt-container');      // Создание текстового контейнера
        
        for (n in productData) {        // Перебор ID из "пришедших" данных
            if (n == this.product_id) {         // Если ID данных и ID Товара совпадают, то
                for (let element in productData[n]) {       // В текстовый контейнер добавить все элементы массива, который соответствует ID данных
                    this.detailsTxtContainer.insertAdjacentHTML('beforeEnd', productData[n][element]);
                }
            }
        }
        shopCart.update();
    }

    this.addToCart = () => {

        console.log(this.name + ' added to shopcart');
        shopCart.add(this.product_id);
    }

    this.buttonBuy.addEventListener('click', this.addToCart);
    this.buttonDetails.addEventListener('click', this.showDetails);
  
}

function initProducts() {

    products = [];      // Очистка списков на случай, если эта функция будет вызываться повторно

    for (let n = 0; n < htmlProducts.length; n++) {         // Инициализация товаров
        let prod = new Product(htmlProducts[n]);
        products.push(prod);
    }

}

function initSortButtons() {
    const htmlSortButtons = document.querySelectorAll('.products .headpanel .menu button');
    
    for (let n = 0; n < htmlSortButtons.length; n++) {
        htmlSortButtons[n].addEventListener('click', sortProducts);         // Инициализация кнопок сортировки
    }
}

initProducts();
initSortButtons();

function sortProducts(event) {

    let cathegory = event.target.getAttribute('data-product-cathegory');     // Получение имени категории из нажатой кнопки
    console.log('Sorting by cathegory: ' + cathegory);

    if (cathegory === 'all') {

        for (let prod in products) {
            products[prod].htmlObject.style.display = 'flex';       // Если нажата кнопка "Все категории, то роказать все товары"
        }
    }

    else {      // Иначе показывать товары, категория которых совпадает с категорией кнопки

        for (let prod in products) {
            if (products[prod].htmlObject.getAttribute('data-product-cathegory') === cathegory) {
                products[prod].htmlObject.style.display = 'flex';       // Если категории совпадают, то показывать товар
            }
            else {
                products[prod].htmlObject.style.display = 'none';       // Иначе скрыть его
            }
        }
    }
}

// По идее, эти данные должны в JSON формате присылаться с сервера.
// Однако, этот проект не предполагает использование сервера.
// Поэтому, эти данные для подробного описания будут записаны здесь и итолько для нескольких товаров.
const productData = 
{
    0: [        // Обозначает ID товара
        // Данные "приходят" в виде массива с HTML элементами
        "<h3>Базовая вёрстка HTML5 + CSS3</h3>",
        "<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit deleniti minima magnam perspiciatis dignissimos maxime esse officia voluptates error iusto at, debitis ut ea qui exercitationem non ab eos commodi beatae, molestiae voluptatibus cumque! Ratione vitae mollitia expedita quibusdam consequatur.</p>",
            `<ul>
                <li>Lorem ipsum dolor sit amet</li>
                <li>Lorem ipsum dolor</li>
                <li>Lorem ipsum dolor sit</li>
                <li>Lorem sit amet</li>
                <li>Lorem amet</li>
                <li>Sit amet</li>
                <li>Dolor sit amet</li>
            </ul>`,
        '<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eos sequi quibusdam beatae saepe exercitationem esse doloribus ratione praesentium nostrum nemo earum ipsa harum ea, ex unde eum in laboriosam sunt molestias necessitatibus?</p>',
        '<p>Doloremque facere rerum sunt laudantium repellat aliquid voluptas voluptatem, quos similique consectetur nesciunt accusamus dolorum aut eius, repellendus amet iste soluta quo unde laboriosam commodi. Quibusdam, repellendus ducimus quae reiciendis a illo minus quam consequatur repellat eveniet quasi, blanditiis repudiandae, numquam at.</p>',
    ],
    1: [
        "<h3>Продвинутая вёрстка HTML5 + CSS3",
        '<img src="./img/logo.png">',
        "<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit deleniti minima magnam perspiciatis dignissimos maxime esse officia voluptates error iusto at, debitis ut ea qui exercitationem non ab eos commodi beatae, molestiae voluptatibus cumque! Ratione vitae mollitia expedita quibusdam consequatur.</p>",
        "<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit deleniti minima magnam perspiciatis dignissimos maxime esse officia voluptates error iusto at, debitis ut ea qui exercitationem non ab eos commodi beatae, molestiae voluptatibus cumque! Ratione vitae mollitia expedita quibusdam consequatur.</p>",
            `<ul>
                <li>Lorem ipsum dolor sit amet</li>
                <li>Lorem ipsum dolor</li>
                <li>Lorem ipsum dolor sit</li>
                <li>Lorem sit amet</li>
            </ul>`,
        '<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eos sequi quibusdam beatae saepe exercitationem esse doloribus ratione praesentium nostrum nemo earum ipsa harum ea, ex unde eum in laboriosam sunt molestias necessitatibus?</p>',
        '<p>Doloremque facere rerum sunt laudantium repellat aliquid voluptas voluptatem, quos similique consectetur nesciunt accusamus dolorum aut eius, repellendus amet iste soluta quo unde laboriosam commodi. Quibusdam, repellendus ducimus quae reiciendis a illo minus quam consequatur repellat eveniet quasi, blanditiis repudiandae, numquam at.</p>',
        '<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eos sequi quibusdam beatae saepe exercitationem esse doloribus ratione praesentium nostrum nemo earum ipsa harum ea, ex unde eum in laboriosam sunt molestias necessitatibus?</p>',
    ],
    2: [
        "<h3>Программирование на JavaScript",
        '<img src="./img/logo.png">',
        "<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit deleniti minima magnam perspiciatis dignissimos maxime esse officia voluptates error iusto at, debitis ut ea qui exercitationem non ab eos commodi beatae, molestiae voluptatibus cumque! Ratione vitae mollitia expedita quibusdam consequatur.</p>",
        "<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit deleniti minima magnam perspiciatis dignissimos maxime esse officia voluptates error iusto at, debitis ut ea qui exercitationem non ab eos commodi beatae, molestiae voluptatibus cumque! Ratione vitae mollitia expedita quibusdam consequatur.</p>",
            `<ul>
                <li>Lorem ipsum dolor sit amet</li>
                <li>Lorem ipsum dolor</li>
                <li>Lorem ipsum dolor sit</li>
                <li>Lorem sit amet</li>
                <li>Lorem ipsum dolor sit amet</li>
                <li>Lorem ipsum dolor</li>
                <li>Lorem ipsum dolor sit</li>
                <li>Lorem sit amet</li>
                <li>Lorem ipsum dolor sit amet</li>
                <li>Lorem ipsum dolor</li>
                <li>Lorem ipsum dolor sit</li>
                <li>Lorem sit amet</li>
            </ul>`,
        '<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eos sequi quibusdam beatae saepe exercitationem esse doloribus ratione praesentium nostrum nemo earum ipsa harum ea, ex unde eum in laboriosam sunt molestias necessitatibus?</p>',
        '<p>Doloremque facere rerum sunt laudantium repellat aliquid voluptas voluptatem, quos similique consectetur nesciunt accusamus dolorum aut eius, repellendus amet iste soluta quo unde laboriosam commodi. Quibusdam, repellendus ducimus quae reiciendis a illo minus quam consequatur repellat eveniet quasi, blanditiis repudiandae, numquam at.</p>',
        '<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eos sequi quibusdam beatae saepe exercitationem esse doloribus ratione praesentium nostrum nemo earum ipsa harum ea, ex unde eum in laboriosam sunt molestias necessitatibus?</p>',
        '<p>Doloremque facere rerum sunt laudantium repellat aliquid voluptas voluptatem, quos similique consectetur nesciunt accusamus dolorum aut eius, repellendus amet iste soluta quo unde laboriosam commodi. Quibusdam, repellendus ducimus quae reiciendis a illo minus quam consequatur repellat eveniet quasi, blanditiis repudiandae, numquam at.</p>',
        '<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eos sequi quibusdam beatae saepe exercitationem esse doloribus ratione praesentium nostrum nemo earum ipsa harum ea, ex unde eum in laboriosam sunt molestias necessitatibus?</p>',
    ],
};