import { useState } from 'react';
import { useCharacterStore } from '../../store/characterStore';
import RaceTab from './tabs/RaceTab';
import ClassTab from './tabs/ClassTab';
import BackgroundTab from './tabs/BackgroundTab';
import AbilitiesTab from './tabs/AbilitiesTab';
import FeaturesTab from './tabs/FeaturesTab';
import FeatsTab from './tabs/FeatsTab';
import SpellsTab from './tabs/SpellsTab';
import InventoryTab from './tabs/InventoryTab';
import AdvancedWeaponMasteryTab from './tabs/AdvancedWeaponMasteryTab';
import TamerTab from './tabs/TamerTab';
import FeatSpellsPanel from './tabs/FeatSpellsPanel';
import LevelUpWizard from './LevelUpWizard';
import RestMenu from './RestMenu';
import ResourcesPanel from './tabs/ResourcesPanel';
import HitDicePanel from './HitDicePanel';
import ActionsPanel from './ActionsPanel';
import { useEffect } from 'react';
import { computeMaxHP } from '../../utils/calculations';
import {
  getInitiative,
  getModifier,
  getFeatBonuses,
  getFeatSpeedBonus,
  getProficiencyBonus,
  getRacialBonuses,
} from '../../utils/calculations';
import { formatModifier } from '../../utils/dice';
import Rollable from '../shared/Rollable';
import { COMMON_RESOURCES } from '../../data/restResources';

interface Props {
  characterId: string;
}

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'race', label: 'Race' },
  { id: 'class', label: 'Class' },
  { id: 'background', label: 'Background' },
  { id: 'abilities', label: 'Abilities' },
  { id: 'features', label: 'Features' },
  { id: 'feats', label: 'Feats' },
  { id: 'spells', label: 'Spells' },
  { id: 'weapon-mastery', label: 'Weapon Mastery' },
  { id: 'tamer', label: 'Tamer' },
  { id: 'inventory', label: 'Inventory' },
] as const;

