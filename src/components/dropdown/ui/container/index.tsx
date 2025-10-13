import { FC, useMemo, useRef, useState } from 'react';
import { DropdownContext, dropdownContext } from '../../lib';
import { DropdownProps } from '../../types';
import s from './styles.module.scss';
import cx from 'classnames';

export const Container: FC<DropdownProps> = ({
    children,
    className,
    ...props
}) => {
    const anchorRef = useRef<HTMLDivElement>(null);
    const [opened, setOpened] = useState(false);
    const context = useMemo<DropdownContext>(
        () => ({ anchorRef, setOpened, opened }),
        [opened]
    );

    return (
        <dropdownContext.Provider value={context}>
            <div
                className={cx(s.container, className)}
                data-component={'dropdown'}
                {...props}
            >
                {children}
            </div>
        </dropdownContext.Provider>
    );
};
