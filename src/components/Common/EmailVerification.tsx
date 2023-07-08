import { Button, Stack, Text, useToast } from '@chakra-ui/react';
import { API_CLIENT } from 'api';
import { PRIMARY_GRADIENT_COLOR } from 'constants/common';
import { EMAIL_VERIFICATION_URL } from 'constants/links';
import React, { FC, useState } from 'react';

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
      <Text fontSize="xl" mb={4} textAlign="center">
        We are excited to have you join our community. To complete your
        registration, please verify your email address <strong>{email}</strong>
      </Text>
      <Button
        isLoading={isSending}
        _hover={{
          bgGradient: PRIMARY_GRADIENT_COLOR,
        }}
        bgGradient={PRIMARY_GRADIENT_COLOR}
        color="white"
        size="lg"
        onClick={handleSendVerification}>
        Send verification link
      </Button>
    </Stack>
  );
};

export default EmailVerification;
