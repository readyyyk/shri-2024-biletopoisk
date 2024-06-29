import { type FC, type ReactNode } from 'react';

import ReactDOM from 'react-dom';

import { cn } from '@/utils/cn.ts';

interface ModalProps {
    children: ReactNode;
    isOpen: boolean;
    onClose: () => void;
}

const Modal: FC<ModalProps> = ({ children, isOpen, onClose }) => {
    return ReactDOM.createPortal(
        <div
            onClick={onClose}
            className={cn(
                'fixed inset-0 grid place-items-center bg-neutral-800 bg-opacity-50 backdrop-blur-sm transition opacity-100 duration-300',
                isOpen ? 'z-50' : '-z-50 opacity-0',
            )}
        >
            <div onClick={(e) => e.stopPropagation()}>{children}</div>
        </div>,
        document.body,
    );
};

export default Modal;
