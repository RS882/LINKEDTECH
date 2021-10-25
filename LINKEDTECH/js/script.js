function testWebP(callback) { // проверка поддерки браузером формата webp 

	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) { // есди да  body + класс webp

	if (support == true) {
		document.querySelector('body').classList.add('_webp');
	} else {
		document.querySelector('body').classList.add('_no-webp');
	}
});
class ItemOffer {
	constructor(item, {
		src,
		size,
		alt,
		title,
		name,
		descr,
		sale,
		price,
		salePrice,
		url,
		stars,
		classes }) {
		this.item = item;
		this.src = src;
		this.url = url;
		this.name = name;
		this.size = {
			width: (!size.width) ? "263" : size.width,
			height: (!size.height) ? "248" : size.height,
		};
		this.alt = alt;
		this.title = title;
		this.descr = descr;
		this.sale = sale;
		this.price = price;
		this.salePrice = salePrice;
		this.classes = classes ? [...classes] : [];
		this.stars = (!stars) ? 5 : stars;

	}

	render() {
		const elem = document.createElement(`div`),
			addClasses = classesName => {
				const clss = new Set(classesName);
				if (this.classes.length) clss.add(...this.classes);
				Array.from(clss).forEach(cls => elem.classList.add(cls));
			};

		if (this.item.includes(`promo`)) {
			addClasses([`promo__cart`, `cart-promo`]);
			elem.innerHTML = `
			<div class="cart-promo__box">
				<button type="button" class="cart-promo__cart cart-button cart _icon-cart"></button>
				<div class="cart-promo__img img-promo">
					<div class="img-promo__wrapper">
						<button type="button" class="img-promo__scale _icon-magnifier"></button>
					</div>
					
					<div class="img-promo__img-box _ibg">
						<picture>
							<source srcset=${this.src} type="image/webp">
							<img data-data="" src=${this.src} width=${this.size.width} height=${this.size.height} alt=${this.alt}>
						</picture>
					</div>
				</div>
			</div>
			<div class="cart-promo__descr descr">
				<h3 class="descr__title">${this.title}</h3>
				<div class="descr__text">${this.descr}</div>
				<div class="descr__prices prices">
					<div class="prices__price">$ ${this.price} </div>
					<div class="prices__price prices__price--old"> / <span>$ ${this.salePrice}</span> </div>
				</div>
				<div data-star = "${this.stars}" class="descr__stars stars">
					<span class="_icon-star"></span>
					<span class="_icon-star"></span>
					<span class="_icon-star"></span>
					<span class="_icon-star"></span>
					<span class="_icon-star"></span>
				</div>
			</div>
			`;
			document.querySelector(`.promo`).append(elem);
		} else if (this.item.includes(`show`)) {
			addClasses([`show__box`]);
			elem.innerHTML = `
				<div class="show__text">
						<div class="show__sale">Get up to ${this.sale}% off Today Only!</div>
						<h3 class="show__title">${this.title}</h3>
						<a href=${this.url} class="show__btn">Show Now</a>
					</div>
					<div class="show__img _ibg">
					<picture>
						<source srcset=${this.src} type="image/webp">
						<img src=${this.src} width=${this.size.width} height=${this.size.height} alt=${this.alt}>
					</picture>
					</div>
				</div>
		`;
			document.querySelector(`.show`).append(elem);
		} else {
			return;
		}

	}
}
class ItemProduct {
	constructor({
		id,
		url,
		favorit,
		labels,
		properties,
		src,
		title,
		price,
		salePrice,
		stars,


	}) {
		this.id = id;
		this.url = url;
		this.favorit = favorit;
		this.labels = labels;
		this.properties = properties.reduce((init, el) => {
			return init += el;
		}, ``);
		this.src = src;
		this.title = title;
		this.price = price;
		this.salePrice = salePrice;
		this.stars = (!stars) ? 5 : stars;

	}
	render() {

		const parent = document.querySelector(`.new-product__items`),
			elem = document.createElement(`article`),
			addClass = (init, text) => (init == ``) ? text : '';

		elem.setAttribute('data-pid', this.id);
		elem.setAttribute('data-tab', this.properties);
		elem.classList.add(`new-product__cart-item`, `item-card`);



		let itemLabels = this.labels ?
			this.labels.reduce((init, el) => {
				return init + `<div class="item-card__label item-card__label--${el.type}">
				 ${el.value}
				 </div> `;
			}, ``)
			: ``,

			itemImgs = this.src.reduce((init, el) => {
				let width = el.size.width ? `width=${el.size.width}` : ``,
					height = el.size.height ? `height=${el.size.height}` : ``,
					color = (el.color != ``) ? `data-c=${el.color}` : ``;

				return init + `<img data-data  ${color}  ${addClass(init, `class="_active"`)} src=${el.img} ${width} ${height}  alt=${el.alt}>`
			}, ``),


			rendPrices = (clas) =>
				`<div class="${clas} prices">
				<div class="prices__price">$ ${this.price} </div>` +
				(this.salePrice ?
					`<div class="prices__price prices__price--old"> / <span>$ ${this.salePrice}</span> </div>`
					: ``)
				+ `</div>`,

			rendStars = (clas) => `
				<div data-star=${this.stars} class="${clas} stars">
				<span class="_icon-star"></span>
				<span class="_icon-star"></span>
				<span class="_icon-star"></span>
				<span class="_icon-star"></span>
				<span class="_icon-star"></span>
			</div>
				`,

			itemFavorit = this.favorit ? `data-f` : ``,

			itemColor = this.src.reduce((init, el) => {
				return (el.color != ``) ?
					init + `<a href="#" data-color=${el.color}  class="item-card__change-color ${addClass(init, ' _active')}"></a>`
					: init;
			}, ``);


		elem.innerHTML = `
					<div class="item-card__labels">
						${itemLabels}
					</div>
					<div class="item-card__img ">
						<div class="item-card__img-box _ibg">
							${itemImgs}
						</div>
					</div>
					<div class="item-card__body">
						<div class="item-card__content">
							<h5 class="item-card__name">${this.title}</h5>
						</div>
						${rendPrices('item-card__prices')}
						${rendStars('item-card__stars')}
						<div class="item-card__actions actions-product">
							<div class="actions-product__body">
								<div class="actions-product__links">
									<button type="button" class="actions-product__link actions-product__link--cart cart _icon-cart"></button>
									<a href="#" class="actions-product__link  actions-product__link--scale _icon-magnifier"></a>
									<a href="#" ${itemFavorit} class="actions-product__link actions-product__link--favorit _icon-heart"></a>
									<a href=${this.url} class="actions-product__link actions-product__link--change _icon-change"></a>
								</div>
								${rendPrices('actions-product__prices')}
								${rendStars('actions-product__stars')}
								<div class="item-card__change-colors">
									${itemColor}
								</div>
							</div>
						</div>
					</div>
					`;
		parent.append(elem);

	}
}
//==================== данные о дейстивях юзера
const userAction = {};
userAction.items = {};
//=======================
function stars() {
	const starBox = document.querySelectorAll(`[data-star]`);
	starBox.forEach(el => {
		const ammount = el.dataset.star;
		const span = el.querySelectorAll(`span`);

		colorStars(ammount, span);

	});
}
//======окрашиваем звезді
function colorStars(numStar, arrStars) {
	for (let i = 0; i < numStar; i++) {
		arrStars[i].style.color = `#c72535`;
	}
}
//=======
// добавляем цвет на переключатели карточек
function addColorsBtn() {
	document.querySelectorAll(`[data-color]`)
		.forEach(el => el.style.background = el.dataset.color);
}
//=========================================
const getJson = async (url) => {
	const res = await fetch(url);
	if (!res.ok) {// если сервер выдал ошибку - выводм в консоль сообщение
		throw alert(new Error(`Could not fetch ${url}, status ${res.status}`));

	}
	return await res.json();
},
	getProducts = (eve) => {
		if (!eve.classList.contains(`_hold`)) {
			eve.classList.add(`_hold`);
			getJson('json/products.json')
				.then(json => {

					json.products.forEach(obj => {
						new ItemProduct(obj).render();
						addColorsBtn();
						addFavoritColor();
						addItemStatus();
					});
					const activeTab = document.querySelector(`.new-product__link._active`);
					addItemHide(activeTab);
					eve.remove();

				})
				.catch(() => alert('Error!'))
				.finally(() => {
					stars();
					eve.classList.remove(`_hold`);
				});
		}
	}

