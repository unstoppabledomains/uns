import { NameService, mergeNetworkConfig } from '../src/config';
import { Deployer } from '../src/deployer';
import { Sandbox } from './index';

// NOTE: Node module execution is used for rebuilding sandbox package
if (require.main === module) {
  (async () => {
    try {
      const sandbox = await Sandbox.create({ rebuild: true, verbose: true });
      await sandbox.start({ noSnapshot: true });

      const unsDeployer = await Deployer.create();
      const ensDeployer = await Deployer.create({
        basePath: './.deployer/ens',
        proxy: true,
      });

      const unsConfig = await unsDeployer.execute(['full', 'config_polygon_pos_bridge']);
      const ensConfig = await ensDeployer.execute(['ens', 'ens_custody', 'fund_ens_custody']);
      sandbox.stop();

      mergeNetworkConfig(unsConfig, NameService.UNS);
      mergeNetworkConfig(ensConfig, NameService.ENS);
    } catch (error) {
      console.error(error);
    }
    process.exit();
  })();
}
