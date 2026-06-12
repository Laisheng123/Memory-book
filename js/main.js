// Header scroll effect
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
});

// Mobile menu
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', isOpen);
});

navLinks?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

// Scroll reveal
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

document
  .querySelectorAll(
    '.pain-card, .step, .story-card, .testimonial, .pricing-card, .faq-item, .section-header'
  )
  .forEach((el) => {
    el.classList.add('fade-in');
    observer.observe(el);
  });

// CTA form
const ctaForm = document.querySelector('.cta-form');
ctaForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const phone = ctaForm.querySelector('input[name="phone"]').value.trim();
  if (!/^1\d{10}$/.test(phone)) {
    alert('请输入正确的手机号码');
    return;
  }
  alert('感谢关注！制作链接将发送至您的手机：' + phone);
  ctaForm.reset();
});
