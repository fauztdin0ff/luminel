/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "burgerMenu": () => (/* binding */ burgerMenu),
/* harmony export */   "isWebp": () => (/* binding */ isWebp),
/* harmony export */   "phoneMask": () => (/* binding */ phoneMask),
/* harmony export */   "popups": () => (/* binding */ popups)
/* harmony export */ });
/*---------------------------------------------------------------------------
Проверка WebP
---------------------------------------------------------------------------*/
function isWebp() {
   function testWebP(callback) {
      const webP = new Image();
      webP.onload = webP.onerror = function () {
         callback(webP.height === 2);
      };
      webP.src =
         "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
   }

   testWebP(function (support) {
      document.body.classList.add(support ? "webp" : "no-webp");
   });
}


/*---------------------------------------------------------------------------
Маска телефона
---------------------------------------------------------------------------*/
function phoneMask() {
   document.addEventListener("DOMContentLoaded", () => {
      document.querySelectorAll("input.tel-mask").forEach((input) => {
         let keyCode;
         function mask(event) {
            event.keyCode && (keyCode = event.keyCode);
            let pos = this.selectionStart;
            if (pos < 3) event.preventDefault();
            let matrix = "+7 (___) ___ __ __",
               i = 0,
               val = this.value.replace(/\D/g, ""),
               new_value = matrix.replace(/[_\d]/g, (a) =>
                  i < val.length ? val.charAt(i++) : a
               );
            i = new_value.indexOf("_");
            if (i !== -1) {
               i < 5 && (i = 3);
               new_value = new_value.slice(0, i);
            }
            let reg = matrix
               .substr(0, this.value.length)
               .replace(/_+/g, (a) => `\\d{1,${a.length}}`)
               .replace(/[+()]/g, "\\$&");
            reg = new RegExp("^" + reg + "$");
            if (!reg.test(this.value) || this.value.length < 5 || (keyCode > 47 && keyCode < 58)) {
               this.value = new_value;
            }
            if (event.type === "blur" && this.value.length < 5) this.value = "";
         }

         input.addEventListener("input", mask);
         input.addEventListener("focus", mask);
         input.addEventListener("blur", mask);
         input.addEventListener("keydown", mask);
      });
   });
}


/*---------------------------------------------------------------------------
Бургер меню
---------------------------------------------------------------------------*/
function burgerMenu() {
   document.addEventListener("DOMContentLoaded", () => {
      const menuIcon = document.querySelector(".menu__icon");
      const menuBody = document.querySelector(".menu__body");
      const body = document.body;
      const menuBodyClose = document.querySelector(".menu__body-close");
      const animationDuration = 500;

      if (!menuIcon || !menuBody) return;

      const closeMenu = () => {
         menuIcon.classList.remove("active");
         menuBody.classList.remove("active");
         body.classList.remove("no-scroll");
      };

      menuIcon.addEventListener("click", () => {
         menuIcon.classList.toggle("active");
         menuBody.classList.toggle("active");
         body.classList.toggle("no-scroll");
      });

      menuBody.addEventListener("click", (e) => {
         const link = e.target.closest("a");
         if (link) {
            e.preventDefault();
            closeMenu();
            setTimeout(() => {
               window.location.href = link.href;
            }, animationDuration);
         }
      });

      if (menuBodyClose) menuBodyClose.addEventListener("click", closeMenu);

      document.addEventListener("click", (e) => {
         if (!menuBody.contains(e.target) && !menuIcon.contains(e.target)) closeMenu();
      });
   });
}



/*---------------------------------------------------------------------------
Попапы
---------------------------------------------------------------------------*/
function popups() {
   if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initPopups);
   } else {
      initPopups();
   }
}

