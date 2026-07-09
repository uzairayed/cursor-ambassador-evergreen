'use client';

import React from 'react';
import { motion } from 'framer-motion';
import BentoGrid from '@/components/BentoGrid';
import { HeroBentoPhotos } from '@/lib/types';

type HeroHeaderProps = {
	photos: HeroBentoPhotos;
};

const HeroHeader: React.FC<HeroHeaderProps> = ({ photos }) => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.6, delay: 0.2 }}
			className="relative h-[calc(100svh-56px)] border-t border-cursor-border overflow-hidden"
			style={{
				maskImage: 'linear-gradient(to bottom, black 85%, transparent)',
				WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent)',
			}}
		>
			<BentoGrid
				desktopPhotos={photos.desktop}
				mobilePhotos={photos.mobile}
				cols={4}
				rows={4}
				mobileCols={2}
				mobileRows={4}
			/>
		</motion.div>
	);
};

export default HeroHeader;
