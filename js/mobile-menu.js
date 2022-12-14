(() => {
	const mobileMenu = document.querySelector('[js-menu-container]');
	const openMenuBtn = document.querySelector('[js-open-menu]');
	const closeMenuBtn = document.querySelector('[js-close-menu]');
	const mobileMenuBackdrop = document.querySelector('[js-menu-backdrop]');

	const toggleMenu = () => {
		const isMenuOpen =
			openMenuBtn.getAttribute('aria-expanded') === 'true' || false;
		openMenuBtn.setAttribute('aria-expanded', !isMenuOpen);
		mobileMenu.classList.toggle('is-open');
		mobileMenuBackdrop.classList.toggle('is-shown');

		const scrollLockMethod = !isMenuOpen
			? 'disableBodyScroll'
			: 'enableBodyScroll';
		bodyScrollLock[scrollLockMethod](document.body);
	};

	openMenuBtn.addEventListener('click', toggleMenu);
	closeMenuBtn.addEventListener('click', toggleMenu);

	// Close the mobile menu on wider screens if the device orientation changes
	window.matchMedia('(min-width: 768px)').addEventListener('change', e => {
		if (!e.matches) return;
		mobileMenu.classList.remove('is-open');
		mobileMenuBackdrop.classList.remove('is-shown');
		openMenuBtn.setAttribute('aria-expanded', false);
		bodyScrollLock.enableBodyScroll(document.body);
	});

	// Temporary solution to close menu when a button or link is clicked
	document.querySelectorAll('[js-close-on-click]').forEach(item => {
		item.addEventListener('click', event => {
			mobileMenu.classList.remove('is-open');
			mobileMenuBackdrop.classList.remove('is-shown');
			openMenuBtn.setAttribute('aria-expanded', false);
			bodyScrollLock.enableBodyScroll(document.body);
		})
	})
})();