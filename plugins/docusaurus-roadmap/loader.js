const fs = require('fs/promises');
const path = require('path');
const matter = require('gray-matter');

async function loadRoadmapItems(dir) {
  const files = await fs.readdir(dir);
  const items = [];

  for (const file of files) {
    if (!file.endsWith('.md') && !file.endsWith('.mdx')) continue;

    const filePath = path.join(dir, file);
    const raw = await fs.readFile(filePath, 'utf8');
    const { data: frontmatter, content } = matter(raw);

    items.push({
      id: file.replace(/\.(md|mdx)$/, ''),
      ...frontmatter,
      content,
    });
  }

  return items.sort((a, b) => (a.priority || 999) - (b.priority || 999));
}

module.exports = { loadRoadmapItems };
