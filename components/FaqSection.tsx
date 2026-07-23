'use client';

import React, { useMemo, useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { faqs } from '@/content/faqs';
import { useI18n } from '@/lib/i18n';

const FaqSection: React.FC = () => {
	const { t } = useI18n();
	const [query, setQuery] = useState('');

	const filtered = useMemo(() => {
		const normalized = query.trim().toLowerCase();
		if (!normalized) return faqs;

		return faqs.filter((item) => {
			const haystack = `${item.question} ${item.answer}`.toLowerCase();
			return haystack.includes(normalized);
		});
	}, [query]);

	if (faqs.length === 0) {
		return null;
	}

	return (
		<section className="mb-8">
			<p className="cursor-eyebrow mb-2">{t('faq.eyebrow')}</p>
			<h1 className="cursor-section-title mb-6 text-cursor-text">{t('faq.heading')}</h1>

			<label className="relative mb-8 block">
				<span className="sr-only">{t('faq.searchLabel')}</span>
				<Search
					aria-hidden="true"
					className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-cursor-text-muted"
				/>
				<input
					type="search"
					value={query}
					onChange={(event) => setQuery(event.target.value)}
					placeholder={t('faq.searchPlaceholder')}
					className="w-full rounded-sm border border-cursor-border bg-cursor-surface py-2.5 pr-3 pl-9 text-sm text-cursor-text outline-none transition-colors duration-150 placeholder:text-cursor-text-faint focus:border-cursor-border-emphasis"
				/>
			</label>

			{filtered.length === 0 ? (
				<p className="text-sm text-cursor-text-muted">{t('faq.noResults')}</p>
			) : (
				<div className="divide-y divide-cursor-border rounded-sm border border-cursor-border bg-cursor-surface">
					{filtered.map((item) => (
						<details key={item.question} className="group" {...(query.trim() ? { open: true } : {})}>
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
			)}
		</section>
	);
};

export default FaqSection;
