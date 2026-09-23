const filters = document.querySelectorAll('.filter');
const projects = document.querySelectorAll('.project');

filters.forEach((button) => {
  button.addEventListener('click', () => {
    filters.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    const selected = button.dataset.filter;
    projects.forEach((project) => {
      const categories = project.dataset.category.split(' ');
      project.classList.toggle('hidden', selected !== 'all' && !categories.includes(selected));
    });
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
document.querySelector('#year').textContent = new Date().getFullYear();

const header = document.querySelector('.site-header');
const menu = document.querySelector('.menu-button');
menu.addEventListener('click', () => {
  const open = header.classList.toggle('menu-open');
  menu.setAttribute('aria-expanded', String(open));
});
document.querySelectorAll('nav a').forEach((link) => link.addEventListener('click', () => {
  header.classList.remove('menu-open');
  menu.setAttribute('aria-expanded', 'false');
}));

const cvModal = document.querySelector('#cv-modal');
document.querySelectorAll('[data-open-cv]').forEach((button) => button.addEventListener('click', () => cvModal.showModal()));
document.querySelector('[data-close-cv]').addEventListener('click', () => cvModal.close());
cvModal.addEventListener('click', (event) => {
  if (event.target === cvModal) cvModal.close();
});

const toast = document.querySelector('#toast');
document.querySelectorAll('[data-copy-email]').forEach((button) => button.addEventListener('click', async () => {
  const email = button.dataset.copyEmail;
  try {
    await navigator.clipboard.writeText(email);
    toast.textContent = `${email} copied!`;
  } catch {
    toast.textContent = email;
  }
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2200);
}));
