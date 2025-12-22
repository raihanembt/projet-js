// app.js - Fonctions générales

window.products = JSON.parse(localStorage.getItem('products')) || [];
window.categories = JSON.parse(localStorage.getItem('categories')) || [];

// Données initiales si vides
if (products.length === 0) {
    products = [
        { id: 1, nom: "Laptop HP", prix: 850, stock: 12, categorie: "Ordinateurs", description: "PC portable performant" },
        { id: 2, nom: "iPhone 13", prix: 999, stock: 5, categorie: "Smartphones", description: "Téléphone dernier cri" }
    ];
    localStorage.setItem('products', JSON.stringify(products));
}
if (categories.length === 0) {
    categories = [
        { id: 1, nom: "Ordinateurs" },
        { id: 2, nom: "Smartphones" }
    ];
    localStorage.setItem('categories', JSON.stringify(categories));
}

function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
}

// Initialiser au chargement
document.addEventListener('DOMContentLoaded', function() {
    showSection('dashboard');
    loadDashboard();
    loadProducts();
    loadCategories();
});
