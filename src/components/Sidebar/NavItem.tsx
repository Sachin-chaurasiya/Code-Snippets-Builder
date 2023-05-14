import { Flex, FlexProps, Icon, Link } from '@chakra-ui/react';
import { ReactNode, useMemo } from 'react';
import { IconType } from 'react-icons';
import { useLocation } from 'react-router-dom';

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactNode;
  path: string;
}

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
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'gray.700',
          color: 'white',
        }}
        bg={isActiveItem ? 'gray.700' : ''}
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
