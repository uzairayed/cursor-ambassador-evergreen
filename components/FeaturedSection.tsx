'use client';

import React from 'react';
import { featuredResource } from '@/content/featured';
import { useI18n } from '@/lib/i18n';
import { Button, cardInteractive } from '@/components/ui';

const FeaturedSection: React.FC = () => {
	const { t } = useI18n();

	return (
		<section className="mb-20">
			<div className={`${cardInteractive} p-6 group`}>
				<p className="cursor-eyebrow mb-4">{t('home.featured')}</p>

				<h2 className="cursor-section-title mb-2 text-cursor-text">{featuredResource.title}</h2>
				<p className="text-cursor-text-muted leading-relaxed mb-6">
					{featuredResource.description || t('featured.defaultDescription')}
				</p>

				<Button href={featuredResource.href} variant="primary" size="md">
					{featuredResource.ctaLabel || t('home.viewSlides')}
					<span aria-hidden="true">→</span>
				</Button>
			</div>
		</section>
	);
};

export default FeaturedSection;
