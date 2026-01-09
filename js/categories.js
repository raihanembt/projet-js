let categories = load('categories') || [];


const categoryList = document.getElementById('categoryList');
const categoryId = document.getElementById('categoryId');
const categoryName = document.getElementById('categoryName');


if (categories.length === 0) {
  fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(data => {
      const apiCategories = [...new Set(data.map(p => p.category))].map((name, index) => ({
        id: index + 1,
        name
      }));

      categories = apiCategories;
      save('categories', categories);
      renderCategories();
      renderCategoryOptions();
    })
    .catch(err => console.error('API categories error', err));
}


function renderCategories() {
  categoryList.innerHTML = '';
  categories.forEach(c => {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between';
    li.innerHTML = `
      ${c.name}
      <div>
        <button class="btn btn-warning btn-sm">✏️</button>
        <button class="btn btn-danger btn-sm">❌</button>
      </div>
    `;

    
    li.querySelector('.btn-warning').addEventListener('click', () => {
      categoryId.value = c.id;
      categoryName.value = c.name;
    });

   
    li.querySelector('.btn-danger').addEventListener('click', () => {
      categories = categories.filter(cat => cat.id !== c.id);
      save('categories', categories);
      renderCategories();
      renderCategoryOptions();
    });

    categoryList.appendChild(li);
  });
}


function saveCategory() {
  const name = categoryName.value.trim();
  if (name === '') return;

  if (categoryId.value) {
    const c = categories.find(c => c.id === Number(categoryId.value));
    if (c) c.name = name;
  } else {
    categories.push({
      id: Date.now(),
      name
    });
  }

  save('categories', categories);
  categoryId.value = '';
  categoryName.value = '';
  renderCategories();
  renderCategoryOptions();
}


function renderCategoryOptions() {
  const select = document.getElementById('productCategory');
  select.innerHTML = '<option value="">-- Choisir catégorie --</option>';
  categories.forEach(c => {
    const option = document.createElement('option');
    option.value = c.name; 
    option.textContent = c.name;
    select.appendChild(option);
  });
}

renderCategories();
renderCategoryOptions();
