let menu = [
    // Drinks
    { id: 1, category: 'Drinks', name: 'Cola', prices: { small: 1.99, medium: 2.49, large: 2.99 } },
    { id: 2, category: 'Drinks', name: 'Fanta', prices: { small: 1.99, medium: 2.49, large: 2.99 } },
    { id: 3, category: 'Drinks', name: 'Pepsi', prices: { small: 1.99, medium: 2.49, large: 2.99 } },
    { id: 4, category: 'Drinks', name: 'Juice', prices: { small: 3.99, medium: 4.99, large: 5.99 } },
  
    // Fast Food
    { id: 5, category: 'Fast Food', name: 'Pizza', prices: { small: 10.99, medium: 14.99, large: 18.99 } },
    { id: 6, category: 'Fast Food', name: 'Burger', prices: { small: 6.99, medium: 9.99, large: 12.99 } },
    { id: 7, category: 'Fast Food', name: 'Fries', prices: { small: 2.99, medium: 3.99, large: 4.99 } },
    { id: 8, category: 'Fast Food', name: 'Shawarma', prices: { small: 7.99, medium: 9.99, large: 12.99 } },
    { id: 9, category: 'Fast Food', name: 'Chicken', prices: { small: 9.99, medium: 12.99, large: 15.99 } },
    { id: 10, category: 'Fast Food', name: 'Mutton', prices: { small: 11.99, medium: 14.99, large: 17.99 } },
    { id: 11, category: 'Fast Food', name: 'Beef', prices: { small: 12.99, medium: 15.99, large: 18.99 } },
  
    // Desserts
    { id: 12, category: 'Desserts', name: 'Ice Cream', prices: { small: 4.99, medium: 6.99, large: 8.99 } }
  ];
  
  let orders = [];
  let totalPrice = 0;
  
  function createMenuList(category, listId) {
    const menuList = document.getElementById(listId);
    menuList.innerHTML = '';
  
    const categoryMenu = menu.filter(item => item.category === category);
    
    categoryMenu.forEach(item => {
      const menuItem = document.createElement('li');
      menuItem.className = 'list-group-item';
      menuItem.innerHTML = `
        <div class="d-flex justify-content-between">
          <span>${item.name}</span>
          <div>
            <select id="size${item.id}" class="form-control">
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
            <button class="btn btn-success mt-2" onclick="addItem(${item.id})">Add to Order</button>
          </div>
        </div>
      `;
  
      menuList.appendChild(menuItem);
    });
  }
  
  function addItem(itemId) {
    const sizeSelect = document.getElementById(`size${itemId}`);
    const selectedSize = sizeSelect.value;
  
    const selectedItem = menu.find(item => item.id === itemId);
    const itemPrice = selectedItem.prices[selectedSize];
  
    const order = {
      id: Date.now(),
      name: selectedItem.name,
      size: selectedSize,
      price: itemPrice
    };
  
    orders.push(order);
    updateOrders();
  }
  
  function deleteItem(id) {
    orders = orders.filter(order => order.id !== id);
    updateOrders();
  }
  
  function updateOrders() {
    const orderList = document.getElementById('orderList');
    const totalPriceSpan = document.getElementById('totalPrice');
  
    orderList.innerHTML = '';
    totalPrice = 0;
  
    orders.forEach(order => {
      const orderItem = document.createElement('li');
      orderItem.className = 'list-group-item';
      orderItem.innerHTML = `
        <div class="d-flex justify-content-between align-items-center">
          <span>${order.name} - ${order.size}</span>
          <div>
            <span class="mr-3">$${order.price.toFixed(2)}</span>
            <button class="btn btn-danger" onclick="deleteItem(${order.id})">Delete</button>
          </div>
        </div>
      `;
  
      totalPrice += order.price;
      orderList.appendChild(orderItem);
    });
  
    totalPriceSpan.innerText = totalPrice.toFixed(2);
  }
  
  function checkout() {
    const modalTotalPriceSpan = document.getElementById('modalTotalPrice');
    const checkoutModal = document.getElementById('checkoutModal');
  
    modalTotalPriceSpan.innerText = totalPrice.toFixed(2);
    checkoutModal.style.display = 'block';
  }
  
  function closeModal() {
    const checkoutModal = document.getElementById('checkoutModal');
    checkoutModal.style.display = 'none';
  }
  
  function placeOrder() {
    alert('Order placed successfully!');
    closeModal();
    orders = [];
    updateOrders();
  }
  
  // Create menu lists for each category
  createMenuList('Drinks', 'drinksList');
  createMenuList('Fast Food', 'fastFoodList');
  createMenuList('Desserts', 'dessertsList');
  