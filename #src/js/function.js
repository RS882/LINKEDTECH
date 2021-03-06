const arrExep = [];
// сортирока массива чисел
arrExep.sort(comNum);
function comNum(a, b) {
	return a - b;
}

// поверхностный клон массиваэ/объекта
const arrExep1 = Object.assign(...arrExep);

// рекурсивный таймаут- точная время интервала
let i = 1;
function func1(i) {
	console.log(i);
};
setTimeout(function run() {
	func1(i);
	setTimeout(run, 100);
}, 100);


// функция-декоратор для кеширования значений `тяжелых` функций
function cachingDecorator(func, hash) {
	let cache = new Map();

	return function () {
		let key = hash(arguments);
		if (cache.has(key)) {
			return cache.get(key);
		}

		let result = func.call(this, ...arguments);

		cache.set(key, result);
		return result;
	};
}

function hash(args) {
	return [].join.call(args);
};

/*
Результатом декоратора debounce(f, ms) должна быть обёртка, которая передаёт
вызов f не более одного раза в ms миллисекунд. Другими словами,
когда мы вызываем debounce, это гарантирует, что все остальные вызовы
будут игнорироваться в течение ms.
 
 Вызов debounce возвращает обёртку. Возможны два состояния:

 isCooldown = false – готова к выполнению.
 isCooldown = true – ожидание окончания тайм-аута.
 В первом вызове isCoolDown = false, поэтому вызов продолжается, и состояние изменяется на true.

 Пока isCoolDown имеет значение true, все остальные вызовы игнорируются.

 Затем setTimeout устанавливает его в false после заданной задержки.
 
*/
function debounce(f, ms) {

	let isCooldown = false;

	return function () {
		if (isCooldown) return;

		f.apply(this, arguments);

		isCooldown = true;

		setTimeout(() => isCooldown = false, ms);
	};

}


/*
Тормозящий (throttling) декоратор

Создайте «тормозящий» декоратор throttle(f, ms), который возвращает обёртку,
 передавая вызов в f не более одного раза в ms миллисекунд. Те вызовы, которые попадают в период
  «торможения», игнорируются.

Отличие от debounce – если проигнорированный вызов является последним во время «задержки»,
 то он выполняется в конце.

Давайте рассмотрим реальное применение, чтобы лучше понять это требование и выяснить, откуда оно взято.

Например, мы хотим отслеживать движения мыши.

В браузере мы можем объявить функцию, которая будет запускаться при каждом движении указателя и
получать его местоположение. Во время активного использования мыши эта функция запускается очень
часто, это может происходить около 100 раз в секунду (каждые 10 мс).

Мы бы хотели обновлять информацию на странице при передвижениях.

…Но функция обновления update() слишком ресурсоёмкая, чтобы делать это при каждом микродвижении.
Да и нет смысла делать обновление чаще, чем один раз в 1000 мс.

Поэтому мы обернём вызов в декоратор: будем использовать throttle(update, 1000) как функцию,
которая будет запускаться при каждом перемещении указателя вместо оригинальной update(). Декоратор
будет вызываться часто, но передавать вызов в update() максимум раз в 1000 мс.

Визуально это будет выглядеть вот так:

Для первого движения указателя декорированный вариант сразу передаёт вызов в update. Это важно,
 т.к. пользователь сразу видит нашу реакцию на его перемещение.
Затем, когда указатель продолжает движение, в течение 1000 мс ничего не происходит. Декорированный
вариант игнорирует вызовы.
По истечению 1000 мс происходит ещё один вызов update с последними координатами.
Затем, наконец, указатель где-то останавливается. Декорированный вариант ждёт, пока не истечёт
1000 мс, и затем вызывает update с последними координатами. В итоге окончательные координаты
указателя тоже обработаны.
Пример кода:

function f(a) {
 console.log(a)
}

// f1000 передаёт вызовы f максимум раз в 1000 мс
let f1000 = throttle(f, 1000);

f1000(1); // показывает 1
f1000(2); // (ограничение, 1000 мс ещё нет)
f1000(3); // (ограничение, 1000 мс ещё нет)

// когда 1000 мс истекли ...
// ...выводим 3, промежуточное значение 2 было проигнорировано
P.S. Аргументы и контекст this, переданные в f1000, должны быть переданы в оригинальную f.
*/
/*
Вызов throttle(func, ms) возвращает wrapper.

1 Во время первого вызова обёртка просто вызывает func и устанавливает состояние задержки (isThrottled = true).
2 В этом состоянии все вызовы запоминаются в saveArgs / saveThis. Обратите внимание, что контекст и аргументы
одинаково важны и должны быть запомнены. Они нам нужны для того, чтобы воспроизвести вызов позднее.
3 … Затем по прошествии ms миллисекунд срабатывает setTimeout. Состояние задержки сбрасывается
(isThrottled = false). И если мы проигнорировали вызовы, то «обёртка» выполняется с последними
запомненными аргументами и контекстом.
На третьем шаге выполняется не func, а wrapper, потому что нам нужно не только выполнить func,
но и ещё раз установить состояние задержки и таймаут для его сброса.
*/
function throttle(func, ms) {

	let isThrottled = false,
		savedArgs,
		savedThis;

	function wrapper() {

		if (isThrottled) { // (2)
			savedArgs = arguments;
			savedThis = this;
			return;
		}

		func.apply(this, arguments); // (1)

		isThrottled = true;

		setTimeout(function () {
			isThrottled = false; // (3)
			if (savedArgs) {
				wrapper.apply(savedThis, savedArgs);
				savedArgs = savedThis = null;
			}
		}, ms);
	}

	return wrapper;
}

