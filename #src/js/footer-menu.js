// Footer


const objFM = new FooterMenu(`.column-menu__name`,
	`.column-menu`,
	[`.column-menu__name`,
		`.column-menu__links`,
		`.column-menu__social-content`,
	],
	[`.column-menu__link`,
		`.column-menu__social`,
	],
	`_active`,
	`_lock`,
	767.98,
);

objFM.addSpan();
objFM.toggleListerIsMedia();

//-------------------------------------------------
// для добавление удаления калссов в элементы футер меню
function FooterMenu(
	// селектор элемента нажатие на который добавляет класса 
	selectorIni,
	// селектор предка всех элементов  к которым идет  добавление класса, может быь равен selectorIni
	selectorParent,
	// селекторы элемнентов к которым добавляем класс(масcив)
	selectorAddClass,
	// селекторы элементов нажатеи на котрые удалает класс(масcив)
	selectorRemoveIni,
	// добовляемы класс к элементам
	classAddClass,
	// добовляемы класс к body 
	classAddClassBody,
	//ширина экрана при которой устанвлтвются(меньше) либо убираются(больше) слуштели события на selectorIni
	maxWidth,
) {
	this.selectorIni = selectorIni;
	this.selectorParent = selectorParent;
	this.selectorAddClass = selectorAddClass;
	this.selectorRemoveIni = selectorRemoveIni;
	this.selectorRemoveIni.splice(0, 0, `.cross`);//добавляется в документ после selectorIni
	this.classAddClass = classAddClass;
	this.classAddClassBody = classAddClassBody;
	this.maxWidth = maxWidth;
	this.selectorAddClass.push(this.selectorRemoveIni[0]);

	// добавляет элемент с классом selectorRemoveIni[0] + span внутри  после selectorIni (для крестика закрытия) 
	this.addSpan = function () {
		document.querySelectorAll(this.selectorIni).forEach(elem => {
			elem.insertAdjacentHTML('afterend', `<div class="${this.selectorRemoveIni[0].slice(1)}"><span></span></div>`);
		});
	};
	//устанвлтвются(меньше maxWidth) либо убираются(больше maxWidth) слуштели события на selectorIni

	this.toggleListerIsMedia = function () {
		const mediaQuery = window.matchMedia(`(max-width: ${this.maxWidth}px)`);
		const elem = document.querySelectorAll(this.selectorIni);
		const selector = this;
		// если старовая ширина экрана меньше maxWidth 
		if (window.innerWidth <= this.maxWidth) {
			for (const el of elem) {
				el.addEventListener('click', el.fn1 = function fn1(event) {
					selector.addActiveClass(event.currentTarget, selector);
				});
			}
		}
		mediaQuery.addEventListener('change', function () {
			if (mediaQuery.matches) {
				for (const el of elem) {
					el.addEventListener('click', el.fn = function fn(event) {
						selector.addActiveClass(event.currentTarget, selector);
					});
				}
			} else {
				for (const el of elem) {
					el.removeEventListener('click', el.fn);
					el.removeEventListener('click', el.fn1);
				}
				// удаляет присвоенные классы когжа ширина большк maxWidth
				selector.removeActiveClass(selector);
			}
		});
		// устанвливает слушателей события на selectorRemoveIni ( для снятия классов)
		const removeSelectors = this.selectorRemoveIni.reduce(function (sum, current) {
			return sum + `, ` + current;
		});
		document.querySelectorAll(removeSelectors).forEach(el => {
			el.addEventListener('click', function () {
				selector.removeActiveClass(selector);
			});
		});
	};

	// добавляет классы к selectorAddClass + body 
	this.addActiveClass = function (elem, {
		selectorParent: parent,
		selectorAddClass: selectoToAdd,
		classAddClass: active,
		classAddClassBody: bodyLock,
	}) {
		selectoToAdd.forEach(element => {
			const el = elem.closest(parent).querySelector(element);
			el && el.classList.add(active);
		});
		document.querySelector('body').classList.add(bodyLock);
	};

	// удаляет классы к selectorAddClass + body 
	this.removeActiveClass = function ({
		selectorAddClass: selector,
		classAddClass: active,
		classAddClassBody: bodyLock,
	}) {
		const element = selector.reduce(function (sum, current) {
			return sum + `, ` + current;
		});
		document.querySelectorAll(element).forEach(elem => {
			elem.classList.remove(active);
		});
		document.querySelector('body').classList.remove(bodyLock);
	};
}
