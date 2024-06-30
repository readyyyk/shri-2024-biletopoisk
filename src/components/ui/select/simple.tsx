'use client';

import { type FC, useId, useState } from 'react';

import Button from '@/components/ui/button.tsx';
import OptionsContainer from '@/components/ui/select/options-container.tsx';

import SelectIndicatorIcon from '@/components/icons/SelectIndicatorIcon.tsx';
import { cn } from '@/utils/cn.ts';

type Props = {
    options: [string, string][];
    placeholder: string;
    defaultValue?: [string, string];
    onValueChange: (value: string) => void;
    className?: string;
    optionsClassName?: string;
};

const Select: FC<Props> = (props) => {
    const id = useId();
    const [isOpen, setIsOpen] = useState(false);
    const [value, setValue] = useState(props.defaultValue ?? ['', '']);

    const handleSelect = (value: [string, string]) => {
        props.onValueChange(value[0]);
        setIsOpen(false);
        setValue(value);
    };

    const options = [
        ['', 'Не выбран'] satisfies [string, string],
        ...props.options,
    ].map((value) => (
        <Button
            className={cn(
                'rounded-none hover:bg-neutral-100 backdrop-blur justify-start',
                props.optionsClassName,
            )}
            key={'select-' + id + '-option-' + value[0]}
            value={value[0]}
            onClick={(e) => {
                e.stopPropagation();
                handleSelect(value);
                setIsOpen(false);
            }}
        >
            <span className="first-letter:uppercase">{value[1]}</span>
        </Button>
    ));

    return (
        <div className={cn('max-w-96 relative', props.className)}>
            <Button
                className={cn(
                    'w-full justify-between !border-b-light',
                    value[0] === '' && 'text-[#999FA6]',
                    isOpen && '!border-primary',
                )}
                onClick={() => setIsOpen((a) => !a)}
            >
                <span className="first-letter:uppercase">
                    {value[1] || props.placeholder}
                </span>
                <SelectIndicatorIcon
                    className={cn(
                        'transition duration-200',
                        isOpen ? 'rotate-0' : 'rotate-180',
                    )}
                />
            </Button>
            <OptionsContainer isOpen={isOpen} setIsOpen={setIsOpen}>
                {options}
            </OptionsContainer>
        </div>
    );
};

export default Select;
