// Loading Screen
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loadingScreen').classList.add('hidden');
  }, 2000);
});

// Header Scroll Effect
let lastScrollTop = 0;
const header = document.getElementById('header');
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  // Add scrolled class for styling
  if (scrollTop > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  // Hide/show header on scroll
  if (scrollTop > lastScrollTop && scrollTop > 200) {
    header.style.transform = 'translateY(-100%)';
    navbar.style.transform = 'translateY(-100%)';
  } else {
    header.style.transform = 'translateY(0)';
    navbar.style.transform = 'translateY(0)';
  }
  
  lastScrollTop = scrollTop;
  
  // Update progress bar
  updateProgressBar();
});

// Progress Bar
function updateProgressBar() {
  const scrollTop = window.pageYOffset;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  document.getElementById('progressBar').style.width = scrollPercent + '%';
}

// Smooth Scrolling Navigation
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    const offsetTop = element.offsetTop - 140;
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });
  }
}

// Navigation Active State
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.content-section, .hero-section');

function updateActiveNav() {
  const scrollPos = window.scrollY + 200;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === sectionId) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', updateActiveNav);

// Navigation Click Handlers
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const sectionId = link.getAttribute('data-section');
    scrollToSection(sectionId);
  });
});

// Section Visibility Animation
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.content-section').forEach(section => {
  sectionObserver.observe(section);
});

// Module Card Toggle
document.querySelectorAll('.module-header').forEach(header => {
  header.addEventListener('click', () => {
    const moduleCard = header.closest('.module-card');
    const isExpanded = moduleCard.classList.contains('expanded');
    
    // Close all other modules
    document.querySelectorAll('.module-card').forEach(card => {
      if (card !== moduleCard) {
        card.classList.remove('expanded');
      }
    });
    
    // Toggle current module
    moduleCard.classList.toggle('expanded');
  });
});

// Search Functionality
const searchInput = document.getElementById('searchInput');
const searchSuggestions = document.getElementById('searchSuggestions');
const moduleCards = document.querySelectorAll('.module-card');

const searchData = [
  { title: 'System Overview', section: 'week1', keywords: ['system', 'overview', 'administration', 'sysadmin'] },
  { title: 'Ubuntu Core Deployment', section: 'week1', keywords: ['ubuntu', 'linux', 'deployment', 'installation'] },
  { title: 'GitHub Matrix Setup', section: 'week1', keywords: ['github', 'git', 'version control', 'repository'] },
  { title: 'Bootable Drive Forge', section: 'week1', keywords: ['bootable', 'usb', 'drive', 'iso'] },
  { title: 'Etcher Activation', section: 'week1', keywords: ['etcher', 'balena', 'flashing', 'tool'] }
];

searchInput.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase().trim();
  
  if (query.length === 0) {
    searchSuggestions.style.display = 'none';
    showAllModules();
    return;
  }
  
  // Filter modules
  filterModules(query);
  
  // Show suggestions
  showSuggestions(query);
});

function filterModules(query) {
  moduleCards.forEach(card => {
    const moduleTitle = card.querySelector('.module-info h3').textContent.toLowerCase();
    const moduleContent = card.querySelector('.module-content').textContent.toLowerCase();
    
    if (moduleTitle.includes(query) || moduleContent.includes(query)) {
      card.style.display = 'block';
      card.style.opacity = '1';
    } else {
      card.style.display = 'none';
      card.style.opacity = '0.5';
    }
  });
}

function showAllModules() {
  moduleCards.forEach(card => {
    card.style.display = 'block';
    card.style.opacity = '1';
  });
}

function showSuggestions(query) {
  const matches = searchData.filter(item => 
    item.title.toLowerCase().includes(query) ||
    item.keywords.some(keyword => keyword.includes(query))
  );
  
  if (matches.length > 0) {
    searchSuggestions.innerHTML = matches.map(match => 
      `<div class="suggestion-item" onclick="selectSuggestion('${match.section}', '${match.title}')">
        <i class="fas fa-search"></i>
        <span>${match.title}</span>
      </div>`
    ).join('');
    searchSuggestions.style.display = 'block';
  } else {
    searchSuggestions.style.display = 'none';
  }
}

function selectSuggestion(section, title) {
  searchInput.value = title;
  searchSuggestions.style.display = 'none';
  scrollToSection(section);
}

// Click outside to close suggestions
document.addEventListener('click', (e) => {
  if (!e.target.closest('.search-container')) {
    searchSuggestions.style.display = 'none';
  }
});

// Theme Toggle (placeholder for future implementation)
document.getElementById('themeToggle').addEventListener('click', () => {
  // Theme toggle functionality can be implemented here
  console.log('Theme toggle clicked');
});

// Chart.js Implementation
document.addEventListener('DOMContentLoaded', () => {
  const ctx = document.getElementById('hoursChart');
  if (ctx) {
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Day 1', 'Day 2'],
        datasets: [{
          label: 'Hours Spent',
          data: [2, 3],
          backgroundColor: [
            'rgba(207, 15, 71, 0.8)',
            'rgba(255, 11, 85, 0.8)'
          ],
          borderColor: [
            'rgba(207, 15, 71, 1)',
            'rgba(255, 11, 85, 1)'
          ],
          borderWidth: 2,
          borderRadius: 8,
          borderSkipped: false,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Week 1: Daily Hours Distribution',
            color: '#000000',
            font: {
              family: 'Inter',
              size: 16,
              weight: '600'
            },
            padding: 20
          },
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Hours',
              color: '#6C757D',
              font: {
                size: 12,
                weight: '500'
              }
            },
            ticks: {
              color: '#6C757D',
              font: {
                size: 11
              }
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.1)'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Days',
              color: '#6C757D',
              font: {
                size: 12,
                weight: '500'
              }
            },
            ticks: {
              color: '#6C757D',
              font: {
                size: 11
              }
            },
            grid: {
              display: false
            }
          }
        },
        animation: {
          duration: 1500,
          easing: 'easeOutQuart'
        }
      }
    });
  }
});

// Floating Elements Animation Enhancement
document.querySelectorAll('.floating-element').forEach((element, index) => {
  element.addEventListener('mouseenter', () => {
    element.style.animationPlayState = 'paused';
    element.style.transform = 'scale(1.1) rotate(10deg)';
  });
  
  element.addEventListener('mouseleave', () => {
    element.style.animationPlayState = 'running';
    element.style.transform = '';
  });
});

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    searchSuggestions.style.display = 'none';
    searchInput.blur();
  }
  
  if (e.key === '/' && !e.target.matches('input, textarea')) {
    e.preventDefault();
    searchInput.focus();
  }
});

// Performance Optimization: Throttle scroll events
function throttle(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
  updateActiveNav();
}, 100));

// Add loading states for better UX
function showLoading(element) {
  element.style.opacity = '0.6';
  element.style.pointerEvents = 'none';
}

function hideLoading(element) {
  element.style.opacity = '1';
  element.style.pointerEvents = 'auto';
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
  // Set initial active nav
  updateActiveNav();
  
  // Add entrance animations with stagger
  const animatedElements = document.querySelectorAll('.module-card, .progress-card, .resource-category');
  animatedElements.forEach((element, index) => {
    element.style.animationDelay = `${index * 0.1}s`;
  });
});
