import { useState } from 'react';
import { useCharacterStore } from '../../store/characterStore';
import {
  compileActions,
  getUniversalActions,
  type FeatureAction,
  type SpellAction,
  type WeaponAction,
} from '../../utils/actions';
import { formatModifier } from '../../utils/calculations';

interface Props {
  characterId: string;
}

type Section = 'weapons' | 'spells' | 'actions' | 'bonus' | 'reactions';

export default function ActionsPanel({ characterId }: Props) {
  const character = useCharacterStore((s) =>
    s.characters.find((c) => c.id === characterId)
  );
  const [openSections, setOpenSections] = useState<Record<Section, boolean>>({
    weapons: true,
    spells: true,
    actions: false,
    bonus: true,
    reactions: false,
  });

  if (!character) return null;

  const comp = compileActions(character);
  const universal = getUniversalActions();

  const toggle = (key: Section) => {
    setOpenSections((s) => ({ ...s, [key]: !s[key] }));
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b border-gray-100">
        <h3 className="font-bold text-lg">⚔️ Combat Actions</h3>
        <p className="text-xs text-gray-500">
          Everything your character can do on a turn. Click a section to expand.
        </p>
      </div>

      <div className="divide-y divide-gray-100">
        {/* Weapons */}
        <ActionSection
          title="Attack"
          icon="🗡️"
          count={comp.weapons.length}
          open={openSections.weapons}
          onToggle={() => toggle('weapons')}
        >
          {comp.weapons.length === 0 ? (
            <p className="text-xs text-gray-500 italic">
              No weapons equipped. Equip a weapon on the Inventory tab.
            </p>
          ) : (
            <div className="space-y-1">
              {comp.weapons.map((w, i) => (
                <WeaponRow key={`${w.name}-${i}`} weapon={w} />
              ))}
            </div>
          )}
        </ActionSection>

        {/* Spells */}
        <ActionSection
          title="Cast a Spell"
          icon="✨"
          count={comp.spellAttacks.length}
          open={openSections.spells}
          onToggle={() => toggle('spells')}
        >
          {comp.spellAttacks.length === 0 ? (
            <p className="text-xs text-gray-500 italic">
              No offensive spells known. Add spells on the Spells tab.
            </p>
          ) : (
            <div className="space-y-1">
              {comp.spellAttacks.map((s, i) => (
                <SpellRow key={`${s.name}-${i}`} spell={s} />
              ))}
            </div>
          )}
        </ActionSection>

        {/* Actions */}
        <ActionSection
          title="Actions"
          icon="🎯"
          count={comp.actions.length + universal.length}
          open={openSections.actions}
          onToggle={() => toggle('actions')}
        >
          <div className="space-y-1">
            {comp.actions.map((a, i) => (
              <FeatureRow key={`f-${a.name}-${i}`} feature={a} />
            ))}
            <div className="pt-2 mt-2 border-t border-gray-100">
              <div className="text-xs uppercase text-gray-500 font-semibold mb-1">
                Universal
              </div>
              {universal.map((u) => (
                <div
                  key={u.name}
                  className="flex items-baseline gap-2 py-0.5 text-xs"
                  title={u.description}
                >
                  <span className="font-semibold text-ink w-24 shrink-0">
                    {u.name}
                  </span>
                  <span className="text-gray-600 truncate">{u.description}</span>
                </div>
              ))}
            </div>
          </div>
        </ActionSection>

        {/* Bonus Actions */}
        <ActionSection
          title="Bonus Actions"
          icon="⚡"
          count={comp.bonusActions.length}
          open={openSections.bonus}
          onToggle={() => toggle('bonus')}
        >
          {comp.bonusActions.length === 0 ? (
            <p className="text-xs text-gray-500 italic">
              No bonus actions from your class or race.
            </p>
          ) : (
            <div className="space-y-1">
              {comp.bonusActions.map((b, i) => (
                <FeatureRow key={`b-${b.name}-${i}`} feature={b} />
              ))}
            </div>
          )}
        </ActionSection>

        {/* Reactions */}
        <ActionSection
          title="Reactions"
          icon="🛡️"
          count={comp.reactions.length + 1}
          open={openSections.reactions}
          onToggle={() => toggle('reactions')}
        >
          <div className="space-y-1">
            {comp.reactions.map((r, i) => (
              <FeatureRow key={`r-${r.name}-${i}`} feature={r} />
            ))}
            <div className="pt-2 mt-2 border-t border-gray-100">
              <div className="text-xs uppercase text-gray-500 font-semibold mb-1">
                Universal
              </div>
              <div className="flex items-baseline gap-2 py-0.5 text-xs">
                <span className="font-semibold text-ink w-32 shrink-0">
                  Opportunity Attack
                </span>
                <span className="text-gray-600">
                  Reaction to a creature leaving your reach.
                </span>
              </div>
            </div>
          </div>
        </ActionSection>
      </div>
    </div>
  );
}

