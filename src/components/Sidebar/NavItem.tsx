import { Flex, Icon, Link } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { NavItemProps } from './Sidebar.interface';

const NavItem = ({ icon, children, path, ...rest }: NavItemProps) => {
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
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius={4}
        role="group"
        cursor="pointer"
        _hover={{
          background:
            'linear-gradient(135deg, rgb(102, 126, 234), rgb(118, 75, 162))',
          color: 'white',
        }}
        background={
          isActiveItem
            ? 'linear-gradient(135deg, rgb(102, 126, 234), rgb(118, 75, 162))'
            : ''
        }
        color={isActiveItem ? 'white' : ''}
        {...rest}
      >
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
