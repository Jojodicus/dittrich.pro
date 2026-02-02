import { visit } from 'unist-util-visit';
import type { Root } from 'mdast';
import type { PhrasingContent } from 'mdast';
import BananaSlug from 'github-slugger';
import type { VFile } from 'vfile';

export interface TOCItem {
  id: string;
  text: string;
  level: number;
}

function isText(
  node: PhrasingContent
): node is { type: 'text'; value: string } {
  return node.type === 'text';
}

export function remarkExtractTOC() {
  return function transformer(tree: Root, file: VFile) {
    const slugger = new BananaSlug();
    const headings: TOCItem[] = [];

    visit(tree, 'heading', (node) => {
      if (node.depth >= 1 && node.depth <= 3) {
        const text = node.children
          .filter(isText)
          .map((child) => child.value)
          .join('');

        const id = slugger.slug(text);

        if (!node.data) node.data = {};
        if (!node.data.hProperties) node.data.hProperties = {};
        node.data.hProperties.id = id;

        headings.push({
          id,
          text,
          level: node.depth,
        });
      }
    });

    file.data.toc = headings;
  };
}
