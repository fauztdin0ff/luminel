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
Observer Animation
============================================================================*/
window.addEventListener('load', () => {
   const loader = document.querySelector('.page-loader');

   if (loader) {
      loader.classList.add('hide');

      const DURATION = 400;
      setTimeout(() => {
         loader.remove();
         initObserver();
      }, DURATION);
   } else {
      initObserver();
   }
});

function initObserver() {
   const elements = document.querySelectorAll('.element-animation');
   if (!elements.length) return;

   const observer = new IntersectionObserver(onEntry, {
      threshold: 0.4
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
      document.body.style.overflow = 'hidden';
   };

   const closeCatalog = () => {
      button.classList.remove(ACTIVE_CLASS);
      catalog.classList.remove(ACTIVE_CLASS);
      document.body.style.overflow = '';
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
init
============================================================================*/
document.addEventListener('DOMContentLoaded', () => {
   initCatalogToggle();
   initHeaderCatalog();
   initHeaderSearch();
   initHeaderContacts();
   initHeaderLogoVisible();
   initHeroSlider();
});

})();

/******/ })()
;