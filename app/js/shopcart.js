function ShopCart() {

    this.productIdList = [];        // Этот список нужен лишь для того, чтобы удобно по нему добавлять товары в основной список
    this.productList = [];          // Основной список, где будут храниться добавленные товары
    this.sum = 0;                   // Сумма стоимости всех товаров

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

                if (typeof(products[prod].buttonBuyB) != 'undefined') {     // Если открыто окно доп. информации, то проделать для кнопки там аналогичные действия
                    products[prod].buttonBuyB.classList.add('inshopcart')
                    products[prod].buttonBuyB.innerHTML = 'Перейти к корзине';
                }
            }

            else {      // Если товара нет в списке, то сделать значения по умолчанию
                products[prod].buttonBuy.classList.remove('inshopcart');
                products[prod].buttonBuy.innerHTML = 'В корзину';
            }
        }

        this.sum = 0;
        for (let prod in this.productList) {
            this.sum = this.sum + this.productList[prod].price;
        }
        document.querySelector('header .total').innerHTML = `${this.sum} руб.`
    }
}

const shopCart = new ShopCart();