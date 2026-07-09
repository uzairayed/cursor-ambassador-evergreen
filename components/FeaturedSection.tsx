'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { featuredResource } from '@/content/featured';
import { useI18n } from '@/lib/i18n';
import { Button, cardInteractive } from '@/components/ui';

const FeaturedSection: React.FC = () => {
	const { t } = useI18n();

	return (
		<motion.section
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.2 }}
			className="mb-16"
		>
			<div className={`${cardInteractive} p-6 group`}>
				<p className="text-xs uppercase tracking-wider text-cursor-text-muted mb-4">{t('home.featured')}</p>

				<h2 className="text-3xl md:text-4xl font-normal tracking-tight text-cursor-text mb-1">
					{featuredResource.title}
				</h2>
				<p className="text-cursor-text-muted leading-relaxed mb-6">
					{featuredResource.description || t('featured.defaultDescription')}
				</p>

				<Button href={featuredResource.href} variant="primary" size="md">
					{featuredResource.ctaLabel || t('home.viewSlides')}
					<span aria-hidden="true">→</span>
				</Button>
			</div>
		</motion.section>
	);
};

export default FeaturedSection;
