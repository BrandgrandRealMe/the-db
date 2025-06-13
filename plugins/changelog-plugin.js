const fs = require('fs').promises;
const path = require('path');
const matter = require('gray-matter');

module.exports = function (context) {
  console.log('Changelog plugin: Initializing');
  const changelogsDir = path.join(context.siteDir, 'opticore', 'changelogs');
  console.log(`Changelog plugin: Configured changelogs directory: ${changelogsDir}`);

  return {
    name: 'changelog-plugin',
    async loadContent() {
      console.log('Changelog plugin: Running loadContent');
      try {
        try {
          await fs.access(changelogsDir);
          console.log(`Changelog plugin: Directory ${changelogsDir} exists and is accessible`);
        } catch (error) {
          console.error(`Changelog plugin: Directory ${changelogsDir} is not accessible:`, error);
          return [];
        }

        const allFiles = await fs.readdir(changelogsDir);
        console.log(`Changelog plugin: All files in directory: ${allFiles.join(', ') || 'none'}`);

        const files = allFiles.filter(file => file.endsWith('.md'));
        console.log(`Changelog plugin: Found ${files.length} Markdown files: ${files.join(', ') || 'none'}`);

        if (files.length === 0) {
          console.warn(`Changelog plugin: No Markdown files found in ${changelogsDir}`);
          return [];
        }

        const changelogs = await Promise.all(
          files.map(async file => {
            const filePath = path.join(changelogsDir, file);
            console.log(`Changelog plugin: Processing file ${file}`);
            try {
              const fileContent = await fs.readFile(filePath, 'utf-8');
              const { data, content } = matter(fileContent);
              if (!data.version || !data.title || !data.updateDate) {
                console.warn(`Changelog plugin: Invalid frontmatter in ${file}: missing version, title, or updateDate`);
                return null;
              }

              try {
                // Validate updateDate as MM-DD-YYYY
                if (typeof data.updateDate !== 'string' || !/^\d{2}-\d{2}-\d{4}$/.test(data.updateDate)) {
                  console.warn(`Changelog plugin: Invalid updateDate format in ${file}: ${data.updateDate} (expected MM-DD-YYYY)`);
                  return null;
                }

                // Convert MM-DD-YYYY to YYYY-MM-DD
                const [month, day, year] = data.updateDate.split('-').map(Number);
                // Basic validation
                if (month < 1 || month > 12 || day < 1 || day > 31 || year < 1000 || year > 9999) {
                  console.warn(`Changelog plugin: Invalid updateDate values in ${file}: ${data.updateDate}`);
                  return null;
                }
                const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

                return {
                  version: data.version,
                  title: data.title,
                  updateDate: dateStr, // Store as YYYY-MM-DD
                  content: content,
                };
              } catch (error) {
                console.warn(`Changelog plugin: Error processing updateDate in ${file}:`, error.message);
                return null;
              }
            } catch (error) {
              console.error(`Changelog plugin: Error reading file ${file}:`, error);
              return null;
            }
          })
        );

        const validChangelogs = changelogs.filter(changelog => changelog !== null);
        console.log(`Changelog plugin: Loaded ${validChangelogs.length} valid changelogs`);
        return validChangelogs.sort((a, b) => b.updateDate.localeCompare(a.updateDate));
      } catch (error) {
        console.error(`Changelog plugin: Unexpected error in loadContent:`, error);
        return [];
      }
    },
    async contentLoaded({ content, actions }) {
      console.log(`Changelog plugin: Running contentLoaded with ${content.length} changelogs`);
      const { setGlobalData } = actions;
      setGlobalData({ changelogs: content });
    },
  };
};