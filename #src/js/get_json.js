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
				<button type="button" class="cart-promo__cart cart-button _icon-cart"></button>
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
									<button type="button" class="actions-product__link _icon-cart"></button>
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









