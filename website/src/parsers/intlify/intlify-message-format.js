import defaultParserInterface from '../utils/defaultParserInterface';
import pkg from 'vue-i18n/package.json';

const ID = 'intlify-message-format';

const NODE_TYPE_NAMES = [
  'Resource',
  'Plural',
  'Message',
  'Text',
  'Named',
  'List',
  'Linked',
  'LinkedKey',
  'LinkedModifier',
  'Literal',
]


export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,
  locationProps: new Set(['loc']),

  loadParser(callback) {
    require(['vue-i18n'], callback);
  },

  parse(mod, code, opts) {
    const { createParser } = mod
    return createParser().parse(code)
  },

  getNodeName(node) {
    console.log('getNodeName', node)
    if (node.type !== undefined) {
      return NODE_TYPE_NAMES[node.type]
    }
  },

  nodeToRange({ loc }) {
    if (loc && loc.start && loc.end) {
      return [loc.start.offset, loc.end.offset];
    }
  },
};
  