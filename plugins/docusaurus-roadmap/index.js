const path = require('path');

module.exports = function docusaurusRoadmapPlugin(context, options) {
  return {
    name: 'docusaurus-roadmap',

    async loadContent() {
      const { loadRoadmapItems } = require('./loader');
      return await loadRoadmapItems(path.resolve(context.siteDir, 'opticore/roadmap'));
    },

    async contentLoaded({ content, actions }) {
      const { createData, setGlobalData } = actions;

      const roadmapDataPath = await createData(
        'roadmapData.json',
        JSON.stringify(content, null, 2)
      );

      setGlobalData({ roadmapItems: content });
    },
  };
};
