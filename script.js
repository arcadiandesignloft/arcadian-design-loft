
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

const allImages=[
 'assets/images/living-hero.jpg','assets/images/living-wide.jpg',
 'assets/images/living-kitchen.jpg','assets/images/living-tv.jpg',
 'assets/images/kitchen.jpg','assets/images/bathroom.jpg',
 'assets/images/bedroom-1.jpg','assets/images/detail-chair.jpg',
 'assets/images/bedroom-entry.jpg','assets/images/living-main.jpg',
 'assets/images/vanity.jpg','assets/images/bedroom-2.jpg',
 'assets/images/balcony-square.jpg','assets/images/balcony-view.jpg'
];
let current=0;
const dialog=document.getElementById('lightbox');
const lbImg=document.getElementById('lightboxImg');
function showImage(src){
  current=allImages.indexOf(src);
  if(current<0) current=0;
  lbImg.src=allImages[current];
  dialog.showModal();
}
document.querySelectorAll('[data-img]').forEach(btn=>btn.addEventListener('click',()=>showImage(btn.dataset.img)));
document.getElementById('openAll').addEventListener('click',()=>showImage(allImages[0]));
document.getElementById('closeLightbox').addEventListener('click',()=>dialog.close());
document.getElementById('prev').addEventListener('click',()=>{current=(current-1+allImages.length)%allImages.length;lbImg.src=allImages[current]});
document.getElementById('next').addEventListener('click',()=>{current=(current+1)%allImages.length;lbImg.src=allImages[current]});
dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
addEventListener('keydown',e=>{
 if(!dialog.open)return;
 if(e.key==='ArrowLeft')document.getElementById('prev').click();
 if(e.key==='ArrowRight')document.getElementById('next').click();
});
