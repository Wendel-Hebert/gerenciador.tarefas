// Arquivo JavaScript principal
console.log('Script carregado com sucesso!');

// Função para mostrar mensagens de alerta personalizadas
function showAlert(message, type = 'info') {
  const alertDiv = document.createElement('div');
  alertDiv.className = `alert alert-${type}`;
  alertDiv.innerHTML = `
    <span class="alert-icon">
      <i class="fas ${getAlertIcon(type)}"></i>
    </span>
    <span class="alert-message">${message}</span>
    <button type="button" class="alert-close" onclick="this.parentElement.remove()">
      <i class="fas fa-times"></i>
    </button>
  `;
  
  const container = document.querySelector('.container');
  container.insertBefore(alertDiv, container.firstChild);
  
  // Remover o alerta após 5 segundos
  setTimeout(() => {
    if (alertDiv.parentElement) {
      alertDiv.remove();
    }
  }, 5000);
}

// Função para obter o ícone correto para cada tipo de alerta
function getAlertIcon(type) {
  switch (type) {
    case 'success':
      return 'fa-check-circle';
    case 'danger':
      return 'fa-exclamation-circle';
    case 'warning':
      return 'fa-exclamation-triangle';
    case 'info':
    default:
      return 'fa-info-circle';
  }
}

// Função para formatar datas
function formatDate(dateString) {
  if (!dateString) return 'N/A';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

// Função para confirmar exclusão
function confirmDelete(itemType, itemId) {
  if (confirm(`Tem certeza que deseja excluir este(a) ${itemType}?`)) {
    // Aqui você pode adicionar a lógica para excluir o item
    // Por exemplo, redirecionar para a rota de exclusão ou fazer uma requisição AJAX
    return true;
  }
  return false;
}

// Inicialização quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
  // Destacar o item de menu ativo
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('nav ul li a');
  
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });
  
  // Adicionar animação de fade-in aos cards
  const cards = document.querySelectorAll('.card');
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 100 * index);
  });
});