/* ---------- Sub-components ---------- */

function ActionSection({
  title,
  icon,
  count,
  open,
  onToggle,
  children,
}: {
  title: string;
  icon: string;
  count: number;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div>
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-50 transition text-left"
      >
        <span className="text-lg">{icon}</span>
        <span className="font-semibold flex-1">{title}</span>
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
          {count}
        </span>
        <span className="text-gray-400">{open ? '▾' : '▸'}</span>
      </button>
      {open && <div className="px-4 pb-3">{children}</div>}
    </div>
  );
}

function WeaponRow({ weapon }: { weapon: WeaponAction }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="border-l-2 border-ember pl-2 py-0.5">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left flex items-center gap-2 text-xs hover:bg-gray-50 rounded px-1 py-0.5"
      >
        <span className="font-semibold flex-1">{weapon.name}</span>
        <span className="text-ember font-mono">
          {formatModifier(weapon.attackBonus)} to hit
        </span>
        <span className="text-gray-700 font-mono">{weapon.damage}</span>
      </button>
      {expanded && weapon.properties.length > 0 && (
        <div className="text-xs text-gray-600 pl-2 pt-1 italic">
          {weapon.properties.join(', ')}
        </div>
      )}
    </div>
  );
}

function SpellRow({ spell }: { spell: SpellAction }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="border-l-2 border-purple-500 pl-2 py-0.5">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left flex items-center gap-2 text-xs hover:bg-gray-50 rounded px-1 py-0.5"
      >
        <span className="font-semibold flex-1 truncate">
          {spell.name}
          {spell.level > 0 && (
            <span className="text-xs text-gray-500 ml-1">({spell.level})</span>
          )}
        </span>
        {spell.attackBonus !== undefined && (
          <span className="text-ember font-mono">
            {formatModifier(spell.attackBonus)} to hit
          </span>
        )}
        {spell.saveDC !== undefined && (
          <span className="text-ember font-mono">DC {spell.saveDC}</span>
        )}
        {spell.damage && (
          <span className="text-gray-700 font-mono">{spell.damage}</span>
        )}
      </button>
      {expanded && (
        <div className="text-xs text-gray-600 pl-2 pt-1">
          <div>
            <span className="font-semibold">Cast:</span> {spell.castingTime}
            {spell.concentration && ' · Concentration'}
          </div>
          <div className="text-gray-600 mt-0.5">{spell.summary}</div>
        </div>
      )}
    </div>
  );
}

function FeatureRow({ feature }: { feature: FeatureAction }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="border-l-2 border-jade pl-2 py-0.5">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left flex items-baseline gap-2 text-xs hover:bg-gray-50 rounded px-1 py-0.5"
      >
        <span className="font-semibold flex-1">{feature.name}</span>
        <span className="text-xs text-gray-400">{feature.source}</span>
      </button>
      {expanded && (
        <p className="text-xs text-gray-600 pl-2 pt-1">{feature.description}</p>
      )}
    </div>
  );
}