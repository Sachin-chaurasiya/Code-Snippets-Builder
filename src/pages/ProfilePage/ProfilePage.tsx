import {
  Avatar,
  Badge,
  Box,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  Tooltip,
  useToast,
  VStack,
  Icon,
} from '@chakra-ui/react';
import { useAppProvider } from 'AppProvider';
import { API_CLIENT } from 'api';
import { AppwriteException } from 'appwrite';
import Loader from 'components/Common/Loader/Loader';
import UpdateButton from 'components/Common/UpdateButton';
import { EMAIL_VERIFICATION_URL } from 'constants/links';
import { isEqual } from 'lodash';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { getFormattedDate } from 'utils/DateTimeUtils';
import { FiCheck, FiUser, FiLock, FiShare2 } from 'react-icons/fi';

interface StringDataState {
  current: string;
  updated: string;
  hasChanged: boolean;
  isUpdating: boolean;
}

interface PasswordDataState extends StringDataState {
  oldPassword: string;
}

const initialNameState = {
  current: '',
  updated: '',
  hasChanged: false,
  isUpdating: false,
};

const initialPasswordState = {
  current: '',
  updated: '',
  hasChanged: false,
  isUpdating: false,
  oldPassword: '',
};

const SettingsCard = ({
  icon,
  title,
  description,
  children,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  children: React.ReactNode;
}) => (
  <Box
    bg="white"
    borderRadius="xl"
    border="1px solid"
    borderColor="gray.100"
    overflow="hidden">
    <Stack
      direction={{ base: 'column', md: 'row' }}
      spacing={6}
      p={6}
      align="start">
      <VStack align="start" spacing={2} flex={1} minW="200px">
        <Flex align="center" gap={2}>
          <Flex
            w={8}
            h={8}
            borderRadius="lg"
            bg="brand.50"
            align="center"
            justify="center">
            <Icon as={icon} color="brand.500" fontSize="sm" />
          </Flex>
          <Heading as="h6" size="sm" color="gray.900">
            {title}
          </Heading>
        </Flex>
        <Text fontSize="xs" color="gray.500" pl={10}>
          {description}
        </Text>
      </VStack>
      <Stack direction="column" flex={1.5} spacing={4} w="full">
        {children}
      </Stack>
    </Stack>
  </Box>
);

