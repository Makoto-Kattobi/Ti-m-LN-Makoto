/* ═══════════════════════════════
   MỘCTHƯ — SHARED JS
═══════════════════════════════ */

/* ── Tag color mapping ── */
const TAG_CLASS = {
  'Japanese Novel': 'tag-jp',
  'Chinese Novel':  'tag-cn',
  'Korean Novel':   'tag-kr',
  'Vietnamese Novel':'tag-vn',
  'Web Novel':      'tag-default',
  'Action':         'tag-action',
  'Romance':        'tag-romance',
  'Fantasy':        'tag-fantasy',
  'Comedy':         'tag-comedy',
  'Drama':          'tag-drama',
  'Isekai':         'tag-isekai',
  'School Life':    'tag-school',
  'Slice of Life':  'tag-slice',
  'Seinen':         'tag-seinen',
  'Shounen':        'tag-shounen',
  'Harem':          'tag-harem',
  'Dark Fantasy':   'tag-dark',
  'Mystery':        'tag-mystery',
  'Lịch Sử':        'tag-hist',
  'Historical':     'tag-hist',
  'Sci-Fi':         'tag-scifi',
  'Khoa Huyễn':     'tag-scifi',
  'Tiên Hiệp':      'tag-shounen',
  'Kiếm Hiệp':      'tag-action',
  'Ngôn Tình':      'tag-romance',
  'Huyền Huyễn':    'tag-fantasy',
  'Hệ Thống':       'tag-isekai',
  'Ma Đạo':         'tag-dark',
  'Cổ Đại':         'tag-hist',
  'Adventure':      'tag-action',
};

function getTagClass(tag) {
  return TAG_CLASS[tag] || 'tag-default';
}

function renderTags(tags, max) {
  const list = max ? tags.slice(0, max) : tags;
  return list.map(t => `<span class="tag ${getTagClass(t)}">${t}</span>`).join('');
}

/* ── Dark mode ── */
function initDark() {
  try {
    if (localStorage.getItem('dark') === '1') {
      document.body.classList.add('dark');
      updateDarkIcon(true);
    }
  } catch(e) {}
}

function toggleDark() {
  const isDark = document.body.classList.toggle('dark');
  updateDarkIcon(isDark);
  try { localStorage.setItem('dark', isDark ? '1' : '0'); } catch(e) {}
}

function updateDarkIcon(isDark) {
  document.querySelectorAll('.dark-btn i').forEach(i => {
    i.className = 'fas ' + (isDark ? 'fa-sun' : 'fa-moon');
  });
}

/* ── Tabs ── */
function initTabs(containerSel, tabSel, paneSel) {
  const container = document.querySelector(containerSel);
  if (!container) return;
  container.querySelectorAll(tabSel).forEach(btn => {
    btn.addEventListener('click', function() {
      const idx = this.dataset.tab;
      container.querySelectorAll(tabSel).forEach(b => b.classList.remove('active'));
      container.querySelectorAll(paneSel).forEach(p => p.classList.remove('active'));
      this.classList.add('active');
      const pane = container.querySelector(`[data-pane="${idx}"]`);
      if (pane) pane.classList.add('active');
    });
  });
}

/* ── Fetch data ── */
async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch ' + url);
  return res.json();
}

/* ── URL params ── */
function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

/* ── Get status class/text ── */
function getStatusInfo(s) {
  if (s === 'hot')  return { cls: 'cover-badge', text: 'HOT' };
  if (s === 'new')  return { cls: 'cover-badge new', text: 'MỚI' };
  if (s === 'done') return { cls: 'cover-badge done', text: 'FULL' };
  return null;
}

