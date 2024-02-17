import React, { useState } from 'react';
import { Menu, MenuButton, MenuList, MenuItem } from '@reach/menu-button';
import { FaChevronDown } from 'react-icons/fa';

type MenuItemType = {
    label: string;
    value: string;
};

type MenuProps = {
    initialValue: string;
    items: MenuItemType[];
    onChange: (value: string) => void;
};

export const DropdownMenu: React.FC<MenuProps> = ({
    initialValue,
    items,
    onChange
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(initialValue);

    const handleSelect = (value: string) => {
        setSelectedValue(value);
        onChange(value);
        setIsOpen(false);
    };

    return (
        <Menu isOpen={isOpen} onDismiss={() => setIsOpen(false)}>
            <MenuButton>
                {selectedValue} <FaChevronDown />
            </MenuButton>
            <MenuList>
                {items.map((item) => (
                    <MenuItem
                        key={item.value}
                        onSelect={() => handleSelect(item.value)}
                    >
                        {item.label}
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
    );
};