function initPopups() {
   const POPUP_SELECTOR = ".popup";
   const OPEN_BTN_SELECTOR = ".open-popup";
   const ACTIVE_CLASS = "show";
   const BODY_ACTIVE_CLASS = "popup-opened";

   let activeButton = null;

   // =========================
   // OPEN / SWITCH POPUPS
   // =========================
   document.addEventListener("click", (e) => {
      const button = e.target.closest(OPEN_BTN_SELECTOR);
      if (!button) return;

      e.preventDefault();
      e.stopPropagation();

      const popupId = button.dataset.popup;
      if (!popupId) return;

      const popup = document.getElementById(popupId);
      if (!popup) return;

      const currentPopup = document.querySelector(
         `${POPUP_SELECTOR}.${ACTIVE_CLASS}`
      );

      if (activeButton === button && currentPopup) {
         closePopup(currentPopup);
         return;
      }

      if (currentPopup) {
         closePopup(currentPopup);
      }

      openPopup(popup, button);
   });

   // =========================
   // CLOSE POPUPS (overlay / close btn / outside)
   // =========================
   document.addEventListener("click", (e) => {
      const openPopupEl = document.querySelector(
         `${POPUP_SELECTOR}.${ACTIVE_CLASS}`
      );
      if (!openPopupEl) return;

      const isCloseBtn = e.target.closest(".popup__close");
      const isInsideBody = e.target.closest(".popup__body");

      if (isCloseBtn || !isInsideBody) {
         closePopup(openPopupEl);
      }
   });

   // =========================
   // ESC KEY
   // =========================
   document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;

      const openPopupEl = document.querySelector(
         `${POPUP_SELECTOR}.${ACTIVE_CLASS}`
      );
      if (!openPopupEl) return;

      closePopup(openPopupEl);
   });

   // =========================
   // HELPERS
   // =========================
   function openPopup(popup, button) {
      popup.classList.add(ACTIVE_CLASS);
      document.body.classList.add(BODY_ACTIVE_CLASS);

      if (button) {
         button.classList.add("active");
         activeButton = button;
      }
   }

   function closePopup(popup) {
      popup.classList.remove(ACTIVE_CLASS);
      document.body.classList.remove(BODY_ACTIVE_CLASS);

      if (activeButton) {
         activeButton.classList.remove("active");
         activeButton = null;
      }
   }
}


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_functions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);


_modules_functions_js__WEBPACK_IMPORTED_MODULE_0__.isWebp();
_modules_functions_js__WEBPACK_IMPORTED_MODULE_0__.burgerMenu();
_modules_functions_js__WEBPACK_IMPORTED_MODULE_0__.popups();
_modules_functions_js__WEBPACK_IMPORTED_MODULE_0__.phoneMask();

/*==========================================================================
Lenis
============================================================================*/
const lenis = new Lenis({
   lerp: 0.05,
   wheelMultiplier: 0.8,
});

function raf(time) {
   lenis.raf(time);
   requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

/*==========================================================================
Header catalog
============================================================================*/
function initCatalogToggle() {
   const button = document.querySelector('.header__toggle');
   const catalog = document.querySelector('.header__catalog');

   if (!button || !catalog) return;

   const ACTIVE_CLASS = 'active';

   const openCatalog = () => {
      button.classList.add(ACTIVE_CLASS);
      catalog.classList.add(ACTIVE_CLASS);
      lenis.stop();
   };

   const closeCatalog = () => {
      button.classList.remove(ACTIVE_CLASS);
      catalog.classList.remove(ACTIVE_CLASS);
      lenis.start();
   };

   const toggleCatalog = () => {
      const isOpen = catalog.classList.contains(ACTIVE_CLASS);
      isOpen ? closeCatalog() : openCatalog();
   };

   button.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleCatalog();
   });

   catalog.addEventListener('click', (e) => {
      e.stopPropagation();
   });

   document.addEventListener('click', () => {
      if (catalog.classList.contains(ACTIVE_CLASS)) {
         closeCatalog();
      }
   });
}


