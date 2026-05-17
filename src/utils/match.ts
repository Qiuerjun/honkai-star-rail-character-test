import { Character, CharacterTraits } from '../data/characters';

export function calculateMatch(userTraits: CharacterTraits, character: Character): number {
  const dims: (keyof CharacterTraits)[] = [
    'extraversion',
    'intuition',
    'thinking',
    'judging',
    'adventurous',
    'independent',
  ];
  let sumSquaredDiff = 0;

  for (const dim of dims) {
    const diff = userTraits[dim] - character.traits[dim];
    sumSquaredDiff += diff * diff;
  }

  const distance = Math.sqrt(sumSquaredDiff);
  const maxDistance = Math.sqrt(6 * 20 * 20);
  const matchPercent = Math.max(0, 100 - (distance / maxDistance * 100));

  return Math.round(matchPercent);
}

export function findBestMatches(
  userTraits: CharacterTraits,
  characters: Character[],
  topN: number = 3
): { character: Character; percent: number }[] {
  const matches = characters.map((char) => ({
    character: char,
    percent: calculateMatch(userTraits, char),
  }));

  matches.sort((a, b) => b.percent - a.percent);
  return matches.slice(0, topN);
}
