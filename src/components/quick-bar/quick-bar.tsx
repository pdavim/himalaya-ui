'use client';

import React, { PropsWithChildren } from 'react';
import useScale from '../use-scale';
import withScale from '../use-scale/with-scale';
import useTheme from '../use-theme';
import { QuickBarProps } from './share';

const QuickBar: React.FC<PropsWithChildren<QuickBarProps>> = ({ children }) => {
  const theme = useTheme();
  const { SCALES } = useScale();

  return (
    <div className="quick-bar">
      <div className="quick-bar-inner">{children}</div>
      <style jsx>{`
        .quick-bar-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          height: ${SCALES.height(1, 'auto')};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
          padding: ${SCALES.pt(0.75)} ${SCALES.pr(0.75)} ${SCALES.pb(0.75)} ${SCALES.pl(0.75)};
        }

        .quick-bar {
          width: calc(var(--quickbar-width) - 1px);
          left: var(--quickbar-position);
          top: 0;
          height: 100%;
          position: fixed;
          background: ${theme.palette.background};
          border-right: 1px solid ${theme.palette.border};
          transition: all var(--quickbar-transition) ease;
          transform: translateX(var(--quickbar-position, 0));
        }
      `}</style>
    </div>
  );
};

QuickBar.displayName = 'HimalayaQuickBar';
export default withScale(QuickBar);
