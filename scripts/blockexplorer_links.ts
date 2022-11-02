import * as fs from 'fs';

type ContractSetup = {
  address: string;
  forwarder?: string;
  implementation?: string;
  legacyAddresses: string[];
  deprecated: boolean;
};
const Config = JSON.parse(
  fs.readFileSync(`${__dirname}/../uns-config.json`).toString(),
) as { networks: Record<string, { contracts: Record<string, ContractSetup> }> };

const ContractNames = Object.keys(Config.networks['1'].contracts);

const isValidAddress = (address?: string): boolean => {
  return !!address && address !== '0x0000000000000000000000000000000000000000';
};

const BlockExplorerUrls = {
  1: 'https://etherscan.io',
  5: 'https://goerli.etherscan.io',
  137: 'http://polygonscan.com',
  // 1337: "http://localhost",
  80001: 'https://mumbai.polygonscan.com',
};

const Networks = Object.keys(BlockExplorerUrls);

const Keys = [
  'network',
  'address',
  'forwarder',
] as const;

const link = (network: string, address: string): string => {
  return address.toString().match(/0x[0-9a-f]{40}/i)
    ? `<a href="${BlockExplorerUrls[network]}/address/${address}">${address}</a>`
    : address;
};

const contractLinks = (
  network: string,
  address?: string | string[],
): string => {
  const addresses =
    address instanceof Array
      ? address
      : isValidAddress(address)
        ? [address]
        : [];
  return addresses.length
    ? addresses.map((a) => link(network, a!)).join('<br/>')
    : '&mdash;';
};

const fragments = ContractNames.map((name) => {

  const deployments = Networks.map((network) => ({
    network,
    ...Config.networks[network.toString()].contracts[name],
  }));
  const columnNames = Keys;
  const head = '<tr>' + columnNames.map((n) => `<th>${n}</th>`).join('') + '</tr>';
  const rows = deployments
    .map(
      (config) =>
        '<tr>'
        + Keys.map((key) => `<td>${contractLinks(config.network, config[key])}</td>`).join('') +
        '</tr>',
    )
    .join('\n\n');

  return `<tr><td colspan="100%"><h2>${name}</h2></td></tr>` + head + rows;
}).join('');

const layout = (body: string) =>
  `
# Deployed Contracts

<table class="table table-bordered">
${body}
</table>
`;

console.log(fragments);

fs.writeFileSync(`${__dirname}/../Contracts.md`, layout(fragments));
