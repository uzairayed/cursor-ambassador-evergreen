'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { siteConfig } from '@/content/site.config';
import { upcomingEvents } from '@/content/events';
import Partners from '@/components/Partners';
import { Button, TextLink } from '@/components/ui';

const Footer: React.FC = () => {
	const { t } = useI18n();
	const nextEvent = upcomingEvents[0];
	const joinUrl = nextEvent?.lumaUrl ?? siteConfig.lumaUrl;

	return (
		<motion.footer
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			viewport={{ once: true, margin: '-50px' }}
			transition={{ duration: 0.5 }}
			className="mt-24 pt-8 border-t border-cursor-border"
		>
			<Partners />

			<div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start">
				<div>
					<div className="flex items-center gap-2 mb-2">
						<Image src="/cursor-logo.svg" alt="Cursor" width={90} height={24} className="h-5 w-auto" />
						<span className="text-cursor-text-muted text-sm">{siteConfig.communityNameLocal}</span>
					</div>
					<p className="text-cursor-text-muted text-sm leading-relaxed">
						{siteConfig.footerTagline || t('footer.madeWith')}
					</p>
				</div>

				<div className="flex flex-col gap-2.5">
					<TextLink href={siteConfig.lumaUrl} external muted caret={false}>
						{t('footer.allEvents')}
						<ExternalLink className="w-3 h-3" />
					</TextLink>
					<TextLink href={siteConfig.cursorCommunityUrl} external muted caret={false}>
						{t('footer.community')}
						<ExternalLink className="w-3 h-3" />
					</TextLink>
					<TextLink href="https://x.com/cursor_ai" external muted caret={false}>
						{t('footer.followUs')}
						<ExternalLink className="w-3 h-3" />
					</TextLink>
				</div>

				<div className="md:text-right">
					<Button href={joinUrl} external variant="primary" size="md">
						{t('footer.joinNext')}
					</Button>
				</div>
			</div>

			<p className="text-cursor-text-faint text-xs text-center mt-10 pb-6">
				{siteConfig.footerTagline || t('footer.madeWith')}
			</p>
		</motion.footer>
	);
};

export default Footer;
