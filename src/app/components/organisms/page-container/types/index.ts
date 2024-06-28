import { type HTMLAttributes, type ReactNode } from 'react';

interface PageContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export { type PageContainerProps };