/*==========================================================================
Header catalog inner
============================================================================*/
function initHeaderCatalog() {
   const catalog = document.querySelector('.header__catalog');
   if (!catalog) return;

   const items = catalog.querySelectorAll('.header__catalog-item');
   const categories = catalog.querySelectorAll('.header__catalog-category');

   const MOBILE_BREAKPOINT = 767;
   const isMobile = () => window.innerWidth <= MOBILE_BREAKPOINT;

   const clearActive = () => {
      items.forEach(i => i.classList.remove('active'));
      categories.forEach(c => c.classList.remove('active'));
   };

   const setActiveById = (id) => {
      if (!id) return;

      items.forEach(item => {
         item.classList.toggle('active', item.dataset.categoryTab === id);
      });

      categories.forEach(category => {
         category.classList.toggle(
            'active',
            category.dataset.categoryLinks === id
         );
      });
   };

   /* ================= Desktop ================= */

   items.forEach(item => {
      const id = item.dataset.categoryTab;
      if (!id) return;

      item.addEventListener('mouseenter', () => {
         if (isMobile()) return;
         setActiveById(id);
      });
   });

   /* ================= Mobile ================= */

   catalog.addEventListener('click', (e) => {
      if (!isMobile()) return;

      const button = e.target.closest('.header__catalog-button');
      if (!button) return;

      e.preventDefault();
      e.stopPropagation();

      const item = button.closest('.header__catalog-item');
      const id = item?.dataset.categoryTab;
      if (!id) return;

      const isActive = item.classList.contains('active');
      clearActive();

      if (!isActive) {
         setActiveById(id);
      }
   });


   categories.forEach(category => {
      const backBtn = category.querySelector('.header__catalog-back');
      if (!backBtn) return;

      backBtn.addEventListener('click', () => {
         clearActive();
      });
   });


   if (!isMobile()) {
      const firstWithSubmenu = [...items].find(i => i.dataset.categoryTab);
      if (firstWithSubmenu) {
         setActiveById(firstWithSubmenu.dataset.categoryTab);
      }
   } else {
      clearActive();
   }

   window.addEventListener('resize', () => {
      clearActive();
      if (!isMobile()) {
         const firstWithSubmenu = [...items].find(i => i.dataset.categoryTab);
         if (firstWithSubmenu) {
            setActiveById(firstWithSubmenu.dataset.categoryTab);
         }
      }
   });
}

/*==========================================================================
Search
============================================================================*/
function initHeaderSearch() {
   const searchBtn = document.querySelector('.header__button.-search');
   const search = document.querySelector('.header__search');
   const searchInput = document.querySelector('.header__search-input');
   const activeClass = 'show';

   if (!searchBtn || !search || !searchInput) return;

   const closeSearch = () => {
      search.classList.remove(activeClass);
      searchBtn.classList.remove('active');
   };

   searchBtn.addEventListener('click', (e) => {
      e.stopPropagation();

      const isOpen = search.classList.contains(activeClass);

      if (isOpen) {
         closeSearch();
      } else {
         search.classList.add(activeClass);
         searchBtn.classList.add('active');
         searchInput.focus();
      }
   });

   search.addEventListener('click', (e) => {
      e.stopPropagation();
   });

   document.addEventListener('click', closeSearch);
}


/*==========================================================================
Contacts
============================================================================*/
function initHeaderContacts() {
   const toggleBtn = document.querySelector('.header__contacts-toggle');
   const wrapper = document.querySelector('.header__contacts-wrapper');
   const activeClass = 'show';

   if (!toggleBtn || !wrapper) return;

   const closeContacts = () => {
      wrapper.classList.remove(activeClass);
      toggleBtn.classList.remove('active');
   };

   toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();

      const isOpen = wrapper.classList.contains(activeClass);

      if (isOpen) {
         closeContacts();
      } else {
         wrapper.classList.add(activeClass);
         toggleBtn.classList.add('active');
      }
   });

   wrapper.addEventListener('click', (e) => {
      e.stopPropagation();
   });

   document.addEventListener('click', closeContacts);
}

/*==========================================================================
Logo anim
============================================================================*/
function initHeaderLogoVisible() {
   const logoText = document.querySelector('.header__logo-text');
   if (!logoText) return;

   window.addEventListener('scroll', () => {
      if (window.scrollY > 0) {
         logoText.classList.add('visible');
      } else {
         logoText.classList.remove('visible');
      }
   });
}