getJson('json/db.json')
	.then(json => {
		for (const item in json) {
			json[item].forEach(obj => new ItemOffer(item, obj).render());
		}
	})
	.catch(() => alert('Error!'))
	.finally(() => stars());











function _removeClass(el, className) {
	el.forEach(e => {
		e.classList.remove(className)
	});
}
//IsHidden
function _is_hidden(el) {
	return (el.offsetParent === null)
}
//- следим за прокурткой header 
function scrollHeader() {
	//header прокрутка
	const headerElem = document.querySelector(`.header`);
	const callback = (entries, observer) => {
		if (entries[0].isIntersecting) {
			headerElem.classList.remove(`_scroll`);
		} else {
			headerElem.classList.add(`_scroll`);
		}
	};
	// следим за прокруткой header 
	const headerObserver = new IntersectionObserver(callback);
	headerObserver.observe(headerElem);
}
//------------------------------
//ActionsOnHash
if (location.hash) {
	const hsh = location.hash.replace('#', '');
	if (document.querySelector('.popup_' + hsh)) {
		popup_open(hsh);
	} else if (document.querySelector('div.' + hsh)) {
		_goto(document.querySelector('.' + hsh), 500, '');
	}
}
// email valid (regular)
function email_test(input) {
	return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}
//================
window.addEventListener("load", function () {
	if (document.querySelector('.wrapper')) {
		setTimeout(function () {
			document.querySelector('.wrapper').classList.add('_loaded');
		}, 0);
	}
});

let unlock = true;
//====================
//проверяет мобилка -тачскин или нет
var ua = window.navigator.userAgent;
var msie = ua.indexOf("MSIE ");
var isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };
function isIE() {
	ua = navigator.userAgent;
	var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
	return is_ie;
}
if (isIE()) {
	document.querySelector('html').classList.add('ie');
}
if (isMobile.any()) {
	document.querySelector('html').classList.add('_touch');
}
//====================
//=================
//SlideToggle
let _slideUp = (target, duration = 500) => {
	target.style.transitionProperty = 'height, margin, padding';
	target.style.transitionDuration = duration + 'ms';
	target.style.height = target.offsetHeight + 'px';
	target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	window.setTimeout(() => {
		target.style.display = 'none';
		target.style.removeProperty('height');
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('_slide');
	}, duration);
}
let _slideDown = (target, duration = 500) => {
	target.style.removeProperty('display');
	let display = window.getComputedStyle(target).display;
	if (display === 'none')
		display = 'block';

	target.style.display = display;
	let height = target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	target.offsetHeight;
	target.style.transitionProperty = "height, margin, padding";
	target.style.transitionDuration = duration + 'ms';
	target.style.height = height + 'px';
	target.style.removeProperty('padding-top');
	target.style.removeProperty('padding-bottom');
	target.style.removeProperty('margin-top');
	target.style.removeProperty('margin-bottom');
	window.setTimeout(() => {
		target.style.removeProperty('height');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('_slide');
	}, duration);
}
let _slideToggle = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		if (window.getComputedStyle(target).display === 'none') {
			return _slideDown(target, duration);
		} else {
			return _slideUp(target, duration);
		}
	}
}
//========================================
//=================
/*
Для родителя слойлеров пишем атрибут data-spollers
Для заголовков слойлеров пишем атрибут data-spoller
Если нужно включать\выключать работу спойлеров на разных размерах экранов
пишем параметры ширины и типа брейкпоинта.
Например: 
data-spollers="992,max" - спойлеры будут работать только на экранах меньше или равно 992px
data-spollers="768,min" - спойлеры будут работать только на экранах больше или равно 768px

Если нужно что бы в блоке открывался болько один слойлер добавляем атрибут data-one-spoller
*/

