/* Main client script: data source, rendering, interactions */

import posts from './posts-data.js';

const state = {
  page: 1,
  pageSize: 6,
  query: '',
  category: '',
  tag: ''
};

const el = (id) => document.getElementById(id);

function unique(list) {
  return Array.from(new Set(list)).filter(Boolean);
}

function getBasePath() {
  const path = window.location.pathname;
  return path.endsWith('/') ? path : path.replace(/[^/]*$/, '');
}

// Build URL for image inside pics/; if fileName missing, return empty string
function picUrl(fileName) {
  if (!fileName) return '';
  return `pics/${fileName}`;
}

function applyThemeToggle() {
  const btn = el('themeToggle');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const root = document.documentElement;
    const isDark = root.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}

function applyMenuToggle() {
  const btn = el('menuBtn');
  const nav = el('mobileNav');
  if (!btn || !nav) return;
  btn.addEventListener('click', () => {
    nav.classList.toggle('hidden');
  });
}

function buildFilters() {
  const categorySelect = el('categoryFilter');
  const tagSelect = el('tagFilter');
  if (!categorySelect || !tagSelect) return;

  const categories = unique(posts.map((p) => p.category));
  const tags = unique(posts.flatMap((p) => p.tags || []));

  for (const c of categories) {
    const opt = document.createElement('option');
    opt.value = c; opt.textContent = c; categorySelect.appendChild(opt);
  }
  for (const t of tags) {
    const opt = document.createElement('option');
    opt.value = t; opt.textContent = t; tagSelect.appendChild(opt);
  }

  categorySelect.addEventListener('change', () => { state.category = categorySelect.value; state.page = 1; render(); });
  tagSelect.addEventListener('change', () => { state.tag = tagSelect.value; state.page = 1; render(); });
}

function formatDate(iso) {
  const d = new Date(iso);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function matchQuery(post, q) {
  if (!q) return true;
  const s = `${post.title} ${post.excerpt} ${(post.tags || []).join(' ')}`.toLowerCase();
  return s.includes(q.toLowerCase());
}

function applySearch() {
  const input = el('searchInput');
  const btn = el('searchBtn');
  const dialog = el('searchDialog');
  const dialogInput = el('dialogSearch');
  if (input) input.addEventListener('input', () => { state.query = input.value.trim(); state.page = 1; render(); });
  if (btn && dialog) btn.addEventListener('click', () => dialog.showModal());
  if (dialog && dialogInput) {
    dialogInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        state.query = dialogInput.value.trim();
        state.page = 1;
        render();
        dialog.close();
      }
    });
  }
}

function applyToTop() {
  const btn = el('toTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    const show = window.scrollY > 400;
    btn.classList.toggle('hidden', !show);
  });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function paginate(list, page, pageSize) {
  const start = (page - 1) * pageSize;
  return list.slice(start, start + pageSize);
}

function render() {
  const grid = el('postsGrid');
  const pageInfo = el('pageInfo');
  const prev = el('prevPage');
  const next = el('nextPage');
  if (!grid) return;

  const url = new URL(location.href);
  const qp = Object.fromEntries(url.searchParams.entries());
  if (qp.q && qp.q !== state.query) state.query = qp.q;
  if (qp.cat && qp.cat !== state.category) state.category = qp.cat;
  if (qp.tag && qp.tag !== state.tag) state.tag = qp.tag;

  const filtered = posts
    .filter((p) => matchQuery(p, state.query))
    .filter((p) => (state.category ? p.category === state.category : true))
    .filter((p) => (state.tag ? (p.tags || []).includes(state.tag) : true))
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const totalPages = Math.max(1, Math.ceil(filtered.length / state.pageSize));
  state.page = Math.min(state.page, totalPages);

  const pageItems = paginate(filtered, state.page, state.pageSize);

  grid.innerHTML = pageItems.map(cardTemplate).join('');

  if (pageInfo) pageInfo.textContent = `${state.page} / ${totalPages}`;
  if (prev) { prev.disabled = state.page <= 1; prev.onclick = () => { state.page--; render(); } }
  if (next) { next.disabled = state.page >= totalPages; next.onclick = () => { state.page++; render(); } }
}

function cardTemplate(p) {
  const url = `${getBasePath()}pages/post.html?id=${encodeURIComponent(p.id)}`;
  const local = picUrl(p.coverFile);
  const fallback = p.cover || '';
  const img = local || fallback;
  return `
  <article class="rounded-xl overflow-hidden bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition">
    <a href="${url}" class="block aspect-[16/10] bg-slate-200 dark:bg-slate-700 overflow-hidden">
      <img src="${img}" alt="${p.title}" class="w-full h-full object-cover" onerror="this.onerror=null; if('${fallback}') this.src='${fallback}';" />
    </a>
    <div class="p-4">
      <div class="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <span class="px-2 py-0.5 rounded bg-brand-50 dark:bg-brand-900/40 text-brand-700 dark:text-brand-200">${p.category}</span>
        <span>${formatDate(p.date)}</span>
      </div>
      <h3 class="mt-2 text-base font-semibold line-clamp-1"><a href="${url}">${p.title}</a></h3>
      <p class="mt-1 text-sm text-slate-600 dark:text-slate-300 line-clamp-2">${p.excerpt}</p>
      <div class="mt-3 flex flex-wrap gap-1">${(p.tags||[]).map(t => `<span class=\"text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700/60\">#${t}</span>`).join('')}</div>
    </div>
  </article>`;
}

// Init
applyThemeToggle();
applyMenuToggle();
buildFilters();
applySearch();
applyToTop();
render();

// Try override hero background with pics/hero.jpg if exists
(function setHeroFromPics(){
  const hero = document.getElementById('heroBanner');
  if (!hero) return;
  const trySet = (src, next) => {
    const img = new Image();
    img.onload = () => { hero.style.backgroundImage = `url('${src}')`; };
    img.onerror = () => { if (next) next(); };
    img.src = src;
  };
  // Try hero.jpg first, then Back.jpg
  trySet('pics/hero.jpg', () => trySet('pics/Back.jpg'));
})();