/* ── Render story card ── */
function renderStoryCard(t, dataDir) {
  const badge = t.trang_thai ? getStatusInfo(t.trang_thai) : null;
  const badgeHtml = badge ? `<div class="${badge.cls}">${badge.text}</div>` : '';
  const chapters = t.chuong_moi.map(c => `
    <div class="chap-row">
      <i class="fas fa-file-alt"></i>
      <a href="${dataDir}chuong.html?truyen=${t.id}&so=${c.so}">${c.ten}</a>
      <span class="chap-time">${c.thoi_gian}</span>
    </div>`).join('');
  const dotCls = t.trang_thai === 'done' ? 'done' : t.trang_thai === 'pause' ? 'pause' : '';

  return `
  <div class="story-card">
    <a href="${dataDir}truyen.html?id=${t.id}" class="story-cover" style="display:block">
      ${t.bia ? `<img src="${t.bia}" alt="${t.ten}">` : `<div class="story-cover-ph">${t.bia_text}</div>`}
      ${badgeHtml}
    </a>
    <div class="story-body">
      <a href="${dataDir}truyen.html?id=${t.id}" class="story-name">${t.ten}</a>
      <div class="story-status">
        <span class="status-dot ${dotCls}"></span>
        ${t.trang_thai_text}
      </div>
      <div class="story-tags">${renderTags(t.the_loai, 5)}</div>
      <div class="story-desc">${t.mo_ta.replace(/\n/g,' ').split('「')[0]}</div>
      <div class="story-chapters">${chapters}</div>
    </div>
  </div>`;
}

/* ── Render feat item ── */
function renderFeatItem(t, dataDir) {
  return `
  <div class="feat-item" onclick="location.href='${dataDir}truyen.html?id=${t.id}'">
    <div class="feat-cover">
      ${t.bia ? `<img src="${t.bia}" alt="${t.ten}">` : `<div class="feat-cover-ph">${t.bia_text}</div>`}
    </div>
    <div class="feat-info">
      <div class="feat-name">${t.ten}</div>
      <div class="feat-sub">${t.trang_thai_text} · ${t.so_chuong} chương</div>
    </div>
  </div>`;
}

/* ── Header HTML ── */
function renderHeader(activePage, dataDir) {
  return `
  <header class="site-header">
    <div class="header-inner">
      <a href="${dataDir}index.html" class="site-logo">
        <div class="logo-box">M</div>
        <span class="logo-text">Mộc<span>Thư</span></span>
      </a>
      <form class="header-search" action="${dataDir}danh-sach.html" method="get">
        <i class="fas fa-search search-icon"></i>
        <input name="q" placeholder="Tìm truyện, tác giả..." type="text" autocomplete="off">
        <button class="search-btn" type="submit">Tìm</button>
      </form>
      <div class="header-right">
        <button class="dark-btn" onclick="toggleDark()" title="Tắt/bật đèn">
          <i class="fas fa-moon"></i>
        </button>
        <button class="btn-sm">Đăng Nhập</button>
        <button class="btn-sm primary reg">Đăng Ký</button>
      </div>
    </div>
  </header>
  <nav class="site-nav">
    <div class="nav-inner">
      <a href="${dataDir}index.html" ${activePage==='home'?'class="active"':''}><i class="fas fa-home"></i> Trang chủ</a>
      <a href="${dataDir}danh-sach.html" ${activePage==='list'?'class="active"':''}><i class="fas fa-book"></i> Danh sách truyện</a>
      <a href="${dataDir}danh-sach.html?loai=sangtac" ${activePage==='sangtac'?'class="active"':''}><i class="fas fa-pen-fancy"></i> Truyện sáng tác</a>
      <a href="${dataDir}tin-tuc.html" ${activePage==='tintuc'?'class="active"':''}><i class="fas fa-newspaper"></i> Tin tức</a>
      <a href="${dataDir}am-nhac.html" ${activePage==='amnhac'?'class="active"':''}><i class="fas fa-music"></i> Âm nhạc</a>
      <a href="#"><i class="fas fa-comments"></i> Thảo luận</a>
      <a href="#"><i class="fas fa-clipboard-list"></i> Bảng yêu cầu <span class="nav-badge">0</span></a>
      <div class="nav-spacer"></div>
      <a href="#" class="nav-pill"><i class="fab fa-discord"></i> Discord</a>
    </div>
  </nav>`;
}

