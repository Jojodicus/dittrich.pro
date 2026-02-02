import { visit } from 'unist-util-visit';
import { toString } from 'mdast-util-to-string';

export function remarkCodeCopy() {
  return (tree: any) => {
    visit(
      tree,
      'element',
      (node: any, _index: number | undefined, _parent: any) => {
        if (
          node.tagName === 'pre' &&
          node.children &&
          node.children[0]?.tagName === 'code'
        ) {
          const codeNode = node.children[0];
          let codeText = '';

          try {
            if (codeNode.children && codeNode.children.length > 0) {
              codeText = toString(codeNode);
            }
          } catch (e) {
            console.warn('Failed to extract code text:', e);
          }

          const copyButton = {
            type: 'element',
            tagName: 'button',
            properties: {
              className: ['copy-button'],
              'data-code': btoa(unescape(encodeURIComponent(codeText))),
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
                  },
                  {
                    type: 'element',
                    tagName: 'path',
                    properties: {
                      strokeLinecap: 'round',
                      strokeLinejoin: 'round',
                      d: 'M16 4h2a2 2 0 0 1 2 2v4M21 14H7M21 10v4M21 6v8',
                    },
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
      }
    );
  };
}
