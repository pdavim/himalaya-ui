'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { PropsWithChildren } from 'react';
import useScale, { withScale } from '../use-scale';
import useTheme from '../use-theme';

export interface Props {
  icon?: React.ReactNode;
  activeColor?: string;
  activeBackground?: string;
}

type NativeAttrs = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof Props>;
export type SideBarLinkProp = Props & NativeAttrs;

const SidebarLink: React.FC<PropsWithChildren<SideBarLinkProp>> = ({ children, icon, activeColor, activeBackground, href, ...props }) => {
  const theme = useTheme();
  const pathname = usePathname();
  const { SCALES } = useScale();

  const isActive = pathname === href;

  return (
    <Link legacyBehavior href={href || ''}>
      <a {...props} className={`sidebar-link ${isActive ? 'active' : ''}`}>
        {icon && <span className="sidebar-link-icon">{icon}</span>}
        <span className="sidebar-link-title">{children}</span>
        <style jsx>{`
          .sidebar-link-title {
          }
          .sidebar-link .sidebar-link-icon {
            margin-right: 12px;
            color: ${theme.palette.accents_3};
            transition: all 200ms ease;
            display: inline-flex;
          }

          .sidebar-link {
            display: flex;
            align-items: baseline;
            font-size: ${SCALES.font(0.85)};
            color: ${theme.palette.accents_5};
            margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
            padding: ${SCALES.pt(0.6)} 0 ${SCALES.pb(0.6)} 0;

            padding-left: ${SCALES.pl(0.6)};
            padding-right: ${SCALES.pl(0.6)};
            box-sizing: border-box;
            align-self: stretch;
            transition: all 200ms ease;
            align-items: center;
          }

          .sidebar-link:hover {
            color: ${theme.palette.foreground};
          }

          .sidebar-link:hover .sidebar-link-icon {
            color: ${theme.palette.foreground};
          }

          .sidebar-link.active {
            background: ${activeBackground || theme.palette.secondary.light};
          }

          .sidebar-link.active .sidebar-link-title,
          .sidebar-link.active .sidebar-link-icon {
            color: ${activeColor || theme.palette.secondary.contrast};
          }
        `}</style>
      </a>
    </Link>
  );
};

export default withScale(SidebarLink);
