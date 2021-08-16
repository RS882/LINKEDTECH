
window.addEventListener(`DOMContentLoaded`, () => {

	document.addEventListener(`click`, documentActions);


	//следим за прокруткой хедера
	scrollHeader()


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

}

