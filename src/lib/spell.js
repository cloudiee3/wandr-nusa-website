/** Spells a small number so copy can count itself: "Ten routes", not "10". */
export function spell(n) {
  const words = [
    'no', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
    'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen',
    'seventeen', 'eighteen', 'nineteen', 'twenty',
  ]
  return words[n] ?? String(n)
}
