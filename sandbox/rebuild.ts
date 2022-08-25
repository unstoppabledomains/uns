import fs from 'fs';
import tar from 'tar';

import { mergeNetworkConfig } from '../src/config';
import { Sandbox } from '.';
// import Deployer from '../src/deployer';

// // NOTE: Node module execution is used for rebuilding sandbox package
// if (require.main === module) {
//   (async () => {
//     try {
//       const sandbox = await Sandbox.create({ extract: false });
//       await sandbox.start({ noSnapshot: true });

//       const deployer = await Deployer.create();
//       const config = await deployer.execute(['full', 'deploy_polygon_pos_bridge', 'uns_config_polygon_pos_bridge']);
//       await sandbox.stop();

//       mergeNetworkConfig(config);

//       const { db_path: dbPath, snapshotPath } = sandbox.options.network;
//       await tar.create(
//         {
//           cwd: dbPath,
//           gzip: true,
//           file: snapshotPath,
//           filter: p => p.indexOf('_tmp') === -1,
//         },
//         fs.readdirSync(dbPath),
//       );
//     } catch (error) {
//       console.error(error);
//     }
//     process.exit();
//   })();
// }
