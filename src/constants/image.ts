import TypeScriptImage from 'assets/dev-icons/typescript.svg';
import JavaScriptImage from 'assets/dev-icons/javascript.svg';
import ReactImage from 'assets/dev-icons/react.svg';
import HtmlImage from 'assets/dev-icons/html5.svg';
import CssImage from 'assets/dev-icons/css3.svg';
import GitImage from 'assets/dev-icons/git.svg';
import GitHubImage from 'assets/dev-icons/github.svg';
import AWSImage from 'assets/dev-icons/aws.svg';
import BabelImage from 'assets/dev-icons/babel.svg';
import BootstrapImage from 'assets/dev-icons/bootstrap.svg';
import ChakraImage from 'assets/dev-icons/chakra.svg';
import FastAPIImage from 'assets/dev-icons/fastapi.svg';
import FirebaseImage from 'assets/dev-icons/firebase.svg';
import VScodeImage from 'assets/dev-icons/vscode.svg';
import WebpackImage from 'assets/dev-icons/webpack.svg';
import TailwindImage from 'assets/dev-icons/tailwindcss.svg';
import { ExportImageConfig } from 'components/ExportButton/ExportButton.interface';

export const DEV_IMAGES = {
  TYPESCRIPT: TypeScriptImage,
  JAVASCRIPT: JavaScriptImage,
  GIT: GitImage,
  GITHUB: GitHubImage,
  HTML: HtmlImage,
  CSS: CssImage,
  REACT: ReactImage,
  AWS: AWSImage,
  BABEL: BabelImage,
  BOOTSTRAP: BootstrapImage,
  CHAKRA: ChakraImage,
  FAST_API: FastAPIImage,
  FIREBASE: FirebaseImage,
  VSCODE: VScodeImage,
  WEBPACK: WebpackImage,
  TAILWIND_CSS: TailwindImage,
};

export const EXPORT_IMAGE_CONFIG: ExportImageConfig = {
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
  },
};
