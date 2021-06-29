const tar = require('tar');

const Sandbox = require('.');
const Deployer = require('../src/deployer');

// NOTE: Node module execution is used for rebuilding sandbox package
if (require.main === module) {
  (async () => {
    try {
      const sandbox = await Sandbox.create({ clean: true, extract: false });
      await sandbox.start();
      const deployer = await Deployer.create();
      const deployConfig = await deployer.execute(['full']);
      console.log('Config:', JSON.stringify(deployConfig));
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
