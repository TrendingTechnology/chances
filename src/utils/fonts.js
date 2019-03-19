import FontFaceObserver from 'fontfaceobserver';
import { kebabCase, forEach } from 'lodash';

const typekitCss = 'https://use.typekit.net/fni3eij.css';

export const webFonts = {
  ivyjournal: typekitCss,
  'ivystyle-sans': typekitCss,
  'ibm-plex-mono': typekitCss,
};

export const Fonts = async () => {
  try {
    const allFontsLoaded = new Promise((resolve, reject) => {
      Object.keys(webFonts).forEach(async (key, i, arr) => {
        const font = new FontFaceObserver(key);
        try {
          await font.load();
          document.documentElement.classList.add(kebabCase(key));
          if (i === arr.length - 1) {
            resolve(true);
          }
        } catch (e) {
          resolve(true);
          console.error(e);
        }
      });
    });
    return await allFontsLoaded;
  } catch (e) {
    console.error(e);
    return true;
  }
};
