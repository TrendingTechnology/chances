import T from 'prop-types';

const shape = T.shape({
  id: T.oneOfType([T.string, T.number]).isRequired,
  label: T.string.isRequired,
  href: T.string,
  props: T.shape({
    target: T.oneOf(['_blank', '_self', '_parent', '_top']),
    className: T.string,
  }),
});
shape.children = T.arrayOf(shape);

export default shape;
