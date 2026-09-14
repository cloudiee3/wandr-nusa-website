/* ==========================================================================
   wandrnusa — where things are
   --------------------------------------------------------------------------
   A schematic, not a coastline. An earlier version drew Lombok's outline and
   it simply did not look like Lombok — anyone who lives here would spot it in
   a second. So this shows the thing that is actually true and actually useful:
   everything sits around Rinjani, and none of it is far apart.

   Places are positioned by their real compass bearing from the mountain and
   roughly by distance. Editing one is two numbers: `deg` (0 = north, running
   clockwise) and `dist` (0 = the mountain, 100 = the coast).
   ========================================================================== */

import { tr, getLang, t } from '../i18n.js';
import { esc } from '../lib/dom.js';

const CX = 50;
const CY = 50;
const R = 34;                        /* the coast ring, in viewBox units */

/** Compass bearing + distance → x/y. */
function at(deg, dist) {
  const rad = ((deg - 90) * Math.PI) / 180;
  const r = (dist / 100) * R;
  return { x: CX + Math.cos(rad) * r, y: CY + Math.sin(rad) * r };
}

/* Where the escapes are, relative to Rinjani. */
const PLACES = [
  { id: 'senaru',        deg: 340, dist: 55, label: { en: 'Senaru',    id: 'Senaru' } },
  { id: 'sembalun',      deg: 85,  dist: 48, label: { en: 'Sembalun',  id: 'Sembalun' } },
  { id: 'tetebatu',      deg: 155, dist: 52, label: { en: 'Tetebatu',  id: 'Tetebatu' } },
  { id: 'lombok-tengah', deg: 215, dist: 58, label: { en: 'Aik Berik', id: 'Aik Berik' } },
];

/* Reference points, drawn quieter. */
const REFS = [
  { id: 'mataram', deg: 260, dist: 95, label: { en: 'Mataram', id: 'Mataram' } },
  { id: 'kuta',    deg: 180, dist: 98, label: { en: 'Kuta',    id: 'Kuta' } },
  { id: 'gilis',   deg: 300, dist: 112, label: { en: 'Gilis',  id: 'Gili' } },
];

export function renderMap() {
  const lang = getLang();

  /* Labels sit on the far side of the dot from the mountain, so they never
     land on top of the centre or each other. */
  const marker = (p, isEscape) => {
    const { x, y } = at(p.deg, p.dist);
    const east = p.deg > 0 && p.deg < 180;
    const anchor = Math.abs(Math.sin(((p.deg - 90) * Math.PI) / 180)) > 0.92
      ? 'middle'
      : (east ? 'start' : 'end');
    const dx = anchor === 'middle' ? 0 : (east ? 2.6 : -2.6);
    const dy = anchor === 'middle' ? (p.deg < 90 || p.deg > 270 ? -2.6 : 4.4) : 1.1;
    return `
      <g class="map__place${isEscape ? ' map__place--escape' : ''}">
        <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${isEscape ? 1.7 : 1.1}"/>
        <text x="${(x + dx).toFixed(1)}" y="${(y + dy).toFixed(1)}" text-anchor="${anchor}">${esc(tr(p.label, lang))}</text>
      </g>`;
  };

  return `
    <svg class="map" viewBox="0 0 100 100" role="img" aria-label="${esc(t('map.alt'))}">
      <circle class="map__coast" cx="${CX}" cy="${CY}" r="${R}"/>
      <circle class="map__inner" cx="${CX}" cy="${CY}" r="${R * 0.55}"/>

      <g class="map__peak">
        <path d="M ${CX} ${CY - 5.5} l 6 9.5 h -12 Z"/>
        <text x="${CX}" y="${CY + 9}" text-anchor="middle">${esc(tr({ en: 'Rinjani', id: 'Rinjani' }, lang))}</text>
      </g>

      ${REFS.map((p) => marker(p, false)).join('')}
      ${PLACES.map((p) => marker(p, true)).join('')}
    </svg>`;
}
