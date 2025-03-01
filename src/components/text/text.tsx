'use client';

import React, { ReactNode, useMemo } from 'react';
import { GradientPositions } from '../themes/presets';
import { withScale } from '../use-scale';
import { NormalTypes } from '../utils/prop-types';
import TextChild from './child';
import { TextColor } from './shared';

export type TextTypes = NormalTypes;
interface Props {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  lineHeight?: number;
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  h4?: boolean;
  h5?: boolean;
  h6?: boolean;
  p?: boolean;
  b?: boolean;
  small?: boolean;
  i?: boolean;
  span?: boolean;
  del?: boolean;
  em?: boolean;
  blockquote?: boolean;
  className?: string;
  stroke?: number | string;
  type?: TextTypes;
  color?: TextColor;
  gradientDegress?: GradientPositions | number;
}

type ElementMap = { [key in keyof React.JSX.IntrinsicElements]?: boolean };

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>;
export type TextProps = Props & NativeAttrs;

type TextRenderableElements = Array<keyof React.JSX.IntrinsicElements>;

const getModifierChild = (tags: TextRenderableElements, children: ReactNode) => {
  if (!tags.length) return children;
  const nextTag = tags.slice(1, tags.length);
  return <TextChild tag={tags[0]}>{getModifierChild(nextTag, children)}</TextChild>;
};

const TextComponent: React.FC<React.PropsWithChildren<TextProps>> = ({
  h1 = false,
  h2 = false,
  h3 = false,
  h4 = false,
  h5 = false,
  h6 = false,
  p = false,
  b = false,
  small = false,
  i = false,
  span = false,
  del = false,
  em = false,
  blockquote = false,
  children,
  className = '',
  lineHeight,
  ...props
}: React.PropsWithChildren<TextProps>) => {
  const elements: ElementMap = { h1, h2, h3, h4, h5, h6, p, blockquote };
  const inlineElements: ElementMap = { span, small, b, em, i, del };
  const names = Object.keys(elements).filter((name: keyof React.JSX.IntrinsicElements) => elements[name]) as TextRenderableElements;
  const inlineNames = Object.keys(inlineElements).filter((name: keyof React.JSX.IntrinsicElements) => inlineElements[name]) as TextRenderableElements;

  /**
   *  Render element "p" only if no element is found.
   *  If there is only one modifier, just rendered one modifier element
   *  e.g.
   *    <Text /> => <p />
   *    <Text em /> => <em />
   *    <Text p em /> => <p><em>children</em></p>
   *
   */

  const tag = useMemo(() => {
    if (names[0]) return names[0];
    if (inlineNames[0]) return inlineNames[0];
    return 'p' as keyof React.JSX.IntrinsicElements;
  }, [names, inlineNames]);

  const renderableChildElements = inlineNames.filter((name: keyof React.JSX.IntrinsicElements) => name !== tag) as TextRenderableElements;

  const modifers = useMemo(() => {
    if (!renderableChildElements.length) return children;
    return getModifierChild(renderableChildElements, children);
  }, [renderableChildElements, children]);

  return (
    <TextChild lineHeight={lineHeight} className={className} tag={tag} {...props}>
      {modifers}
    </TextChild>
  );
};

TextComponent.displayName = 'HimalayaText';
const Text = withScale(TextComponent);
export default Text;
