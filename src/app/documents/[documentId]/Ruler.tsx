'use client';
import { useRef, useState } from 'react';
import { FaCaretDown } from 'react-icons/fa';
const markers = Array.from({ length: 83 }, (_, i) => i);
const PAGE_WIDTH = 816;
const MINIMUM_SPACE = 100;
export const Ruler = () => {
  const [leftMargin, setLeftMargin] = useState(56);
  const [rightMargin, setRightMargin] = useState(56);
  const [isDraggingLeft, setIsDraggingLeft] = useState(false);
  const [isDraggingRight, setIsDraggingRight] = useState(false);
  const rulerRef = useRef<HTMLDivElement>(null);

  const handleLeftMouseDown = () => {
    setIsDraggingLeft(true);
  };

  const handleRightMouseDown = () => {
    setIsDraggingRight(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if ((isDraggingLeft || isDraggingRight) && rulerRef.current) {
      const container = rulerRef.current.querySelector('#ruler-container');
      if (container) {
        const containerRect = container.getBoundingClientRect();
        const relativeX = e.clientX - containerRect.left;
        const rawPosition = Math.max(0, Math.min(PAGE_WIDTH, relativeX));

        if (isDraggingLeft) {
          const maxLeftPosition = PAGE_WIDTH - rightMargin - MINIMUM_SPACE;
          const newLeftPosition = Math.max(
            0,
            Math.min(rawPosition, maxLeftPosition)
          );
          setLeftMargin(newLeftPosition); //TODO: make collabative
        } else if (isDraggingRight) {
          const maxRightPosition = PAGE_WIDTH - (leftMargin + MINIMUM_SPACE);
          const newRightPosition = Math.max(PAGE_WIDTH - rawPosition, 0);
          const constrainedRightPosition = Math.min(
            newRightPosition,
            maxRightPosition
          );
          setRightMargin(constrainedRightPosition);
        }
      }
    }
  };

  const handleMouseUp = () => {
    setIsDraggingLeft(false);
    setIsDraggingRight(false);
  };
  const handleDoubleLeftClick = () => {
    setLeftMargin(56);
  };
  const handleDoubleRightClick = () => {
    setRightMargin(56);
  };
  return (
    <div
      className='h-6 border-b border-gray-300 flex items-end relative select-none print:hidden'
      ref={rulerRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div
        id='ruler-container'
        className='max-w-[816px] mx-auto size-full relative'
      >
        <Marker
          position={leftMargin}
          isLeft={true}
          isDragging={isDraggingLeft}
          onMouseDown={handleLeftMouseDown}
          onDoubleClick={handleDoubleLeftClick}
        />
        <Marker
          position={rightMargin}
          isLeft={false}
          isDragging={isDraggingRight}
          onMouseDown={handleRightMouseDown}
          onDoubleClick={handleDoubleRightClick}
        />
        <div className='absolute inset-x-0 bottom-0 h-full'>
          <div className='relative h-full w-[816px]'>
            {markers.map((marker) => {
              const positions = (marker * PAGE_WIDTH) / 82;
              return (
                <div
                  key={marker}
                  className='absolute bottom-0'
                  style={{ left: `${positions}px` }}
                >
                  {marker % 10 === 0 && (
                    <>
                      <div className='absolute bottom-0 w-[1px] h-2 bg-neutral-500' />
                      <span className='absolute bottom-2 text-[10px] text-neutral-500 transform -translate-x-1/2'>
                        {marker / 10 + 1}
                      </span>
                    </>
                  )}
                  {marker % 5 === 0 && marker % 10 !== 0 && (
                    <div className='absolute bottom-0 w-[1px] h-1.5 bg-neutral-500' />
                  )}
                  {marker % 5 !== 0 && (
                    <div className='absolute bottom-0 w-[1px] h-1 bg-neutral-500' />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

interface MarkerProps {
  position: number;
  isLeft: boolean;
  isDragging: boolean;
  onMouseDown: () => void;
  onDoubleClick: () => void;
}

const Marker = ({
  position,
  isLeft,
  isDragging,
  onMouseDown,
  onDoubleClick,
}: MarkerProps) => {
  return (
    <div
      className='absolute top-0 h-full w-4 cursor-ew-resize z-[5] group -ml-2'
      style={{ [isLeft ? 'left' : 'right']: `${position}px` }}
      onMouseDown={onMouseDown}
      onDoubleClick={onDoubleClick}
    >
      <FaCaretDown className='absolute top-0 left-1/2 -translate-x-1/2  fill-blue-500' />
      <div
        className='absolute top-4 left-1/2 transform -translate-x-1/2'
        style={{
          height: '100vh',
          width: '1px',
          transform: 'scaleX(0.5)',
          backgroundColor: '#3b72f6',
          display: isDragging ? 'block' : 'none',
        }}
      />
    </div>
  );
};
