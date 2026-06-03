import { areaScan, carpetBomb, nuke } from "./abilityDefinitions.js";

export const abilities = [areaScan, carpetBomb, nuke];

export function getAbilityById(abilityId) {
  return abilities.find((ability) => ability.id === abilityId) ?? null;
}
