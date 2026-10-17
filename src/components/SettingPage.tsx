import { useState } from 'react';
import { CATACLYSM, MATO_INTRO, PEOPLES, REGIONS } from '../data/setting';
import type { RegionId } from '../data/setting';
import { MatoMap, PeopleEmblem, RegionScene } from './setting/Illustrations';

const regionName = (id: RegionId) => REGIONS.find((r) => r.id === id)?.name ?? id;

export default function SettingPage() {
  const [selected, setSelected] = useState<RegionId>('west');
  const region = REGIONS.find((r) => r.id === selected) ?? REGIONS[0];

  return (
    <div className="space-y-8">
      <section className="bg-white rounded-lg shadow p-6 text-center">
        <p className="text-xs tracking-[0.4em] text-ember">的 · MATO</p>
        <h2 className="font-display text-3xl font-bold mt-1">The World of Mato</h2>
        <div className="brush-rule mx-auto my-3" />
        <p className="max-w-2xl mx-auto text-gray-700">{MATO_INTRO}</p>
      </section>

      <figure className="bg-white rounded-lg shadow overflow-hidden">
        <img
          src="./mato-world.jpg"
          alt="Mato: the red-lit west, the frozen northern lake, the golden pillar at the centre, the jade-supported Tento in the east, and the crater of Nankin in the south"
          className="w-full h-auto block"
        />
        <figcaption className="text-xs text-gray-600 px-4 py-2 text-center">
          Mato from above: West (left), North (top left), Centre (golden pillar), East (jade island), South (crater).
        </figcaption>
      </figure>

      <section className="grid md:grid-cols-2 gap-6 items-start">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-display text-xl font-bold mb-2">Map of the Five Districts</h3>
          <p className="text-sm text-gray-600 mb-3">Select a district to read about it.</p>
          <MatoMap selected={selected} onSelect={setSelected} />
        </div>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <RegionScene id={region.id} />
          <div className="p-5 space-y-3">
            <div>
              <h3 className="font-display text-2xl font-bold" style={{ color: region.accent }}>
                {region.name}
              </h3>
              <p className="text-sm text-gray-600">
                {region.subtitle} · {region.direction}
              </p>
            </div>
            {region.status && (
              <span className="inline-block text-xs font-semibold px-2 py-1 rounded bg-red-100 text-red-800">{region.status}</span>
            )}
            <p className="text-gray-700">{region.description}</p>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <div>
                <dt className="font-semibold">Guardian</dt>
                <dd>
                  {region.guardian} <span className="font-display">{region.guardianKanji}</span>
                </dd>
                <dd className="text-gray-600 text-xs">{region.guardianTitle}</dd>
              </div>
              <div>
                <dt className="font-semibold">Element</dt>
                <dd>{region.element}</dd>
              </div>
              <div>
                <dt className="font-semibold">Season</dt>
                <dd>{region.season}</dd>
              </div>
              <div>
                <dt className="font-semibold">Colour</dt>
                <dd>{region.colour}</dd>
              </div>
            </dl>
            <p className="text-sm">
              <span className="font-semibold">Meaning: </span>
              {region.meaning}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Atmosphere: </span>
              {region.vibe}
            </p>
            {region.peoples.length > 0 && (
              <p className="text-sm">
                <span className="font-semibold">Mostly home to: </span>
                {region.peoples.join(', ')}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="bg-white rounded-lg shadow p-6">
        <h3 className="font-display text-2xl font-bold">{CATACLYSM.title}</h3>
        <div className="brush-rule my-2" />
        <p className="text-gray-700 mb-4">{CATACLYSM.summary}</p>
        <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CATACLYSM.beats.map((b, i) => (
            <li key={b.title} className="border border-gray-200 rounded-lg p-4">
              <span className="hanko" aria-hidden="true">
                {i + 1}
              </span>
              <h4 className="font-semibold mt-2">{b.title}</h4>
              <p className="text-sm text-gray-700 mt-1">{b.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h3 className="font-display text-2xl font-bold mb-3">Peoples of Mato</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PEOPLES.map((p) => (
            <div key={p.name} className="bg-white rounded-lg shadow p-4 flex gap-4">
              <div className="shrink-0">
                <PeopleEmblem name={p.name} />
              </div>
              <div>
                <h4 className="font-display font-bold text-lg">{p.name}</h4>
                <p className="text-sm text-gray-700">{p.blurb}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {p.homes.map((h) => (
                    <button
                      key={h}
                      type="button"
                      onClick={() => {
                        setSelected(h);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="text-xs px-2 py-0.5 rounded-full bg-gray-100 hover:bg-gray-200"
                    >
                      {regionName(h)}
                    </button>
                  ))}
                  {p.homeNote && <span className="text-xs text-gray-500 italic">{p.homeNote}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
