import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';

export default function Header() {
	return (
		<div className="mt-6 pb-20">
			<DesktopNav />
			<MobileNav />
		</div>
	);
}