/* ── Footer HTML ── */
function renderFooter(dataDir) {
  return `
  <footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-cols">
        <div>
          <div class="footer-logo-wrap">
            <a href="${dataDir}index.html" class="site-logo">
              <div class="logo-box">M</div>
              <span class="logo-text" style="color:#fff">Mộc<span>Thư</span></span>
            </a>
          </div>
          <div class="footer-desc">Mang đến những bản dịch Light Novel, truyện chữ tiếng Việt chất lượng cao, hoàn toàn miễn phí cho cộng đồng độc giả Việt Nam.</div>
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
            <li><a href="${dataDir}index.html"><i class="fas fa-home"></i>Trang chủ</a></li>
            <li><a href="${dataDir}danh-sach.html"><i class="fas fa-book"></i>Danh sách truyện</a></li>
            <li><a href="#"><i class="fas fa-fire"></i>Đang hot</a></li>
            <li><a href="${dataDir}danh-sach.html?loai=hoanhthanh"><i class="fas fa-check-circle"></i>Hoàn thành</a></li>
            <li><a href="#"><i class="fas fa-comments"></i>Thảo luận</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Thể Loại</h4>
          <ul>
            <li><a href="${dataDir}danh-sach.html?q=Tiên+Hiệp"><i class="fas fa-tag"></i>Tiên Hiệp</a></li>
            <li><a href="${dataDir}danh-sach.html?q=Kiếm+Hiệp"><i class="fas fa-tag"></i>Kiếm Hiệp</a></li>
            <li><a href="${dataDir}danh-sach.html?q=Ngôn+Tình"><i class="fas fa-tag"></i>Ngôn Tình</a></li>
            <li><a href="${dataDir}danh-sach.html?q=Huyền+Huyễn"><i class="fas fa-tag"></i>Huyền Huyễn</a></li>
            <li><a href="${dataDir}danh-sach.html?q=Hệ+Thống"><i class="fas fa-tag"></i>Hệ Thống</a></li>
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
        <span>Copyright © 2026 MộcThư · Tất cả quyền được bảo lưu</span>
        <span>Thiết kế với <i class="fas fa-heart" style="color:var(--orange)"></i> cho độc giả Việt</span>
      </div>
    </div>
  </footer>`;
}

/* ── Right sidebar HTML ── */
function renderRightSidebar(truyen, dataDir) {
  const day   = truyen.slice(0,6).map(t => renderFeatItem(t, dataDir)).join('');
  const week  = truyen.slice(2,8).map(t => renderFeatItem(t, dataDir)).join('');
  const all   = [...truyen].sort((a,b) => parseFloat(b.danh_gia) - parseFloat(a.danh_gia)).slice(0,6).map(t => renderFeatItem(t, dataDir)).join('');
  return `
  <aside id="sidebar-right">
    <div class="ad-box"><i class="fas fa-ad"></i><span>Quảng cáo 300×250</span></div>

    <div class="box" id="featured-box">
      <div class="box-head"><i class="fas fa-fire"></i> Nổi Bật</div>
      <div class="tab-bar">
        <button class="active" data-tab="0">Ngày</button>
        <button data-tab="1">Tuần</button>
        <button data-tab="2">Tất cả</button>
      </div>
      <div class="tab-pane active" data-pane="0">${day}</div>
      <div class="tab-pane" data-pane="1">${week}</div>
      <div class="tab-pane" data-pane="2">${all}</div>
    </div>

    <div class="box">
      <div class="box-head"><i class="fas fa-history"></i> Đọc Gần Đây</div>
      <div style="padding:20px 14px;text-align:center;color:var(--muted);font-size:.8rem">
        <i class="far fa-book-open" style="font-size:1.5rem;display:block;margin-bottom:8px;color:var(--muted2)"></i>
        <a href="#" style="color:var(--orange);font-weight:700">Đăng nhập</a> để xem lịch sử đọc
      </div>
    </div>

    <div class="box">
      <div class="box-head"><i class="fas fa-comment-dots"></i> Bình Luận Mới</div>
      <div class="comment-preview">
        <div class="cp-title">Lăng Tiêu Kiếm Tiên - Ch.1240</div>
        <div class="cp-text">Chương này hay quá! Cảm ơn nhóm dịch đã làm việc chăm chỉ, mong ra chương mới sớm.</div>
        <div class="cp-meta"><strong>Nguyên</strong> · 2 giờ trước</div>
      </div>
      <div class="comment-preview">
        <div class="cp-title">Thiên Vũ Tôn - Ch.2100</div>
        <div class="cp-text">Plot twist bất ngờ quá! Không nghĩ tác giả lại viết như vậy đâu.</div>
        <div class="cp-meta"><strong>Mộng Huyễn</strong> · 5 giờ trước</div>
      </div>
      <div class="comment-preview">
        <div class="cp-title">Bích Lạc Tình Duyên - Ch.680</div>
        <div class="cp-text">Đọc từ đầu đến cuối, bộ này thực sự rất hay và cảm xúc.</div>
        <div class="cp-meta"><strong>Tiểu Kiếm</strong> · 9 giờ trước</div>
      </div>
      <div class="comment-preview">
        <div class="cp-title">Ma Đạo Vấn Thiên - Ch.520</div>
        <div class="cp-text">Main OP rồi, đọc mà đã tay ghê.</div>
        <div class="cp-meta"><strong>DragonBall</strong> · 1 ngày trước</div>
      </div>
    </div>

    <div class="ad-box" style="min-height:100px"><i class="fas fa-ad"></i><span>Quảng cáo 300×100</span></div>
  </aside>`;
}

