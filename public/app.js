const models = [
  { id: 'cat', name: 'The Curious Cat', category: 'Cats', note: 'A very good shelf companion.', bg: '#e8e0ef', color: '#b5a0cc' },
  { id: 'dog', name: 'The Goodest Pup', category: 'Dogs', note: 'Small paws. Huge personality.', bg: '#eee3ce', color: '#d4ad70' },
  { id: 'lizard', name: 'The Little Gecko', category: 'Lizards', note: 'Your new laid-back little friend.', bg: '#e0e8d6', color: '#9aad78' }
];
const colors = { Lavender: '#b5a0cc', Sage: '#9aad78', Peach: '#e5ae91', Butter: '#e1ce85', Sky: '#95bacb' };
const prices = { monthly: { 1: 12, 3: 30, 5: 45 }, once: { 1: 15, 3: 36, 5: 55 } };
const form = document.querySelector('#box-form');
const money = n => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);
let illustrationId = 0;
function creature(type, color) {
  const uid = ++illustrationId;
  const ears = type === 'dog' ? '<path d="M88 104Q30 72 42 158Q50 185 79 161M190 104Q249 72 236 158Q227 185 199 161" fill="url(#body)" stroke="#00000016" stroke-width="2"/>' : type === 'cat' ? '<path d="M73 108L69 38Q106 47 120 80M165 80Q185 45 210 38L207 112" fill="url(#body)" stroke="#00000016" stroke-width="2"/><path d="M82 82L81 56L105 84M177 84L198 56L197 85" fill="#ffffff30"/>' : '<path d="M75 117Q32 78 49 61Q65 48 84 95M194 118Q243 81 227 62Q210 48 192 95" fill="url(#body)"/>';
  const tail = type === 'lizard' ? '<path d="M173 234Q251 250 241 196Q232 169 222 188" fill="none" stroke="url(#body)" stroke-width="21" stroke-linecap="round"/>' : '<path d="M185 230Q240 230 225 184" fill="none" stroke="url(#body)" stroke-width="19" stroke-linecap="round"/>';
  const svg = `<svg viewBox="0 0 280 300" role="img" aria-label="Illustrated ${type}"><defs><linearGradient id="body" x1="0" y1="0" x2="1" y2=".8"><stop stop-color="${color}"/><stop offset=".5" stop-color="${color}"/><stop offset="1" stop-color="#000" stop-opacity=".22"/></linearGradient><pattern id="layers" width="4" height="4" patternUnits="userSpaceOnUse"><path d="M0 3.5H280" stroke="#fff" stroke-opacity=".14" stroke-width=".8"/></pattern></defs><ellipse cx="143" cy="265" rx="79" ry="10" fill="#26372c" opacity=".09"/>${tail}<path d="M89 174Q72 195 77 243Q84 263 139 260Q199 264 202 242Q207 200 185 173" fill="url(#body)"/>${ears}<path d="M65 119Q66 77 136 76Q209 76 214 122Q227 176 184 191Q140 207 94 189Q56 175 65 119" fill="url(#body)"/><path d="M65 119Q66 77 136 76Q209 76 214 122Q227 176 184 191Q140 207 94 189Q56 175 65 119M89 174Q72 195 77 243Q84 263 139 260Q199 264 202 242Q207 200 185 173" fill="url(#layers)"/><ellipse cx="103" cy="137" rx="7" ry="10" fill="#304133"/><ellipse cx="174" cy="137" rx="7" ry="10" fill="#304133"/><circle cx="105" cy="134" r="2" fill="white"/><circle cx="176" cy="134" r="2" fill="white"/><path d="M130 153Q139 146 148 153L139 161Z" fill="#6a5369"/><path d="M139 160Q126 176 119 163M139 160Q151 176 159 163" fill="none" stroke="#5c5060" stroke-width="2" stroke-linecap="round"/><ellipse cx="93" cy="155" rx="11" ry="5" fill="#e99cab" opacity=".4"/><ellipse cx="184" cy="155" rx="11" ry="5" fill="#e99cab" opacity=".4"/><path d="M109 206L105 244M169 206L174 244" fill="none" stroke="#00000018" stroke-width="3"/><ellipse cx="103" cy="248" rx="25" ry="13" fill="url(#body)"/><ellipse cx="176" cy="248" rx="25" ry="13" fill="url(#body)"/></svg>`;
  return svg.replaceAll('id="body"', `id="body-${uid}"`).replaceAll('id="layers"', `id="layers-${uid}"`).replaceAll('url(#body)', `url(#body-${uid})`).replaceAll('url(#layers)', `url(#layers-${uid})`);
}
document.querySelector('#hero-creature').innerHTML = creature('cat', colors.Lavender);
function renderProducts(filter = 'all') {
  document.querySelector('#products').innerHTML = models.filter(m => filter === 'all' || m.category === filter).map(m => `<article class="product-card"><div class="product-art" style="background:${m.bg}"><span class="product-category">${m.category.toUpperCase()} / 001</span><div class="creature">${creature(m.id, m.color)}</div></div><div class="product-info"><div><h3>${m.name}</h3><p>${m.note}</p></div><button class="add-model" data-model="${m.id}" aria-label="Choose ${m.name}">↗</button></div></article>`).join('');
}
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-filter]').forEach(b => { b.classList.toggle('active', b === button); b.setAttribute('aria-pressed', String(b === button)); });
  renderProducts(button.dataset.filter);
}));
document.querySelector('#swatches').innerHTML = Object.entries(colors).map(([name, hex], i) => `<label class="swatch"><input type="radio" name="color" value="${name}" ${i === 0 ? 'checked' : ''}><i style="background:${hex}"></i>${name}</label>`).join('');
function renderSlots(picks) {
  const count = Number(new FormData(form).get('size'));
  const current = picks || Array.from(document.querySelectorAll('.model-select'), s => s.value);
  document.querySelector('#model-slots').innerHTML = Array.from({ length: count }, (_, i) => `<label class="model-slot">Print ${i + 1}<select class="model-select" aria-label="Model for print ${i + 1}">${models.map(m => `<option value="${m.id}" ${m.id === (current[i] || models[i % models.length].id) ? 'selected' : ''}>${m.name}</option>`).join('')}</select></label>`).join('');
}
function state() {
  const data = new FormData(form);
  return { frequency: data.get('frequency'), size: Number(data.get('size')), boxes: Number(document.querySelector('#boxes').value), mode: data.get('mode'), color: data.get('color'), interests: data.getAll('interest'), picks: Array.from(document.querySelectorAll('.model-select'), s => s.value) };
}
function update() {
  const s = state();
  document.querySelector('#pick-panel').hidden = s.mode !== 'pick';
  document.querySelector('#surprise-panel').hidden = s.mode !== 'surprise';
  document.querySelector('#summary-title').textContent = `The ${{ 1: 'Little', 3: 'Lovely', 5: 'Lots' }[s.size]} Box`;
  const validBoxes = Number.isInteger(s.boxes) && s.boxes >= 1 && s.boxes <= 20;
  document.querySelector('#summary-description').textContent = validBoxes ? `${s.size} print${s.size > 1 ? 's' : ''} per box · ${s.boxes} box${s.boxes > 1 ? 'es' : ''} · ${s.size * s.boxes} little friend${s.size * s.boxes > 1 ? 's' : ''}` : 'Choose between 1 and 20 whole boxes.';
  document.querySelector('#summary-models').textContent = s.mode === 'pick' ? s.picks.map(id => models.find(m => m.id === id).name.replace('The ', '')).join(', ') : `Surprise · ${s.interests.join(', ') || 'Choose interests'}`;
  document.querySelector('#summary-color').textContent = s.color;
  document.querySelector('#summary-frequency').textContent = s.frequency === 'monthly' ? 'Every month' : 'One time';
  document.querySelector('#total').textContent = validBoxes ? money(prices[s.frequency][s.size] * s.boxes) : '—';
  document.querySelector('#billing-note').textContent = s.frequency === 'monthly' ? 'Sample recurring price per month. Each monthly delivery includes the number of boxes selected.' : 'Sample price for a single delivery.';
  document.querySelector('#save-status').textContent = '';
}
form.addEventListener('change', event => { if (event.target.name === 'size') renderSlots(); update(); });
document.querySelector('#boxes').addEventListener('input', update);
document.querySelector('#products').addEventListener('click', event => {
  const button = event.target.closest('[data-model]');
  if (!button) return;
  form.querySelector('[name="mode"][value="pick"]').checked = true;
  document.querySelector('.model-select').value = button.dataset.model;
  update(); document.querySelector('#builder').scrollIntoView({ behavior: 'smooth' });
});
form.addEventListener('submit', event => {
  event.preventDefault(); const s = state();
  if (s.mode === 'surprise' && !s.interests.length) { document.querySelector('#save-status').textContent = 'Pick at least one creature category for your surprise box.'; return; }
  try { localStorage.setItem('little-layer-box', JSON.stringify(s)); document.querySelector('#save-status').textContent = 'Your box is saved on this browser! No order has been placed.'; }
  catch { document.querySelector('#save-status').textContent = 'This browser could not save your box. Your selections are still shown above.'; }
});
function restore() {
  try {
    const saved = JSON.parse(localStorage.getItem('little-layer-box'));
    if (!saved || !['monthly', 'once'].includes(saved.frequency) || ![1, 3, 5].includes(saved.size) || !Number.isInteger(saved.boxes) || saved.boxes < 1 || saved.boxes > 20 || !['pick', 'surprise'].includes(saved.mode) || !Object.hasOwn(colors, saved.color) || !Array.isArray(saved.interests) || !Array.isArray(saved.picks)) return;
    for (const key of ['frequency', 'size', 'mode', 'color']) Array.from(form.elements).filter(el => el.name === key).forEach(el => { el.checked = el.value === String(saved[key]); });
    document.querySelector('#boxes').value = saved.boxes;
    form.querySelectorAll('[name="interest"]').forEach(el => { el.checked = saved.interests.includes(el.value); });
    renderSlots(saved.picks.filter(id => models.some(m => m.id === id)));
  } catch { /* A missing or invalid draft starts with defaults. */ }
}
renderProducts(); renderSlots(); restore(); update();
