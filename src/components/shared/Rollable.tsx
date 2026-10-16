import { useRollStore } from '../../store/rollStore';
import { rollFormula, rollD20 } from '../../utils/dice';

interface Props {
  formula?: string;
  label?: string;
  /** If set, uses d20 with adv/disadv mode */
  d20Modifier?: number;
  mode?: 'normal' | 'advantage' | 'disadvantage';
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export default function Rollable({
  formula,
  label,
  d20Modifier,
  mode = 'normal',
  children,
  className,
  title,
}: Props) {
  const push = useRollStore((s) => s.push);

  const handleClick = () => {
    if (d20Modifier !== undefined) {
      const res = rollD20(d20Modifier, mode);
      push({
        formula:
          mode === 'normal'
            ? `1d20${d20Modifier >= 0 ? `+${d20Modifier}` : d20Modifier}`
            : `2d20 (${mode})${d20Modifier >= 0 ? `+${d20Modifier}` : d20Modifier}`,
        label,
        rolls: res.rolls,
        modifier: d20Modifier,
        total: res.total,
        advantage: mode,
      });
      return;
    }

    if (formula) {
      const res = rollFormula(formula);
      push({
        formula,
        label,
        rolls: res.rolls,
        modifier: res.modifier,
        total: res.total,
      });
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`cursor-pointer hover:bg-ember/10 rounded px-1 -mx-1 transition text-left ${className ?? ''}`}
      title={title ?? `Click to roll${label ? `: ${label}` : ''}`}
    >
      {children}
    </button>
  );
}