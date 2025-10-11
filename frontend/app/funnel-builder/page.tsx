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

const FunnelBuilderPage = () => {
  const [items, setItems] = useState([]);

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      if (over.id === 'canvas') {
        // Add new item
        setItems((items) => [...items, active.id]);
      } else {
        // Reorder items
        setItems((items) => {
          const oldIndex = items.indexOf(active.id);
          const newIndex = items.indexOf(over.id);
          return arrayMove(items, oldIndex, newIndex);
        });
      }
    }
  }

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
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            <div id="canvas" style={{ border: '1px dashed #ccc', padding: '20px', minHeight: '200px' }}>
              {items.map(id => <SortableItem key={id} id={id} />)}
            </div>
          </SortableContext>
        </div>
      </div>
    </DndContext>
  );
};

export default FunnelBuilderPage;