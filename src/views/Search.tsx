import { type FC, useState } from 'react';

import ArrowRightButton from '@/components/ui/ArrowRightButton.tsx';
import Input from '@/components/ui/input.tsx';
import { Option, Select } from '@/components/ui/select';

import StarIcon from '@/icons/StarIcon.tsx';

import Button from '../components/ui/button.tsx';

const SearchView: FC = () => {
    const [value, setValue] = useState('');
    return (
        <div className="flex flex-col items-center gap-4 mt-4">
            <Button variant="filled">123</Button>
            <Button variant="outlined">123</Button>
            <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                crossIconProps={{ className: 'hidden' }}
            />
            <Input
                search
                value={value}
                onChange={(e) => setValue(e.target.value)}
                crossIconProps={{ onClick: () => setValue('') }}
            />
            <ArrowRightButton />
            <Select onValueChange={(a) => console.log(a)} placeholder="Select">
                <Option value="123">123</Option>
                <Option value="1234">1235</Option>
                <Option value="old">not new</Option>
            </Select>
            <StarIcon className="w-6 h-6 hover:fill-current fill-transparent" />
            (to change) hover:text-primary
        </div>
    );
};

export default SearchView;
