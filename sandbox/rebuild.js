const tar = require('tar');

const Sandbox = require('.');
const Deployer = require('../src/deployer');

// NOTE: Node module execution is used for rebuilding sandbox package
if (require.main === module) {
  (async () => {
    try {
      const sandbox = await Sandbox.create({ extract: false });
      await sandbox.start({ noSnapshot: true });
      const deployer = await Deployer.create();
      await deployer.execute(['full']);
      await sandbox.stop();

      const { db_path: dbPath, snapshotPath } = sandbox.options.network;
      await tar.create(
        {
          gzip: true,
          file: snapshotPath,
          filter: p => p.indexOf('_tmp') === -1,
        },
        [dbPath],
      );
    } catch (error) {
      console.error(error);
    }
    process.exit();
  })();
}