const ProfilePage = () => {
  const toast = useToast();

  const { loggedInUser, isFetchingUser, handleUpdateLoggedInUser } =
    useAppProvider();

  const [nameState, setNameState] = useState<StringDataState>(initialNameState);

  const [prefState, setPrefState] = useState<Record<string, string>>({
    twitter: '',
    linkedin: '',
    github: '',
  });

  const [passwordState, setPasswordState] =
    useState<PasswordDataState>(initialPasswordState);

  const [isUpdatingPrefs, setIsUpdatingPrefs] = useState<boolean>(false);

  const [isSending, setIsSending] = useState<boolean>(false);

  const handleSendVerification = async () => {
    try {
      setIsSending(true);

      await API_CLIENT.account.createVerification(EMAIL_VERIFICATION_URL);
      toast({
        description: 'Verification link sent successfully!',
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      });
    } catch (error) {
      // handle error
    } finally {
      setIsSending(false);
    }
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    switch (name) {
      case 'name':
        setNameState((prev) => ({
          ...prev,
          updated: value,
          hasChanged: prev.current !== value,
        }));

        break;
      case 'password':
        setPasswordState((prev) => ({
          ...prev,
          updated: value,
          hasChanged: prev.current !== value,
        }));

        break;
      case 'oldpassword':
        setPasswordState((prev) => ({
          ...prev,
          oldPassword: value,
        }));

        break;

      default:
        break;
    }
  };

  const handlePrefChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setPrefState((prev) => ({ ...prev, [name]: value }));
  };

  const handleNameUpdate = async () => {
    try {
      setNameState((prev) => ({ ...prev, isUpdating: true }));
      const data = await API_CLIENT.account.updateName(nameState.updated);
      handleUpdateLoggedInUser(data);
      toast({
        description: 'Name updated successfully!',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
    } catch (error) {
      const exception = error as AppwriteException;
      toast({
        description: exception.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      });
    } finally {
      setNameState(initialNameState);
    }
  };

  const handlePrefUpdate = async () => {
    try {
      setIsUpdatingPrefs(true);
      const data = await API_CLIENT.account.updatePrefs(prefState);
      handleUpdateLoggedInUser(data);
      toast({
        description: 'Social usernames updated successfully!',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
    } catch (error) {
      const exception = error as AppwriteException;
      toast({
        description: exception.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      });
    } finally {
      setIsUpdatingPrefs(false);
    }
  };

  const handlePasswordUpdate = async () => {
    try {
      setPasswordState((prev) => ({ ...prev, isUpdating: true }));
      const data = await API_CLIENT.account.updatePassword(
        passwordState.updated,
        passwordState.oldPassword
      );
      handleUpdateLoggedInUser(data);
      toast({
        description: 'Password updated successfully!',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
    } catch (error) {
      const exception = error as AppwriteException;
      toast({
        description: exception.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      });
    } finally {
      setPasswordState(initialPasswordState);
    }
  };

  useEffect(() => {
    if (loggedInUser) {
      setNameState((prev) => ({
        ...prev,
        current: loggedInUser.name,
        updated: loggedInUser.name,
      }));
      setPrefState(loggedInUser.prefs);
    }
  }, [loggedInUser]);

  if (isFetchingUser) {
    return <Loader />;
  }

  return (
    <Box p={{ base: 4, md: 8 }} w="full">
      <Heading as="h3" size="lg" color="gray.900" mb={2}>
        Settings
      </Heading>
      <Text color="gray.500" fontSize="sm" mb={8}>
        Manage your account and preferences
      </Text>

      <Stack spacing={4}>
        {/* Profile header card */}
        <Box
          bg="white"
          borderRadius="xl"
          border="1px solid"
          borderColor="gray.100"
          p={6}>
          <Flex align="center" justify="space-between" flexWrap="wrap" gap={4}>
            <Flex align="center" gap={4}>
              <Avatar
                size="lg"
                name={loggedInUser?.name ?? loggedInUser?.email}
                bg="brand.500"
                color="white"
              />
              <VStack align="start" spacing={0}>
                <Flex align="center" gap={2}>
                  <Heading as="h5" size="sm" color="gray.900">
                    {loggedInUser?.name}
                  </Heading>
                  {loggedInUser?.emailVerification && (
                    <Tooltip label="Email verified" borderRadius="lg">
                      <Badge
                        colorScheme="green"
                        borderRadius="full"
                        px={2}
                        py={0.5}
                        fontSize="2xs"
                        display="flex"
                        alignItems="center"
                        gap={1}>
                        <FiCheck size={10} />
                        Verified
                      </Badge>
                    </Tooltip>
                  )}
                </Flex>
                <Text fontSize="sm" color="gray.500">
                  {loggedInUser?.email}
                </Text>
                <Text fontSize="xs" color="gray.400">
                  Joined {getFormattedDate(loggedInUser?.$createdAt ?? '')}
                </Text>
              </VStack>
            </Flex>

            {!loggedInUser?.emailVerification && (
              <UpdateButton
                isLoading={isSending}
                onClick={handleSendVerification}>
                Verify Email
              </UpdateButton>
            )}
          </Flex>
        </Box>

        {/* Name settings */}
        <SettingsCard
          icon={FiUser}
          title="Display Name"
          description="This name appears in the sidebar and on your snippets.">
          <FormControl id="name">
            <FormLabel fontSize="sm" fontWeight="500" color="gray.700">
              Name
            </FormLabel>
            <Input
              name="name"
              type="text"
              size="sm"
              borderRadius="lg"
              value={nameState.updated}
              onChange={handleOnChange}
            />
          </FormControl>
          <UpdateButton
            isDisabled={!nameState.hasChanged}
            isLoading={nameState.isUpdating}
            onClick={handleNameUpdate}>
            Save Changes
          </UpdateButton>
        </SettingsCard>

        {/* Social settings */}
        <SettingsCard
          icon={FiShare2}
          title="Social Profiles"
          description="Displayed on your snippet's profile badge.">
          <FormControl id="twitter">
            <FormLabel fontSize="sm" fontWeight="500" color="gray.700">
              Twitter
            </FormLabel>
            <Input
              name="twitter"
              type="text"
              size="sm"
              borderRadius="lg"
              placeholder="@username"
              value={prefState?.twitter ?? ''}
              onChange={handlePrefChange}
            />
          </FormControl>
          <FormControl id="github">
            <FormLabel fontSize="sm" fontWeight="500" color="gray.700">
              GitHub
            </FormLabel>
            <Input
              name="github"
              type="text"
              size="sm"
              borderRadius="lg"
              placeholder="username"
              value={prefState?.github ?? ''}
              onChange={handlePrefChange}
            />
          </FormControl>
          <FormControl id="linkedin">
            <FormLabel fontSize="sm" fontWeight="500" color="gray.700">
              LinkedIn
            </FormLabel>
            <Input
              name="linkedin"
              type="text"
              size="sm"
              borderRadius="lg"
              placeholder="username"
              value={prefState?.linkedin ?? ''}
              onChange={handlePrefChange}
            />
          </FormControl>
          <UpdateButton
            onClick={handlePrefUpdate}
            isLoading={isUpdatingPrefs}
            isDisabled={isEqual(loggedInUser?.prefs, prefState)}>
            Save Changes
          </UpdateButton>
        </SettingsCard>

        {/* Password settings */}
        <SettingsCard
          icon={FiLock}
          title="Password"
          description="Must be at least 8 characters long.">
          <FormControl id="oldpassword">
            <FormLabel fontSize="sm" fontWeight="500" color="gray.700">
              Current Password
            </FormLabel>
            <Input
              name="oldpassword"
              type="password"
              size="sm"
              borderRadius="lg"
              placeholder="Enter current password"
              value={passwordState.oldPassword}
              onChange={handleOnChange}
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel fontSize="sm" fontWeight="500" color="gray.700">
              New Password
            </FormLabel>
            <Input
              name="password"
              type="password"
              size="sm"
              borderRadius="lg"
              placeholder="Enter new password"
              value={passwordState.updated}
              onChange={handleOnChange}
            />
          </FormControl>
          <UpdateButton
            isDisabled={!passwordState.hasChanged}
            isLoading={passwordState.isUpdating}
            onClick={handlePasswordUpdate}>
            Update Password
          </UpdateButton>
        </SettingsCard>
      </Stack>
    </Box>
  );
};

export default ProfilePage;
