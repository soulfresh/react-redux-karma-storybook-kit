import { MockList } from 'graphql-tools';
import Faker from 'faker';

import {
  floorplans,
  randomImage,
  generateId,
  generateIdsFrom,
  parseFilePath,
} from './helpers';

function createUploadData(filename, ext) {
  return JSON.stringify({
    id: Faker.random.uuid(),
    storage: 'cache',
    metadata: {
      file_name: filename,
      mime_type: `image/${ext}`,
      size: Faker.random.number(),
    }
  });
}

function createUpload(title, filename, extension, url) {
  return {
    upload_data: createUploadData(filename, extension),
    image: () => ({
      title: () => title,
      file_name: () => filename,
      url: () => url,
    })
  };
}

function normalizeMutationUploadsResult(uploads) {
  return uploads.data.map(u => ({
    ...u,
    image: {
      ...u.image.data,
      url: '', // We will receive an empty URL when first creating the upload.
    }
  }));
}

function createFloorplanImages(floorplanCount, startId, floorplanImageList) {
  return generateIdsFrom(floorplanCount, startId)
    .map(id => {
      // Pick a random image
      const floorplan = Faker.random.arrayElement(floorplanImageList);

      // Generate file metadata.
      const file = parseFilePath(floorplan.url);
      // const extP = floorplan.url.split('.');
      // const ext = extP[extP.length - 1];
      // const nameP = floorplan.url.split('/');
      // const name = nameP[nameP.length - 1];

      return {
        id,
        ...floorplan,
        ext: file.extension,
        file_name: file.name,
      };
    });
}

function createFloorplans(floorplanImages, collectionId) {
  return floorplanImages.map(floorplan => ({
    id: floorplan.id,
    collection_id: collectionId,
    // A floorplan can only have one image.
    uploads: () => [createUpload(
      Faker.random.words(),
      floorplan.file_name,
      floorplan.ext,
      floorplan.url,
    )],
  }));
}

function createArtworksFromFloorplans(floorplanImages, artworkCount) {
  // Generate artworks to go on the floorplans.
  // For now, artworks cannot exist without a floorplan.
  artworkCount = typeof(artworkCount) === 'number'
    // Use the artwork count passed in
    ? artworkCount
    // If there are any floorplans
    : floorplanImages.length > 0
    // generate a random number of artworks
    ? Faker.random.number({min: 1, max: 10})
    // otherwise we can't have any artworks until floorplans are added.
    : 0;

  if (floorplanImages.length === 0 && artworkCount > 0) {
    console.warn(`Creating ${artworkCount} artworks but created 0 floorplans. This would not be possible in production.`);
  }

  const artworkIds = generateIdsFrom(artworkCount, 1);

  return artworkIds.map(id => ({
    id,
    artwork: () => {
      // Pick a floorplan that this artwork gets placed on.
      const floorplan = Faker.random.arrayElement(floorplanImages);
      // console.log('floorplan?', floorplan, id, floorplanImages);
      const out = {
        id,
        artwork_floor_plans: [{
          floor_plan_id: floorplan.id,
          x: Math.random(),
          y: Math.random(),
          // x: Faker.random.number({min: 0, max: 1}),
          // y: Faker.random.number({min: 0, max: 1}),
        }]
      };

      // console.log('collection.art_collections.artwork', out);
      return out;
    }
  }));
}

/**
 * Create a mock schema for a collection ensuring that artworks
 * relate to floorplans and all ids are set correctly.
 *
 * @param {number} collectionId
 * @param {Object} [entry] - an object of key/value pairs representing the id
 *   of items in the URL if we are deeplinking into a page. Ex: {collectionId: 1, floorplanId: 2}
 * @param {number} [floorplanCount] - The number of floorplans to generate.
 *   If not passed, a random number will be generated.
 * @param {number} [artworkCount] - The number of artworks to generate.
 *   If not passed, a random number will be generated.
 */
