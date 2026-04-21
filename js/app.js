/* ===========================
   LN KATTOBI — SHARED JS
=========================== */

const SITE_NAME = 'LN Kattobi';

const GENRES = [
  'Japanese Novel','Shounen','Action','Romance',
  'Science Fiction','Character Growth','Game','School Life'
];

const TAG_MAP = {
  'Japanese Novel':   'tag-jp',
  'Shounen':          'tag-shounen',
  'Action':           'tag-action',
  'Romance':          'tag-romance',
  'Science Fiction':  'tag-scifi',
  'Character Growth': 'tag-slice',
  'Game':             'tag-isekai',
  'School Life':      'tag-school',
};

function tagClass(t) { return TAG_MAP[t] || 'tag-default'; }

function renderTags(tags, max) {
  const list = max ? tags.slice(0, max) : tags;
  return list.map(t => `<span class="tag ${tagClass(t)}">${t}</span>`).join('');
}

/* Dark mode */
function initDark() {
  try { if (localStorage.getItem('dk') === '1') applyDark(true); } catch(e) {}
}
function toggleDark() {
  const on = document.body.classList.toggle('dark');
  applyDark(on);
  try { localStorage.setItem('dk', on ? '1' : '0'); } catch(e) {}
}
function applyDark(on) {
  document.body.classList.toggle('dark', on);
  document.querySelectorAll('.dark-btn i').forEach(i => {
    i.className = 'fas ' + (on ? 'fa-sun' : 'fa-moon');
  });
}

/* Tabs */
function initTabs(wrap, tabSel, paneSel) {
  const el = document.querySelector(wrap);
  if (!el) return;
  el.querySelectorAll(tabSel).forEach(btn => {
    btn.addEventListener('click', function() {
      const idx = this.dataset.tab;
      el.querySelectorAll(tabSel).forEach(b => b.classList.remove('active'));
      el.querySelectorAll(paneSel).forEach(p => p.classList.remove('active'));
      this.classList.add('active');
      const pane = el.querySelector('[data-pane="' + idx + '"]');
      if (pane) pane.classList.add('active');
    });
  });
}

/* Helpers */
async function loadJSON(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error('Không tải được: ' + url);
  return r.json();
}
function getParam(k) { return new URLSearchParams(location.search).get(k); }
function badgeHtml(s) {
  if (s === 'hot')  return '<div class="cover-badge">HOT</div>';
  if (s === 'new')  return '<div class="cover-badge new">MỚI</div>';
  if (s === 'done') return '<div class="cover-badge done">FULL</div>';
  return '';
}

/* Story card */
function storyCard(t, base) {
  const dot = t.trang_thai === 'done' ? 'done' : '';
  const chaps = t.chuong_moi.map(c =>
    `<div class="chap-row">
      <i class="fas fa-file-alt"></i>
      <a href="${base}chuong.html?truyen=${t.id}&so=${c.so}">${c.ten}</a>
      <span class="chap-time">${c.thoi_gian}</span>
    </div>`
  ).join('');
  return `
  <div class="story-card">
    <a href="${base}truyen.html?id=${t.id}" class="story-cover">
      ${t.bia ? `<img src="${t.bia}" alt="${t.ten}">` : `<div class="story-cover-ph">${t.bia_text||'書'}</div>`}
      ${badgeHtml(t.trang_thai)}
    </a>
    <div class="story-body">
      <a href="${base}truyen.html?id=${t.id}" class="story-name">${t.ten}</a>
      <div class="story-status"><span class="status-dot ${dot}"></span>${t.trang_thai_text||'Đang tiến hành'}</div>
      <div class="story-tags">${renderTags(t.the_loai||[], 5)}</div>
      <div class="story-desc">${(t.mo_ta||'').split('\n')[0]}</div>
      <div class="story-chapters">${chaps}</div>
    </div>
  </div>`;
}

/* Feat item (right sidebar) */
function featItem(t, base) {
  return `
  <div class="feat-item" onclick="location.href='${base}truyen.html?id=${t.id}'">
    <div class="feat-cover">
      ${t.bia ? `<img src="${t.bia}" alt="">` : `<div class="feat-cover-ph">${t.bia_text||'書'}</div>`}
    </div>
    <div class="feat-info">
      <div class="feat-name">${t.ten}</div>
      <div class="feat-sub">${t.trang_thai_text||''} · ${t.so_chuong||0} ch.</div>
    </div>
  </div>`;
}

