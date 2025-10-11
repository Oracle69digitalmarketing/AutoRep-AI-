import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export function SortableItem(props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    border: '1px solid #ccc',
    padding: '10px',
    margin: '5px 0',
    backgroundColor: 'white',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div>
        <strong>{props.item.type}</strong>
        <button onClick={() => props.deleteItem(props.id)} style={{ float: 'right' }}>Delete</button>
      </div>
      {props.item.type === 'send-message' && (
        <input
          type="text"
          value={props.item.message}
          onChange={(e) => props.updateItemMessage(props.id, e.target.value)}
          placeholder="Enter message"
          style={{ marginTop: '5px', width: '100%' }}
        />
      )}
    </div>
  );
}