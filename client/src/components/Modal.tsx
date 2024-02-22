import React, { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useModelStore } from '../stores/ModelStore';

type ModalProps = {
    children: React.ReactNode;
    removable?: boolean;
};

const Modal = ({ children, removable }: ModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const { isEventOpen, closeEvent } = useModelStore();

    useEffect(() => {
        if (removable) {
            const handleClickOutside = (event: MouseEvent) => {
                if (
                    modalRef.current &&
                    !modalRef.current.contains(event.target as Node)
                ) {
                    closeEvent();
                }
            };

            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }
    }, [modalRef, closeEvent]);

    if (!isEventOpen) {
        return null;
    }

    return createPortal(
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-10 flex items-center justify-center">
            <div ref={modalRef}>{children}</div>
        </div>,
        document.body
    );
};

export default Modal;
