/* Project information comes from the supplied resume. Add verified links here later. */
const projects = {
  tripfinder: {
    title: 'TripFinder',
    category: 'FRONTEND DEVELOPMENT / JULY 2026',
    summary: 'A personal project inspired by travel discovery platforms, built with React.js, JavaScript, HTML5, and CSS3.',
    features: [
      'Responsive navigation, search functionality, and destination filters.',
      'Four main content sections: a hero banner, featured destinations, popular hotels, and top-rated restaurants.',
      'Customer review, login, and sign-up interfaces.',
      'Layouts optimized for desktop, tablet, and mobile.'
    ],
    technologies: ['React.js', 'JavaScript', 'HTML5', 'CSS3', 'Responsive web design']
  },
  'task-api': {
    title: 'Task Management REST API',
    category: 'BACKEND DEVELOPMENT / AUGUST 2025',
    summary: 'A personal task-management backend built with Node.js, MongoDB, and Mongoose, deployed on Render with MongoDB Atlas.',
    features: [
      'User registration and login endpoints, bcrypt password hashing, and routes protected by JWT authentication.',
      'Create, retrieve, update, and delete operations for task records.',
      'User–Project relationships modeled with MongoDB and Mongoose schemas.',
      'Search, filtering, and pagination for handling task data.',
      'REST API endpoints validated and documented using Postman.'
    ],
    technologies: ['Node.js', 'MongoDB', 'Mongoose', 'REST APIs', 'JWT', 'Postman', 'Render', 'Git & GitHub']
  }
};

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-nav');
function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('is-open');
}
menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  navigation.classList.toggle('is-open', !isOpen);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('click', event => {
  if (!navigation.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuButton.focus();
  }
});
window.matchMedia('(min-width: 601px)').addEventListener('change', closeMenu);

const dialog = document.querySelector('#project-dialog');
let dialogTrigger;
document.querySelectorAll('[data-project]').forEach(button => {
  button.addEventListener('click', () => {
    const project = projects[button.dataset.project];
    if (!project) return;
    document.querySelector('#dialog-title').textContent = project.title;
    document.querySelector('#dialog-category').textContent = project.category;
    document.querySelector('#dialog-summary').textContent = project.summary;
    const features = project.features.map(text => {
      const item = document.createElement('li');
      item.textContent = text;
      return item;
    });
    const technologies = project.technologies.map(text => {
      const item = document.createElement('li');
      item.textContent = text;
      return item;
    });
    document.querySelector('#dialog-features').replaceChildren(...features);
    document.querySelector('#dialog-tags').replaceChildren(...technologies);
    dialogTrigger = button;
    dialog.showModal();
    document.body.classList.add('dialog-open');
    dialog.querySelector('.dialog-close').focus();
  });
});
dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const bounds = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
});
dialog.addEventListener('close', () => {
  document.body.classList.remove('dialog-open');
  dialogTrigger?.focus({ preventScroll: true });
});

const emailAddress = 'balajikumar.k.2005@gmail.com';
const copyButton = document.querySelector('#copy-email');
const copyStatus = document.querySelector('#copy-status');
let copyTimeout;
copyButton.addEventListener('click', async () => {
  clearTimeout(copyTimeout);
  let copied = false;
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(emailAddress);
      copied = true;
    } else {
      const field = document.createElement('textarea');
      field.value = emailAddress;
      field.setAttribute('aria-label', 'Email address to copy');
      field.style.position = 'fixed';
      field.style.opacity = '0';
      document.body.append(field);
      field.select();
      copied = document.execCommand('copy');
      field.remove();
      copyButton.focus({ preventScroll: true });
    }
  } catch {
    copied = false;
  }
  copyStatus.textContent = copied ? 'Email copied. Let’s start a conversation.' : 'Please select and copy the email address shown above.';
  copyButton.querySelector('span').textContent = copied ? 'Copied!' : 'Copy email address';
  copyTimeout = setTimeout(() => {
    copyButton.querySelector('span').textContent = 'Copy email address';
    copyStatus.textContent = '';
  }, 5000);
});

document.querySelector('#year').textContent = new Date().getFullYear();
if ('IntersectionObserver' in window) {
  const navigationLinks = [...navigation.querySelectorAll('a')];
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navigationLinks.forEach(link => {
        if (link.getAttribute('href') === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-15% 0px -60% 0px' });
  document.querySelectorAll('main > section').forEach(section => observer.observe(section));
}
