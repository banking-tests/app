import { client } from "./api";

export async function getAccount(id) {
  const { data: response } = await client.get(`/v1/accounts/${id}`);
  return response.data;
}

export async function getTransactions(id, filter) {
  const { data: response } = await client.get(
    `/v1/accounts/${id}/transactions`,
    {
      params: filter,
    }
  );
  return response.data;
}

export async function getProfitability(id, filter) {
  const { data: response } = await client.get(`/v1/finance/profitability`, {
    params: { ...filter, account: id },
  });
  return response.data;
}

export async function getTransactionsByCategory(id, filter) {
  const { data: response } = await client.get(`/v1/finance/groups/categories`, {
    params: { ...filter, account: id },
  });
  return response.data;
}

export async function getTransactionsByMonth(id, filter) {
  const { data: response } = await client.get(`/v1/finance/groups/months`, {
    params: { ...filter, account: id },
  });
  return response.data;
}
