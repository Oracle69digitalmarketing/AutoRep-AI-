"use client";

import React, { useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Draggable } from './Draggable';
import { SortableItem } from './SortableItem';
import { randomUUID } from 'crypto';

const FunnelBuilderPage = () => {
  const [items, setItems] = useState([]);
  const [jsonOutput, setJsonOutput] = useState('');

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      if (over.id === 'canvas') {
        // Add new item
        setItems((items) => [...items, { id: randomUUID(), type: active.id, message: '' }]);
      } else {
        // Reorder items
        setItems((items) => {
          const oldIndex = items.findIndex(item => item.id === active.id);
          const newIndex = items.findIndex(item => item.id === over.id);
          return arrayMove(items, oldIndex, newIndex);
        });
      }
    }
  }

  const deleteItem = (id) => {
    setItems((items) => items.filter(item => item.id !== id));
  };

  const updateItemMessage = (id, message) => {
    setItems((items) => items.map(item => item.id === id ? { ...item, message } : item));
  };

  const saveFunnel = () => {
    setJsonOutput(JSON.stringify(items, null, 2));
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div style={{ display: 'flex' }}>
        <div style={{ width: '200px', borderRight: '1px solid #ccc', padding: '10px' }}>
          <h2>Components</h2>
          <Draggable id="send-message">Send Message</Draggable>
          <Draggable id="wait-for-reply">Wait for Reply</Draggable>
        </div>
        <div style={{ flex: 1, padding: '10px' }}>
          <h2>Funnel Canvas</h2>
          <button onClick={saveFunnel}>Save Funnel</button>
          <SortableContext items={items.map(i => i.id)} strategy={verticalListSortingStrategy}>
            <div id="canvas" style={{ border: '1px dashed #ccc', padding: '20px', minHeight: '200px' }}>
              {items.map(item => (
                <SortableItem
                  key={item.id}
                  id={item.id}
                  item={item}
                  deleteItem={deleteItem}
                  updateItemMessage={updateItemMessage}
                />
              ))}
            </div>
          </SortableContext>
          {jsonOutput && (
            <pre style={{ marginTop: '20px', backgroundColor: '#f5f5f5', padding: '10px' }}>
              {jsonOutput}
            </pre>
          )}
        </div>
      </div>
    </DndContext>
  );
};

export default FunnelBuilderPage;