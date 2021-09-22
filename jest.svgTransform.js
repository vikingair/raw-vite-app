import path from 'path';

// This is a custom Jest transformer turning SVG imports into filename exports.

export default {
    process(src, filename) {
        const assetFilename = JSON.stringify(path.basename(filename));

        return `
      module.exports = {
        __esModule: true,
        default: ${assetFilename},
      };`;
    },
};