// SPOLLERS
const spollersArray = document.querySelectorAll('[data-spollers]');
if (spollersArray.length > 0) {
	// Получение обычных слойлеров
	const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
		return !item.dataset.spollers.split(",")[0];
	});
	// Инициализация обычных слойлеров
	if (spollersRegular.length > 0) {
		initSpollers(spollersRegular);
	}

	// Получение слойлеров с медиа запросами
	const spollersMedia = Array.from(spollersArray).filter(function (item, index, self) {
		return item.dataset.spollers.split(",")[0];
	});

	// Инициализация слойлеров с медиа запросами
	if (spollersMedia.length > 0) {
		const breakpointsArray = [];
		spollersMedia.forEach(item => {
			const params = item.dataset.spollers;
			const breakpoint = {};
			const paramsArray = params.split(",");
			breakpoint.value = paramsArray[0];
			breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
			breakpoint.item = item;
			breakpointsArray.push(breakpoint);
		});

		// Получаем уникальные брейкпоинты
		let mediaQueries = breakpointsArray.map(function (item) {
			return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
		});
		mediaQueries = mediaQueries.filter(function (item, index, self) {
			return self.indexOf(item) === index;
		});

		// Работаем с каждым брейкпоинтом
		mediaQueries.forEach(breakpoint => {
			const paramsArray = breakpoint.split(",");
			const mediaBreakpoint = paramsArray[1];
			const mediaType = paramsArray[2];
			const matchMedia = window.matchMedia(paramsArray[0]);

			// Объекты с нужными условиями
			const spollersArray = breakpointsArray.filter(function (item) {
				if (item.value === mediaBreakpoint && item.type === mediaType) {
					return true;
				}
			});
			// Событие
			matchMedia.addListener(function () {
				initSpollers(spollersArray, matchMedia);
			});
			initSpollers(spollersArray, matchMedia);
		});
	}
	// Инициализация
	function initSpollers(spollersArray, matchMedia = false) {
		spollersArray.forEach(spollersBlock => {
			spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
			if (matchMedia.matches || !matchMedia) {
				spollersBlock.classList.add('_init');
				initSpollerBody(spollersBlock);
				spollersBlock.addEventListener("click", setSpollerAction);
			} else {
				spollersBlock.classList.remove('_init');
				initSpollerBody(spollersBlock, false);
				spollersBlock.removeEventListener("click", setSpollerAction);
			}
		});
	}
	// Работа с контентом
	function initSpollerBody(spollersBlock, hideSpollerBody = true) {
		const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
		if (spollerTitles.length > 0) {
			spollerTitles.forEach(spollerTitle => {
				if (hideSpollerBody) {
					spollerTitle.removeAttribute('tabindex');
					if (!spollerTitle.classList.contains('_active')) {
						spollerTitle.nextElementSibling.hidden = true;
					}
				} else {
					spollerTitle.setAttribute('tabindex', '-1');
					spollerTitle.nextElementSibling.hidden = false;
				}
			});
		}
	}
	function setSpollerAction(e) {
		const el = e.target;
		if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
			const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]');
			const spollersBlock = spollerTitle.closest('[data-spollers]');
			const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;
			if (!spollersBlock.querySelectorAll('._slide').length) {
				if (oneSpoller && !spollerTitle.classList.contains('_active')) {
					hideSpollersBody(spollersBlock);
				}
				spollerTitle.classList.toggle('_active');
				_slideToggle(spollerTitle.nextElementSibling, 500);
			}
			e.preventDefault();
		}
	}
	function hideSpollersBody(spollersBlock) {
		const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._active');
		if (spollerActiveTitle) {
			spollerActiveTitle.classList.remove('_active');
			_slideUp(spollerActiveTitle.nextElementSibling, 500);
		}
	}
}

//=================

//=================
//Menu
let iconMenu = document.querySelector(".icon-menu");
if (iconMenu != null) {
	let delay = 500;
	let menuBody = document.querySelector(".menu__body");
	iconMenu.addEventListener("click", function (e) {
		if (unlock) {
			body_lock(delay);
			iconMenu.classList.toggle("_active");
			menuBody.classList.toggle("_active");
		}
	});
};
function menu_close() {
	let iconMenu = document.querySelector(".icon-menu");
	let menuBody = document.querySelector(".menu__body");
	iconMenu.classList.remove("_active");
	menuBody.classList.remove("_active");
}
//=================
//BodyLock
function body_lock(delay) {
	let body = document.querySelector("body");
	if (body.classList.contains('_lock')) {
		body_lock_remove(delay);
	} else {
		body_lock_add(delay);
	}
}
function body_lock_remove(delay) {
	let body = document.querySelector("body");
	if (unlock) {
		let lock_padding = document.querySelectorAll("._lp");
		setTimeout(() => {
			for (let index = 0; index < lock_padding.length; index++) {
				const el = lock_padding[index];
				el.style.paddingRight = '0px';
			}
			body.style.paddingRight = '0px';
			body.classList.remove("_lock");
		}, delay);

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, delay);
	}
}
function body_lock_add(delay) {
	let body = document.querySelector("body");
	if (unlock) {
		let lock_padding = document.querySelectorAll("._lp");
		for (let index = 0; index < lock_padding.length; index++) {
			const el = lock_padding[index];
			el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		}
		body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		body.classList.add("_lock");

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, delay);
	}
}
//=================
//=================
//Popups
let popup_link = document.querySelectorAll('._popup-link');
let popups = document.querySelectorAll('.popup');
for (let index = 0; index < popup_link.length; index++) {
	const el = popup_link[index];
	el.addEventListener('click', function (e) {
		if (unlock) {
			let item = el.getAttribute('href').replace('#', '');
			let video = el.getAttribute('data-video');
			popup_open(item, video);
		}
		e.preventDefault();
	})
}
for (let index = 0; index < popups.length; index++) {
	const popup = popups[index];
	popup.addEventListener("click", function (e) {
		if (!e.target.closest('.popup__body')) {
			popup_close(e.target.closest('.popup'));
		}
	});
}
function popup_open(item, video = '') {
	let activePopup = document.querySelectorAll('.popup._active');
	if (activePopup.length > 0) {
		popup_close('', false);
	}
	let curent_popup = document.querySelector('.popup_' + item);
	if (curent_popup && unlock) {
		if (video != '' && video != null) {
			let popup_video = document.querySelector('.popup_video');
			popup_video.querySelector('.popup__video').innerHTML = '<iframe src="https://www.youtube.com/embed/' + video + '?autoplay=1"  allow="autoplay; encrypted-media" allowfullscreen></iframe>';
		}
		if (!document.querySelector('.menu__body._active')) {
			body_lock_add(500);
		}
		curent_popup.classList.add('_active');
		history.pushState('', '', '#' + item);
	}
}
function popup_close(item, bodyUnlock = true) {
	if (unlock) {
		if (!item) {
			for (let index = 0; index < popups.length; index++) {
				const popup = popups[index];
				let video = popup.querySelector('.popup__video');
				if (video) {
					video.innerHTML = '';
				}
				popup.classList.remove('_active');
			}
		} else {
			let video = item.querySelector('.popup__video');
			if (video) {
				video.innerHTML = '';
			}
			item.classList.remove('_active');
		}
		if (!document.querySelector('.menu__body._active') && bodyUnlock) {
			body_lock_remove(500);
		}
		history.pushState('', '', window.location.href.split('#')[0]);
	}
}
let popup_close_icon = document.querySelectorAll('.popup__close,._popup-close');
if (popup_close_icon) {
	for (let index = 0; index < popup_close_icon.length; index++) {
		const el = popup_close_icon[index];
		el.addEventListener('click', function () {
			popup_close(el.closest('.popup'));
		})
	}
}
document.addEventListener('keydown', function (e) {
	if (e.code === 'Escape') {
		popup_close();
	}
});

