import {
    type FC,
    type HTMLAttributes,
    type ReactNode,
    useCallback,
} from 'react';

import Button from '@/components/ui/button.tsx';
import OptionsContainer from '@/components/ui/select/options-container.tsx';
import {
    SelectContextProvider,
    useSelectContext,
} from '@/components/ui/select/select-context.tsx';

import SelectIndicatorIcon from '@/icons/SelectIndicatorIcon.tsx';
import { cn } from '@/utils/cn.ts';

const CurrentValue: FC<{ placeholder?: string }> = (props) => {
    const { value, isOpen, setIsOpen } = useSelectContext();
    const handler = useCallback(() => setIsOpen((a) => !a), [setIsOpen]);

    const placeholder = props.placeholder ?? 'Select value';
    return (
        <Button
            className={cn(
                'w-full justify-between border-b-light',
                !value ? 'text-[#999FA6]' : '',
                isOpen ? '!border-primary' : '',
            )}
            onClick={handler}
        >
            <span className="first-letter:uppercase">
                {value || placeholder}
            </span>
            <SelectIndicatorIcon
                className={cn(
                    'transition duration-200',
                    isOpen ? 'rotate-0' : 'rotate-180',
                )}
            />
        </Button>
    );
};

type Props<T extends string> = HTMLAttributes<HTMLDivElement> & {
    onOpenChange?: (isOpen: boolean) => void;
    onValueChange?: (value: T) => void;
    defaultValue?: string;
    placeholder?: string;
    children: ReactNode;
};
const Select: FC<Props<string>> = ({
    children,
    onValueChange,
    onOpenChange,
    placeholder,
    defaultValue,
    className,
    ...props
}) => {
    return (
        <SelectContextProvider
            onValueChange={onValueChange}
            onOpenChange={onOpenChange}
            defaultValue={defaultValue}
        >
            <div {...props} className={cn('max-w-96 relative', className)}>
                <CurrentValue placeholder={placeholder} />
                <OptionsContainer> {children} </OptionsContainer>
            </div>
        </SelectContextProvider>
    );
};

export default Select;
