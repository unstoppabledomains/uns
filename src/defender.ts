import { ProposalClient } from '@openzeppelin/defender-sdk-proposal-client';
import { unwrap } from './utils';

export const defenderAPICreds = () => ({
  apiKey: unwrap(process.env, 'DEFENDER_API_KEY'),
  apiSecret: unwrap(process.env, 'DEFENDER_API_SECRET'),
});

export const getProposalClient = () => {
  return new ProposalClient(defenderAPICreds());
};
