function modalImg(elem, startModal) {
	const modal = document.querySelector('.modal-img');

	if (elem && elem.classList.contains(startModal)) {
		const img = elem.parentElement.nextElementSibling.cloneNode(true);
		modal.firstElementChild.append(img);
		modal.classList.add(`_show`, `_fade`);
		document.querySelector('body').classList.toggle(`_lock`);

	} else if (elem && (!elem.dataset.data || elem.classList.contains(`modal-img__close`))) {
		modal.classList.remove(`_show`, `_fade`);
		document.querySelector('body').classList.remove(`_lock`);
		modal.firstElementChild.lastElementChild.remove();
	}
}