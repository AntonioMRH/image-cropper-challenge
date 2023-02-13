export const getSliderBgSize = (zoom: number) => {
	return { backgroundSize: `${(zoom * 100) / 100}% 100%` }
}
