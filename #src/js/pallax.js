
// parallax

parallaxBG('.main__bg', 30, 10);
parallaxDiv('.main__star', 30, 10);
parallaxDiv('.column-main', -30, -10);
parallaxDiv('.footer-main', -30, -10);
parallaxDiv('.header__logo', -30, -10);

// паралакс для картинки фона x, y- смещение осям 
function parallaxBG(selector, x, y) {
	//Получаем элемент фона 

	const bg = document.querySelector(selector);
	const bgAttribute = bg.getAttribute("style");

	//При движении мышью вызываем функцию, которая меняет положение фона
	document.addEventListener("mousemove", function (e) { MoveBackground(e, x, y); });

	function MoveBackground(e, x, y) {
		//Рассчитываем, насколько далеко от начала оси находится курсор: 0 - 0, 0.5 - середина экрана, 1 - ширина экрана (например, 1920)
		//Затем умножаем получившееся число на 30 - настолько будет сдвигаться фон
		//Например, если курсор находится посередине страницы (0.5), то при умножении получится 15
		//Далее отнимаем половину от 30, чтобы фон мог двигаться как влево, так и вправо
		let offsetX = (e.clientX / window.innerWidth * x) - x / 2;
		let offsetY = (e.clientY / window.innerHeight * y) - y / 2;
		//Меняем положение фона + добавляем старые стили
		if (bgAttribute) {
			bg.setAttribute(`style`, `background-position:  ${offsetX}px ${offsetY}px; 
		${bgAttribute}
		transform: scale(1.05);`);
		} else {
			bg.setAttribute(`style`, `background-position:  ${offsetX}px ${offsetY}px; 
				transform: scale(1.05);`);
		}
	}
}
// паралакс для блока 
function parallaxDiv(selector, x, y) {
	//Получаем элемент фона 

	const bg = document.querySelector(selector);
	const bgAttribute = bg.getAttribute("style");
	//console.log(bgAttribute);

	//При движении мышью вызываем функцию, которая меняет положение фона
	document.addEventListener("mousemove", function (e) { MoveBackground(e, x, y); });

	function MoveBackground(e, x, y) {
		//Рассчитываем, насколько далеко от начала оси находится курсор: 0 - 0, 0.5 - середина экрана, 1 - ширина экрана (например, 1920)
		//Затем умножаем получившееся число на 30 - настолько будет сдвигаться фон
		//Например, если курсор находится посередине страницы (0.5), то при умножении получится 15
		//Далее отнимаем половину от 30, чтобы фон мог двигаться как влево, так и вправо
		let offsetX = (e.clientX / window.innerWidth * x) - x / 2;
		let offsetY = (e.clientY / window.innerHeight * y) - y / 2;
		//Меняем положение фона + добавляем старые стили
		if (bgAttribute) {
			bg.setAttribute(`style`, `left:  ${offsetX}px;
			top: ${offsetY}px; 
			${bgAttribute}	`);
		} else {
			bg.setAttribute(`style`, `left:  ${offsetX}px;
			top: ${offsetY}px;`);
		}

	}
}