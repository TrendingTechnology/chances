import FontFaceObserver from 'fontfaceobserver';
import { kebabCase, forEach } from 'lodash';

const typekitCss = 'https://use.typekit.net/fni3eij.css';

export const webFonts = {
  ivyjournal: typekitCss,
  'ivystyle-sans': typekitCss,
  'ibm-plex-mono': typekitCss,
};

export const Fonts = () => {
  forEach(webFonts, async (_, key) => {
    const font = new FontFaceObserver(key);
    try {
      await font.load();
      document.documentElement.classList.add(kebabCase(key));
    } catch (e) {
      console.error(e);
    }
  });
};
