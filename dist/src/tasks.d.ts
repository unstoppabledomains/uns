import { Deployer } from './deployer';
import { DependenciesMap, UnsNetworkConfig } from './types';
export declare type Task = {
    tags: string[];
    priority: number;
    run: (ctx: Deployer, dependencies: DependenciesMap, params?: Record<string, string>) => Promise<void>;
    ensureDependencies: (ctx: Deployer, config?: UnsNetworkConfig) => DependenciesMap;
};
export declare const deployCNSTask: Task;
export declare const deployCNSForwardersTask: Task;
export declare const tasks: Task[];
//# sourceMappingURL=tasks.d.ts.map