function modalShow(target, parent) {

	const img = target.closest(parent).querySelector(`img`).cloneNode(true),
		modal = document.querySelector('.modal-img'),
		body = document.querySelector('body');
	modal.firstElementChild.append(img);
	modal.classList.add(`_show`, `_fade`);
	body.classList.toggle(`_lock`);

	modal.addEventListener('click', (e) => {
		const target = e.target;
		if (target && (target.getAttribute('data-data') !== `` || target.classList.contains(`modal-img__close`))) {
			modal.classList.remove(`_show`, `_fade`);
			body.classList.remove(`_lock`);
			img.remove();
		}
	})
}


window.addEventListener(`DOMContentLoaded`, () => {

	document.addEventListener(`click`, documentActions);


	//следим за прокруткой хедера
	scrollHeader();
	// добавляем цвет на переключатели карточек
	addColorsBtn();
	// добавляем цвет избранному
	addFavoritColor();
	//добавлявем товар в избранное
	addItemStatus();

})


//делегирование событий click
function documentActions(e) {
	const targetElem = e.target;
	//console.log(targetElem);

	//Header 
	//стрелки в меню на тачскрине
	if (window.innerWidth > 768 && isMobile.any()) {// для устройств шире 768 с тачскрином
		if (targetElem && targetElem.classList.contains(`menu__arrow`)) {
			targetElem.closest(`.menu__item`).classList.toggle(`_hover`);
		}
		if (targetElem && !targetElem.closest(`.menu__item`) && document.querySelectorAll(`.menu__item._hover`).length > 0) {
			_removeClass(document.querySelectorAll(`.menu__item._hover`), `_hover`);
		}
	}
	// кнопка поиск
	if (targetElem && targetElem.classList.contains(`search-form__icon`)) {
		document.querySelector(`.search-form`).classList.toggle(`_active`);
	} else if (targetElem && !targetElem.closest(`.search-form`)) {
		document.querySelector(`.search-form`).classList.remove(`_active`);
	}
	//================
	//footer 
	//меню language
	if (targetElem && (targetElem.classList.contains(`language__name`) || targetElem.classList.contains(`language__arrow`))) {
		targetElem.closest(`.language`).classList.toggle(`_active`);
	} else if (targetElem && (!targetElem.classList.contains(`language__name`) && !targetElem.classList.contains(`language__arrow`)) && document.querySelectorAll(`.language._active`).length > 0) {
		_removeClass(document.querySelectorAll(`.language._active`), `_active`);
	}
	//выбор языка
	if (targetElem && targetElem.classList.contains(`language__sub-link`)) {
		document.querySelectorAll(`.language__sub-link`).forEach(el => {
			if (targetElem == el) document.querySelector(`.language__name`).textContent = el.textContent;
		});
	}
	//================
	// модальное окно просмотр изображения

	if (targetElem && targetElem.classList.contains(`actions-product__link--scale`)) {
		e.preventDefault();
		modalShow(targetElem, `.item-card`);

	}
	if (targetElem && targetElem.classList.contains(`img-promo__scale`)) {
		e.preventDefault();
		modalShow(targetElem, `.img-promo`);
	}
	// показ всех товаров в new product
	if (targetElem && targetElem.classList.contains(`new-product__view-all`)) {
		e.preventDefault();

		getProducts(targetElem);
	}

	// переключатель цвета товара на карточке
	if (targetElem && targetElem.classList.contains(`item-card__change-color`)) {
		e.preventDefault();
		changeItemColor(targetElem);
	}
	// переключатель избранное  на карточке
	if (targetElem && targetElem.classList.contains(`actions-product__link--favorit`)) {
		e.preventDefault();
		changeItemFavorite(targetElem);
	}
	// переключатель изменить   на карточке
	if (targetElem && targetElem.classList.contains(`actions-product__link--change`)) {
		e.preventDefault();

	}

	// переключатель табов в new product
	if (targetElem && targetElem.classList.contains(`new-product__link`)) {
		e.preventDefault();
		document.querySelectorAll(`.new-product__link`).forEach(el => el.classList.remove(`_active`))
		targetElem.classList.add(`_active`);
		addItemHide(targetElem);
	}
	// изменение звездного рейтинга
	if (targetElem && targetElem.closest(`[data-star]`)) {
		changeStarReit(targetElem);
	}
	//добавление товара в корзину из new product
	if (targetElem && targetElem.classList.contains(`actions-product__link--cart`)) {
		const productElem = targetElem.closest(`.item-card`),
			productId = productElem.dataset.pid,
			productColor = productElem.querySelector(`.item-card__img-box`).querySelector(`._active`).dataset.c;

		addToCart(targetElem, productId, productColor);
		e.preventDefault();
	}

	// показать /скрыть корзину с товарами
	if (targetElem && targetElem.classList.contains(`cart-header__icon`) || targetElem.closest(`.cart-header__icon`)) {
		if (document.querySelector(`.cart-list`).children.length > 0) {
			document.querySelector(`.cart-header`).classList.toggle(`_active`);
		}
		e.preventDefault();
	} else if (!targetElem.closest(`.cart-header`)
		&& !targetElem.classList.contains(`actions-product__link--cart`)
		&& !targetElem.classList.contains(`item-card__change-color`)) {
		document.querySelector(`.cart-header`).classList.remove(`_active`);
	}
	//удаляем товар из  корзины
	if (targetElem && targetElem.classList.contains(`cart-list__delete`)) {
		const productId = targetElem.closest(`.cart-list__item`).dataset.cartPid;
		updateCart(targetElem, productId, `#000`, false);
		e.preventDefault();

	}


}
//====================================
function changeItemColor(eve) {
	const parent = eve.closest(`[data-pid]`),
		items = parent.querySelectorAll(`.item-card__change-color`),
		imgs = parent.querySelectorAll(`[data-c]`),
		removeClass = (elems) => {
			elems.forEach(el => {
				el.classList.remove(`_active`);
				el.classList.remove(`_fade`);
				if (el.dataset.c && eve.dataset.color == el.dataset.c) {
					el.classList.add(`_active`);
					el.classList.add(`_fade`);
				}
			});
		};
	removeClass(items);
	removeClass(imgs);

	eve.classList.add(`_active`);
	eve.classList.add(`_fade`);



}
//================================
function addFavoritColor() {
	document.querySelectorAll(`[data-f]`).forEach(el => {
		el.style.color = "#c72535";
		el.style.transform = "scale(1.5)";
	});
};
//===================

