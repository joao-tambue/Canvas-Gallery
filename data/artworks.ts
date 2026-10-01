import type { Artwork } from '@/types/artwork'

/**
 * The collection, deduplicated. The web version of this app held two identical
 * copies of this array (Viewport.tsx and the unused Canvas.tsx); this file is
 * now the only one.
 *
 * Canvas coordinates are preserved from the Figma layout so the composition
 * looks the same as the desktop design.
 */
export const artworks: Artwork[] = [
  {
    id: '1',
    title: 'Romantic Landscape Study',
    description:
      'A romantic landscape study featuring pastoral scenes and natural beauty. These artistic representations were popular among travelers documenting scenic vistas during their journeys.',
    period: '19th Century',
    location: 'European Landscape Archive',
    image: require('../assets/artworks/romantic-landscape-study.jpg'),
    x: 312,
    y: 132,
    width: 320.218,
    height: 254.694,
  },
  {
    id: '2',
    title: 'Archaeological Excavation',
    description:
      'Documentation of an archaeological excavation showing ancient structures and artifacts. These records were essential for understanding historical civilizations and their cultural practices.',
    period: '19th Century',
    location: 'Mediterranean Archaeological Archive',
    image: require('../assets/artworks/archaeological-excavation.jpg'),
    x: 1289,
    y: 132,
    width: 320,
    height: 392.982,
  },
  {
    id: '3',
    title: 'Geological Formation Study',
    description:
      'A detailed study of geological formations and mineral structures. These scientific illustrations contributed to the understanding of Earth sciences and geological processes.',
    period: '19th Century',
    location: 'Geological Survey Institute',
    image: require('../assets/artworks/geological-formation-study.jpg'),
    x: 1832,
    y: 388,
    width: 339.873,
    height: 339,
  },
  {
    id: '4',
    title: 'Natural History Specimens',
    description:
      'A scientific illustration featuring natural history specimens, likely shells or fossils. These detailed studies were fundamental to the development of natural sciences and classification systems.',
    period: '18th-19th Century',
    location: 'Natural History Collection',
    image: require('../assets/artworks/natural-history-specimens.jpg'),
    x: 122,
    y: 709,
    width: 380,
    height: 290.909,
  },
  {
    id: '5',
    title: 'Landscape with Cave Formation',
    description:
      'A romantic landscape featuring dramatic cave formations and natural scenery. This type of imagery was popular among travelers and naturalists documenting geological formations.',
    period: '19th Century',
    location: 'Geological Survey Archive',
    image: require('../assets/artworks/landscape-with-cave-formation.jpg'),
    x: 1175,
    y: 758,
    width: 359.606,
    height: 250,
  },
  {
    id: '6',
    title: 'Botanical Study',
    description:
      'A detailed botanical illustration showcasing plant specimens with scientific precision. These studies were essential for botanical research and the documentation of flora from various regions.',
    period: '18th-19th Century',
    location: 'Botanical Research Archive',
    image: require('../assets/artworks/botanical-study.jpg'),
    x: 709,
    y: 868,
    width: 349.345,
    height: 265,
  },
  {
    id: '7',
    title: 'Ancient Architecture Study',
    description:
      'Architectural documentation of ancient structures, providing insights into historical building techniques and cultural practices. These studies were vital for archaeological understanding.',
    period: '18th-19th Century',
    location: 'Architectural History Archive',
    image: require('../assets/artworks/ancient-architecture-study.jpg'),
    x: 1796,
    y: 883,
    width: 359.702,
    height: 279.323,
  },
  {
    id: '8',
    title: 'Scientific Botanical Illustration',
    description:
      'A precise botanical study featuring detailed plant anatomy and morphology. Such illustrations were crucial for scientific classification and botanical education during the Enlightenment period.',
    period: '18th-19th Century',
    location: 'Royal Botanical Society',
    image: require('../assets/artworks/scientific-botanical-illustration.jpg'),
    x: 1030,
    y: 1230,
    width: 289.438,
    height: 324.627,
  },
  {
    id: '9',
    title: 'Archaeological Site Documentation',
    description:
      'Early photographic documentation of an archaeological site, featuring ancient structures and excavations. These images were crucial for preserving knowledge of historical discoveries.',
    period: '19th Century',
    location: 'Archaeological Expedition Archive',
    image: require('../assets/artworks/archaeological-site-documentation.jpg'),
    x: 1518,
    y: 1272,
    width: 350.726,
    height: 239.937,
  },
  {
    id: '10',
    title: 'Classical Landscape Engraving',
    description:
      'A detailed engraving depicting a classical landscape with ancient architecture and figures. This type of artistic documentation was popular during the Grand Tour era, capturing the romantic ideal of classical antiquity.',
    period: '18th-19th Century',
    location: 'European Grand Tour Collection',
    image: require('../assets/artworks/classical-landscape-engraving.jpg'),
    x: 743,
    y: 343,
    width: 324.648,
    height: 266,
  },
  {
    id: '11',
    title: 'Historic City Panorama',
    description:
      'A panoramic view of a historic city, likely captured during the early days of urban documentation. These images served as important historical records of architectural development and urban planning.',
    period: '19th Century',
    location: 'European Urban Archive',
    image: require('../assets/artworks/historic-city-panorama.jpg'),
    x: 292,
    y: 1277,
    width: 330,
    height: 266.859,
  },
  {
    id: '12',
    title: 'Fortress and Cityscape',
    description:
      'A historical view of a fortified city or castle complex, showcasing medieval and renaissance military architecture. Such documentation was essential for military and historical studies.',
    period: '18th-19th Century',
    location: 'European Fortress Archive',
    image: require('../assets/artworks/fortress-and-cityscape.jpg'),
    x: 1900,
    y: 70,
    width: 350,
    height: 280,
  },
]
