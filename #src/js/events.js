
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