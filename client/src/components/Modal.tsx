import React, { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { MdClose } from 'react-icons/md'; // Make sure to import the MdClose icon

type ModalProps = {
    children: React.ReactNode;
    isEventOpen: boolean;
    closeEvent: () => void;
    removable?: boolean;
};

const Modal = ({
    children,
    isEventOpen,
    closeEvent,
    removable
}: ModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);

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
    }, [modalRef, closeEvent, removable]);

    if (!isEventOpen) {
        return null;
    }

    return createPortal(
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-10 flex items-center justify-center">
            <div className="relative " ref={modalRef}>
                {removable && (
                    <div
                        className="absolute top-2 z-20 right-4  cursor-pointer"
                        onClick={() => {
                            closeEvent();
                        }}
                    >
                        <MdClose size={33} />
                    </div>
                )}
                {children}
            </div>
        </div>,
        document.body
    );
};

export default Modal;
