import {
  Button,
  ButtonGroup,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { Query } from 'appwrite';
import { map } from 'lodash';
import React, { FC, useEffect, useRef, useState } from 'react';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import { BsArrowDown, BsArrowUp } from 'react-icons/bs';

interface SortingProps {
  onChange: (query: string) => void;
}

export const SORTING_OPTIONS = ['$createdAt', '$updatedAt'];
export const SORTING_OPTIONS_LABELS = {
  $createdAt: 'Creation Date',
  $updatedAt: 'Last Modified',
};
export enum SORTING_ORDER {
  ASC = 'asc',
  DESC = 'desc',
}

const Sorting: FC<SortingProps> = ({ onChange }) => {
  const isMounted = useRef<boolean>(false);
  const [field, setField] = useState<string>(SORTING_OPTIONS[0]);
  const [order, setOrder] = useState<string>(SORTING_ORDER.DESC);

  const handleChange = () => {
    if (order === SORTING_ORDER.ASC) {
      onChange(Query.orderAsc(field));
    } else {
      onChange(Query.orderDesc(field));
    }
  };

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      handleChange();
    }
  }, [field, order]);

  return (
    <ButtonGroup size="sm" isAttached variant="outline">
      <Menu>
        {({ isOpen }) => (
          <>
            <MenuButton
              isActive={isOpen}
              as={Button}
              rightIcon={isOpen ? <BiChevronUp /> : <BiChevronDown />}>
              {
                SORTING_OPTIONS_LABELS[
                  field as keyof typeof SORTING_OPTIONS_LABELS
                ]
              }
            </MenuButton>
            <MenuList>
              {map(SORTING_OPTIONS, (option) => {
                return (
                  <MenuItem
                    key={option}
                    onClick={() => {
                      setField(option);
                    }}>
                    {
                      SORTING_OPTIONS_LABELS[
                        option as keyof typeof SORTING_OPTIONS_LABELS
                      ]
                    }
                  </MenuItem>
                );
              })}
            </MenuList>
          </>
        )}
      </Menu>
      <IconButton
        aria-label="Sort"
        icon={order === SORTING_ORDER.ASC ? <BsArrowUp /> : <BsArrowDown />}
        onClick={() => {
          setOrder(
            order === SORTING_ORDER.ASC ? SORTING_ORDER.DESC : SORTING_ORDER.ASC
          );
        }}
      />
    </ButtonGroup>
  );
};

export default Sorting;
