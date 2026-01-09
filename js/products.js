let products = load('products') || [];


const productForm = document.getElementById('productForm');
const productList = document.getElementById('productList');
const productId = document.getElementById('productId');
const nameInput = document.getElementById('name');
const priceInput = document.getElementById('price');
const categorySelect = document.getElementById('productCategory');


function renderProducts() {
  productList.innerHTML = '';

  products.forEach(p => {
    const tr = document.createElement('tr');

    tr.innerHTML = `  
      <td>${p.name}</td>
      <td>${p.price} DH</td>
      <td>${p.category || ''}</td>
      <td>
        <button class="btn btn-edit btn-sm">Modifier</button>
        <button class="btn btn-delete btn-sm">Supprimer</button>
      </td>
    `;

    
    tr.querySelector('.btn-edit').addEventListener('click', () => {
      productId.value = p.id;
      nameInput.value = p.name;
      priceInput.value = p.price;
      categorySelect.value = p.category || '';
    });

    
    tr.querySelector('.btn-delete').addEventListener('click', () => {
      products = products.filter(prod => prod.id !== p.id);
      save('products', products);
      renderProducts();
    });

    productList.appendChild(tr);
  });
}


productForm.addEventListener('submit', e => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const price = Number(priceInput.value);
  const category = categorySelect.value;

  if (name === '' || price <= 0) {
    alert('Nom ou prix invalide');
    return;
  }

  if (productId.value) {
    const p = products.find(p => p.id === Number(productId.value));
    if (p) {
      p.name = name;
      p.price = price;
      p.category = category;
    }
  } else {
    products.push({
      id: Date.now(),
      name,
      price,
      category
    });
  }

  save('products', products);
  productForm.reset();
  productId.value = '';
  renderProducts();
});


renderProducts();
