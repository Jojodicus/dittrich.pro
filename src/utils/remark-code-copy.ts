import { visit } from 'unist-util-visit';
import { toString } from 'mdast-util-to-string';
import type { Root, Element, ElementContent } from 'hast';

// UTF-8-safe base64 encoding (replacement for the deprecated `unescape` idiom).
function encodeBase64(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let binary = '';
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary);
}

export function remarkCodeCopy() {
  return (tree: Root) => {
    visit(tree, 'element', (node: Element) => {
      const firstChild = node.children[0];
      if (
        node.tagName === 'pre' &&
        firstChild &&
        firstChild.type === 'element' &&
        firstChild.tagName === 'code'
      ) {
        const codeNode = firstChild;
        let codeText = '';

        try {
          if (codeNode.children && codeNode.children.length > 0) {
            codeText = toString(codeNode);
          }
        } catch (e) {
          console.warn('Failed to extract code text:', e);
        }

        const copyButton: ElementContent = {
          type: 'element',
          tagName: 'button',
          properties: {
            className: ['copy-button'],
            'data-code': encodeBase64(codeText),
          },
          children: [
            {
              type: 'element',
              tagName: 'svg',
              properties: {
                xmlns: 'http://www.w3.org/2000/svg',
                width: '14',
                height: '14',
                viewBox: '0 0 24 24',
                fill: 'none',
                stroke: 'currentColor',
                strokeWidth: '2',
              },
              children: [
                {
                  type: 'element',
                  tagName: 'path',
                  properties: {
                    strokeLinecap: 'round',
                    strokeLinejoin: 'round',
                    d: 'M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2',
                  },
                  children: [],
                },
                {
                  type: 'element',
                  tagName: 'path',
                  properties: {
                    strokeLinecap: 'round',
                    strokeLinejoin: 'round',
                    d: 'M16 4h2a2 2 0 0 1 2 2v4M21 14H7M21 10v4M21 6v8',
                  },
                  children: [],
                },
              ],
            },
            {
              type: 'text',
              value: ' Copy',
            },
          ],
        };

        node.properties = node.properties || {};
        if (!node.children) node.children = [];
        node.children.unshift(copyButton);
      }
    });
  };
}