/*==========================================================================
Hero slider
============================================================================*/
function initHeroSlider() {
   const partnersSlider = document.querySelector(".hero__slider");

   if (!partnersSlider) return null;

   const partnersSwiper = new Swiper(partnersSlider, {
      slidesPerView: 'auto',
      loop: true,
      speed: 1600,
      effect: 'fade',
      spaceBetween: 8,
      pagination: {
         el: ".hero__pagination",
         clickable: true,
      },
      autoplay: {
         delay: 4000,
         disableOnInteraction: false,
         pauseOnMouseEnter: false,
      },
   });

   return partnersSwiper;
}


/*==========================================================================
Observer Animation and preloader
============================================================================*/
window.addEventListener("load", () => {
   const loader = document.querySelector(".preloader");
   const logoGold = document.querySelector(".preloader__logo-gold");

   if (loader && logoGold) {

      logoGold.style.transition = "max-width 0.5s linear";
      logoGold.style.animation = "none";
      logoGold.style.maxWidth = "100%";

      setTimeout(() => {
         loader.remove();
         initObserver();
         initHeroSlider();
      }, 500);
   } else {
      initObserver();
      initHeroSlider();
   }
});

function initObserver() {
   const elements = document.querySelectorAll('.element-animation');
   if (!elements.length) return;

   const observer = new IntersectionObserver(onEntry, {
      threshold: 0.2
   });

   elements.forEach(el => observer.observe(el));
}

function onEntry(entries) {
   entries.forEach(entry => {
      if (entry.isIntersecting) {
         entry.target.classList.add('element-show');
      }
   });
}

/*==========================================================================
Home catalog slider
============================================================================*/
let catSwiper = null;
const MOBILE_BREAKPOINT = 767;

function initCatSlider() {
   const catSlider = document.querySelector('.categories__slider');
   if (!catSlider) return;

   if (window.innerWidth <= MOBILE_BREAKPOINT && !catSwiper) {
      catSwiper = new Swiper(catSlider, {
         slidesPerView: 'auto',
         loop: true,
         speed: 1000,
         spaceBetween: 8,
         pagination: {
            el: '.categories__pagination',
            clickable: true,
         },
         navigation: {
            prevEl: '.categories__slider-prev',
            nextEl: '.categories__slider-next',
         }
      });
   }

   if (window.innerWidth > MOBILE_BREAKPOINT && catSwiper) {
      catSwiper.destroy(true, true);
      catSwiper = null;
   }
}

window.addEventListener('resize', initCatSlider);

/*==========================================================================
Video
============================================================================*/
/* function initScrollVideo(options) {
   const {
      canvasSelector,
      containerSelector,
      frameCountAttr = "data-count",
      framesPathAttr = "data-frames",
      width = 1366,
      height = 768,
      startOffset = 0.9,
      preload = 10
   } = options;

   const canvases = document.querySelectorAll(canvasSelector);
   if (!canvases.length) return;

   canvases.forEach((canvas) => {
      const container = canvas.closest(containerSelector);
      if (!container) return;

      const frameCount = Number(canvas.getAttribute(frameCountAttr));
      const framesPath = canvas.getAttribute(framesPathAttr);
      if (!frameCount || !framesPath) return;

      const ctx = canvas.getContext("2d");
      canvas.width = width;
      canvas.height = height;

      const images = new Array(frameCount);
      let state = { frame: 0 };
      let pendingRender = false;
      let isVisible = false;

      // preload first few frames
      const preloadFrame = (i) => {
         if (i < 0 || i >= frameCount) return;
         if (images[i]) return;

         const img = new Image();
         img.src = `${framesPath}/frame_${String(i + 1).padStart(4, "0")}.webp`;
         images[i] = img;
      };

      for (let i = 0; i < Math.min(preload, frameCount); i++) {
         preloadFrame(i);
      }

      function render() {
         pendingRender = false;

         const img = images[state.frame];
         if (!img || !img.complete) return;

         ctx.clearRect(0, 0, canvas.width, canvas.height);
         ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

         preloadFrame(state.frame + 1);
         preloadFrame(state.frame + 2);
         preloadFrame(state.frame + 3);
      }

      function requestRender() {
         if (pendingRender || !isVisible) return;
         pendingRender = true;
         requestAnimationFrame(render);
      }

      function onScroll() {
         const rect = container.getBoundingClientRect();
         const vh = window.innerHeight;

         const scrollStart = rect.top - vh * startOffset;
         const scrollEnd = scrollStart + container.offsetHeight;

         if (scrollStart > 0 || scrollEnd < 0) return;

         const progress = Math.min(
            1,
            Math.max(0, -scrollStart / (scrollEnd - scrollStart))
         );

         state.frame = Math.floor(progress * (frameCount - 1));
         requestRender();
      }

      const observer = new IntersectionObserver((entries) => {
         isVisible = entries.some(e => e.isIntersecting);
         if (isVisible) onScroll();
      }, { threshold: 0.1 });

      observer.observe(container);

      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
   });
}

initScrollVideo({
   canvasSelector: ".video-canvas",
   containerSelector: ".video-wrapper",
   startOffset: 0.9,
}); */

