fetch('https://fakestoreapi.com/products')
  .then(res => res.json())
  .then(data => {

    
    const apiProducts = data.map(p => ({
      id: p.id,
      name: p.title,   
      price: p.price
    }));

    const localProducts = load('products');

    
    if (localProducts.length === 0) {
      save('products', apiProducts);
    }

  })
  .catch(err => console.error('API error', err));
