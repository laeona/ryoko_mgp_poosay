import { useCharacterStore } from '../../../store/characterStore';
import {
  FAMILIARS,
  createBespokeCompanion,
  getFamiliar,
  getFamiliarStats,
} from '../../../data/familiars';
import { getProficiencyBonus } from '../../../utils/calculations';
import BespokeFamiliarCard from './BespokeFamiliarCard';

interface Props {
  characterId: string;
}

/**
 * Familiar for characters with the Spirit Bonded feat but no Tamer levels.
 * One familiar, one 1st-level improvement, plus a 3rd-level one from character level 5.
 */
export default function SpiritBondedSection({ characterId }: Props) {
  const character = useCharacterStore((s) =>
    s.characters.find((c) => c.id === characterId)
  );
  const updateCharacter = useCharacterStore((s) => s.updateCharacter);

  if (!character) return null;

  const level = character.level;
  const proficiencyBonus = getProficiencyBonus(level);
  const tempHPOnSummon = level >= 5 ? level * 2 : level;
  const budget = level >= 5 ? 2 : 1;
  const unlockLevel = level >= 5 ? 3 : 1;

  const tamer = character.tamer ?? { companions: [] };
  const companion = tamer.companions.find((c) => getFamiliar(c.familiarId));
  const familiar = getFamiliar(companion?.familiarId);

  const save = (companions: typeof tamer.companions, activeId?: string) =>
    updateCharacter(character.id, {
      tamer: { ...tamer, companions, activeCompanionId: activeId },
    });

  const choose = (id: string) => {
    const f = getFamiliar(id);
    if (!f) return;
    // Level 1 stats: Spirit Bonded familiars get no Tamer progression.
    const c = createBespokeCompanion(f, 1, proficiencyBonus);
    save([c], undefined);
  };

  const update = (u: Partial<NonNullable<typeof companion>>) => {
    if (!companion) return;
    save(
      tamer.companions.map((c) => (c.id === companion.id ? { ...c, ...u } : c)),
      tamer.activeCompanionId
    );
  };

  const updateWithStats = (u: Partial<NonNullable<typeof companion>>) => {
    if (!companion || !familiar) return;
    const learned = u.learnedImprovements ?? companion.learnedImprovements ?? [];
    const stats = getFamiliarStats(familiar, learned, 1, proficiencyBonus);
    update({ ...u, maxHP: stats.maxHP });
  };

  const summon = () => {
    if (!companion) return;
    save(
      tamer.companions.map((c) =>
        c.id === companion.id
          ? { ...c, currentHP: c.maxHP, tempHP: tempHPOnSummon }
          : c
      ),
      companion.id
    );
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-bold">Spirit Bonded familiar</h3>
        <p className="text-sm text-gray-600 mt-1">
          From the Spirit Bonded feat. Cast <em>find familiar</em> once per long
          rest without a slot. The familiar appears with {tempHPOnSummon} temp HP
          and can learn {budget === 1 ? 'one 1st-level improvement' : 'a 1st-level and a 3rd-level improvement'}.
        </p>
        {!companion && (
          <select
            value=""
            onChange={(e) => e.target.value && choose(e.target.value)}
            className="mt-3 px-3 py-2 border border-gray-300 rounded bg-white text-sm"
          >
            <option value="">Choose a familiar form...</option>
            {FAMILIARS.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name} ({f.creatureType})
              </option>
            ))}
          </select>
        )}
        {companion && (
          <button
            type="button"
            onClick={summon}
            className="mt-3 px-3 py-2 bg-ember text-white rounded text-sm font-semibold"
          >
            Summon (full HP + {tempHPOnSummon} temp HP)
          </button>
        )}
      </div>

      {companion && familiar && (
        <BespokeFamiliarCard
          companion={companion}
          familiar={familiar}
          tamerLevel={1}
          unlockLevel={unlockLevel}
          proficiencyBonus={proficiencyBonus}
          improvementBudget={budget}
          isActive={tamer.activeCompanionId === companion.id}
          sensei={false}
          senseiStrikeDie=""
          senseiStrikeCount={0}
          onUpdate={updateWithStats}
          onRemove={() => save([], undefined)}
          onToggleActive={() =>
            save(
              tamer.companions,
              tamer.activeCompanionId === companion.id ? undefined : companion.id
            )
          }
        />
      )}
    </div>
  );
}
