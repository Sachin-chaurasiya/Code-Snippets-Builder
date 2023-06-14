import { ROUTES } from 'constants/common';
import { Step } from 'react-joyride';

export const getTourStepsByRoute = (route: string): Step[] => {
  switch (route) {
    case ROUTES.DASHBOARD:
      return [
        {
          content: 'These are the templates you can use right away.',
          target: '#templates',
        },
        {
          content: 'You can find the list of snippets you created here.',
          target: '#your-snippets',
        },
        {
          content: 'To add a new snippet, click here.',
          target: '#add-snippet-button',
        },
      ];
    case ROUTES.EDITOR:
      return [
        {
          content:
            'You can use the snippet area to easily create snippets by dragging and dropping nodes.',
          target: '#react-flow-id',
        },
        {
          content:
            'To add a code editor to the snippet, drag and drop the Editor node.',
          target: '#editorNode',
        },
        {
          content: 'To add text to the snippet, drag and drop the Text node.',
          target: '#textNode',
        },
        {
          content:
            'To add an image to the snippet, drag and drop the Image node.',
          target: '#imageNode',
        },
        {
          content:
            'Customize the selected node, snippet background, profile information, and watermark configurations in the editor sidebar.',
          target: '#editor-sidebar',
        },
      ];

    default:
      return [];
  }
};
