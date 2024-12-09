import { useEffect, useState } from 'react';
import { Flex, Text } from '@chakra-ui/react';

const TimeUnit = ({ value, label }: { value: number; label: string }) => (
	<Flex flexDirection="column" gap={1} alignItems="center">
		<Text variant="simple" color="white" fontSize="4xl">
			{String(value).padStart(2, '0')}
		</Text>
		<Text variant="simple" fontWeight="semibold" fontSize="xs" color="#747474">
			{label}
		</Text>
	</Flex>
);

const calculateTimeLeft = (targetDate: number) => {
	const now = new Date().getTime();
	const distance = targetDate - now;

	if (distance <= 0) {
		return { days: 0, hours: 0, minutes: 0, seconds: 0 };
	}

	return {
		days: Math.floor(distance / (1000 * 60 * 60 * 24)),
		hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
		minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
		seconds: Math.floor((distance % (1000 * 60)) / 1000),
	};
};

const CountdownTimer = ({ targetDate }: { targetDate: number }) => {
	const [timeLeft, setTimeLeft] = useState<ReturnType<typeof calculateTimeLeft> | null>(null);

	// Wait until the component is mounted to set the initial state
	useEffect(() => {
		const calculateAndSetTimeLeft = () => {
			setTimeLeft(calculateTimeLeft(targetDate));
		};

		// Set initial value
		calculateAndSetTimeLeft();

		// Update every second
		const interval = setInterval(() => {
			calculateAndSetTimeLeft();
		}, 1000);

		return () => clearInterval(interval);
	}, [targetDate]);

	// Prevent server-side rendering of the countdown
	if (!timeLeft) return null;

	return (
		<div className="countdown-timer text-center">
			<Text variant="simple" color="#747474" mt={2} fontSize="md" fontWeight="semibold">
				SALE ENDS IN
			</Text>
			<Flex alignItems="start" justifyContent="center" gap={2} fontSize="4xl" color="#565656">
				<TimeUnit value={timeLeft.days} label="Days" />
				<Text color="#565656" variant="simple" fontSize="4xl">
					:
				</Text>
				<TimeUnit value={timeLeft.hours} label="Hours" />
				<Text color="#565656" variant="simple" fontSize="4xl">
					:
				</Text>
				<TimeUnit value={timeLeft.minutes} label="Minutes" />
				<Text color="#565656" variant="simple" fontSize="4xl">
					:
				</Text>
				<TimeUnit value={timeLeft.seconds} label="Seconds" />
			</Flex>
		</div>
	);
};

export default CountdownTimer;
