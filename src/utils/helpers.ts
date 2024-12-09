export const formatNumber = (num: number) => {
	return new Intl.NumberFormat('en-IN').format(num); // 'en-IN' for Indian format or 'en-US' for Western format
};
