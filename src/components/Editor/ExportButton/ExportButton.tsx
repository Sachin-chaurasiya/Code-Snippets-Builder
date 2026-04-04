import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useToast,
} from '@chakra-ui/react';
import { toBlob, toJpeg, toPng, toSvg } from 'html-to-image';
import React, { useState } from 'react';
import { BiClipboard, BiExport } from 'react-icons/bi';
import { BsImage } from 'react-icons/bs';
import { ExportImageConfig } from './ExportButton.interface';

const ExportButton = () => {
  const toast = useToast();
  const [isDownLoading, setIsDownLoading] = useState<boolean>(false);

  const downloadImage = (dataUrl: string, extension: string) => {
    const a = document.createElement('a');

    a.setAttribute('download', `snippet.${extension}`);
    a.setAttribute('href', dataUrl);
    a.click();
  };

  const EXPORT_IMAGE_CONFIG: ExportImageConfig = {
    node: document.querySelector('.react-flow') as HTMLElement,
    options: {
      filter: (node) => {
        if (
          node?.classList?.contains('react-flow__minimap') ||
          node?.classList?.contains('react-flow__controls')
        ) {
          return false;
        }

        return true;
      },
      quality: 1,
      skipAutoScale: true,
      pixelRatio: 6,
    },
  };

  const handlePngExport = async () => {
    try {
      setIsDownLoading(true);
      const url = await toPng(
        EXPORT_IMAGE_CONFIG.node,
        EXPORT_IMAGE_CONFIG.options
      );
      downloadImage(url, 'png');
    } catch (error) {
      // handle error
    } finally {
      setIsDownLoading(false);
    }
  };
  const handleJpegExport = async () => {
    try {
      setIsDownLoading(true);
      const url = await toJpeg(
        EXPORT_IMAGE_CONFIG.node,
        EXPORT_IMAGE_CONFIG.options
      );
      downloadImage(url, 'jpeg');
    } catch (error) {
      // handle error
    } finally {
      setIsDownLoading(false);
    }
  };
  const handleSvgExport = async () => {
    try {
      setIsDownLoading(true);
      const url = await toSvg(
        EXPORT_IMAGE_CONFIG.node,
        EXPORT_IMAGE_CONFIG.options
      );
      downloadImage(url, 'svg');
    } catch (error) {
      // handle error
    } finally {
      setIsDownLoading(false);
    }
  };
  const handleClipboardExport = async () => {
    try {
      setIsDownLoading(true);
      const blob = await toBlob(
        EXPORT_IMAGE_CONFIG.node,
        EXPORT_IMAGE_CONFIG.options
      );
      if (blob) {
        await navigator.clipboard.write([
          new ClipboardItem({
            [blob?.type ?? 'image/png']: blob,
          }),
        ]);
        toast({
          title: 'Copied!',
          description: 'Image copied to clipboard',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      }
    } catch (error) {
      // handle error
    } finally {
      setIsDownLoading(false);
    }
  };

  return (
    <Menu>
      <MenuButton>
        <Button
          id="export-button"
          as={Box}
          variant="brand"
          size="sm"
          isLoading={isDownLoading}
          leftIcon={<BiExport />}>
          Export
        </Button>
      </MenuButton>
      <MenuList
        zIndex={5}
        borderRadius="xl"
        shadow="lg"
        border="1px solid"
        borderColor="gray.100"
        py={2}>
        <MenuItem
          icon={<BsImage />}
          onClick={handlePngExport}
          fontSize="sm"
          _hover={{ bg: 'gray.50' }}>
          Save PNG
        </MenuItem>
        <MenuItem
          icon={<BsImage />}
          onClick={handleJpegExport}
          fontSize="sm"
          _hover={{ bg: 'gray.50' }}>
          Save JPEG
        </MenuItem>
        <MenuItem
          icon={<BsImage />}
          onClick={handleSvgExport}
          fontSize="sm"
          _hover={{ bg: 'gray.50' }}>
          Save SVG
        </MenuItem>
        <MenuItem
          icon={<BiClipboard />}
          onClick={handleClipboardExport}
          fontSize="sm"
          _hover={{ bg: 'gray.50' }}>
          Copy Image
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ExportButton;
