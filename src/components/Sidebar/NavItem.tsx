import { Flex, Icon } from '@chakra-ui/react';
import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NavItemProps } from './Sidebar.interface';

const NavItem = ({
  icon,
  children,
  path,
  handleClick,
  ...rest
}: NavItemProps) => {
  const location = useLocation();

  const isActiveItem = useMemo(
    () => location.pathname === path,
    [path, location]
  );

  return (
    <Link
      to={path}
      style={{ textDecoration: 'none', marginBottom: '4px', display: 'block' }}
      onClick={handleClick}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius={4}
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'brand.500',
          color: 'white',
        }}
        bg={isActiveItem ? 'brand.500' : ''}
        color={isActiveItem ? 'white' : ''}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

export default NavItem;
