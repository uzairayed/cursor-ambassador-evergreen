'use client';

import React from 'react';
import BentoGrid from '@/components/BentoGrid';
import { Button } from '@/components/ui';
import { MarketingColumn, MarketingGrid } from '@/components/layout/MarketingGrid';
import { siteConfig } from '@/content/site.config';
import { useI18n } from '@/lib/i18n';
import { HeroBentoPhotos } from '@/lib/types';

type HeroHeaderProps = {
	photos: HeroBentoPhotos;
};

const HeroHeader: React.FC<HeroHeaderProps> = ({ photos }) => {
	const { t } = useI18n();

	return (
		<header className="cursor-on-image relative h-[calc(100svh-52px)] min-h-[620px] overflow-hidden border-t border-cursor-border">
			<div className="absolute inset-0">
				<BentoGrid
					desktopPhotos={photos.desktop}
					mobilePhotos={photos.mobile}
					cols={4}
					rows={4}
					mobileCols={2}
					mobileRows={4}
					gapClassName="gap-px"
				/>
			</div>
			<div
				className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.78)_0%,rgba(0,0,0,0.2)_52%,rgba(0,0,0,0.12)_100%)]"
				aria-hidden="true"
			/>

			<MarketingGrid className="pointer-events-none relative z-10 h-full items-end pb-10 md:pb-14">
				<MarketingColumn width="wide" className="pointer-events-auto">
					<p className="cursor-eyebrow mb-4">{t('home.heroEyebrow', { city: siteConfig.city })}</p>
					<h1 className="cursor-display max-w-[900px] text-cursor-text">{t('home.heroHeading')}</h1>
					<p className="mt-5 max-w-[620px] text-lg leading-7 text-cursor-text-secondary">{t('home.heroDescription')}</p>
					<div className="mt-7 flex flex-wrap gap-3">
						<Button href="#events" variant="primary" size="md">
							{t('home.exploreEvents')}
							<span aria-hidden="true">→</span>
						</Button>
						<Button href={siteConfig.lumaUrl} external variant="secondary" size="md">
							{t('home.joinCommunity')}
							<span aria-hidden="true">↗</span>
						</Button>
					</div>
				</MarketingColumn>
			</MarketingGrid>
		</header>
	);
};

export default HeroHeader;