/* Header */
function renderHeader(active, base) {
  const nav = [
    ['home',    base+'index.html',          'fa-home',       'Trang chủ'],
    ['list',    base+'danh-sach.html',       'fa-book',       'Danh sách truyện'],
    ['sangtac', base+'danh-sach.html?loai=sangtac','fa-pen-fancy','Truyện sáng tác'],
    ['tintuc',  base+'tin-tuc.html',         'fa-newspaper',  'Tin tức'],
    ['amnhac',  base+'am-nhac.html',         'fa-music',      'Âm nhạc'],
    ['',        '#',                          'fa-comments',   'Thảo luận'],
  ].map(([key,href,icon,label]) =>
    `<a href="${href}" ${active===key?'class="active"':''}><i class="fas ${icon}"></i> ${label}</a>`
  ).join('');

  return `
  <header class="site-header">
    <div class="header-inner">
      <a href="${base}index.html" class="site-logo">
        <div class="logo-box">L</div>
        <span class="logo-text">LN <span>Kattobi</span></span>
      </a>
      <form class="header-search" action="${base}danh-sach.html" method="get">
        <i class="fas fa-search si"></i>
        <input name="q" placeholder="Tìm truyện, tác giả..." autocomplete="off">
        <button class="search-btn" type="submit">Tìm</button>
      </form>
      <div class="header-right">
        <button class="dark-btn" onclick="toggleDark()" title="Tắt/bật đèn"><i class="fas fa-moon"></i></button>
        <button class="btn-sm">Đăng Nhập</button>
        <button class="btn-sm primary">Đăng Ký</button>
      </div>
    </div>
  </header>
  <nav class="site-nav">
    <div class="nav-inner">
      ${nav}
      <div class="nav-spacer"></div>
      <a href="#" class="nav-pill"><i class="fab fa-discord"></i> Discord</a>
    </div>
  </nav>`;
}

/* Footer */
function renderFooter(base) {
  return `
  <footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-cols">
        <div>
          <a href="${base}index.html" class="site-logo">
            <div class="logo-box">L</div>
            <span class="logo-text" style="color:#fff">LN <span>Kattobi</span></span>
          </a>
          <div class="footer-desc">Mang đến những bản dịch Light Novel chất lượng cao, hoàn toàn miễn phí cho cộng đồng độc giả Việt Nam.</div>
          <div class="footer-social">
            <a href="#"><i class="fab fa-facebook-f"></i></a>
            <a href="#"><i class="fab fa-discord"></i></a>
            <a href="#"><i class="fab fa-youtube"></i></a>
            <a href="#"><i class="fab fa-telegram"></i></a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Khám Phá</h4>
          <ul>
            <li><a href="${base}index.html"><i class="fas fa-home"></i>Trang chủ</a></li>
            <li><a href="${base}danh-sach.html"><i class="fas fa-book"></i>Danh sách</a></li>
            <li><a href="${base}tin-tuc.html"><i class="fas fa-newspaper"></i>Tin tức</a></li>
            <li><a href="${base}am-nhac.html"><i class="fas fa-music"></i>Âm nhạc</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Thể Loại</h4>
          <ul>
            ${GENRES.slice(0,5).map(g =>
              `<li><a href="${base}danh-sach.html?q=${encodeURIComponent(g)}"><i class="fas fa-tag"></i>${g}</a></li>`
            ).join('')}
          </ul>
        </div>
        <div class="footer-col">
          <h4>Hỗ Trợ</h4>
          <ul>
            <li><a href="#"><i class="fas fa-info-circle"></i>Về chúng tôi</a></li>
            <li><a href="#"><i class="fas fa-envelope"></i>Liên hệ</a></li>
            <li><a href="#"><i class="fas fa-hand-holding-dollar"></i>Ủng hộ</a></li>
            <li><a href="#"><i class="fas fa-shield-alt"></i>Chính sách</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>Copyright © 2026 LN Kattobi · Tất cả quyền được bảo lưu</span>
        <span>Thiết kế với <i class="fas fa-heart" style="color:var(--orange)"></i> cho độc giả Việt</span>
      </div>
    </div>
  </footer>`;
}