function changeItemFavorite(eve) {
	const removeAttr = () => {
		eve.removeAttribute(`data-f`);
		eve.style.color = '';
		eve.style.transform = '';
	};
	eve.hasAttribute(`data-f`) ? removeAttr() : eve.setAttribute(`data-f`, ``);
	addFavoritColor();
	addItemStatus();
};
//===================================
function addItemHide(targetElem) {
	document.querySelectorAll(`.new-product__cart-item`).forEach(el => {
		el.dataset.tab.includes(targetElem.dataset.tab) ? el.classList.remove(`_hide`) : el.classList.add(`_hide`);
	})
}

//=====================================
function addItemStatus() {

	document.querySelectorAll(`[data-pid]`).forEach((el, i) => {
		userAction.items[`item-${i + 1}`] = {};
		userAction.items[`item-${i + 1}`].id = el.dataset.pid;

		if (el.querySelectorAll(`[data-color]`).length) {
			el.querySelectorAll(`[data-color]`).forEach((e, j) => {
				userAction.items[`item-${i + 1}`][`type-${j + 1}`] = {};
				userAction.items[`item-${i + 1}`][`type-${j + 1}`].favorit = !!el.querySelector(`[data-f]`);;
				userAction.items[`item-${i + 1}`][`type-${j + 1}`].color = e.dataset.color;
			});
		} else {
			userAction.items[`item-${i + 1}`][`type-1`] = {};
			userAction.items[`item-${i + 1}`][`type-1`].favorit = !!el.querySelector(`[data-f]`);;

		}



	});
	//console.log(userAction);
};
//==============================
function changeStarReit(targetElem) {

	const parent = targetElem.closest(`[data-star]`),
		stars = parent.querySelectorAll('span');
	let numStar = 0;

	stars.forEach((el, i) => {
		el.style.color = ``;
		if (el == targetElem) {
			parent.setAttribute(`data-star`, i + 1);
			numStar = i;
		}
	});
	colorStars(parent.dataset.star, stars);

	if (targetElem.closest(`.item-card__body`)) {
		const parentGrand = targetElem.closest(`.item-card__body`).querySelector(`.item-card__stars`),
			stars = parentGrand.querySelectorAll('span');
		stars.forEach(el => el.style.color = ``);
		parentGrand.setAttribute(`data-star`, numStar + 1);

		colorStars(parentGrand.dataset.star, stars);
	}

}
//=======================
function addToCart(targetElem, productId, productColor) {
	if (!targetElem.classList.contains(`_hold`)) {// ИЗБЕГАЕМ МНОЖЕСТВЕННЫХ НАЖАТИЙ
		targetElem.classList.add(`_hold`);
		targetElem.classList.add(`_fly`);

		const cart = document.querySelector(`.cart-header__icon`),
			product = document.querySelector(`[data-pid="${productId}"]`),
			productImg = product.querySelector(`.item-card__img-box`).querySelector(`._active`),

			productImgFly = productImg.cloneNode(true),

			productImgFlyWidth = productImg.offsetWidth,
			productImgFlyHeight = productImg.offsetHeight,
			productImgFlyTop = productImg.getBoundingClientRect().top,
			productImgFlyLeft = productImg.getBoundingClientRect().left;


		productImgFly.setAttribute(`class`, `_flyimg _ibg`);
		productImgFly.style.cssText =
			`
			left: ${productImgFlyLeft}px;
			top: ${productImgFlyTop}px;
			width : ${productImgFlyWidth}px;
			height : ${productImgFlyHeight}px;
			`;

		document.body.append(productImgFly);

		const cartFlyTop = cart.getBoundingClientRect().top,
			cartFlyLeft = cart.getBoundingClientRect().left;

		productImgFly.style.cssText =
			`
			left: ${cartFlyLeft}px;
			top: ${cartFlyTop}px;
			width: 0px;
			height: 0px;
			opacity: 0;
			`;

		productImgFly.addEventListener(`transitionend`, () => {
			if (targetElem.classList.contains(`_fly`)) {
				productImgFly.remove();
				updateCart(targetElem, productId, productColor);
				targetElem.classList.remove(`_fly`);
			}
		});


	}
}
//=============================
function updateCart(targetElem, productId, productColor, productAdd = true) {
	const cart = document.querySelector(`.cart-header`),
		cartIcon = cart.querySelector(`.cart-header__icon`),
		cartQuantity = cartIcon.querySelector(`span`),
		cartProduct = document.querySelector(`[data-cart-pid="${productId}"]`),
		cartList = document.querySelector(`.cart-list`);


	//добавление в корзину
	if (productAdd) {
		cartQuantity ?
			cartQuantity.innerHTML = ++cartQuantity.innerHTML :
			cartIcon.insertAdjacentHTML(`beforeend`, `<span>1</span>`);

		const addCartHTML = (productId, productColor) => {
			const product = document.querySelector(`[data-pid="${productId}"]`),
				cartProductTitle = product.querySelector(`.item-card__name`).innerHTML,
				cartProductImg = product.querySelector(`.item-card__img-box`).querySelector(`._active`).outerHTML,
				cartColor = productColor ?
					`<div class="cart-list__color">Color: <div class="cart-list__color-dot" data-cart-color ="${productColor}" style="background: ${productColor};"></div> </div>`
					: ``;
			cartList.insertAdjacentHTML(`beforeend`,
				`<li data-cart-pid="${productId}" class ="cart-list__item">
			<a href="#" class="cart-list__image _ibg">${cartProductImg}</a>
			<div class="cart-list__body">
				<a href="#" class="cart-list__title">${cartProductTitle}</a>
				<div class="cart-list__quantity">Quantity: <span>1</span></div>
				${cartColor}
				<a href="#" class="cart-list__delete">Delete</a>
			</div>
		</li>`);
		},
			addQuatity = (cartProduct) => {
				const cartProductQuantuty = cartProduct.querySelector(`.cart-list__quantity span`);
				cartProductQuantuty.innerHTML = ++cartProductQuantuty.innerHTML;
			};

		if (!cartProduct) {
			addCartHTML(productId, productColor);

		} else if (productColor) {
			const cartProducts = document.querySelectorAll(`[data-cart-pid="${productId}"]`),
				arrColor = [];
			cartProducts.forEach(cartProduct => {
				const colorCart = cartProduct.querySelector(`.cart-list__color-dot`).dataset.cartColor;
				if (colorCart == productColor) addQuatity(cartProduct);
				arrColor.push(colorCart)
			});
			if (!arrColor.includes(productColor)) addCartHTML(productId, productColor);

		} else {
			addQuatity(cartProduct);
		}


		//дает возможность еще добавлять тотже товар
		targetElem.classList.remove(`_hold`);

	} else {//удаляем товар из корзины

		const cartProductQuantuty = cartProduct.querySelector(`.cart-list__quantity span`);
		cartProductQuantuty.innerHTML = --cartProductQuantuty.innerHTML;

		!parseInt(cartProductQuantuty.innerHTML) ? cartProduct.remove() : ``;

		const cartQuantityValue = --cartQuantity.innerHTML;
		if (cartQuantityValue) {
			cartQuantity.innerHTML = cartQuantityValue;
		} else {
			cartQuantity.remove();
			cart.classList.remove(`_active`);
		}

	}
}
//let btn = document.querySelectorAll('button[type="submit"],input[type="submit"]');
let forms = document.querySelectorAll('form');
if (forms.length > 0) {
	for (let index = 0; index < forms.length; index++) {
		const el = forms[index];
		el.addEventListener('submit', form_submit);
	}
}
async function form_submit(e) {
	let btn = e.target;
	let form = btn.closest('form');
	let error = form_validate(form);
	if (error == 0) {
		let formAction = form.getAttribute('action') ? form.getAttribute('action').trim() : '#';
		let formMethod = form.getAttribute('method') ? form.getAttribute('method').trim() : 'GET';
		const message = form.getAttribute('data-message');
		const ajax = form.getAttribute('data-ajax');
		const test = form.getAttribute('data-test');

		//SendForm
		if (ajax) {
			e.preventDefault();
			let formData = new FormData(form);
			form.classList.add('_sending');
			let response = await fetch(formAction, {
				method: formMethod,
				body: formData
			});
			if (response.ok) {
				let result = await response.json();
				form.classList.remove('_sending');
				if (message) {
					popup_open(message + '-message');
				}
				form_clean(form);
			} else {
				alert("Ошибка");
				form.classList.remove('_sending');
			}
		}
		// If test
		if (test) {
			e.preventDefault();
			popup_open(message + '-message');
			form_clean(form);
		}
	} else {
		let form_error = form.querySelectorAll('._error');
		if (form_error && form.classList.contains('_goto-error')) {
			_goto(form_error[0], 1000, 50);
		}
		e.preventDefault();
	}
}
function form_validate(form) {
	let error = 0;
	let form_req = form.querySelectorAll('._req');
	if (form_req.length > 0) {
		for (let index = 0; index < form_req.length; index++) {
			const el = form_req[index];
			if (!_is_hidden(el)) {
				error += form_validate_input(el);
			}
		}
	}
	return error;
}
function form_validate_input(input) {
	let error = 0;
	let input_g_value = input.getAttribute('data-value');

	if (input.getAttribute("name") == "email" || input.classList.contains("_email")) {
		if (input.value != input_g_value) {
			let em = input.value.replace(" ", "");
			input.value = em;
		}
		if (email_test(input) || input.value == input_g_value) {
			form_add_error(input);
			error++;
		} else {
			form_remove_error(input);
		}
	} else if (input.getAttribute("type") == "checkbox" && input.checked == false) {
		form_add_error(input);
		error++;
	} else {
		if (input.value == '' || input.value == input_g_value) {
			form_add_error(input);
			error++;
		} else {
			form_remove_error(input);
		}
	}
	return error;
}
function form_add_error(input) {
	input.classList.add('_error');
	input.parentElement.classList.add('_error');

	let input_error = input.parentElement.querySelector('.form__error');
	if (input_error) {
		input.parentElement.removeChild(input_error);
	}
	let input_error_text = input.getAttribute('data-error');
	if (input_error_text && input_error_text != '') {
		input.parentElement.insertAdjacentHTML('beforeend', '<div class="form__error">' + input_error_text + '</div>');
	}
}
function form_remove_error(input) {
	input.classList.remove('_error');
	input.parentElement.classList.remove('_error');

	let input_error = input.parentElement.querySelector('.form__error');
	if (input_error) {
		input.parentElement.removeChild(input_error);
	}
}
function form_clean(form) {
	let inputs = form.querySelectorAll('input,textarea');
	for (let index = 0; index < inputs.length; index++) {
		const el = inputs[index];
		el.parentElement.classList.remove('_focus');
		el.classList.remove('_focus');
		el.value = el.getAttribute('data-value');
	}
	let checkboxes = form.querySelectorAll('.checkbox__input');
	if (checkboxes.length > 0) {
		for (let index = 0; index < checkboxes.length; index++) {
			const checkbox = checkboxes[index];
			checkbox.checked = false;
		}
	}
	let selects = form.querySelectorAll('select');
	if (selects.length > 0) {
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			const select_default_value = select.getAttribute('data-default');
			select.value = select_default_value;
			select_item(select);
		}
	}
}

