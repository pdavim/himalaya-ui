'use client';
import React from 'react';
import useTheme from '../use-theme';
import LinkIcon from './icon';
import { addColorAlpha } from '../utils/color';
import useScale, { withScale } from '../use-scale';
import useClasses from '../use-classes';

export interface Props {
  href?: string;
  color?: boolean;
  icon?: boolean;
  underline?: boolean;
  block?: boolean;
  className?: string;
}

type NativeAttrs = Omit<React.AnchorHTMLAttributes<any>, keyof Props>;
export type LinkProps = Props & NativeAttrs;

const LinkComponent = React.forwardRef<HTMLAnchorElement, React.PropsWithChildren<LinkProps>>(
  (
    { href = '', color = false, underline = false, children, className = '', block = false, icon = false, ...props }: React.PropsWithChildren<LinkProps>,
    ref: React.Ref<HTMLAnchorElement>,
  ) => {
    const theme = useTheme();
    const { SCALES } = useScale();
    const linkColor = color || block ? theme.palette.link.value : 'inherit';
    const hoverColor = color || block ? theme.palette.link.light : 'inherit';
    const decoration = underline ? 'underline' : 'none';
    const classes = useClasses('link', { block }, className);

    return (
      <a className={classes} href={href} {...props} ref={ref}>
        {children}
        {icon && <LinkIcon />}
        <style jsx>{`
          .link {
            display: inline-flex;
            align-items: baseline;
            line-height: inherit;
            color: ${linkColor};
            text-decoration: none;
            border-radius: ${block ? theme.style.radius : 0};
            transition: color 200ms ease 0ms;
            font-size: ${SCALES.font(1, 'inherit')};
            width: ${SCALES.width(1, 'fit-content')};
            height: ${SCALES.height(1, 'auto')};
            margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
            padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)} ${SCALES.pl(0)};
            text-decoration: ${decoration};
          }
          .block {
            padding: ${SCALES.pt(0.125)} ${SCALES.pr(0.25)} ${SCALES.pb(0.125)} ${SCALES.pl(0.25)};
            margin: ${SCALES.mt(0)} ${SCALES.mr(-0.125)} ${SCALES.mb(0)} ${SCALES.ml(-0.125)};
          }

          .link:hover {
            background-color: ${block ? addColorAlpha(theme.palette.link.light, 0.1) : 'unset'};
            color: ${hoverColor};
          }
        `}</style>
      </a>
    );
  },
);

LinkComponent.displayName = 'HimalayaLink';
const Link = withScale(LinkComponent);
export default Link;
