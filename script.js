let cart = [];

document.addEventListener('DOMContentLoaded', function() {

    addButtonsToCatalog();

    addButtonToProductPage();

    createCart();

    createFilters();
});

function addButtonsToCatalog() {
    const products = document.querySelectorAll('body > div');
    
    products.forEach(function(product) {
        const link = product.querySelector('a[href*=".html"]');
        if (!link) return;
        
        let price = 1990;
        const name = link.textContent.toLowerCase();
        
        if (name.includes('худи 9mm')) {
            price = 3490;
        } else if (name.includes('худи immortal')) {
            price = 3990;
        }
        
        const button = document.createElement('button');
        button.textContent = 'Добавить в корзину';
        button.style.backgroundColor = 'rgb(46, 139, 87)';
        button.style.color = 'white';
        button.style.padding = '5px 10px';
        button.style.border = 'none';
        button.style.cursor = 'pointer';
        button.style.marginTop = '10px';
        
        button.dataset.name = link.textContent;
        button.dataset.price = price;
        
        button.addEventListener('click', function() {
            const item = {
                name: this.dataset.name,
                price: Number(this.dataset.price)
            };
            cart.push(item);
            updateCart();
        });
        
        const priceP = document.createElement('p');
        priceP.textContent = 'Цена: ' + price + ' ₽';
        priceP.style.color = 'rgb(46, 139, 87)';
        priceP.style.fontWeight = 'bold';
        
        product.appendChild(priceP);
        product.appendChild(button);
    });
}

function addButtonToProductPage() {
    const description = document.getElementById('description');
    const title = document.querySelector('h2');
    
    if (!description || !title) return;
    
    let price = 1990;
    const name = title.textContent.toLowerCase();
    
    if (name.includes('9mm')) {
        price = 3490;
    } else if (name.includes('immortal')) {
        price = 3990;
    }
    
    const priceP = document.createElement('p');
    priceP.textContent = 'Цена: ' + price + ' ₽';
    priceP.style.color = 'rgb(46, 139, 87)';
    priceP.style.fontSize = '18px';
    priceP.style.fontWeight = 'bold';
    
    const button = document.createElement('button');
    button.textContent = 'Добавить в корзину';
    button.style.backgroundColor = 'rgb(46, 139, 87)';
    button.style.color = 'white';
    button.style.padding = '8px 16px';
    button.style.border = 'none';
    button.style.cursor = 'pointer';
    button.style.marginBottom = '20px';
    
    button.dataset.name = title.textContent;
    button.dataset.price = price;
    
    button.addEventListener('click', function() {
        const item = {
            name: this.dataset.name,
            price: Number(this.dataset.price)
        };
        cart.push(item);
        updateCart();
    });
    
    title.insertAdjacentElement('afterend', priceP);
    priceP.insertAdjacentElement('afterend', button);
}