let viewPass = document.querySelectorAll('.form__viewpass');
for (let index = 0; index < viewPass.length; index++) {
	const element = viewPass[index];
	element.addEventListener("click", function (e) {
		if (element.classList.contains('_active')) {
			element.parentElement.querySelector('input').setAttribute("type", "password");
		} else {
			element.parentElement.querySelector('input').setAttribute("type", "text");
		}
		element.classList.toggle('_active');
	});
}

//Select
let selects = document.getElementsByTagName('select');
if (selects.length > 0) {
	selects_init();
}
function selects_init() {
	for (let index = 0; index < selects.length; index++) {
		const select = selects[index];
		select_init(select);
	}
	//select_callback();
	document.addEventListener('click', function (e) {
		selects_close(e);
	});
	document.addEventListener('keydown', function (e) {
		if (e.code === 'Escape') {
			selects_close(e);
		}
	});
}
function selects_close(e) {
	const selects = document.querySelectorAll('.select');
	if (!e.target.closest('.select') && !e.target.classList.contains('_option')) {
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			const select_body_options = select.querySelector('.select__options');
			select.classList.remove('_active');
			_slideUp(select_body_options, 100);
		}
	}
}
function select_init(select) {
	const select_parent = select.parentElement;
	const select_modifikator = select.getAttribute('class');
	const select_selected_option = select.querySelector('option:checked');
	select.setAttribute('data-default', select_selected_option.value);
	select.style.display = 'none';

	select_parent.insertAdjacentHTML('beforeend', '<div class="select select_' + select_modifikator + '"></div>');

	let new_select = select.parentElement.querySelector('.select');
	new_select.appendChild(select);
	select_item(select);
}
function select_item(select) {
	const select_parent = select.parentElement;
	const select_items = select_parent.querySelector('.select__item');
	const select_options = select.querySelectorAll('option');
	const select_selected_option = select.querySelector('option:checked');
	const select_selected_text = select_selected_option.text;
	const select_type = select.getAttribute('data-type');

	if (select_items) {
		select_items.remove();
	}

	let select_type_content = '';
	if (select_type == 'input') {
		select_type_content = '<div class="select__value icon-select-arrow"><input autocomplete="off" type="text" name="form[]" value="' + select_selected_text + '" data-error="Ошибка" data-value="' + select_selected_text + '" class="select__input"></div>';
	} else {
		select_type_content = '<div class="select__value icon-select-arrow"><span>' + select_selected_text + '</span></div>';
	}

	select_parent.insertAdjacentHTML('beforeend',
		'<div class="select__item">' +
		'<div class="select__title">' + select_type_content + '</div>' +
		'<div class="select__options">' + select_get_options(select_options) + '</div>' +
		'</div></div>');

	select_actions(select, select_parent);
}
function select_actions(original, select) {
	const select_item = select.querySelector('.select__item');
	const selectTitle = select.querySelector('.select__title');
	const select_body_options = select.querySelector('.select__options');
	const select_options = select.querySelectorAll('.select__option');
	const select_type = original.getAttribute('data-type');
	const select_input = select.querySelector('.select__input');

	selectTitle.addEventListener('click', function (e) {
		selectItemActions();
	});

	function selectMultiItems() {
		let selectedOptions = select.querySelectorAll('.select__option');
		let originalOptions = original.querySelectorAll('option');
		let selectedOptionsText = [];
		for (let index = 0; index < selectedOptions.length; index++) {
			const selectedOption = selectedOptions[index];
			originalOptions[index].removeAttribute('selected');
			if (selectedOption.classList.contains('_selected')) {
				const selectOptionText = selectedOption.innerHTML;
				selectedOptionsText.push(selectOptionText);
				originalOptions[index].setAttribute('selected', 'selected');
			}
		}
		select.querySelector('.select__value').innerHTML = '<span>' + selectedOptionsText + '</span>';
	}
	function selectItemActions(type) {
		if (!type) {
			let selects = document.querySelectorAll('.select');
			for (let index = 0; index < selects.length; index++) {
				const select = selects[index];
				const select_body_options = select.querySelector('.select__options');
				if (select != select_item.closest('.select')) {
					select.classList.remove('_active');
					_slideUp(select_body_options, 100);
				}
			}
			_slideToggle(select_body_options, 100);
			select.classList.toggle('_active');
		}
	}
	for (let index = 0; index < select_options.length; index++) {
		const select_option = select_options[index];
		const select_option_value = select_option.getAttribute('data-value');
		const select_option_text = select_option.innerHTML;

		if (select_type == 'input') {
			select_input.addEventListener('keyup', select_search);
		} else {
			if (select_option.getAttribute('data-value') == original.value && !original.hasAttribute('multiple')) {
				select_option.style.display = 'none';
			}
		}
		select_option.addEventListener('click', function () {
			for (let index = 0; index < select_options.length; index++) {
				const el = select_options[index];
				el.style.display = 'block';
			}
			if (select_type == 'input') {
				select_input.value = select_option_text;
				original.value = select_option_value;
			} else {
				if (original.hasAttribute('multiple')) {
					select_option.classList.toggle('_selected');
					selectMultiItems();
				} else {
					select.querySelector('.select__value').innerHTML = '<span>' + select_option_text + '</span>';
					original.value = select_option_value;
					select_option.style.display = 'none';
				}
			}
			let type;
			if (original.hasAttribute('multiple')) {
				type = 'multiple';
			}
			selectItemActions(type);
		});
	}
}
function select_get_options(select_options) {
	if (select_options) {
		let select_options_content = '';
		for (let index = 0; index < select_options.length; index++) {
			const select_option = select_options[index];
			const select_option_value = select_option.value;
			if (select_option_value != '') {
				const select_option_text = select_option.innerHTML;
				select_options_content = select_options_content + '<div data-value="' + select_option_value + '" class="select__option">' + select_option_text + '</div>';
			}
		}
		return select_options_content;
	}
}
function select_search(e) {
	let select_block = e.target.closest('.select ').querySelector('.select__options');
	let select_options = e.target.closest('.select ').querySelectorAll('.select__option');
	let select_search_text = e.target.value.toUpperCase();

	for (let i = 0; i < select_options.length; i++) {
		let select_option = select_options[i];
		let select_txt_value = select_option.textContent || select_option.innerText;
		if (select_txt_value.toUpperCase().indexOf(select_search_text) > -1) {
			select_option.style.display = "";
		} else {
			select_option.style.display = "none";
		}
	}
}
function selects_update_all() {
	let selects = document.querySelectorAll('select');
	if (selects) {
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			select_item(select);
		}
	}
}