export function createCollection(collectionId, entry = {}, floorplanCount = null, artworkCount = null) {
  // Generate the floorplan data for this collection.
  const minFloorplans = typeof(entry.floorplanId) !== 'number' ? 0 : 1;

  // Use the floorplan count passed or generate a random number of floorplans.
  floorplanCount = typeof(floorplanCount) !== 'number'
    ? Faker.random.number({min: minFloorplans, max: 5})
    : floorplanCount;

  const floorplanImages = createFloorplanImages(floorplanCount, entry.floorplanId || 1, floorplans);

  // console.log('floorplan images', floorplanImages);

  const out = {
    floor_plans: createFloorplans(floorplanImages, collectionId),
    art_collections: createArtworksFromFloorplans(floorplanImages, artworkCount),
  };

  // console.log('collections', out);
  return out;
}

export function createMocks(entryPath) {
  const entry = entryPath && entryPath.params ? entryPath.params : {};

  return {
    query_root: () => ({
      collections: (_, query) => {
        if (query && query.where && query.where.id && query.where.id._eq) {
          return new MockList(1, () => {
            const collectionId = query.where.id._eq;
            return createCollection(collectionId, entry);
          });
        }

        return new MockList([10, 30], () => createCollection(generateId(), entry));
      },

      artists: () => new MockList([10, 30]),
    }),

    mutation_root: () => ({
      insert_collections: (p, result, _, {variableValues}) => {
        const collection = result.objects[0];
        return {
          affected_rows: 1,
          returning: () => [{
            ...collection,
            // Floorplans will be empty on creation.
            floor_plans: () => [],
            // Art Collections will be empty on creation.
            art_collections: () => [],
            // TODO Pull the correct user from cache.
            user: {
              ...collection.user,
              id: variableValues.userId,
            },
            // TODO Pull the correct project from cache.
            project: {
              ...collection.project,
              id: variableValues.projectId,
            }
          }]
        };
      },

      insert_floor_plans: (_, result) => {
        const floorplan = result.objects[0];
        return {
          affected_rows: 1,
          returning: () => [{
            ...floorplan,
            uploads: normalizeMutationUploadsResult(floorplan.uploads),
          }]
        };
      },

      insert_artworks: (_, result) => {
        const artwork = result.objects[0];
        return {
          affected_rows: 1,
          returning: () => [{
            ...artwork,
            uploads: normalizeMutationUploadsResult(artwork.uploads),
          }]
        }
      },
    }),

    bigint: () => Math.floor(Math.random() * 10000),

    collections: (a,b,c, d) => {
      const {variableValues} = d;
      const id = variableValues.id || generateId();

      return {
        id             : () => id,
        title          : () => Faker.commerce.productName(),
        created_at     : () => Faker.date.recent(100).toISOString(),
      };
    },

    projects: () => ({
      name            : () => Faker.commerce.productName(),
      budget          : () => Faker.random.number({min : 1000000, max : 10000000}),
      gross           : () => Faker.random.number({min : 500000, max  : 3000000}),
      client_projects : () => new MockList(1),
    }),

    users: () => ({
      first_name : () => Faker.name.firstName(),
      last_name  : () => Faker.name.lastName(),
      email      : () => Faker.internet.email(),
    }),

    clients: () => ({
      name : () => Faker.company.companyName(),
    }),

    floor_plans: (a,b,c,d) => ({
      title: () => Faker.commerce.productName(),
    }),

    artworks: () => {
      const title = Faker.commerce.productName();

      return {
        title: () => title,
        artwork_type: () => Faker.random.arrayElement(['original', 'commission', 'reproduction']),
        medium: () => Faker.random.arrayElement(['painting', 'sculpture', 'photograph', 'mixed media', 'multimedia']),
        style: () => Faker.commerce.productAdjective(),
        // TODO Can we remove this now?
        uploads: () => new MockList([1, 3], () => createUpload(
          title,
          Faker.commerce.productName(),
          'jpg',
          randomImage(),
        )),
      };
    },

    artists: () => ({
      first_name   : () => Faker.name.firstName(),
      last_name    : () => Faker.name.lastName(),
      email        : () => Faker.internet.email(),
      phone_number : () => Faker.phone.phoneNumber(),
      url          : () => Faker.internet.url(),
    }),
  }
}
