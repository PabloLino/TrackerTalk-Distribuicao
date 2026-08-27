const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];

const allowedDownloadHost = 'github.com';
// Fixar apenas o dominio deixaria passar qualquer repositorio do GitHub.
const allowedDownloadPath = '/PabloLino/TrackerTalk-Distribuicao/';
// Um catalogo com milhares de registros travaria a pagina ao desenhar.
const maxReleases = 100;
const themeKey = 'trackertalk-site-theme';
const fallbackDownload = 'https://github.com/PabloLino/TrackerTalk-Distribuicao/releases/latest';

function storedTheme() {
  try {
    const saved = localStorage.getItem(themeKey);
    if (saved === 'light' || saved === 'dark') return saved;
  } catch (error) {
    // Preferência opcional.
  }
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const button = $('#themeToggle');
  if (!button) return;
  const light = theme === 'light';
  button.textContent = light ? '☾' : '☀';
  button.title = light ? 'Usar tema escuro' : 'Usar tema claro';
  button.setAttribute('aria-label', button.title);
}

function toggleTheme() {
  const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
  try {
    localStorage.setItem(themeKey, next);
  } catch (error) {
    // O tema ainda funciona durante esta visita.
  }
  applyTheme(next);
}

function safeDownloadUrl(value) {
  try {
    const parsed = new URL(value);
    if (parsed.protocol !== 'https:'
      || parsed.hostname !== allowedDownloadHost
      || !parsed.pathname.startsWith(allowedDownloadPath)) return fallbackDownload;
    return parsed.href;
  } catch (error) {
    return fallbackDownload;
  }
}

function formatBytes(value) {
  const bytes = Number(value);
  if (!Number.isFinite(bytes) || bytes <= 0) return 'tamanho não informado';
  return new Intl.NumberFormat('pt-BR', {
    style: 'unit',
    unit: 'megabyte',
    maximumFractionDigits: 1
  }).format(bytes / 1_000_000);
}

function setText(selector, value) {
  const element = $(selector);
  if (element) element.textContent = value;
}

function applyLatest(release) {
  const url = safeDownloadUrl(release.installer_url);
  $$('[data-download]').forEach(link => {
    link.href = url;
    link.setAttribute('rel', 'noopener');
  });
  $$('[data-version]').forEach(element => {
    element.textContent = release.version;
  });
  setText('#releaseSize', formatBytes(release.size));
  setText('#releaseHash', release.sha256 || 'não informado');
  setText('#releaseLicense', release.license || 'consulte a Release');
  const notes = $('#releaseNotes');
  if (notes) notes.href = safeDownloadUrl(release.release_notes_url);
}

function releaseCard(release) {
  const article = document.createElement('article');
  article.className = 'release-item';

  const heading = document.createElement('div');
  heading.className = 'release-heading';

  const version = document.createElement('strong');
  version.textContent = 'Versão ' + release.version;
  heading.appendChild(version);

  const status = document.createElement('span');
  status.className = 'release-status ' + (release.supported ? 'supported' : 'legacy');
  status.textContent = release.supported ? 'Atual' : 'Histórica';
  heading.appendChild(status);

  const meta = document.createElement('p');
  meta.className = 'release-meta';
  meta.textContent = [
    formatBytes(release.size),
    release.license || 'licença na Release'
  ].join(' · ');

  const summary = document.createElement('p');
  summary.textContent = release.summary || 'Consulte as notas desta versão.';

  const actions = document.createElement('div');
  actions.className = 'release-actions';

  const download = document.createElement('a');
  download.className = 'button small';
  download.href = safeDownloadUrl(release.installer_url);
  download.rel = 'noopener';
  download.textContent = 'Baixar instalador';
  actions.appendChild(download);

  const notes = document.createElement('a');
  notes.className = 'text-link';
  notes.href = safeDownloadUrl(release.release_notes_url);
  notes.rel = 'noopener';
  notes.textContent = 'Notas da versão';
  actions.appendChild(notes);

  article.append(heading, meta, summary, actions);
  return article;
}

async function loadReleaseData() {
  const list = $('#releaseList');
  const status = $('#manifestStatus');
  if (!list || !status) return;
  try {
    const [latestResponse, releasesResponse] = await Promise.all([
      fetch('./updates/latest.json', { cache: 'no-store' }),
      fetch('./updates/releases.json', { cache: 'no-store' })
    ]);
    if (!latestResponse.ok || !releasesResponse.ok) throw new Error('Manifesto indisponível');
    const latest = await latestResponse.json();
    const catalog = await releasesResponse.json();
    applyLatest(latest);
    list.replaceChildren();
    const releases = Array.isArray(catalog.releases) ? catalog.releases : [];
    releases.slice(0, maxReleases).forEach(release => list.appendChild(releaseCard(release)));
    status.textContent = 'Catálogo verificado';
    status.classList.add('ok');
  } catch (error) {
    status.textContent = 'Consulte a página de Releases';
    list.replaceChildren();
    const fallback = document.createElement('p');
    fallback.className = 'muted';
    fallback.textContent = 'Não foi possível carregar o catálogo agora. O botão de download abrirá a página oficial de Releases.';
    list.appendChild(fallback);
  }
}

async function copyHash() {
  const hash = $('#releaseHash')?.textContent?.trim();
  if (!hash || hash === 'não informado') return;
  try {
    await navigator.clipboard.writeText(hash);
    setText('#copyStatus', 'Hash copiado');
  } catch (error) {
    setText('#copyStatus', 'Selecione e copie o hash');
  }
  window.setTimeout(() => setText('#copyStatus', ''), 2200);
}

function configureNavigation() {
  const toggle = $('#menuToggle');
  const nav = $('#mainNav');
  toggle?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav?.addEventListener('click', event => {
    if (event.target.closest('a')) {
      nav.classList.remove('open');
      toggle?.setAttribute('aria-expanded', 'false');
    }
  });
}

function blockFraming() {
  if (window.top === window.self) return;
  try {
    window.top.location.replace(window.self.location.href);
  } catch (error) {
    // A pagina que enquadra pode impedir a navegacao. Entao o conteudo sai de
    // cena, para nao servir de isca sob uma sobreposicao de outra pessoa.
    const aviso = document.createElement('p');
    aviso.textContent = 'Abra o TrackerTalk no site oficial: '
      + 'https://pablolino.github.io/TrackerTalk-Distribuicao/';
    document.body.replaceChildren(aviso);
  }
}

blockFraming();
applyTheme(storedTheme());
$('#themeToggle')?.addEventListener('click', toggleTheme);
$('#copyHash')?.addEventListener('click', copyHash);
configureNavigation();
loadReleaseData();
