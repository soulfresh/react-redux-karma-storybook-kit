import Faker from 'faker';

import floorplan0 from '~/assets/floorplans/Continental Event 1st floor.png';
import floorplan1 from '~/assets/floorplans/Continental Event 2nd floor.png';
import floorplan2 from '~/assets/floorplans/Harmony Lobby Seoul.jpg';

export const floorplans = [
  {url: floorplan0, w: 1812, h: 1299},
  {url: floorplan1, w: 1812, h: 1299},
  {url: floorplan2, w: 3307, h: 2362},
];

export function randomImage(w, h) {
  w = w || Faker.random.number({min: 4, max: 8}) * 100;
  h = h || Faker.random.number({min: 4, max: 8}) * 100;
  return `https://picsum.photos/${w}/${h}`;
  // return `https://placeimg.com/${w}/${h}/animals`
};

export function itemOrNull(generate) {
  if (Faker.random.number({min: 0, max: 1})) {
    return generate();
  }
  return null;
}

let id = 0;
export function generateId() {
  return ++id;
}

export function generateIdsFrom(count, start = 0) {
  const out = [];
  for (let i = 0; i < count; i++) {
    out.push(start + i);
  }
  return out;
}

export function parseFilePath(file) {
  const parts = file.split('/');
  const filename = parts.pop();
  const extParts = filename.split('.');
  const extension = extParts[extParts.length - 1];
  return {
    path: parts.join('/'),
    name: filename,
    extension: extension,
  }
}