function createCart() {
    if (document.getElementById('cart')) return;
    
    const cartDiv = document.createElement('div');
    cartDiv.id = 'cart';
    cartDiv.style.marginTop = '30px';
    cartDiv.style.padding = '15px';
    cartDiv.style.backgroundColor = 'aliceblue';
    cartDiv.style.border = '1px solid #ccc';
    
    cartDiv.innerHTML = `
        <h3>Корзина</h3>
        <div id="cart-items">
            <p>Корзина пуста</p>
        </div>
        <p id="cart-total" style="font-weight: bold; color: rgb(46, 139, 87);">Итого: 0 ₽</p>
        <button id="pay-btn">Оплатить</button>
        <button id="clear-btn">Очистить</button>
    `;
    
    const hrs = document.getElementsByTagName('hr');
    const lastHr = hrs[hrs.length - 1];
    
    if (lastHr) {
        document.body.insertBefore(cartDiv, lastHr);
    } else {
        document.body.appendChild(cartDiv);
    }
    
    document.getElementById('pay-btn').addEventListener('click', payCart);
    document.getElementById('clear-btn').addEventListener('click', clearCart);
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    if (!cartItems || !cartTotal) return;
    
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Корзина пуста</p>';
        cartTotal.textContent = 'Итого: 0 ₽';
        return;
    }
    
    cart.forEach(function(item, index) {
        const div = document.createElement('div');
        div.style.margin = '10px 0';
        div.style.padding = '5px';
        div.style.backgroundColor = '#f9f9f9';
        
        div.innerHTML = item.name + ' - ' + item.price + ' ₽ ';
        
        const delBtn = document.createElement('button');
        delBtn.textContent = 'Удалить';
        delBtn.style.backgroundColor = '#ff6b6b';
        delBtn.style.color = 'white';
        delBtn.style.border = 'none';
        delBtn.style.padding = '2px 8px';
        delBtn.style.marginLeft = '10px';
        delBtn.style.cursor = 'pointer';
        
        delBtn.addEventListener('click', function() {
            cart.splice(index, 1);
            updateCart();
        });
        
        div.appendChild(delBtn);
        cartItems.appendChild(div);
    });
    
    let total = 0;
    cart.forEach(function(item) {
        total = total + item.price;
    });
    
    cartTotal.textContent = 'Итого: ' + total + ' ₽';
}

// функция подсчета суммы
function calculateTotal() {
    let total = 0;
    cart.forEach(function(item) {
        total = total + item.price;
    });
    return total;
}

// функция оплаты
function payCart() {
    if (cart.length === 0) {
        alert('Корзина пуста');
        return;
    }
    
    alert('Покупка прошла успешно!');
    cart = [];
    updateCart();
}

// функция очистки
function clearCart() {
    if (cart.length === 0) {
        alert('Корзина уже пуста');
        return;
    }
    
    cart = [];
    updateCart();
    alert('Корзина очищена');
}

// функция создания фильтров
function createFilters() {
    const title = document.querySelector('h2');
    if (!title || title.textContent !== 'Каталог') return;
    
    const filterDiv = document.createElement('div');
    filterDiv.style.margin = '20px 0';
    filterDiv.style.padding = '10px';
    filterDiv.style.backgroundColor = 'aliceblue';
    
    filterDiv.innerHTML = `
        <p style="font-weight: bold;">Фильтр по категориям:</p>
        <button class="filter-btn" data-cat="all">Все</button>
        <button class="filter-btn" data-cat="футболка">Футболки</button>
        <button class="filter-btn" data-cat="худи">Худи</button>
    `;
    
    title.insertAdjacentElement('afterend', filterDiv);
    
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(function(btn) {
        btn.style.backgroundColor = '#e7e7e7';
        btn.style.border = 'none';
        btn.style.padding = '5px 15px';
        btn.style.margin = '0 5px';
        btn.style.cursor = 'pointer';
        
        btn.addEventListener('click', function() {
            const category = this.dataset.cat;
            const products = document.querySelectorAll('body > div');
            
            products.forEach(function(product) {
                const link = product.querySelector('a[href*=".html"]');
                if (!link) return;
                
                const name = link.textContent.toLowerCase();
                
                if (category === 'all') {
                    product.style.display = 'block';
                } else if (category === 'футболка' && name.includes('футболка')) {
                    product.style.display = 'block';
                } else if (category === 'худи' && name.includes('худи')) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            });
        });
    });
}

const style = document.createElement('style');
style.textContent = `
    button {
        font-family: inherit;
        border-radius: 3px;
    }
    
    #pay-btn, #clear-btn {
        background-color: rgb(46, 139, 87);
        color: white;
        padding: 8px 16px;
        border: none;
        cursor: pointer;
        margin-right: 10px;
    }
    
    #clear-btn {
        background-color: #ff6b6b;
    }
    
    #cart {
        margin-top: 30px;
    }
`;

document.head.appendChild(style);