function initScrollVideo(options) {
   const {
      canvasSelector,
      containerSelector,
      width = 1366,
      height = 768,
      startOffset = 0.9,
   } = options;

   const canvases = document.querySelectorAll(canvasSelector);
   if (!canvases.length) return;

   canvases.forEach((canvas) => {
      const container = canvas.closest(containerSelector);
      if (!container) return;

      const video = container.querySelector(".video-source");
      if (!video) return;

      const ctx = canvas.getContext("2d");
      canvas.width = width;
      canvas.height = height;

      let isReady = false;
      let pending = false;

      video.preload = "auto";

      video.addEventListener("loadedmetadata", async () => {
         isReady = true;
         canvas.width = video.videoWidth;
         canvas.height = video.videoHeight;

         // запускаем видео (важно для autoplay)
         try {
            await video.play();
         } catch (err) {
            console.warn("Autoplay blocked:", err);
         }

         // отрисовать первый кадр
         video.currentTime = 0;
      });

      function drawFrame() {
         pending = false;
         ctx.clearRect(0, 0, canvas.width, canvas.height);
         ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      }

      video.addEventListener("seeked", drawFrame);

      function onScroll() {
         if (!isReady) return;

         const rect = container.getBoundingClientRect();
         const vh = window.innerHeight;

         const scrollStart = rect.top - vh * startOffset;
         const scrollEnd = scrollStart + container.offsetHeight;

         if (scrollStart > 0 || scrollEnd < 0) return;

         const progress = Math.min(1, Math.max(0, -scrollStart / (scrollEnd - scrollStart)));
         const targetTime = progress * video.duration;

         if (!pending) {
            pending = true;
            requestAnimationFrame(() => {
               video.currentTime = targetTime;
            });
         }
      }

      const observer = new IntersectionObserver((entries) => {
         const isVisible = entries.some(e => e.isIntersecting);
         if (isVisible) onScroll();
      }, { threshold: 0.1 });

      observer.observe(container);
      window.addEventListener("scroll", onScroll, { passive: true });
   });
}

initScrollVideo({
   canvasSelector: ".video-canvas",
   containerSelector: ".video-wrapper",
   startOffset: 0.9,
});


/*==========================================================================
Products slider
============================================================================*/
function initProductsCarousel() {
   const sliders = document.querySelectorAll('.carousel');

   if (!sliders.length) return;

   sliders.forEach((carousel) => {
      const sliderEl = carousel.querySelector('.carousel__slider');
      const paginationEl = carousel.querySelector('.carousel__slider-pagination');
      const prevEl = carousel.querySelector('.carousel__slider-prev');
      const nextEl = carousel.querySelector('.carousel__slider-next');

      if (!sliderEl) return;

      new Swiper(sliderEl, {
         slidesPerView: 4,
         loop: false,
         spaceBetween: 8,
         pagination: {
            el: paginationEl,
            clickable: true,
         },
         speed: 800,
         navigation: {
            prevEl,
            nextEl,
         },
         breakpoints: {
            320: {
               slidesPerView: 1,
            },
            600: {
               slidesPerView: 2,
            },
            900: {
               slidesPerView: 3,
            },
            1200: {
               slidesPerView: 4,
            }
         }
      });
   });
}

