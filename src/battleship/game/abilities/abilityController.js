import { abilityEffects } from "./abilityEffects.js";

export function useAbility({
  ability,
  targetX,
  targetY,
  attacker,
  opponentBoard,
}) {
  const handler = abilityEffects[ability.effect.type];

  if (!handler) {
    return {
      success: false,
      reason: "unknown-ability-effect",
      abilityId: ability.id,
    };
  }

  const results = handler({
    effect: ability.effect,
    targetX,
    targetY,
    attacker,
    opponentBoard,
  });

  return {
    success: true,
    abilityId: ability.id,
    effectType: ability.effect.type,
    results,
  };
}