//Placeholers
let inputs = document.querySelectorAll('input[data-value],textarea[data-value]');
inputs_init(inputs);

function inputs_init(inputs) {
	if (inputs.length > 0) {
		for (let index = 0; index < inputs.length; index++) {
			const input = inputs[index];
			const input_g_value = input.getAttribute('data-value');
			input_placeholder_add(input);
			if (input.value != '' && input.value != input_g_value) {
				input_focus_add(input);
			}
			input.addEventListener('focus', function (e) {
				if (input.value == input_g_value) {
					input_focus_add(input);
					input.value = '';
				}
				if (input.getAttribute('data-type') === "pass" && !input.parentElement.querySelector('.form__viewpass').classList.contains('_active')) {
					input.setAttribute('type', 'password');
				}
				if (input.classList.contains('_date')) {
					/*
					input.classList.add('_mask');
					Inputmask("99.99.9999", {
						//"placeholder": '',
						clearIncomplete: true,
						clearMaskOnLostFocus: true,
						onincomplete: function () {
							input_clear_mask(input, input_g_value);
						}
					}).mask(input);
					*/
				}
				if (input.classList.contains('_phone')) {
					//'+7(999) 999 9999'
					//'+38(999) 999 9999'
					//'+375(99)999-99-99'
					input.classList.add('_mask');
					Inputmask("+375 (99) 9999999", {
						//"placeholder": '',
						clearIncomplete: true,
						clearMaskOnLostFocus: true,
						onincomplete: function () {
							input_clear_mask(input, input_g_value);
						}
					}).mask(input);
				}
				if (input.classList.contains('_digital')) {
					input.classList.add('_mask');
					Inputmask("9{1,}", {
						"placeholder": '',
						clearIncomplete: true,
						clearMaskOnLostFocus: true,
						onincomplete: function () {
							input_clear_mask(input, input_g_value);
						}
					}).mask(input);
				}
				form_remove_error(input);
			});
			input.addEventListener('blur', function (e) {
				if (input.value == '') {
					input.value = input_g_value;
					input_focus_remove(input);
					if (input.classList.contains('_mask')) {
						input_clear_mask(input, input_g_value);
					}
					if (input.getAttribute('data-type') === "pass") {
						input.setAttribute('type', 'text');
					}
				}
			});
			if (input.classList.contains('_date')) {
				const calendarItem = datepicker(input, {
					customDays: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
					customMonths: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
					overlayButton: 'Применить',
					overlayPlaceholder: 'Год (4 цифры)',
					startDay: 1,
					formatter: (input, date, instance) => {
						const value = date.toLocaleDateString()
						input.value = value
					},
					onSelect: function (input, instance, date) {
						input_focus_add(input.el);
					}
				});
				const dataFrom = input.getAttribute('data-from');
				const dataTo = input.getAttribute('data-to');
				if (dataFrom) {
					calendarItem.setMin(new Date(dataFrom));
				}
				if (dataTo) {
					calendarItem.setMax(new Date(dataTo));
				}
			}
		}
	}
}
function input_placeholder_add(input) {
	const input_g_value = input.getAttribute('data-value');
	if (input.value == '' && input_g_value != '') {
		input.value = input_g_value;
	}
}
function input_focus_add(input) {
	input.classList.add('_focus');
	input.parentElement.classList.add('_focus');
}
function input_focus_remove(input) {
	input.classList.remove('_focus');
	input.parentElement.classList.remove('_focus');
}
function input_clear_mask(input, input_g_value) {
	input.inputmask.remove();
	input.value = input_g_value;
	input_focus_remove(input);
}

