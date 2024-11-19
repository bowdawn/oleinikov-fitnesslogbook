import React, { ReactNode, forwardRef } from 'react';

interface ScrollableContainerProps {
  children: ReactNode;
}

const ScrollableContainer = forwardRef<HTMLDivElement, ScrollableContainerProps>(
  ({ children }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          height: '100vh',
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
      </div>
    );
  }
);

export default ScrollableContainer