import unittest
import pickle
import os

from TesteCore6 import ( 
    Component, EntityComponentSystem, Entity, Scene,
    Position, Renderable, update, saveState, loadState
)
from core6 import SAVE_DATA_FILE_NAME

class TestEntityComponentSystem(unittest.TestCase):

    def setUp(self):
        self.ECS = EntityComponentSystem()

    def test_next_signature(self):
        initial_signature = EntityComponentSystem.signature
        new_signature = EntityComponentSystem.nextSignature()
        self.assertEqual(new_signature, initial_signature)
        self.assertEqual(EntityComponentSystem.signature, initial_signature << 1)

    def test_next_id(self):
        initial_id = EntityComponentSystem.id
        new_id = EntityComponentSystem.nextId()
        self.assertEqual(new_id, initial_id + 1)
        self.assertEqual(EntityComponentSystem.id, initial_id + 1)

    def test_add_remove_component(self):
        entity = Entity(self.ECS)
        position = Position(10, 20)
        entity.add(position)
        self.assertTrue(entity.has(Position.id))
        self.assertEqual(entity.get(Position.id), position)
        
        entity.remove(Position.id)
        self.assertFalse(entity.has(Position.id))

    def test_scene_create_destroy(self):
        entity = Entity(self.ECS)
        self.ECS.scene.create(entity)
        self.assertIn(entity, self.ECS.scene.entities)
        
        self.ECS.scene.destroy(entity)
        self.assertNotIn(entity, self.ECS.scene.entities)

    def test_save_load_state(self):
        entity = Entity(self.ECS)
        position = Position(10, 20)
        renderable = Renderable('X')
        entity.add(position).add(renderable)
        self.ECS.scene.create(entity)

        saveState(SAVE_DATA_FILE_NAME, self.ECS) 

        new_ECS = EntityComponentSystem()
        loadState(SAVE_DATA_FILE_NAME, new_ECS) 

        self.assertEqual(len(new_ECS.scene.entities), 1)
        loaded_entity = next(iter(new_ECS.scene.entities))
        self.assertEqual(loaded_entity.id, entity.id)
        self.assertTrue(loaded_entity.has(Position.id))
        self.assertTrue(loaded_entity.has(Renderable.id))
        self.assertEqual(loaded_entity.get(Position.id).x, 10)
        self.assertEqual(loaded_entity.get(Position.id).y, 20)
        self.assertEqual(loaded_entity.get(Renderable.id).glyph, 'X')

        os.remove( ) 

    def test_update(self):
        entity = Entity(self.ECS)
        position = Position(10, 20)
        renderable = Renderable('X')
        entity.add(position).add(renderable)
        self.ECS.scene.create(entity)
        update(self.ECS)
if __name__ == '__main__':
    unittest.main()
    