/*==========================================================================
Product preview slider
============================================================================*/
function initProductPreviewSliders() {
   const productSliders = document.querySelectorAll('.product-preview__slider');

   if (!productSliders.length) return;

   productSliders.forEach((sliderEl) => {

      if (sliderEl.dataset.swiperInited) return;

      const productCard = sliderEl.closest('.product-preview');
      const paginationEl = productCard.querySelector('.product-preview__pagination');

      new Swiper(sliderEl, {
         slidesPerView: 1,
         loop: true,
         speed: 800,
         spaceBetween: 20,
         pagination: {
            el: paginationEl,
            clickable: true,
         },
         nested: true,
      });

      sliderEl.dataset.swiperInited = "true";
   });
}

/*==========================================================================
Review hide text
============================================================================*/
function initReviewsLogic() {
   const reviews = document.querySelectorAll('.reviews__slide');

   reviews.forEach(review => {
      const textWrapper = review.querySelector('.reviews__text-wrapper');
      const toggleBtn = review.querySelector('.reviews__text-toggle');

      if (!textWrapper || !toggleBtn || toggleBtn.dataset.inited) return;

      const MAX_HEIGHT = 120;
      const fullHeight = textWrapper.scrollHeight;

      if (fullHeight > MAX_HEIGHT) {
         textWrapper.style.setProperty('--max-height', MAX_HEIGHT + 'px');
         textWrapper.style.setProperty('--full-height', fullHeight + 'px');

         textWrapper.classList.add('is-collapsed');
         toggleBtn.style.display = 'block';

         toggleBtn.addEventListener('click', () => {
            const isOpen = textWrapper.classList.toggle('is-open');

            toggleBtn.textContent = isOpen
               ? 'Скрыть'
               : 'Читать полностью';
         });

         toggleBtn.dataset.inited = 'true';
      } else {
         toggleBtn.style.display = 'none';
      }
   });
}


/*==========================================================================
Reviews slider
============================================================================*/
let reviewsSwiper = null;
const reviewsMQ = window.matchMedia('(min-width: 600px)');

function initReviewsSlider() {
   const reviewsSlider = document.querySelector('.reviews__slider');
   if (!reviewsSlider || reviewsSwiper) return;

   reviewsSwiper = new Swiper(reviewsSlider, {
      slidesPerView: 4,
      loop: false,
      spaceBetween: 20,
      autoHeight: false,
      speed: 800,
      pagination: {
         el: '.reviews__pagination',
         clickable: true,
      },

      navigation: {
         prevEl: '.reviews__slider-prev',
         nextEl: '.reviews__slider-next',
      },

      breakpoints: {
         600: { slidesPerView: 2 },
         900: { slidesPerView: 3 },
         1200: { slidesPerView: 4 },
      },

      on: {
         init() {
            initReviewsLogic();
         },
         slideChange() {
            initReviewsLogic();
         }
      }
   });
}

function destroyReviewsSlider() {
   if (!reviewsSwiper) return;

   reviewsSwiper.destroy(true, true);
   reviewsSwiper = null;
}

function handleReviewsSlider(e) {
   if (e.matches) {
      initReviewsSlider();
   } else {
      destroyReviewsSlider();
      initReviewsLogic();
   }
}


/*==========================================================================
faq
============================================================================*/
function initFaqAccordion() {
   const faqItems = document.querySelectorAll('.faq__item');
   if (!faqItems.length) return;

   faqItems.forEach(item => {
      const question = item.querySelector('.faq__question');
      const answer = item.querySelector('.faq__answer');

      if (!question || !answer || item.dataset.inited) return;

      question.addEventListener('click', () => {
         const isActive = item.classList.contains('active');

         faqItems.forEach(el => {
            const elAnswer = el.querySelector('.faq__answer');
            if (!elAnswer) return;

            el.classList.remove('active');
            elAnswer.style.maxHeight = null;
         });

         if (!isActive) {
            item.classList.add('active');
            answer.style.maxHeight = answer.scrollHeight + 'px';
         }
      });

      item.dataset.inited = 'true';
   });
}


/*==========================================================================
Map
============================================================================*/
function loadYandexMap() {
   if (window.ymaps) return;

   var script = document.createElement("script");
   script.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU";
   script.onload = initMap;
   document.body.appendChild(script);
}

