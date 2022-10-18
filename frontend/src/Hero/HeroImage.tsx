import { Image } from '@mantine/core';
import heroImage from './hero.jpg'

export function HeroImage() {
    return (
        <div style={{ width: 600 }}>
          <Image
            radius="md"
            src={heroImage}
            alt="Random unsplash image"
            withPlaceholder
          />
        </div>
      );
}