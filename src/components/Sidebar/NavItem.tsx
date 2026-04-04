import { Flex, Icon, Text, Tooltip } from '@chakra-ui/react';
import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NavItemProps } from './Sidebar.interface';

const NavItem = ({
  icon,
  children,
  path,
  handleClick,
  isCollapsed,
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
      style={{ textDecoration: 'none', display: 'block', marginBottom: '2px' }}
      onClick={handleClick}>
      <Tooltip
        label={isCollapsed ? children : undefined}
        placement="right"
        borderRadius="lg"
        hasArrow>
        <Flex
          align="center"
          justify={isCollapsed ? 'center' : 'flex-start'}
          px={isCollapsed ? 2 : 3}
          py="10px"
          borderRadius="xl"
          role="group"
          cursor="pointer"
          fontSize="sm"
          fontWeight={isActiveItem ? '600' : '500'}
          transition="all 0.15s"
          _hover={{
            bg: isActiveItem ? 'brand.500' : 'gray.50',
            color: isActiveItem ? 'white' : 'gray.900',
          }}
          bg={isActiveItem ? 'brand.500' : 'transparent'}
          color={isActiveItem ? 'white' : 'gray.600'}
          {...rest}>
          {icon && (
            <Icon
              mr={isCollapsed ? 0 : 3}
              fontSize="18"
              transition="all 0.15s"
              _groupHover={{
                color: isActiveItem ? 'white' : 'brand.500',
              }}
              color={isActiveItem ? 'white' : 'gray.400'}
              as={icon}
            />
          )}
          {!isCollapsed && <Text>{children}</Text>}
        </Flex>
      </Tooltip>
    </Link>
  );
};

export default NavItem;