function initMap() {
   ymaps.ready(function () {
      var mapCenter = [55.634034, 37.440236];
      var myMap = new ymaps.Map('map', {
         center: mapCenter,
         zoom: 15,
      });

      var myPlacemark = new ymaps.Placemark(mapCenter, {
         hintContent: '"Люменэль"',
         balloonContent: 'Киевское шоссе, 22-й километр, 4, стр. 1, корп. А, район Солнцево, г. Москва'
      });

      myMap.behaviors.disable('scrollZoom');
      myMap.controls.remove('searchControl');
      myMap.controls.remove('fullscreenControl');
      myMap.controls.remove('rulerControl');
      myMap.geoObjects.add(myPlacemark);
   });
}

const mapBlock = document.querySelector("#map");

if (mapBlock) {
   const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
         if (entry.isIntersecting) {
            loadYandexMap();
            obs.disconnect();
         }
      });
   });
   observer.observe(mapBlock);
}

/*==========================================================================
Sorting 
============================================================================*/

/*==========================================================================
Sorting dropdown
============================================================================*/
function initSortingDropdowns() {
   const sortings = document.querySelectorAll('.sorting');

   if (!sortings.length) return;

   sortings.forEach(sorting => {
      const button = sorting.querySelector('.sorting__button');
      const menu = sorting.querySelector('.sorting__menu');

      if (!button || !menu) return;

      button.addEventListener('click', e => {
         e.stopPropagation();

         const isOpen = button.classList.contains('active');

         closeAllSortings();

         if (!isOpen) {
            button.classList.add('active');
            menu.classList.add('show');
         }
      });
   });

   document.addEventListener('click', () => {
      closeAllSortings();
   });

   function closeAllSortings() {
      sortings.forEach(sorting => {
         sorting.querySelector('.sorting__button')?.classList.remove('active');
         sorting.querySelector('.sorting__menu')?.classList.remove('show');
      });
   }
}

/*==========================================================================
Cats slider
============================================================================*/
function initCategoriesSlider() {
   const categoriesSlider = document.querySelector(".catalog__categories-slider");

   if (!categoriesSlider) return null;

   const categoriesSwiper = new Swiper(categoriesSlider, {
      slidesPerView: 'auto',
      loop: false,
      freeMode: true,
      spaceBetween: 10,
      scrollbar: {
         el: '.catalog__categories-scrollbar',
         draggable: true,
         hide: false,
      },
   });

   return categoriesSwiper;
}

/*==========================================================================
Filter toggle
============================================================================*/
function initCatalogFilterToggle() {
   const toggle = document.querySelector('.catalog__filter-toggle');
   const filters = document.querySelector('.filters');
   const closeBtn = document.querySelector('.filters__close');
   const body = document.body;

   if (!toggle || !filters) return;

   const openFilters = () => {
      filters.classList.add('opened');
      body.classList.add('no-scroll');
      lenis.stop();
   };

   const closeFilters = () => {
      filters.classList.remove('opened');
      body.classList.remove('no-scroll');
      lenis.start();
   };

   const isOpen = () => filters.classList.contains('opened');

   toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      isOpen() ? closeFilters() : openFilters();
   });

   if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
         e.stopPropagation();
         closeFilters();
      });
   }

   filters.addEventListener('click', (e) => {
      e.stopPropagation();
   });

   document.addEventListener('click', () => {
      if (isOpen()) closeFilters();
   });
}




/*==========================================================================
FIlter accordions
============================================================================*/
function initFilterAccordions() {
   const accordions = document.querySelectorAll('.filter__accordion');
   if (!accordions.length) return;

   const isMobile = window.matchMedia('(max-width: 1200px)').matches;

   accordions.forEach((accordion, index) => {
      const head = accordion.querySelector('.filter__accordion-name');
      const body = accordion.querySelector('.filter__accordion-body');

      if (!head || !body) return;

      const openAccordion = () => {
         accordion.classList.add('is-open');
         body.style.maxHeight = `${body.scrollHeight}px`;
      };

      const closeAccordion = () => {
         accordion.classList.remove('is-open');
         body.style.maxHeight = '0px';
      };

      if (isMobile) {
         closeAccordion();
      } else {
         index < 2 ? openAccordion() : closeAccordion();
      }

      head.addEventListener('click', () => {
         accordion.classList.contains('is-open')
            ? closeAccordion()
            : openAccordion();
      });
   });
}

