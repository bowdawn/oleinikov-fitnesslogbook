import React from 'react';
import { Spin } from 'antd';

interface SpinnerConfig {
  condition: boolean;
  spinning: boolean;
  fullscreen: boolean;
  size?: 'small' | 'default' | 'large';
  tip?: string;
  progress?: number;
}

interface CustomSpinContainerProps {
  spinners: SpinnerConfig[];
}

const CustomSpinContainer: React.FC<CustomSpinContainerProps> = ({ spinners }) => {
  return (
    <div
      style={{
        position: 'absolute',
        width: '100%',
        zIndex: 1001,
        pointerEvents: 'none',
      }}
    >
      {spinners.map((spinner, index) =>
        spinner.condition ? (
          <Spin
            key={index}
            spinning={spinner.spinning}
            fullscreen={spinner.fullscreen}
            size={spinner.size || 'default'}
            tip={spinner.tip}
            percent={spinner?.progress ? spinner?.progress : undefined}
          />
        ) : null
      )}
    </div>
  );
};

export default CustomSpinContainer;
