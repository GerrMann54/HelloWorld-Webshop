const cartWindow = document.querySelector('.blackbanner .shopcart')

function ShopCart() {

    this.productIdList = [];        // Этот список нужен лишь для того, чтобы удобно по нему добавлять товары в основной список
    this.productList = [];          // Основной список, где будут храниться добавленные товары
    this.sum = 0;                   // Сумма стоимости всех товаров
    this.button = document.querySelector('header .shopcart .cart-img-container'); 
    this.buttonClose = document.querySelector('.blackbanner .shopcart .close');     // кнопки открытия и закрытия меню корзины
    this.htmlList = document.querySelector('.blackbanner .shopcart .list');         // Список товаров, отображаемый в меню корзины

    this.add = (product_id) => {

        if (this.productIdList.indexOf(product_id) < 0) {
            this.productIdList.push(product_id);        // При добавлении в корзину товара, записать его ID в список
        }
        this.update();
    }

    this.update = () => {       // Обновление списка товаров при каждом добавлении или удалении

        this.productList = [];  // Очистка основного списка товаров

        for (let list_id in this.productIdList) {       // Добавление товаров в основной список по имеющимся ID

            for (let prod in products) {
                
                if (products[prod].product_id == this.productIdList[list_id]) {
                    this.productList.push(products[prod]);
                    break;
                }
            }
        }

        for (let prod in products) {
            
            if (this.productList.includes(products[prod])) {        // Если товар есть в основном списке, то инменить текст и класс его кнопке "Купить"
                products[prod].buttonBuy.classList.add('inshopcart');
                products[prod].buttonBuy.innerHTML = 'Перейти к корзине';
                products[prod].buttonBuy.addEventListener('click', this.open);

                if (typeof(products[prod].buttonBuyB) != 'undefined') {     // Если открыто окно доп. информации, то проделать для кнопки там аналогичные действия
                    products[prod].buttonBuyB.classList.add('inshopcart')
                    products[prod].buttonBuyB.innerHTML = 'Перейти к корзине';
                    products[prod].buttonBuyB.addEventListener('click', this.open);
                }
            }

            else {      // Если товара нет в списке, то сделать значения по умолчанию
                products[prod].buttonBuy.classList.remove('inshopcart');
                products[prod].buttonBuy.innerHTML = 'В корзину';
                products[prod].buttonBuy.removeEventListener('click', this.open);

                if (typeof(products[prod].buttonBuyB) != 'undefined') {
                    products[prod].buttonBuyB.removeEventListener('click', this.open)
                }
            }
        }

        this.sum = 0;
        for (let prod in this.productList) {
            this.sum = this.sum + this.productList[prod].price;         // Подсчёт суммы стоимости тоаров
        }

        // Установка значений в меню корзины
        document.querySelector('header .total').innerHTML = `${this.sum} руб.`;
        document.querySelector('.blackbanner .shopcart .products-sum span').innerHTML = `${this.sum} руб.`;
        document.querySelector('.blackbanner .shopcart .products-count span').innerHTML = this.productList.length;

        this.htmlList.innerHTML = '';           // Очистить отображаемый список перед наполнением
        for (let prod in this.productList) {    // Наполнение списка добавленными в корзину товарами
            this.htmlList.insertAdjacentHTML('beforeEnd', 
            `<div>
                <p>${this.productList[prod].name} - ${this.productList[prod].price} руб.</p>
                <button>Убрать</button>
            </div>`
            );

            this.htmlList.lastChild.querySelector('button').addEventListener('click', () => {       // Если нужно удалить товар, то его ID удалится из списка
                this.productIdList.splice(this.productIdList.indexOf(this.productList[prod].product_id), 1);
                this.update();
            });
        }
    }

    this.open = () => {         // Открытие меню корзины
        detailsWindow.style.display = 'none';
        blackbanner.style.display = 'flex';
        cartWindow.style.display = 'block';
    }

    this.close = () => {        // Закрытие
        blackbanner.style.display = 'none';
        cartWindow.style.display = 'none';
    }

    this.button.addEventListener('click', this.open);
    this.buttonClose.addEventListener('click', this.close); 

    this.clientNameInput = document.querySelector('.blackbanner .shopcart #name');
    this.clientPhoneInput = document.querySelector('.blackbanner .shopcart #phone');
    this.clientEmailInput = document.querySelector('.blackbanner .shopcart #email');
    this.sentClientDataButton = document.querySelector('.blackbanner .shopcart .form button');

    this.sentClientData = () => {

        console.log('Sending client data...');
        console.log('Name: ' + this.clientNameInput.value);
        console.log('Phone: ' + this.clientPhoneInput.value);
        console.log('E-Mail: ' + this.clientEmailInput.value);
        console.log('Product ID list: ' + this.productIdList)
        this.sentClientDataButton.innerHTML = 'Спасибо! Скоро мы с Вами свяжемся'
        this.sentClientDataButton.removeEventListener('click', this.sentClientData);
    }

    this.formHandler = () => {

        if (this.clientNameInput.value.length > 0 &&
            this.clientPhoneInput.value.length > 0 &&
            this.clientEmailInput.value.length > 0) {

                this.sentClientDataButton.classList.add('unlocked');
                this.sentClientDataButton.addEventListener('click', this.sentClientData);
        }

        else {
            this.sentClientDataButton.classList.remove('unlocked');
            this.sentClientDataButton.innerHTML = 'Отправить';
            this.sentClientDataButton.removeEventListener('click', this.sentClientData);
        }
    }

    this.clientNameInput.addEventListener('input', this.formHandler);
    this.clientPhoneInput.addEventListener('input', this.formHandler);
    this.clientEmailInput.addEventListener('input', this.formHandler);
}

const shopCart = new ShopCart();