let chart = null;

function renderDashboard() {

  const products = load('products');

  
  document.getElementById('kpi-container').innerHTML = `
    <div class="col-md-4">
      <div class="card p-3">
        <h5>Total Produits</h5>
        <h2>${products.length}</h2>
      </div>
    </div>
  `;

  
  const validProducts = products.filter(p => p && p.name && p.price);

  const labels = validProducts.map(p => p.name);
  const prices = validProducts.map(p => p.price);

  const ctx = document.getElementById('productsChart');

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Prix',
        data: prices,
        backgroundColor: '#ec4899'
      }]
    }
  });
}