//QUANTITY
let quantityButtons = document.querySelectorAll('.quantity__button');
if (quantityButtons.length > 0) {
	for (let index = 0; index < quantityButtons.length; index++) {
		const quantityButton = quantityButtons[index];
		quantityButton.addEventListener("click", function (e) {
			let value = parseInt(quantityButton.closest('.quantity').querySelector('input').value);
			if (quantityButton.classList.contains('quantity__button_plus')) {
				value++;
			} else {
				value = value - 1;
				if (value < 1) {
					value = 1
				}
			}
			quantityButton.closest('.quantity').querySelector('input').value = value;
		});
	}
}

//RANGE
const priceSlider = document.querySelector('.price-filter__slider');
if (priceSlider) {

	let textFrom = priceSlider.getAttribute('data-from');
	let textTo = priceSlider.getAttribute('data-to');

	noUiSlider.create(priceSlider, {
		start: [0, 200000],
		connect: true,
		tooltips: [wNumb({ decimals: 0, prefix: textFrom + ' ' }), wNumb({ decimals: 0, prefix: textTo + ' ' })],
		range: {
			'min': [0],
			'max': [200000]
		}
	});

	/*
	const priceStart = document.getElementById('price-start');
	const priceEnd = document.getElementById('price-end');
	priceStart.addEventListener('change', setPriceValues);
	priceEnd.addEventListener('change', setPriceValues);
	*/

	function setPriceValues() {
		let priceStartValue;
		let priceEndValue;
		if (priceStart.value != '') {
			priceStartValue = priceStart.value;
		}
		if (priceEnd.value != '') {
			priceEndValue = priceEnd.value;
		}
		priceSlider.noUiSlider.set([priceStartValue, priceEndValue]);
	}
}

