import { useEffect, useRef, useState, useCallback } from 'react';

type NihBuatJajanPopupProps = {
	slug: string;
};

export const NihBuatJajanPopup = ({ slug }: NihBuatJajanPopupProps) => {
	const [visible, setVisible] = useState(false);
	const widgetContainerRef = useRef<HTMLDivElement>(null);
	const scriptLoaded = useRef(false);
	const triggered = useRef(false);

	const storageKey = `nihbuatjajan_shown_${slug}`;

	const loadWidget = useCallback(() => {
		if (scriptLoaded.current || !widgetContainerRef.current) return;
		scriptLoaded.current = true;

		const script = document.createElement('script');
		script.src = 'https://www.nihbuatjajan.com/javascripts/widget.prod.min.js?u=mdrdani';
		script.setAttribute('data-name', 'NBJ-Widget');
		script.setAttribute('data-cfasync', 'false');
		script.setAttribute('data-id', 'mdrdani');
		script.setAttribute('data-domain', 'https://www.nihbuatjajan.com');
		script.setAttribute('data-description', '');
		script.setAttribute('data-message', '');
		script.setAttribute('data-color', '#FF813F');
		script.setAttribute('data-position', 'Right');
		script.setAttribute('data-x_margin', '18');
		script.setAttribute('data-y_margin', '18');
		widgetContainerRef.current.appendChild(script);
	}, []);

	useEffect(() => {
		try {
			if (localStorage.getItem(storageKey)) return;
		} catch {
			// localStorage unavailable, continue
		}

		// Random scroll threshold between 30% and 70% of the page
		const threshold = 0.3 + Math.random() * 0.4;

		const handleScroll = () => {
			if (triggered.current) return;

			const scrolled = window.scrollY + window.innerHeight;
			const total = document.documentElement.scrollHeight;
			if (scrolled / total >= threshold) {
				triggered.current = true;
				setVisible(true);
				loadWidget();
				try {
					localStorage.setItem(storageKey, '1');
				} catch {
					// ignore
				}
			}
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	}, [storageKey, loadWidget]);

	const handleDismiss = () => {
		setVisible(false);
	};

	return (
		<>
			{visible && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
					<div className="relative mx-4 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-neutral-900">
						<button
							onClick={handleDismiss}
							className="absolute right-3 top-3 rounded-full p-1 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
							aria-label="Tutup"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fillRule="evenodd"
									d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
									clipRule="evenodd"
								/>
							</svg>
						</button>
						<div className="text-center">
							<p className="mb-2 text-2xl">☕</p>
							<h3 className="mb-2 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
								Suka dengan artikel ini?
							</h3>
							<p className="mb-4 text-sm text-neutral-600 dark:text-neutral-400">
								Kalau tulisan ini bermanfaat, belikan saya kopi sebagai dukungan ya!
							</p>
							<a
								href="https://www.nihbuatjajan.com/mdrdani"
								target="_blank"
								rel="noopener noreferrer"
								className="inline-block rounded-full px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:opacity-90"
								style={{ backgroundColor: '#FF813F' }}
							>
								Nih Buat Jajan ☕
							</a>
						</div>
						{/* Hidden container for the widget script */}
						<div ref={widgetContainerRef} className="hidden" />
					</div>
				</div>
			)}
		</>
	);
};
