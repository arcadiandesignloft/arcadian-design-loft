
const nav=document.querySelector('.nav');
addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>30));

const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')})
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

document.getElementById('year').textContent=new Date().getFullYear();

let lang='en';
const toggle=document.getElementById('langToggle');
toggle.addEventListener('click',()=>{
  lang=lang==='en'?'el':'en';
  document.documentElement.lang=lang;
  toggle.textContent=lang==='en'?'GR':'EN';
  document.querySelectorAll('[data-en]').forEach(el=>{
    el.textContent=el.dataset[lang];
  });
});

const galleryCategories={
  living:Array.from({length:22},(_,i)=>`assets/gallery/living/living-${String(i+1).padStart(2,'0')}.jpg`),
  bedroom1:Array.from({length:6},(_,i)=>`assets/gallery/bedroom1/bedroom1-${String(i+1).padStart(2,'0')}.jpg`),
  bedroom2:Array.from({length:7},(_,i)=>`assets/gallery/bedroom2/bedroom2-${String(i+1).padStart(2,'0')}.jpg`),
  bathroom:Array.from({length:5},(_,i)=>`assets/gallery/bathroom/bathroom-${String(i+1).padStart(2,'0')}.jpg`),
  balcony:Array.from({length:13},(_,i)=>`assets/gallery/balcony/balcony-${String(i+1).padStart(2,'0')}.jpg`)
};
const allImages=[...galleryCategories.living,...galleryCategories.bedroom1,...galleryCategories.bedroom2,...galleryCategories.bathroom,...galleryCategories.balcony];
let activeImages=allImages;
let current=0;
const dialog=document.getElementById('lightbox');
const lbImg=document.getElementById('lightboxImg');
const lbCounter=document.getElementById('lightboxCounter');

function updateLightbox(){
  lbImg.src=activeImages[current];
  if(lbCounter) lbCounter.textContent=`${current+1}/${activeImages.length}`;
}
function openCollection(images,start=0){
  activeImages=images;
  current=Math.min(Math.max(0,start),activeImages.length-1);
  updateLightbox();
  dialog.showModal();
}
function stepLightbox(dir){
  current=(current+dir+activeImages.length)%activeImages.length;
  updateLightbox();
}

document.getElementById('closeLightbox').addEventListener('click',()=>dialog.close());
document.getElementById('prev').onclick=()=>stepLightbox(-1);
document.getElementById('next').onclick=()=>stepLightbox(1);
dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
addEventListener('keydown',e=>{
  if(!dialog.open)return;
  if(e.key==='ArrowLeft')stepLightbox(-1);
  if(e.key==='ArrowRight')stepLightbox(1);
  if(e.key==='Escape')dialog.close();
});

document.querySelectorAll('[data-gallery-category]').forEach(btn=>btn.addEventListener('click',()=>{
  document.querySelectorAll('[data-gallery-category]').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  openCollection(galleryCategories[btn.dataset.galleryCategory],0);
}));
document.getElementById('openAll').onclick=()=>openCollection(allImages,0);
document.querySelectorAll('.gallery-shot').forEach(btn=>btn.onclick=()=>openCollection(allImages,allImages.indexOf(btn.dataset.img)));

let previewIndex=3;
const previewBtns=[...document.querySelectorAll('.gallery-shot')];
function renderPreview(){
  const picks=[previewIndex,(previewIndex+1)%allImages.length,(previewIndex+2)%allImages.length];
  previewBtns.forEach((b,i)=>{
    b.dataset.img=allImages[picks[i]];
    b.querySelector('img').src=allImages[picks[i]];
  });
}
document.getElementById('galleryPrev').addEventListener('click',e=>{
  e.stopPropagation();
  previewIndex=(previewIndex-3+allImages.length)%allImages.length;
  renderPreview();
});
document.getElementById('galleryNext').addEventListener('click',e=>{
  e.stopPropagation();
  previewIndex=(previewIndex+3)%allImages.length;
  renderPreview();
});
renderPreview();

window.addEventListener('load',()=>setTimeout(()=>document.getElementById('loader')?.classList.add('hidden'),700));
const floatingBook=document.querySelector('.floating-book');
addEventListener('scroll',()=>floatingBook?.classList.toggle('show',scrollY>520));

