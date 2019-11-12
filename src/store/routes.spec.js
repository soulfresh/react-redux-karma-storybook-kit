import { getRoute } from './routes';

describe('routes', function() {
  describe('getRoute', function() {
    it('should be able to get a route without parameters.', () => {
      expect(getRoute('HOME')).toEqual('/');
      expect(getRoute('PROJECT')).toEqual('/projects/:projectId');
    });

    it('should be able to get a route with parameters.', () => {
      expect(getRoute('PROJECT', {projectId: 123}))
        .toEqual('/projects/123');

      expect(getRoute('COLLECTION', {projectId: 654, collectionId: 987}))
        .toEqual('/projects/654/collections/987');
    });
  });
});
