/**
 * ng-add schematic for newang.
 * Adds the dark theme import to the app styles and prints usage hints.
 * Plain JS with a `.cjs` extension so Node always parses it as
 * CommonJS, even when the published package sets `"type": "module"`.
 */
const { chain } = require('@angular-devkit/schematics');

const IMPORT = `@use 'newang/styles' as na;
@include na.base();
`;

function resolveStylesPath(tree, projectName) {
  const candidates = ['/angular.json', '/angular.jsonc'];
  let workspace = null;
  for (const p of candidates) {
    if (tree.exists(p)) {
      try {
        workspace = JSON.parse(tree.read(p).toString('utf8'));
      } catch {
        workspace = null;
      }
      break;
    }
  }
  if (workspace && workspace.projects) {
    const name =
      projectName ||
      workspace.defaultProject ||
      Object.keys(workspace.projects).find((k) => workspace.projects[k].projectType === 'application') ||
      Object.keys(workspace.projects)[0];
    const proj = workspace.projects[name];
    if (proj) {
      const root = proj.sourceRoot || `${proj.root}/src`;
      for (const ext of ['scss', 'sass', 'css']) {
        const p = `/${root}/styles.${ext}`;
        if (tree.exists(p)) return p;
      }
      return `/${root}/styles.scss`;
    }
  }
  if (tree.exists('/src/styles.scss')) return '/src/styles.scss';
  return '/src/styles.scss';
}

function addStyles() {
  return (tree, context) => {
    const opts = (context && context.options) || {};
    const path = resolveStylesPath(tree, opts.project);
    if (tree.exists(path)) {
      const current = tree.read(path).toString('utf8');
      if (!current.includes('newang/styles')) {
        const rec = tree.beginUpdate(path);
        rec.insertLeft(0, IMPORT + (current.endsWith('\n') ? '' : '\n'));
        tree.commitUpdate(rec);
        context.logger.info(`newang: theme wired into ${path}`);
      } else {
        context.logger.info(`newang: ${path} already references newang/styles`);
      }
    } else {
      tree.create(path, IMPORT);
      context.logger.info(`newang: created ${path} with theme import`);
    }
    return tree;
  };
}

function sayHello() {
  return (_tree, context) => {
    context.logger.info('');
    context.logger.info('newang installed — dark theme, pastel lime accent, zero CSS needed.');
    context.logger.info('Example: <na-app><na-page><na-button>Save</na-button></na-page></na-app>');
    context.logger.info('Docs: https://github.com/mobn0/newang#readme');
    return _tree;
  };
}

function ngAdd() {
  return chain([addStyles(), sayHello()]);
}

module.exports = { ngAdd };
module.exports.default = ngAdd;
