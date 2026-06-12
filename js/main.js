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

// CTA form → Supabase
const ctaForm = document.querySelector('.cta-form');
const ctaMessage = document.querySelector('.cta-message');

function showCtaMessage(text, type) {
  if (!ctaMessage) return;
  ctaMessage.textContent = text;
  ctaMessage.className = `cta-message cta-message--${type}`;
  ctaMessage.hidden = false;
}

async function submitLead(phone) {
  const res = await fetch(`${window.SUPABASE_URL}/rest/v1/leads`, {
    method: 'POST',
    headers: {
      apikey: window.SUPABASE_KEY,
      Authorization: `Bearer ${window.SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify({ phone }),
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(detail || `提交失败（${res.status}）`);
  }
}

async function handleCtaSubmit() {
  const phoneInput = ctaForm.querySelector('input[name="phone"]');
  const submitBtn = ctaForm.querySelector('button[type="submit"]');
  const phone = phoneInput.value.trim();

  if (!/^1\d{10}$/.test(phone)) {
    showCtaMessage('请输入正确的 11 位手机号码（以 1 开头的 11 位数字）', 'error');
    phoneInput.focus();
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = '提交中…';
  ctaMessage.hidden = true;

  try {
    await submitLead(phone);
    showCtaMessage('提交成功！制作链接将发送至您的手机：' + phone, 'success');
    ctaForm.reset();
  } catch (err) {
    console.error('Lead submit failed:', err);
    showCtaMessage('提交失败，请稍后重试', 'error');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = '获取免费体验';
  }
}

ctaForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  handleCtaSubmit();
});
