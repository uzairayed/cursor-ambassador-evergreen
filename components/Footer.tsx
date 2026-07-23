'use client';

import React from 'react';
import Image from 'next/image';
import { useI18n } from '@/lib/i18n';
import { siteConfig } from '@/content/site.config';
import { upcomingEvents as fallbackUpcoming } from '@/content/events';
import { CursorEvent } from '@/lib/types';
// import Partners from '@/components/Partners'; // restore when hosting partners are ready
import { Button, TextLink } from '@/components/ui';
import { MarketingColumn, MarketingGrid } from '@/components/layout/MarketingGrid';

interface FooterProps {
	nextEvent?: CursorEvent;
}

const Footer: React.FC<FooterProps> = ({ nextEvent = fallbackUpcoming[0] }) => {
	const { t } = useI18n();
	const joinUrl = nextEvent?.lumaUrl ?? siteConfig.lumaUrl;

	return (
		<footer className="border-t border-cursor-border py-10">
			<MarketingGrid>
				<MarketingColumn width="full">
					{/* Hosting partners — restore when ready: <Partners /> */}

					<div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
						<div>
							<div className="mb-3 flex items-center gap-2">
								<Image
									src="/cursor-logo.svg"
									alt="Cursor"
									width={90}
									height={24}
									className="cursor-wordmark h-5 w-auto"
								/>
								<span className="text-sm text-cursor-text-muted">{siteConfig.communityNameLocal}</span>
							</div>
							<div className="flex flex-wrap gap-x-5 gap-y-2">
								<TextLink href={siteConfig.lumaUrl} external muted>
									{t('footer.allEvents')}
								</TextLink>
								<TextLink href={siteConfig.cursorCommunityUrl} external muted>
									{t('footer.community')}
								</TextLink>
								<TextLink href="https://x.com/cursor_ai" external muted>
									{t('footer.followUs')}
								</TextLink>
							</div>
							<p className="mt-4 text-xs text-cursor-text-faint">{siteConfig.footerTagline || t('footer.madeWith')}</p>
						</div>

						<Button href={joinUrl} external variant="primary" size="md">
							{t('footer.joinNext')}
							<span aria-hidden="true">↗</span>
						</Button>
					</div>
				</MarketingColumn>
			</MarketingGrid>
		</footer>
	);
};

export default Footer;
