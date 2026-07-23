import HeroHeader from '@/components/HeroHeader';
import { desktopBentoSlots } from '@/content/bento-slots';
import { headerPhotoPool, pinnedFirstRowPhoto } from '@/content/header-photos';
import { siteConfig } from '@/content/site.config';
import { assignHeroPhotos, dailyBentoSeed } from '@/lib/bento-assign';

// Desktop first-row tiles: slot 0 is panel-covered (no photo); slot 1 is row 1 / col 3.
const FIRST_ROW_VISIBLE_SLOT = 1;

export default function HeroHeaderServer() {
	const seed = dailyBentoSeed(siteConfig.communityName);
	const photos = assignHeroPhotos(headerPhotoPool, desktopBentoSlots, seed);

	if (pinnedFirstRowPhoto && photos.desktop[FIRST_ROW_VISIBLE_SLOT]) {
		photos.desktop[FIRST_ROW_VISIBLE_SLOT] = {
			...photos.desktop[FIRST_ROW_VISIBLE_SLOT],
			...pinnedFirstRowPhoto,
		};
	}

	return <HeroHeader photos={photos} />;
}