/* Right sidebar */
function renderSidebar(list, base) {
  const mk = (arr) => arr.length
    ? arr.map(t => featItem(t, base)).join('')
    : '<div style="padding:20px;text-align:center;color:var(--muted);font-size:.85rem">Chưa có truyện</div>';

  return `
  <aside>
    <div class="ad-box"><i class="fas fa-ad"></i><span>Quảng cáo AdSense</span></div>
    <div class="box" id="feat-box">
      <div class="box-head"><i class="fas fa-fire"></i> Nổi Bật</div>
      <div class="tab-bar">
        <button class="active" data-tab="0">Ngày</button>
        <button data-tab="1">Tuần</button>
        <button data-tab="2">Tất cả</button>
      </div>
      <div class="tab-pane active" data-pane="0">${mk(list.slice(0,5))}</div>
      <div class="tab-pane" data-pane="1">${mk(list.slice(0,5))}</div>
      <div class="tab-pane" data-pane="2">${mk(list)}</div>
    </div>
    <div class="box">
      <div class="box-head"><i class="fas fa-history"></i> Đọc Gần Đây</div>
      <div style="padding:20px;text-align:center;color:var(--muted);font-size:.85rem">
        <i class="far fa-book-open" style="font-size:1.4rem;display:block;margin-bottom:8px;color:var(--muted2)"></i>
        <a href="#" style="color:var(--orange);font-weight:700">Đăng nhập</a> để xem lịch sử
      </div>
    </div>
    <div class="box">
      <div class="box-head"><i class="fas fa-comment-dots"></i> Bình Luận Mới</div>
      <div class="comment-preview">
        <div class="cp-title">Chào mừng đến LN Kattobi!</div>
        <div class="cp-text">Trang web đang được xây dựng. Hãy thêm truyện vào nhé!</div>
        <div class="cp-meta"><strong>Admin</strong> · vừa xong</div>
      </div>
    </div>
    <div class="ad-box" style="min-height:90px"><i class="fas fa-ad"></i><span>Quảng cáo</span></div>
  </aside>`;
}

/* Left sidebar */
function renderLeftSidebar(base) {
  const tags = GENRES.map(g =>
    `<a href="${base}danh-sach.html?q=${encodeURIComponent(g)}"
        style="padding:3px 10px;background:var(--bg);border:1px solid var(--border);
               border-radius:4px;font-size:.72rem;font-weight:600;color:var(--text2);
               transition:all .15s"
        onmouseover="this.style.background='var(--orange)';this.style.color='#fff'"
        onmouseout="this.style.background='var(--bg)';this.style.color='var(--text2)'">${g}</a>`
  ).join('');

  return `
  <aside class="sidebar-left">
    <div class="box">
      <div class="box-head"><i class="fas fa-comments"></i> Thảo Luận</div>
      ${[
        ['Góp ý về trang web','vừa xong','0'],
        ['Yêu cầu dịch truyện mới','hôm nay','0'],
        ['Hướng dẫn sử dụng trang','hôm nay','0'],
      ].map(([t,time,c]) => `
        <div style="padding:10px 13px;border-bottom:1px solid var(--border2);cursor:pointer">
          <div style="font-size:.82rem;font-weight:600;color:var(--text);line-height:1.4;margin-bottom:4px">${t}</div>
          <div style="font-size:.72rem;color:var(--muted);display:flex;gap:8px">
            <span><i class="far fa-clock"></i> ${time}</span>
            <span><i class="far fa-comment"></i> ${c}</span>
          </div>
        </div>`).join('')}
    </div>
    <div class="box">
      <div class="box-head"><i class="fas fa-tags"></i> Thể Loại</div>
      <div style="padding:10px 13px;display:flex;flex-wrap:wrap;gap:5px">${tags}</div>
    </div>
  </aside>`;
}

document.addEventListener('DOMContentLoaded', () => {
  initDark();
  initTabs('#feat-box', '[data-tab]', '[data-pane]');
});
