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
		parentSelector,
		stars,
		classes }) {
		this.item = item;
		this.src = src;
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
		this.parent = document.querySelector(parentSelector);
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
	
					<img data-data src=${this.src} width=${this.size.width} height=${this.size.height} alt=${this.alt}>
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

		} else if (this.item.includes(`show`)) {
			addClasses([`show__box`]);
			elem.innerHTML = `
				<div class="show__text">
						<div class="show__sale">Get up to ${this.sale}% off Today Only!</div>
						<h3 class="show__title">${this.title}</h3>
						<button type="button" class="show__btn">Show Now</button>
					</div>
					<div class="show__img _ibg">
						<img src=${this.src} width=${this.size.width} height=${this.size.height} alt=${this.alt}>
					</div>
				</div>
		`;
		} else {
			return;
		}
		this.parent.append(elem);
	}
}

function stars() {
	const starBox = document.querySelectorAll(`[data-star]`);
	starBox.forEach(el => {
		const ammount = el.dataset.star;
		const span = el.querySelectorAll(`span`);
		for (let i = 0; i < ammount; i++) {
			span[i].style.color = `#c72535`;
		}
	});
}
//=======
const getJson = async (url) => {
	const res = await fetch(url);
	if (!res.ok) {// если сервер выдал ошибку - выводм в консоль сообщение
		throw new Error(`Could not fetch ${url}, status ${res.status}`)
	}
	return await res.json();
}

getJson('json/db.json')
	.then(json => {
		for (const item in json) {
			json[item].forEach(obj => {
				new ItemOffer(item, obj).render();
			});
		}
	})
	.catch()
	.finally(() => stars());









