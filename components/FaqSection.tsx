'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';
import { faqs } from '@/content/faqs';
import { useI18n } from '@/lib/i18n';

const FaqSection: React.FC = () => {
	const { t } = useI18n();

	if (faqs.length === 0) {
		return null;
	}

	return (
		<section className="mb-8">
			<p className="cursor-eyebrow mb-2">{t('faq.eyebrow')}</p>
			<h1 className="cursor-section-title mb-8 text-cursor-text">{t('faq.heading')}</h1>

			<div className="divide-y divide-cursor-border rounded-sm border border-cursor-border bg-cursor-surface">
				{faqs.map((item) => (
					<details key={item.question} className="group">
						<summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left text-base text-cursor-text transition-colors duration-150 hover:bg-cursor-overlay md:px-6 [&::-webkit-details-marker]:hidden">
							<span className="font-medium leading-snug">{item.question}</span>
							<ChevronDown
								aria-hidden="true"
								className="h-4 w-4 shrink-0 text-cursor-text-muted transition-transform duration-150 group-open:rotate-180"
							/>
						</summary>
						<div className="px-5 pb-5 text-sm leading-relaxed text-cursor-text-muted md:px-6">
							{item.answer}
						</div>
					</details>
				))}
			</div>
		</section>
	);
};

export default FaqSection;