/* ── Left sidebar HTML ── */
function renderLeftSidebar(dataDir) {
  return `
  <aside id="sidebar-left" class="sidebar-left">
    <div class="box">
      <div class="box-head"><i class="fas fa-comments"></i> Thảo Luận</div>
      ${[
        ['Bạn có muốn nghe truyện thay vì đọc không?','12 ngày','36'],
        ['Dự án chuyển thể truyện audio bằng AI','2 tháng','3'],
        ['Về việc đăng truyện và dịch nối pj trên web','3 tháng','0'],
        ['Người mới tới nên bỡ ngỡ','1 tháng','1'],
      ].map(([title,time,cmt]) => `
        <div style="padding:10px 13px;border-bottom:1px solid var(--border2);cursor:pointer" onmouseover="this.style.background='rgba(255,122,46,.05)'" onmouseout="this.style.background=''">
          <div style="font-size:.8rem;font-weight:600;color:var(--text);line-height:1.4;margin-bottom:4px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${title}</div>
          <div style="font-size:.7rem;color:var(--muted);display:flex;gap:8px">
            <span><i class="far fa-clock"></i> ${time}</span>
            <span><i class="far fa-comment"></i> ${cmt}</span>
          </div>
        </div>`).join('')}
    </div>

    <div class="box">
      <div class="box-head"><i class="fas fa-pen-nib"></i> Blog</div>
      ${[
        ['Tản mạn về văn học mạng năm 2026','Nguyên Phong','1'],
        ['Review: Top 5 truyện hay nhất tháng này','Mộng Huyễn','3'],
        ['Cảm nhận sau khi đọc hết Phượng Hoàng','Tiểu Kiếm','7'],
      ].map(([title,user,likes]) => `
        <div style="padding:10px 13px;border-bottom:1px solid var(--border2);position:relative;cursor:pointer" onmouseover="this.style.background='rgba(255,122,46,.05)'" onmouseout="this.style.background=''">
          <div style="font-size:.8rem;font-weight:600;color:var(--text);line-height:1.35;margin-bottom:4px;padding-right:36px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${title}</div>
          <div style="font-size:.7rem;color:var(--muted)"><a href="#" style="color:var(--link);font-weight:700">${user}</a></div>
          <div style="position:absolute;top:10px;right:13px;font-size:.72rem;color:var(--muted);display:flex;align-items:center;gap:3px"><i class="fas fa-heart" style="color:#ef4444"></i>${likes}</div>
        </div>`).join('')}
    </div>

    <div class="box">
      <div class="box-head"><i class="fas fa-tags"></i> Thể Loại</div>
      <div style="padding:10px 13px;display:flex;flex-wrap:wrap;gap:5px">
        ${['Tiên Hiệp','Kiếm Hiệp','Ngôn Tình','Huyền Huyễn','Hệ Thống','Ma Đạo','Cổ Đại','Đô Thị','Lịch Sử','Khoa Huyễn','Xuyên Không','Dị Năng'].map(g =>
          `<a href="${dataDir}danh-sach.html?q=${encodeURIComponent(g)}" style="padding:3px 9px;background:var(--bg);border:1px solid var(--border);border-radius:4px;font-size:.7rem;font-weight:600;color:var(--text2);transition:all .15s" onmouseover="this.style.background='var(--orange)';this.style.color='#fff';this.style.borderColor='var(--orange)'" onmouseout="this.style.background='var(--bg)';this.style.color='var(--text2)';this.style.borderColor='var(--border)'">${g}</a>`
        ).join('')}
      </div>
    </div>
  </aside>`;
}

document.addEventListener('DOMContentLoaded', () => {
  initDark();
  initTabs('#featured-box', '[data-tab]', '[data-pane]');
});
