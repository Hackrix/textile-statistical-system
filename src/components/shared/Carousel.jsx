import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

/**
 * Carousel component
 * - Full-width banner with fixed height (desktop h-[450px], mobile smaller)
 * - Background image per slide with dark gradient overlay
 * - Data-driven content: heading, description, CTAs, helper text
 * - Controls: prev/next, white arrows, semi-transparent bg
 * - Auto-slide with configurable interval, pause on hover, infinite loop
 * - Responsive: smaller text on mobile, stacked buttons
 */

const defaultSlides = [
	{
		id: 1,
		image:
			"https://images.unsplash.com/photo-1503342217505-b0a15cf70489?q=80&w=1920&auto=format&fit=crop",
		heading: "Digitize Textile Statistical Returns",
		description: "Fast, reliable submissions for entities across India.",
		primaryCta: "New Registration – Manual Entry",
		secondaryCta: "Register via Entity Locker",
		helper: "Takes less than 5 minutes to complete.",
	},
	{
		id: 2,
		image:
			"https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1920&auto=format&fit=crop",
		heading: "Built for Scale and Compliance",
		description: "Stay compliant with streamlined, paperless workflows.",
		primaryCta: "New Registration – Manual Entry",
		secondaryCta: "Register via Entity Locker",
		helper: "Support available 24x7 via Helpdesk.",
	},
	{
		id: 3,
		image:
			"https://images.unsplash.com/photo-1496715976403-7e36dc43f17b?q=80&w=1920&auto=format&fit=crop",
		heading: "Powering the Textile Ecosystem",
		description: "Secure, efficient, and transparent submissions.",
		primaryCta: "New Registration – Manual Entry",
		secondaryCta: "Register via Entity Locker",
		helper: "Your data is protected and encrypted.",
	},
];

const Arrow = ({ direction = "left", onClick }) => (
	<button
		type="button"
		onClick={onClick}
		aria-label={direction === "left" ? "Previous slide" : "Next slide"}
		className="absolute top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 active:bg-white/40 text-white rounded-full p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
		style={direction === "left" ? { left: "0.75rem" } : { right: "0.75rem" }}
	>
		{/* Arrow Icon */}
		{direction === "left" ? (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
				<path d="M15.75 19.5 8.25 12l7.5-7.5" />
			</svg>
		) : (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
				<path d="m8.25 4.5 7.5 7.5-7.5 7.5" />
			</svg>
		)}
	</button>
);

const Dot = ({ active, onClick }) => (
	<button
		type="button"
		aria-label="Go to slide"
		onClick={onClick}
		className={
			"h-2 w-2 rounded-full transition-colors " + (active ? "bg-white" : "bg-white/50 hover:bg-white/70")
		}
	/>
);

const Carousel = ({
	slides = defaultSlides,
	interval = 5000,
	autoPlay = true,
	pauseOnHover = true,
}) => {
	const [index, setIndex] = useState(0);
	const [isHovered, setIsHovered] = useState(false);
	const count = useMemo(() => slides.length, [slides]);
	const timerRef = useRef(null);

	const next = () => setIndex((i) => (i + 1) % count);
	const prev = () => setIndex((i) => (i - 1 + count) % count);

	// Auto-play handler
	useEffect(() => {
		if (!autoPlay || count <= 1) return;
		if (pauseOnHover && isHovered) return;
		timerRef.current && clearInterval(timerRef.current);
		timerRef.current = setInterval(next, interval);
		return () => timerRef.current && clearInterval(timerRef.current);
	}, [autoPlay, pauseOnHover, isHovered, interval, count]);

	if (!slides || slides.length === 0) return null;

	const activeSlide = slides[index];

	return (
		<section
			aria-roledescription="carousel"
			className="relative w-full h-[300px] sm:h-[380px] lg:h-[450px] overflow-hidden"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{/* Background image with fade transition */}
			<div className="absolute inset-0">
				{slides.map((s, i) => (
					<div
						key={s.id ?? i}
						className={
							"absolute inset-0 bg-center bg-cover transition-opacity duration-700 ease-in-out " +
							(i === index ? "opacity-100" : "opacity-0")
						}
						style={{ backgroundImage: `url(${s.image})` }}
						role={i === index ? "img" : undefined}
						aria-label={i === index ? s.heading : undefined}
					/>
				))}
				{/* Dark gradient overlay for readability */}
				<div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
			</div>

			{/* Content */}
			<div className="relative h-full">
				<div className="mx-auto max-w-7xl h-full px-4 sm:px-6 lg:px-8 flex items-center">
					<div className="max-w-2xl text-white">
						<h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
							{activeSlide.heading}
						</h2>
						{activeSlide.description && (
							<p className="mt-2 text-sm sm:text-base text-white/90">
								{activeSlide.description}
							</p>
						)}

						{/* CTAs */}
						<div className="mt-4 flex flex-col sm:flex-row gap-3">
							<Link
								to="/registeration"
								className="inline-flex items-center justify-center rounded px-4 py-2 text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
							>
								{activeSlide.primaryCta}
							</Link>
							<a
								href="#"
								className="inline-flex items-center justify-center rounded px-4 py-2 text-sm font-medium border border-white text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
							>
								{activeSlide.secondaryCta}
							</a>
						</div>

						{activeSlide.helper && (
							<p className="mt-2 text-xs text-white/80">{activeSlide.helper}</p>
						)}
					</div>
				</div>

				{/* Controls */}
				{count > 1 && (
					<>
						<Arrow direction="left" onClick={prev} />
						<Arrow direction="right" onClick={next} />
					</>
				)}

				{/* Dots */}
				{count > 1 && (
					<div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2">
						{slides.map((_, i) => (
							<Dot key={i} active={i === index} onClick={() => setIndex(i)} />
						))}
					</div>
				)}
			</div>
		</section>
	);
};

export default Carousel;

