
function showSection(id) {
  document.querySelectorAll('.app-section')
    .forEach(s => s.classList.add('d-none'));
  document.getElementById(id).classList.remove('d-none');

  if (id === 'dashboard') renderDashboard();
};
