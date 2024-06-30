import { type FC, type ReactNode, Suspense } from 'react';

type Props = { children: ReactNode };

const Layout: FC<Props> = (props) => {
    return <Suspense>{props.children}</Suspense>;
};

export default Layout;
