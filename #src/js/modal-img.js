function modalShow(target, img) {

	const modal = document.querySelector('.modal-img'),
		body = document.querySelector('body');
	modal.firstElementChild.append(img);
	modal.classList.add(`_show`, `_fade`);
	body.classList.toggle(`_lock`);

	modal.addEventListener('click', (e) => {
		const target = e.target;

		if (target && !target.hasAttribute('data-data') && !target.classList.contains(`modal-img__cart`)) {
			modal.classList.remove(`_show`, `_fade`);
			body.classList.remove(`_lock`);
			img.remove();
			modalTarget = ``;
		}
	})
}