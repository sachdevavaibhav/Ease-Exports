import { MantineProvider, Group} from '@mantine/core';
import {Navbar} from './Navbar/Navbar'
import {HeroTitle} from './Hero/HeroTitle'
import {HeroImage} from './Hero/HeroImage'

export default function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Navbar/>
      <Group style={{margin: '8rem 5rem'}}>
        <HeroTitle/>
        <HeroImage/>
      </Group>
    </MantineProvider>
  );
}