import fs from 'fs';
import tar from 'tar';
import { mergeNetworkConfig } from '../src/config';
import { Deployer } from '../src/deployer';
import { unwrap } from '../src/helpers';
import { Sandbox } from '.';

// NOTE: Node module execution is used for rebuilding sandbox package
if (require.main === module) {
  (async () => {
    try {
      const sandbox = await Sandbox.create({ extract: false });
      await sandbox.start({ noSnapshot: true });

      const deployer = await Deployer.create();

      const config = await deployer.execute(['full', 'config_polygon_pos_bridge']);
      await sandbox.stop();

      mergeNetworkConfig(config);

      const { dbPath, snapshotPath } = unwrap(sandbox.options, 'network');
      await tar.create(
        {
          cwd: dbPath,
          gzip: true,
          file: snapshotPath,
          filter: (p) => p.indexOf('_tmp') === -1,
        },
        fs.readdirSync(dbPath),
      );
    } catch (error) {
      console.error(error);
    }
    process.exit();
  })();
}
