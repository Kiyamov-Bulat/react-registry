import { FC, MouseEventHandler } from 'react';
import { ToggleProps } from '../../types';
import { useDropdownContext } from '../../lib';

export const Toggle: FC<ToggleProps> = ({
    children,
    className,
    onClick,
    ...props
}) => {
    const { anchorRef, setOpened } = useDropdownContext();

    const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
        setOpened((prevState) => !prevState);
        onClick?.(e);
    };

    return (
        <div
            ref={anchorRef}
            className={className}
            onClick={handleClick}
            data-component={'toggle'}
            {...props}
        >
            {children}
        </div>
    );
};
