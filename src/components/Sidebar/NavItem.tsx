import { Flex, Icon, Link } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { NavItemProps } from './Sidebar.interface';
import { PRIMARY_GRADIENT_COLOR } from 'constants/common';

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
      href={path}
      style={{ textDecoration: 'none', marginBottom: '4px', display: 'block' }}
      _focus={{ boxShadow: 'none' }}
      onClick={handleClick}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius={4}
        role="group"
        cursor="pointer"
        _hover={{
          bgGradient: PRIMARY_GRADIENT_COLOR,
          color: 'white',
        }}
        bgGradient={isActiveItem ? PRIMARY_GRADIENT_COLOR : ''}
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
