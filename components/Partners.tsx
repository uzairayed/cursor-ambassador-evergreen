'use client';

import React from 'react';
import Image from 'next/image';
import { partners } from '@/content/partners';
import { useI18n } from '@/lib/i18n';

const Partners: React.FC = () => {
	const { t } = useI18n();

	if (partners.length === 0) {
		return null;
	}

	return (
		<div className="mb-8 border-b border-cursor-border pb-8">
			<h3 className="cursor-eyebrow mb-4">{t('footer.hostingPartners')}</h3>
			<div className="flex flex-wrap gap-3">
				{partners.map((partner) => (
					<a
						key={partner.name}
						href={partner.url}
						target="_blank"
						rel="noopener noreferrer"
						className="group flex min-w-[160px] items-center gap-3 rounded-sm border border-cursor-border bg-cursor-surface p-2 transition-colors duration-150 hover:bg-cursor-surface-raised hover:border-cursor-border-emphasis"
					>
						<div
							className="h-9 w-20 shrink-0 overflow-hidden rounded-sm px-2 py-1.5"
							style={{ backgroundColor: partner.logoBg ?? '#ffffff' }}
						>
							<div className="relative h-full w-full">
								<Image src={partner.logo} alt={partner.name} fill className="object-contain" sizes="80px" />
							</div>
						</div>
						<span className="text-xs text-cursor-text-muted">{partner.name}</span>
					</a>
				))}
			</div>
		</div>
	);
};

export default Partners;
