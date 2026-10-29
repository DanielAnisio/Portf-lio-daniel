const contato = {
  email: 'anisiodan@gmail.com',
  github: 'https://github.com/DanielAnisio',
  linkedin: 'https://www.linkedin.com/in/danielanísio'
};

const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuButton.addEventListener('click', () => {
  const aberto = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!aberto));
  menuButton.setAttribute('aria-label', aberto ? 'Abrir menu' : 'Fechar menu');
  navLinks.classList.toggle('open', !aberto);
});
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menu');
}));

document.querySelector('#year').textContent = new Date().getFullYear();

const filtros = document.querySelectorAll('.filter');
const projetos = document.querySelectorAll('.project-card');
filtros.forEach(botao => botao.addEventListener('click', () => {
  filtros.forEach(item => {
    item.classList.remove('active');
    item.setAttribute('aria-pressed', 'false');
  });
  botao.classList.add('active');
  botao.setAttribute('aria-pressed', 'true');
  const categoria = botao.dataset.filter;
  projetos.forEach(projeto => {
    projeto.hidden = categoria !== 'todos' && !projeto.dataset.category.split(' ').includes(categoria);
  });
}));

const linksContato = [
  ['email-link', contato.email ? `mailto:${contato.email}` : null],
  ['github-link', contato.github],
  ['linkedin-link', contato.linkedin]
];
linksContato.forEach(([id, url]) => {
  const link = document.getElementById(id);
  if (!url) {
    link.removeAttribute('href');
    link.setAttribute('aria-disabled', 'true');
    link.title = 'Adicione este contato em script.js';
    link.style.opacity = '.55';
    link.addEventListener('click', e => e.preventDefault());
  } else {
    link.href = url;
  }
});

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(elemento => observer.observe(elemento));
} else {
  document.querySelectorAll('.reveal').forEach(elemento => elemento.classList.add('visible'));
}
