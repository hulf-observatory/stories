import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import FilterBubbles from '../components/ui/FilterBubbles.jsx';
import ExpandableCard from '../components/ui/ExpandableCard.jsx';
import useDocumentTitle from '../lib/useDocumentTitle';

// The theme vocabulary shared with the tools site; only the themes present in CARDS are shown.
const ALL_FILTERS = [
  { key: 'ENVIRONMENTAL IMPACT', label: 'Environmental Impact' },
  { key: 'URBAN HERITAGE AND ARCHIVE', label: 'Urban Heritage & Archive' },
  { key: 'LAND USE AND LAND COVER', label: 'Land Use & Land Cover' },
  { key: 'WATER', label: 'Water' },
  { key: 'ACCESSIBILITY', label: 'Accessibility & Mobility' },
  { key: 'FLOODS', label: 'Floods' },
  { key: 'TERRAIN', label: 'Terrain' },
  { key: 'WEATHER', label: 'Weather' },
  { key: 'DEMOGRAPHICS', label: 'Demographics' },
  { key: 'GOVERNANCE', label: 'Governance' },
  { key: 'ECONOMIC HISTORY', label: 'Economic History' },
];

const CARDS = [
  {
    themes: ['WATER'],
    themeLabel: 'WATER',
    title: 'Too risky to fill, now too dry to supply',
    href: `${import.meta.env.BASE_URL}singur-manjira/`,
    description: 'Two dams give Hyderabad a fifth of its water. In 2025, engineers warned that one of them could break, so it was capped and then drawn down for repairs. Then came a dry El Niño year.',
  },
  {
    themes: ['ENVIRONMENTAL IMPACT'],
    themeLabel: 'ENVIRONMENTAL IMPACT',
    title: 'Kancha Gachibowli Forest Change Analysis',
    link: '/kgf-change-analysis',
    description: 'This analysis focuses on green cover loss (approx. 102 Acres) and land area disturbed (approx. 115 Acres) in Kancha Gachibowli between March and April 2025, based on Sentinel-2 imagery.',
  },
  {
    themes: ['URBAN HERITAGE AND ARCHIVE', 'WATER'],
    themeLabel: 'URBAN HERITAGE & ARCHIVE, WATER',
    title: "Hyderabad's forgotten waterscapes",
    link: '/hyderabad-waterscapes',
    description: 'Follow the drainage networks and archival maps to see how rainfall flows across contour lines, linking catchments to both existing lakes and the old tanks that once held water.',
  },
  {
    themes: ['DEMOGRAPHICS'],
    themeLabel: 'DEMOGRAPHICS',
    title: 'GHMC Ward-Level Census Data, 2011',
    link: '/ghmc-wards-census',
    description: 'Explore the Primary Census Abstract, Household Characteristics, and Housing Conditions from the 2011 Census of India.',
  },
  {
    themes: ['LAND USE AND LAND COVER'],
    themeLabel: 'LAND USE & COVER',
    title: 'Proposed Land Use 2031',
    comingSoon: true,
    description: 'Discover how the 2031 Master Plan envisions the city\'s future by exploring the proposed land use map, shown here as a layer over the current basemaps.',
  },
  {
    themes: ['LAND USE AND LAND COVER'],
    themeLabel: 'LAND USE & COVER',
    title: 'Built-up Area Growth (1990–2020)',
    comingSoon: true,
    description: 'Tracks the spatial expansion of Hyderabad over three decades.',
  },
  {
    themes: ['WATER'],
    themeLabel: 'WATER',
    title: 'Water Supply Timings and Inequality',
    comingSoon: true,
    description: 'Maps disparities in water access and timing across neighborhoods.',
  },
  {
    themes: ['GOVERNANCE'],
    themeLabel: 'GOVERNANCE',
    title: "Changes in Hyderabad's Administrative Boundaries",
    comingSoon: true,
    description: 'Shows how city boundaries have shifted over time.',
  },
  {
    themes: ['ECONOMIC HISTORY'],
    themeLabel: 'ECONOMIC HISTORY',
    title: 'Industrial Timeline of Hyderabad (1817–2010)',
    comingSoon: true,
    description: 'A historical overview of industrial development in the city.',
  },
];

const PRESENT = new Set(CARDS.flatMap((c) => c.themes));
const FILTERS = [{ key: 'all', label: 'All Themes' }, ...ALL_FILTERS.filter((f) => PRESENT.has(f.key))];

export default function Stories() {
  useDocumentTitle('Stories');
  const [selected, setSelected] = useState(new Set(['all']));

  const toggle = (key) => {
    if (key === 'all') { setSelected(new Set(['all'])); return; }
    setSelected((prev) => {
      const next = new Set(prev);
      next.delete('all');
      if (next.has(key)) {
        next.delete(key);
        if (next.size === 0) next.add('all');
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const shown = useMemo(() => {
    if (selected.has('all')) return CARDS;
    return CARDS.filter((c) => c.themes.some((t) => selected.has(t)));
  }, [selected]);

  return (
    <main className="content-main">
      <div className="page-intro">
        <h1>Stories</h1>
        <p>Stories and datasets on Hyderabad's terrain, water, land and people: filter by theme and click on each card to read more.</p>
      </div>

      <FilterBubbles filters={FILTERS} selected={selected} onSelect={toggle} />

      <div className="cards-grid">
        {shown.map((card) => (
          <ExpandableCard
            key={card.title}
            theme={card.themeLabel}
            title={card.title}
            comingSoon={card.comingSoon}
          >
            <p>{card.description}</p>
            {!card.comingSoon && (
              <p style={{ marginTop: 16 }}>
                {card.href ? (
                  <a href={card.href} style={{ fontWeight: 500 }}>Click here to explore &rarr;</a>
                ) : (
                  <Link to={card.link} style={{ fontWeight: 500 }}>
                    Click here to explore &rarr;
                  </Link>
                )}
              </p>
            )}
          </ExpandableCard>
        ))}
      </div>
    </main>
  );
}
