
class PromoItem {
	constructor({
		src,
		size,
		alt,
		title,
		descr,
		price,
		salePrice,
		parentSelector,
		stars,
		classes }) {
		this.src = src;
		this.size = {
			width: (!size.width) ? "263" : size.width,
			height: (!size.height) ? "248" : size.height,
		};
		this.alt = alt;
		this.title = title;
		this.descr = descr;
		this.price = price;
		this.salePrice = salePrice;
		this.classes = classes ? [...classes] : [];
		this.stars = (!stars) ? 5 : stars;
		this.parent = document.querySelector(parentSelector);
	}


	render() {
		const elem = document.createElement(`div`);
		const clss = new Set([`promo__cart`, `cart-promo`]);
		if (this.classes.length) clss.add(...this.classes);
		Array.from(clss).forEach(cls => elem.classList.add(cls));

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
			<div class="descr__price">$ ${this.price} <span>/</span>
				<p>$ ${this.salePrice}</p>
			</div>
			<div data-star = "${this.stars}" class="descr__stars">
				<span class="_icon-star"></span>
				<span class="_icon-star"></span>
				<span class="_icon-star"></span>
				<span class="_icon-star"></span>
				<span class="_icon-star"></span>
			</div>
		</div>
		`;
		this.parent.append(elem);
	}
}


class ShowItem {
	constructor({
		sale,
		title,
		src,
		size,
		alt,
		parentSelector,
		classes
	}) {
		this.sale = sale;
		this.src = src;
		this.size = {
			width: (!size.width) ? "263" : size.width,
			height: (!size.height) ? "248" : size.height,
		};
		this.alt = alt;
		this.title = title;
		this.parent = document.querySelector(parentSelector);
		this.classes = classes ? [...classes] : [];
	}

	render() {
		const elem = document.createElement(`div`);
		const clss = new Set([`show__box`]);
		if (this.classes.length) clss.add(...this.classes);
		Array.from(clss).forEach(cls => elem.classList.add(cls));

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
		this.parent.append(elem);
	}
}






fetch('json/promo.json')
	.then(response => response.json())
	.then(json => parsePromoDate(json));


function parsePromoDate(json) {

	for (const item in json) {
		if (item.includes(`promo`)) {
			new PromoItem(json[item]).render();
		} else if (item.includes(`show`)) {
			new ShowItem(json[item]).render();
		}

	}
	stars();
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




