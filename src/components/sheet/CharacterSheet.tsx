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
import LevelUpWizard from './LevelUpWizard';
import RestMenu from './RestMenu';
import ResourcesPanel from './tabs/ResourcesPanel';
import HitDicePanel from './HitDicePanel';

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

  // Compute total level from class levels
  const totalLevel = character.classes.reduce((s, c) => s + c.level, 0) || 1;

  // Keep top-level `level` in sync with sum of class levels
  if (character.level !== totalLevel) {
    updateCharacter(character.id, { level: totalLevel });
  }

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
        {activeTab === 'spells' && <SpellsTab characterId={characterId} />}
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-bold text-lg mb-3">Base Ability Scores</h3>
        <div className="grid grid-cols-3 gap-3">
          {(
            [
              'strength',
              'dexterity',
              'constitution',
              'intelligence',
              'wisdom',
              'charisma',
            ] as const
          ).map((key) => (
            <div key={key} className="text-center">
              <label className="block text-xs uppercase font-semibold text-gray-500 mb-1">
                {key.slice(0, 3)}
              </label>
              <input
                type="number"
                min={1}
                max={30}
                value={character.abilityScores[key]}
                onChange={(e) =>
                  updateCharacter(character.id, {
                    abilityScores: {
                      ...character.abilityScores,
                      [key]: parseInt(e.target.value) || 0,
                    },
                  })
                }
                className="w-full text-center border border-gray-300 rounded px-2 py-1 text-lg font-bold"
              />
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Enter your base ability scores here. Racial bonuses are applied automatically.
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
          </div>
        </div>
      </div>

      <HitDicePanel characterId={characterId} />

      <div className="lg:col-span-2">
        <ResourcesPanel characterId={characterId} />
      </div>
    </div>
  );
}