export default function CharacterSheet({ characterId }: Props) {
  const character = useCharacterStore((s) =>
    s.characters.find((c) => c.id === characterId)
  );
  const updateCharacter = useCharacterStore((s) => s.updateCharacter);
  const [showLevelUp, setShowLevelUp] = useState(false);

  if (!character) return <p>Character not found.</p>;

  const activeTab = character.activeTab || 'overview';

  const totalLevel = character.classes.reduce((s, c) => s + c.level, 0) || 1;

  // Keep top-level `level` in sync with sum of class levels
  if (character.level !== totalLevel) {
    updateCharacter(character.id, { level: totalLevel });
  }

  // Auto-recompute max HP whenever class levels change
  useEffect(() => {
    if (!character) return;
    const recommended = computeMaxHP(character);
    if (character.combat.maxHP !== recommended) {
      const delta = recommended - character.combat.maxHP;
      updateCharacter(character.id, {
        combat: {
          ...character.combat,
          maxHP: recommended,
          currentHP: Math.max(1, character.combat.currentHP + delta),
          hitDiceTotal: totalLevel,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    totalLevel,
    character?.classes.map((c) => c.level).join(','),
    (character?.feats ?? []).join(','),
  ]);

  // Keep proficiency-bonus resources (feat uses) in step with character level
  useEffect(() => {
    if (!character) return;
    const pb = getProficiencyBonus(character.level);
    const scaling = new Set(
      COMMON_RESOURCES.filter((t) => t.scalesWithProficiency).map((t) => t.name)
    );
    const resources = character.resources ?? [];
    if (!resources.some((r) => scaling.has(r.name) && r.max !== pb)) return;
    updateCharacter(character.id, {
      resources: resources.map((r) =>
        scaling.has(r.name) && r.max !== pb ? { ...r, max: pb } : r
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [character?.level]);

  return (
    <div>
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <input
          value={character.name}
          onChange={(e) =>
            updateCharacter(character.id, { name: e.target.value })
          }
          className="text-3xl font-bold mb-2 border-b border-transparent hover:border-gray-300 focus:border-ember outline-none w-full"
        />
        <div className="flex items-center gap-3 text-sm text-gray-600 flex-wrap">
          <span className="px-2 py-0.5 bg-ink text-parchment rounded">
            Level {totalLevel}
          </span>
          <span>{character.race.name || 'No race'}</span>
          <span>·</span>
          <span>
            {character.classes.length > 0
              ? character.classes.map((c) => c.className).join(' / ')
              : 'No class'}
          </span>
          <div className="ml-auto flex gap-2">
            <RestMenu characterId={characterId} />
            {character.classes.length > 0 && totalLevel < 20 && (
              <button
                onClick={() => setShowLevelUp(true)}
                className="px-3 py-1 text-xs bg-jade text-white rounded hover:bg-green-800 transition font-semibold"
              >
                ⬆️ Level Up
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-1 mb-4 border-b border-gray-300">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() =>
              updateCharacter(character.id, { activeTab: tab.id })
            }
            className={`px-4 py-2 text-sm font-semibold rounded-t transition ${
              activeTab === tab.id
                ? 'bg-white text-ember border border-b-0 border-gray-300'
                : 'text-gray-600 hover:text-ink'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'overview' && <OverviewTab characterId={characterId} />}
        {activeTab === 'race' && <RaceTab characterId={characterId} />}
        {activeTab === 'class' && <ClassTab characterId={characterId} />}
        {activeTab === 'background' && (
          <BackgroundTab characterId={characterId} />
        )}
        {activeTab === 'abilities' && (
          <AbilitiesTab characterId={characterId} />
        )}
        {activeTab === 'features' && <FeaturesTab characterId={characterId} />}
        {activeTab === 'feats' && <FeatsTab characterId={characterId} />}
        {activeTab === 'spells' && (
          <>
            <FeatSpellsPanel characterId={characterId} />
            <SpellsTab characterId={characterId} />
          </>
        )}
        {activeTab === 'weapon-mastery' && (
          <AdvancedWeaponMasteryTab characterId={characterId} />
        )}
        {activeTab === 'tamer' && <TamerTab characterId={characterId} />}
        {activeTab === 'inventory' && (
          <InventoryTab characterId={characterId} />
        )}
      </div>

      {/* Level Up Wizard Modal */}
      {showLevelUp && (
        <LevelUpWizard
          characterId={characterId}
          onClose={() => setShowLevelUp(false)}
        />
      )}
    </div>
  );
}

/* ---------- Overview Tab ---------- */

function OverviewTab({ characterId }: { characterId: string }) {
  const character = useCharacterStore((s) =>
    s.characters.find((c) => c.id === characterId)
  );
  const updateCharacter = useCharacterStore((s) => s.updateCharacter);

  if (!character) return null;

  const racialBonuses = getRacialBonuses(character);
  const featBonuses = getFeatBonuses(character);
  const featSpeedBonus = getFeatSpeedBonus(character);

  const initiative = getInitiative(character);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-bold text-lg mb-3">Ability Scores</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {(
            [
              'strength',
              'dexterity',
              'constitution',
              'intelligence',
              'wisdom',
              'charisma',
            ] as const
          ).map((key) => {
            const base = character.abilityScores[key];
            const racial = racialBonuses[key];
            const featBonus = featBonuses[key];
            const total = base + racial + featBonus;
            const mod = getModifier(total);

            return (
              <div
                key={key}
                className="text-center bg-gray-50 rounded p-2"
              >
                <label className="block text-xs uppercase font-semibold text-gray-500 mb-1">
                  {key.slice(0, 3)}
                </label>

                {/* Base input */}
                <input
                  type="number"
                  min={1}
                  max={30}
                  value={base}
                  onChange={(e) =>
                    updateCharacter(character.id, {
                      abilityScores: {
                        ...character.abilityScores,
                        [key]: parseInt(e.target.value) || 0,
                      },
                    })
                  }
                  className="w-full text-center border border-gray-300 rounded px-2 py-0.5 text-base font-bold mb-1"
                  title="Base score you assigned (before racial bonus)"
                />

                {/* Racial / Total / Modifier */}
                <div className="text-xs leading-tight">
                  {racial !== 0 && (
                    <div className="text-jade font-semibold">
                      {racial > 0 ? `+${racial}` : racial} racial
                    </div>
                  )}
                  {featBonus !== 0 && (
                    <div className="text-jade font-semibold">
                      +{featBonus} feat
                    </div>
                  )}
                  <div className="text-gray-700">
                    Total <span className="font-bold text-ink">{total}</span>
                  </div>
                  <div className="text-ember font-bold text-base">
                    {mod >= 0 ? `+${mod}` : mod}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Enter base scores above. Racial bonuses and feat increases apply automatically.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-bold text-lg mb-3">Combat</h3>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs uppercase font-semibold text-gray-500">
              Current HP
            </label>
            <input
              type="number"
              value={character.combat.currentHP}
              onChange={(e) =>
                updateCharacter(character.id, {
                  combat: {
                    ...character.combat,
                    currentHP: parseInt(e.target.value) || 0,
                  },
                })
              }
              className="w-full border border-gray-300 rounded px-2 py-1"
            />
          </div>
          <div>
            <label className="block text-xs uppercase font-semibold text-gray-500">
              Max HP
            </label>
            <input
              type="number"
              value={character.combat.maxHP}
              onChange={(e) =>
                updateCharacter(character.id, {
                  combat: {
                    ...character.combat,
                    maxHP: parseInt(e.target.value) || 0,
                  },
                })
              }
              className="w-full border border-gray-300 rounded px-2 py-1"
            />
          </div>
          <div>
            <label className="block text-xs uppercase font-semibold text-gray-500">
              AC
            </label>
            <input
              type="number"
              value={character.combat.armorClass}
              onChange={(e) =>
                updateCharacter(character.id, {
                  combat: {
                    ...character.combat,
                    armorClass: parseInt(e.target.value) || 0,
                  },
                })
              }
              className="w-full border border-gray-300 rounded px-2 py-1"
            />
          </div>
          <div>
            <label className="block text-xs uppercase font-semibold text-gray-500">
              Speed
            </label>
            <input
              type="number"
              value={character.combat.speed}
              onChange={(e) =>
                updateCharacter(character.id, {
                  combat: {
                    ...character.combat,
                    speed: parseInt(e.target.value) || 0,
                  },
                })
              }
              className="w-full border border-gray-300 rounded px-2 py-1"
            />
            {featSpeedBonus > 0 && (
              <div className="text-xs text-jade font-semibold mt-0.5">
                +{featSpeedBonus} ft. from feats = {character.combat.speed + featSpeedBonus} ft.
              </div>
            )}
          </div>
            <div className="col-span-2">
            <label className="block text-xs uppercase font-semibold text-gray-500">
              Initiative
            </label>
            <div className="flex items-center gap-2">
              <Rollable
                d20Modifier={initiative}
                label="Initiative"
                title="Roll initiative (1d20 + Dex modifier)"
                className="flex-1 flex items-center justify-between border border-gray-300 rounded px-3 py-1 bg-gray-50"
              >
                <span className="text-lg font-bold text-ember">
                  {formatModifier(initiative)}
                </span>
                <span className="text-sm text-gray-600">🎲 Roll</span>
              </Rollable>
              <Rollable
                d20Modifier={initiative}
                mode="advantage"
                label="Initiative"
                title="Roll initiative with advantage"
                className="border border-gray-300 rounded px-2 py-1 text-xs font-semibold text-jade"
              >
                Adv
              </Rollable>
              <Rollable
                d20Modifier={initiative}
                mode="disadvantage"
                label="Initiative"
                title="Roll initiative with disadvantage"
                className="border border-gray-300 rounded px-2 py-1 text-xs font-semibold text-red-600"
              >
                Dis
              </Rollable>
            </div>
          </div>
        </div>
      </div>

      <HitDicePanel characterId={characterId} />

      <div className="lg:col-span-2">
        <ResourcesPanel characterId={characterId} />
      </div>

      <div className="lg:col-span-2">
        <ActionsPanel characterId={characterId} />
      </div>
    </div>
  );
}