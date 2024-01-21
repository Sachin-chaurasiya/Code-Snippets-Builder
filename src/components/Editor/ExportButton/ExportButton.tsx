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
import { BRAND_BORDER_RADIUS } from 'constants/common';

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
        // we don't want to add the minimap and the controls to the image
        if (
          node?.classList?.contains('react-flow__minimap') ||
          node?.classList?.contains('react-flow__controls')
        ) {
          return false;
        }

        return true;
      },
      quality: 1,
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
          title: 'Copy Image',
          description: 'Image copied to clipboard successfully!',
          status: 'success',
          duration: 9000,
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
          _hover={{
            bg: 'brand.500',
          }}
          bg="brand.500"
          borderRadius={BRAND_BORDER_RADIUS}
          color="white"
          isLoading={isDownLoading}
          variant="solid"
          leftIcon={<BiExport />}>
          Export
        </Button>
      </MenuButton>
      <MenuList zIndex={5}>
        <MenuItem icon={<BsImage />} onClick={handlePngExport}>
          Save PNG
        </MenuItem>
        <MenuItem icon={<BsImage />} onClick={handleJpegExport}>
          Save JPEG
        </MenuItem>
        <MenuItem icon={<BsImage />} onClick={handleSvgExport}>
          Save SVG
        </MenuItem>
        <MenuItem icon={<BiClipboard />} onClick={handleClipboardExport}>
          Copy Image
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ExportButton;