/*==========================================================================
More labels
============================================================================*/
function initFilterAccordionMore() {
   const accordions = document.querySelectorAll('.filter__accordion');
   if (!accordions.length) return;

   accordions.forEach(accordion => {
      const itemsWrapper = accordion.querySelector('.filter__accordion-items');
      if (!itemsWrapper) return;

      const items = itemsWrapper.querySelectorAll('.filter__accordion-item');
      if (items.length <= 5) return;

      const moreBtn = accordion.querySelector('.filter__accordion-more');
      if (!moreBtn) return;

      const hiddenCount = items.length - 5;

      items.forEach((item, index) => {
         if (index >= 5) {
            item.style.display = 'none';
         }
      });

      moreBtn.style.display = 'flex';
      moreBtn.textContent = `Показать ещё ${hiddenCount}`;

      moreBtn.addEventListener('click', () => {
         items.forEach(item => {
            item.style.display = '';
         });

         moreBtn.style.display = 'none';

         const body = accordion.querySelector('.filter__accordion-body');
         if (accordion.classList.contains('is-open') && body) {
            body.style.maxHeight = `${body.scrollHeight}px`;
         }
      });
   });
}

/*==========================================================================
Price inputs
============================================================================*/
function initPriceFilter() {
   const priceBlocks = document.querySelectorAll('.filters__price');
   if (!priceBlocks.length) return;

   priceBlocks.forEach(block => {
      const minInput = block.querySelector('[name="min-price"]');
      const maxInput = block.querySelector('[name="max-price"]');

      if (!minInput || !maxInput) return;

      const minLimit = Number(block.dataset.minPrice);
      const maxLimit = Number(block.dataset.maxPrice);

      if (Number.isNaN(minLimit) || Number.isNaN(maxLimit)) return;

      minInput.min = minLimit;
      minInput.max = maxLimit;

      maxInput.min = minLimit;
      maxInput.max = maxLimit;

      const clamp = (value, min, max) =>
         Math.min(Math.max(value, min), max);

      const normalizeMin = () => {
         if (minInput.value === '') return;

         let minVal = Number(minInput.value);
         if (Number.isNaN(minVal)) {
            minInput.value = '';
            return;
         }

         minVal = clamp(minVal, minLimit, maxLimit);

         if (maxInput.value !== '' && minVal > Number(maxInput.value)) {
            minVal = Number(maxInput.value);
         }

         minInput.value = minVal;
      };

      const normalizeMax = () => {
         if (maxInput.value === '') return;

         let maxVal = Number(maxInput.value);
         if (Number.isNaN(maxVal)) {
            maxInput.value = '';
            return;
         }

         maxVal = clamp(maxVal, minLimit, maxLimit);

         if (minInput.value !== '' && maxVal < Number(minInput.value)) {
            maxVal = Number(minInput.value);
         }

         maxInput.value = maxVal;
      };

      minInput.addEventListener('blur', normalizeMin);
      maxInput.addEventListener('blur', normalizeMax);

      minInput.addEventListener('keydown', e => {
         if (e.key === 'Enter') normalizeMin();
      });

      maxInput.addEventListener('keydown', e => {
         if (e.key === 'Enter') normalizeMax();
      });
   });
}

/*==========================================================================
init
============================================================================*/
document.addEventListener('DOMContentLoaded', () => {
   initCatalogToggle();
   initHeaderCatalog();
   initHeaderSearch();
   initHeaderContacts();
   initHeaderLogoVisible();
   initCatSlider();
   initProductsCarousel();
   initProductPreviewSliders();
   initReviewsLogic();
   handleReviewsSlider(reviewsMQ);
   reviewsMQ.addEventListener('change', handleReviewsSlider);
   initFaqAccordion();
   initSortingDropdowns();
   initCategoriesSlider();
   initCatalogFilterToggle();
   initFilterAccordions();
   initFilterAccordionMore();
   initPriceFilter();
});

})();

/******/ })()
;