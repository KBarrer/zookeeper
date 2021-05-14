const fs = require('fs');
const {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper
} = require('../lib/zookeepers.js');
const { zookeepers } = require('../data/zookeepers.json');
const { jest, test, expect } = require('@jest/globals');

jest.mock('fs');

test('creates an zookeeper object', () => {
    const zookeeper = createNewZookeeper(
        { name: 'Dan', id: 'sdfh382'},
        zookeepers
    );

    expect(zookeeper.name).toBe('Dan');
    expect(zookeeper.id).toBe('sdfh382');
});

test('filters by query', () => {
    const startingZookeepers = [
        {
            id: '2',
            name: 'Raksha',
            age: 31,
            favoriteAnimal: 'penguin',
          },
          {
            id: '3',
            name: 'Isabella',
            age: 67,
            favoriteAnimal: 'bear',
          },
    ];

    const updatedZookepers = filterByQuery({ favoriteAnimal: 'bear' }, startingZookeepers);

    expect(updatedZookepers.length).toEqual(1);
});

test('filters by id', () => {
    const startingZookeepers = [
        {
            id: '2',
            name: 'Raksha',
            age: 31,
            favoriteAnimal: 'penguin',
          },
          {
            id: '3',
            name: 'Isabella',
            age: 67,
            favoriteAnimal: 'bear',
          },
    ];

    const result = findById('3', startingZookeepers);

    expect(result.name).toBe('Isabella');
});

test('validates age', () => {
    const zookeeper = {
        id: '2',
        name: 'Raksha',
        age: 31,
        favoriteAnimal: 'penguin',
      };

    const invalidZookeeper =  {
        id: '3',
        name: 'Isabella',
        age: '67',
        favoriteAnimal: 'bear',
      };

    const result = valitdateZookeeper(zookeeper);
    const result2 = valitdateZookeeper(invalidZookeeper);

    expect(result).toBe(true);
    expect(result2).toBe(false);
});