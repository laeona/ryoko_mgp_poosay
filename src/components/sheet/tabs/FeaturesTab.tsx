import { useMemo, useState } from 'react';
import { useCharacterStore } from '../../../store/characterStore';
import { getRace } from '../../../data/races';
import { getClass } from '../../../data/classes';
import { getFeat } from '../../../data/feats';

interface Props {
  characterId: string;
}

interface FeatureEntry {
  name: string;
  description: string;
  source: string;
  category: 'Racial' | 'Class' | 'Subclass' | 'Background' | 'Feat';
  level?: number;
}

export default function FeaturesTab({ characterId }: Props) {
  const character = useCharacterStore((s) =>
    s.characters.find((c) => c.id === characterId)
  );
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<
    'all' | FeatureEntry['category']
  >('all');

  const features = useMemo<FeatureEntry[]>(() => {
    if (!character) return [];
    const list: FeatureEntry[] = [];

    // ---- Racial Traits ----
    const race = getRace(character.race.name);
    if (race) {
      for (const t of race.traits) {
        list.push({
          name: t.name,
          description: t.description,
          source: race.name,
          category: 'Racial',
        });
      }
      if (character.race.subrace && race.subraces) {
        const sub = race.subraces.find(
          (s) => s.name === character.race.subrace
        );
        if (sub) {
          for (const t of sub.traits) {
            list.push({
              name: t.name,
              description: t.description,
              source: `${race.name} (${sub.name})`,
              category: 'Racial',
            });
          }
        }
      }
    }

    // ---- Class + Subclass Features ----
    for (const cl of character.classes) {
      const cls = getClass(cl.className);
      if (!cls) continue;

      for (const f of cls.features) {
        if (f.level > cl.level) continue;
        list.push({
          name: f.name,
          description: f.description,
          source: `${cls.name} ${cl.level}`,
          category: 'Class',
          level: f.level,
        });
      }

      if (cl.subclass) {
        const sub = cls.subclasses.find((s) => s.name === cl.subclass);
        if (sub) {
          for (const f of sub.features) {
            if (f.level > cl.level) continue;
            list.push({
              name: f.name,
              description: f.description,
              source: `${sub.name}`,
              category: 'Subclass',
              level: f.level,
            });
          }
        }
      }
    }

    // ---- Feats ----
    for (const featName of character.feats) {
      const feat = getFeat(featName);
      if (!feat) continue;
      list.push({
        name: feat.name,
        description: feat.description,
        source: 'Feat',
        category: 'Feat',
      });
    }

    // ---- Background Feature ----
    // (Background feature is on the Background tab; we skip it here to avoid duplication)

    return list;
  }, [character]);

  const categories: FeatureEntry['category'][] = [
    'Racial',
    'Class',
    'Subclass',
    'Feat',
    'Background',
  ];

  const filtered = features.filter((f) => {
    if (activeCategory !== 'all' && f.category !== activeCategory) return false;
    if (query.trim()) {
      const q = query.toLowerCase();
      return (
        f.name.toLowerCase().includes(q) ||
        f.description.toLowerCase().includes(q) ||
        f.source.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Sort by category then name
  filtered.sort((a, b) => {
    if (a.category !== b.category) return a.category.localeCompare(b.category);
    if ((a.level ?? 0) !== (b.level ?? 0)) return (a.level ?? 0) - (b.level ?? 0);
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 space-y-3">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search features..."
          className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-ember"
        />
        <div className="flex flex-wrap gap-2">
          <FilterChip
            label="All"
            count={features.length}
            active={activeCategory === 'all'}
            onClick={() => setActiveCategory('all')}
          />
          {categories.map((cat) => {
            const count = features.filter((f) => f.category === cat).length;
            if (count === 0) return null;
            return (
              <FilterChip
                key={cat}
                label={cat}
                count={count}
                active={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
              />
            );
          })}
        </div>
      </div>

      {/* Feature list */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center text-gray-500">
          {features.length === 0
            ? 'Pick a race and class to see features here.'
            : 'No features match your search.'}
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((f, i) => (
            <FeatureCard key={`${f.source}-${f.name}-${i}`} feature={f} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------- Sub-components ---------- */

function FilterChip({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 text-sm rounded-full border transition ${
        active
          ? 'bg-ember text-white border-ember'
          : 'bg-white border-gray-300 hover:border-ember'
      }`}
    >
      {label}{' '}
      <span
        className={`text-xs ${
          active ? 'text-white/80' : 'text-gray-500'
        }`}
      >
        ({count})
      </span>
    </button>
  );
}

function FeatureCard({ feature }: { feature: FeatureEntry }) {
  const [expanded, setExpanded] = useState(true);

  const categoryColors: Record<FeatureEntry['category'], string> = {
    Racial: 'bg-jade',
    Class: 'bg-ink',
    Subclass: 'bg-ember',
    Feat: 'bg-purple-600',
    Background: 'bg-amber-600',
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-3 flex items-center gap-3 hover:bg-gray-50 transition"
      >
        <span
          className={`text-xs font-bold text-white px-2 py-0.5 rounded ${
            categoryColors[feature.category]
          }`}
        >
          {feature.category}
        </span>
        <span className="font-semibold flex-1">{feature.name}</span>
        <span className="text-xs text-gray-500">{feature.source}</span>
        <span className="text-gray-400 text-sm">
          {expanded ? '▾' : '▸'}
        </span>
      </button>
      {expanded && (
        <div className="px-4 pb-3 text-sm text-gray-700 border-t border-gray-100 pt-2">
          {feature.description}
        </div>
      )}
    </div>
  );
}