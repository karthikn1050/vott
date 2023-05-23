import React from 'react';
import {Resizable } from 're-resizable';
import Draggable from 'react-draggable';

const Circle = ({ position, radius, onDrag, onResize }) => {
  const handleDrag = (event, { deltaX, deltaY }) => {
    onDrag(deltaX, deltaY);
  };

  const handleResize = (event, direction, ref, delta) => {
    const width = radius * 2 + delta.width;
    const height = radius * 2 + delta.height;
    onResize(width, height);
  };

  return (
    <Draggable position={position} onDrag={handleDrag}>
      <Resizable
        size={{ width: radius * 2, height: radius * 2 }}
        onResize={handleResize}
        handleComponent={{
          top: <div className="handle top" />,
          right: <div className="handle right" />,
          bottom: <div className="handle bottom" />,
          left: <div className="handle left" />,
          topRight: <div className="handle top-right" />,
          bottomRight: <div className="handle bottom-right" />,
          bottomLeft: <div className="handle bottom-left" />,
          topLeft: <div className="handle top-left" />,
        }}
        enable={{
          top: true,
          right: true,
          bottom: true,
          left: true,
          topRight: true,
          bottomRight: true,
          bottomLeft: true,
          topLeft: true,
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            border: '2px solid red',
            borderRadius: '50%',
          }}
        />
      </Resizable>
    </Draggable>
  );
};

export default Circle;
