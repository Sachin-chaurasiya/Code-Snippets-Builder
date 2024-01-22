import { Button, Image, Stack, Text, useToast } from '@chakra-ui/react';
import { API_CLIENT } from 'api';
import { BRAND_BORDER_RADIUS } from 'constants/common';
import { EMAIL_VERIFICATION_URL } from 'constants/links';
import React, { FC, useState } from 'react';
import EmailVerificationImage from 'assets/svg/email-sent.svg';

interface EmailVerificationProps {
  email: string;
}

const EmailVerification: FC<EmailVerificationProps> = ({ email }) => {
  const toast = useToast();
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

  return (
    <Stack spacing={4} align="center" justify="center" height="100vh">
      <Image
        src={EmailVerificationImage}
        alt="Email verification"
        width={{ lg: '400px', md: '400px', sm: '300px', base: '250px' }}
      />
      <Text fontSize="xl" mb={4} textAlign="center">
        We are excited to have you join our community. To complete your
        registration, please verify your email address <strong>{email}</strong>
      </Text>
      <Button
        isLoading={isSending}
        _hover={{
          bg: 'brand.500',
        }}
        bg="brand.500"
        borderRadius={BRAND_BORDER_RADIUS}
        color="white"
        size="lg"
        onClick={handleSendVerification}>
        Send verification link
      </Button>
    </Stack>
  );
};

export default EmailVerification;
