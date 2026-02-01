import { visit } from 'unist-util-visit';
import type { Root } from 'mdast';
import BananaSlug from 'github-slugger';
import type { VFile } from 'vfile';

export interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export function remarkExtractTOC() {
  return function transformer(tree: Root, file: VFile) {
    const slugger = new BananaSlug();
    const headings: TOCItem[] = [];

    visit(tree, 'heading', (node: any) => {
      if (node.depth >= 1 && node.depth <= 3) {
        const text = node.children
          .filter((child: any) => child.type === 'text')
          .map((child: any) => child.value)
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
