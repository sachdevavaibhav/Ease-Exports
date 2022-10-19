import { Group } from "@mantine/core"
import { HeroImage } from "./HeroImage"
import { HeroTitle } from "./HeroTitle"

export function Hero() {
    return (
    <Group style={{margin: '8rem 5rem'}}>
        <HeroTitle/>
        <HeroImage/>
    </Group>
    )
}