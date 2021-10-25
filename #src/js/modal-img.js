function modalShow(target, parent) {

	const img = target.closest(parent).querySelector(`img`).cloneNode(true),
		modal = document.querySelector('.modal-img'),
		body = document.querySelector('body');
	modal.firstElementChild.append(img);
	modal.classList.add(`_show`, `_fade`);
	body.classList.toggle(`_lock`);

	modal.addEventListener('click', (e) => {
		const target = e.target;
		if (target && (target.getAttribute('data-data') !== `` || target.classList.contains(`modal-img__close`))) {
			modal.classList.remove(`_show`, `_fade`);
			body.classList.remove(`_lock`);
			img.remove();
		}
	})
}