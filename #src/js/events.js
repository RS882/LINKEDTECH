window.addEventListener(`DOMContentLoaded`, () => {
	let modalTarget;
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

	if (targetElem && targetElem.classList.contains(`scale`)) {
		e.preventDefault();
		const targetPid = targetElem.closest(`[data-pid]`).dataset.pid;
		let targetParent = document.querySelector(`.item-card[data-pid="${targetPid}"]`);
		if (!targetParent) {
			targetParent = document.querySelector(`.item-card-new[data-pid="${targetPid}"]`);
		}
		if (!targetParent) {

			let arrItem = [];
			getJson('json/products.json')
				.then(json => {
					json.products.forEach(el => arrItem.push(el))

					const img = document.createElement(`img`);
					img.setAttribute(`data-data`, ``);
					img.classList.add(`_active`);

					arrItem.forEach(item => {
						if (+item.id == +targetPid) {
							if (item.src.length > 1) {
								item.src.forEach(ele => {
									if (ele.color === targetElem.dataset.c) {
										img.setAttribute(`src`, `${ele.img}`);
										img.setAttribute(`width`, `${ele.size.width}`);
										img.setAttribute(`height`, `${ele.size.height}`);
										img.setAttribute(`alt`, `${ele.alt}`);
									}
								});

							} else {
								img.setAttribute(`src`, `${item.src[0].img}`);
								img.setAttribute(`width`, `${item.src[0].size.width}`);
								img.setAttribute(`height`, `${item.src[0].size.height}`);
								img.setAttribute(`alt`, `${item.src[0].alt}`);
							}
						}
					});
					modalShow(img);
				})
				.catch(() => alert('Error!'));



		} else {
			let targetImgBox = targetParent.querySelector(`.item-card__img-box`);
			if (!targetImgBox) {
				targetImgBox = targetParent.querySelector(`.item-card-new__img-box`);
			}
			const img = !targetElem.closest(`[data-c]`) ?
				targetImgBox.querySelector(`._active`).cloneNode(true) :
				targetImgBox.querySelector(`[data-c="${targetElem.dataset.c}"]`).cloneNode(true);
			modalShow(img);
		}

		modalTarget = targetElem;

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
	if (targetElem && targetElem.classList.contains(`actions-product__link--favorit`)
		|| targetElem.classList.contains(`actions-product-new__link--favorit`)) {
		e.preventDefault();
		changeItemFavorite(targetElem);
	}
	// переключатель изменить   на карточке
	if (targetElem && targetElem.classList.contains(`actions-product__link--change`)
		|| targetElem.classList.contains(`actions-product-new__link--change`)) {
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

	//добавление товара в корзину 
	if (targetElem && targetElem.classList.contains(`cart`)) {
		let productElem;
		//добавление товара в корзину из new product
		if (targetElem.classList.contains(`actions-product__link--cart`)) {
			productElem = targetElem.closest(`.item-card`);
		}
		//добавление товара в корзину из new shop
		if (targetElem.classList.contains(`actions-product-new__link--cart`)) {
			productElem = targetElem.closest(`.item-card-new`);
			console.log(productElem);
		}
		//добавление товара в корзину из modal
		if (targetElem.classList.contains(`modal-img__cart`)) {
			const targetPid = modalTarget.closest(`[data-pid]`).dataset.pid;
			productElem = document.querySelector(`.item-card[data-pid="${targetPid}"]`);
			if (!productElem) {
				productElem = document.querySelector(`.item-card-new[data-pid="${targetPid}"]`);
			}
		}
		//добавляем товар в корзину из promo
		if (targetElem.classList.contains(`cart-promo__cart`)) {
			const targetPid = targetElem.closest(`[data-pid]`).dataset.pid;
			productElem = document.querySelector(`.item-card[data-pid="${targetPid}"]`);
		}


		const productId = productElem.dataset.pid,
			productColor =
				productElem.querySelector(`.item-card__img-box`) ?
					productElem.querySelector(`.item-card__img-box`).querySelector(`._active`).dataset.c : ``;

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

		const cart = document.querySelector(`.cart-header__icon`);
		let productImg;


		if (targetElem.classList.contains(`actions-product__link--cart`)) {
			const product = document.querySelector(`.item-card[data-pid="${productId}"]`);
			productImg = product.querySelector(`.item-card__img-box`).querySelector(`._active`);
		}
		if (targetElem.classList.contains(`actions-product-new__link--cart`)) {
			const product = document.querySelector(`.item-card-new[data-pid="${productId}"]`);
			productImg = product.querySelector(`.item-card-new__img-box`).querySelector(`._active`);
		}
		if (targetElem.classList.contains(`modal-img__cart`)) {
			productImg = targetElem.closest(`.modal-img__wrapper`).querySelector(`[data-data]`)
		}
		if (targetElem.classList.contains(`cart-promo__cart`)) {
			productImg = targetElem.closest(`.cart-promo__box`).querySelector(`[data-data]`)
		}

		const productImgFly = productImg.cloneNode(true),

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
		let product,
			cartProductTitle,
			cartProductImg;

		const addCartHTML = (productId, productColor) => {

			if (document.querySelector(`.item-card[data-pid="${productId}"]`)) {
				product = document.querySelector(`.item-card[data-pid="${productId}"]`);
				cartProductTitle = product.querySelector(`.item-card__name`).innerHTML;
				cartProductImg = product.querySelector(`.item-card__img-box`).querySelector(`._active`).outerHTML;
			} else if (document.querySelector(`.item-card-new[data-pid="${productId}"]`)) {
				product = document.querySelector(`.item-card-new[data-pid="${productId}"]`);
				cartProductTitle = product.querySelector(`[data-data]`).getAttribute(`alt`);
				cartProductImg = product.querySelector(`.item-card-new__img-box`).querySelector(`._active`).outerHTML;
			}

			const cartColor = productColor ?
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