const icon=(body)=>`<svg viewBox="0 0 48 48" aria-hidden="true">${body}</svg>`;
const icons={
 home:icon('<path d="M8 23 24 9l16 14v17H8z"/><path d="M19 40V28h10v12"/>'),
 guests:icon('<circle cx="24" cy="15" r="6"/><path d="M12 40c1-9 5-14 12-14s11 5 12 14"/><path d="M10 18a5 5 0 1 0 0 10M38 18a5 5 0 1 1 0 10"/>'),
 dishes:icon('<circle cx="24" cy="25" r="10"/><circle cx="24" cy="25" r="6"/><path d="M8 10v13M5 10v8c0 3 6 3 6 0v-8M8 23v15M39 10v28M35 10c0 8 8 8 8 0"/>'),
 cleaning:icon('<path d="M17 15h15v23H17zM20 10h9v5M14 21h3M14 27h3"/><circle cx="11" cy="34" r="4"/><circle cx="8" cy="26" r="3"/>'),
 ac:icon('<rect x="7" y="10" width="34" height="13" rx="2"/><path d="M12 18h24M15 30c0 4-3 4-3 8M24 30c0 4-3 4-3 8M33 30c0 4-3 4-3 8"/>'),
 cooking:icon('<path d="M10 26h28l-4 12H14zM8 26h32M14 22c1-4 4-5 4-9M24 22c1-4 4-5 4-9"/><path d="M17 38v4M31 38v4"/>'),
 washer:icon('<rect x="9" y="7" width="30" height="34" rx="2"/><circle cx="24" cy="26" r="10"/><circle cx="24" cy="26" r="6"/><path d="M14 12h2M20 12h2M29 12h5"/>'),
 dryer:icon('<path d="M8 26h17c8 0 11-4 11-9 0-4-3-7-7-7-5 0-7 4-7 9H8z"/><path d="M13 26v12M18 26v12M25 26l5 12M34 12l6-5"/>'),
 heating:icon('<circle cx="24" cy="24" r="7"/><path d="M24 4v8M24 36v8M4 24h8M36 24h8M10 10l6 6M32 32l6 6M38 10l-6 6M16 32l-6 6"/>'),
 bath:icon('<path d="M7 25h34v4c0 7-5 11-12 11H19C12 40 7 36 7 29zM12 25V14c0-5 8-5 8 0"/><path d="M17 16h7M12 40l-2 4M36 40l2 4"/>'),
 tv:icon('<rect x="7" y="11" width="34" height="25" rx="2"/><path d="m19 6 5 5 5-5M18 42h12M24 36v6"/>'),
 nosmoke:icon('<path d="M7 29h22M33 29h3M39 29h2M32 19c5-2 5-7 2-10M38 21c6-4 6-9 3-13M7 7l34 34"/>'),
 wifi:icon('<path d="M7 19c10-9 24-9 34 0M13 26c7-6 15-6 22 0M19 33c3-3 7-3 10 0"/><circle cx="24" cy="39" r="1.5"/>'),
 iron:icon('<path d="M8 32h32l-5-15H20c-7 0-10 7-12 15zM17 17l3-7h10l3 7M10 37h30"/><circle cx="29" cy="22" r="1"/>'),
 balcony:icon('<path d="M8 25h32M12 25v15M36 25v15M8 40h32M17 25v15M24 25v15M31 25v15"/><path d="M15 18c3-8 15-8 18 0M24 10v8"/>'),
 elevator:icon('<path d="M13 12h22v30H13zM19 18l5-5 5 5M19 35l5 5 5-5"/><path d="M24 13v27"/>'),
 towels:icon('<circle cx="16" cy="29" r="8"/><circle cx="29" cy="29" r="8"/><circle cx="24" cy="17" r="8"/><circle cx="16" cy="29" r="3"/><circle cx="29" cy="29" r="3"/><circle cx="24" cy="17" r="3"/><path d="M7 39h34"/>'),
 firstaid:icon('<rect x="8" y="14" width="32" height="25" rx="3"/><path d="M18 14v-4h12v4M24 20v13M18 26h12"/>'),
 extinguisher:icon('<path d="M18 16h14v26H18zM21 16v-5h8v5M29 11h7l4 5M17 22h-4v13h5"/><path d="M22 7h8"/>'),
 view:icon('<path d="M4 24s7-11 20-11 20 11 20 11-7 11-20 11S4 24 4 24z"/><circle cx="24" cy="24" r="6"/>')
};
document.querySelectorAll('.amenity-icon').forEach(el=>el.innerHTML=icons[el.dataset.icon]||icons.home);
