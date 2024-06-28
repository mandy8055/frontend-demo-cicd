import { PageContainerProps } from './types';

function PageContainer({ children, ...rest }: PageContainerProps) {
  return <main {...rest}>{children}</main>;
}
export default PageContainer;
