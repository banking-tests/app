import { useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  Box,
  Grid,
  CardContent,
  Container,
  Typography,
  LinearProgress,
  Stack,
  debounce,
  Button,
} from "@mui/material";

import { useCallback, useEffect, useState } from "react";
import {
  getTransactions,
  getProfitability,
  getTransactionsByCategory,
  getTransactionsByMonth,
} from "../services/accounts.service";
import InfiniteScroll from "react-infinite-scroll-component";
import { AutoAwesome } from "@mui/icons-material";
import { humanDate } from "../config/utils/date";
import { PieChartComponent } from "../components/charts/pie";
import { LinearChartComponent } from "../components/charts/linear";

const initialState = {
  page: 1,
  limit: 12,
  total: 0,
  pages: 0,
  prevPage: null,
  nextPage: null,
  docs: [],
  hasMore: false,
  offset: 0,
};

const profitabilityState = {
  inflow: 0,
  outflow: 0,
  balance: 0,
  profitability: 0,
  inflowTransactions: 0,
  outflowTransactions: 0,
};

const groupedTransactionsState = {
  groups: {},
};

export function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const account = location.state.account;
  const [filter, setFilter] = useState({
    limit: 12,
    page: 1,
  });

  const [context, setContext] = useState(initialState);
  const [profitability, setProfitability] = useState(profitabilityState);
  const [transactionsByCategory, setTransactionsByCategory] = useState(
    groupedTransactionsState
  );

  const [transactionsByMonth, setTransactionsByMonth] = useState(
    groupedTransactionsState
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceTransactionsLoad = useCallback(
    debounce((filter) => fetchTransactions(filter), 500),
    []
  );

  const fetchTransactions = async (filter) => {
    try {
      const data = await getTransactions(account.uuid, filter);
      setContext((prev) => ({
        page: data.page,
        limit: data.limit,
        total: data.total,
        pages: data.pages,
        prevPage: data.prevPage,
        nextPage: data.nextPage,
        hasMore: data.nextPage !== null,
        offset: data.offset,
        docs: [...prev.docs, ...data.docs],
      }));
    } catch (error) {}
  };

  useEffect(() => {
    getProfitability(account.uuid, {
      limit: 50,
      page: 10,
    }).then((data) => {
      setProfitability((prev) => ({
        inflow: data.inflow,
        outflow: data.outflow,
        balance: data.balance,
        profitability: data.profitability,
        inflowTransactions: data.inflowTransactions,
        outflowTransactions: data.outflowTransactions,
      }));
    });
    getTransactions(account.uuid, {
      limit: filter.limit,
      page: filter.page,
    }).then((data) => {
      setContext((prev) => ({
        page: data.page,
        limit: data.limit,
        total: data.total,
        pages: data.pages,
        prevPage: data.prevPage,
        nextPage: data.nextPage,
        hasMore: data.nextPage !== null,
        offset: data.offset,
        docs: [...prev.docs, ...data.docs],
      }));
    });
    getTransactionsByCategory(account.uuid, {
      limit: 0,
    }).then((data) => {
      setTransactionsByCategory((prev) => ({
        groups: data.groups,
      }));
    });
    getTransactionsByMonth(account.uuid, {
      limit: 0,
    }).then((data) => {
      setTransactionsByMonth((prev) => ({
        groups: data.groups,
      }));
    });
  }, [account, debounceTransactionsLoad, filter]);

  const handleScroll = async () => {
    if (context.nextPage) {
      setFilter((prev) => ({ ...prev, page: context.page + 1 }));
    }
  };

  const logout = () => {
    navigate("/", { replace: true });
  };

  return (
    <>
      <Container>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Box>
            <Typography variant="h2">{account.name}</Typography>
            <Typography variant="body1" color="initial">
              Balance ${Number(account.balance).toFixed(2)} {account.currency}
            </Typography>
          </Box>
          <Box>
            <Button variant="contained" onClick={logout}>
              Logout
            </Button>
          </Box>
        </Stack>
        <Grid container my={3} spacing={3}>
          <Grid item sm={6} xs={12} md={6}>
            <Card elevation={0}>
              <CardContent>
                <Box px={2} py={1}>
                  <Typography variant="body1">Profitability</Typography>
                </Box>
                <PieChartComponent
                  data={[
                    {
                      id: 1,
                      value: profitability.outflowTransactions,
                      name: "Outflows",
                    },
                    {
                      id: 2,
                      value: profitability.inflowTransactions,
                      name: "Inflows",
                    },
                  ]}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Card elevation={0}>
              <CardContent>
                <Box px={2} py={1}>
                  <Typography variant="body1">Outflows by category</Typography>
                </Box>
                <PieChartComponent
                  data={Object.keys(transactionsByCategory.groups)
                    .sort((a, b) => {
                      return (
                        transactionsByCategory.groups[b].outflowAmount -
                        transactionsByCategory.groups[a].outflowAmount
                      );
                    })
                    .slice(0, 5)
                    .map((key, index) => {
                      return {
                        id: index,
                        name: key,
                        value: parseInt(
                          transactionsByCategory.groups[key].outflowAmount
                        ),
                      };
                    })}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item sm={12} xs={12} md={12}>
            <Card elevation={0}>
              <CardContent>
                <Box px={2} py={1}>
                  <Typography variant="body1">Outflows by month</Typography>
                </Box>
                <LinearChartComponent
                  data={Object.keys(transactionsByMonth.groups).map((key) => {
                    return {
                      name: key,
                      uv: transactionsByMonth.groups[key].outflowAmount,
                    };
                  })}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Box my={2}>
          <Typography variant="h2">Transactions</Typography>
        </Box>
        <InfiniteScroll
          dataLength={context.docs.length}
          next={handleScroll}
          hasMore={context.hasMore}
          loader={
            <Box sx={{ width: "100%" }} py={3}>
              <LinearProgress />
            </Box>
          }
          endMessage={
            context.docs.length > 0 && (
              <Stack
                direction={"row"}
                spacing={2}
                justifyContent={"center"}
                alignItems={"center"}
                py={3}
                color={"text.disabled"}
              >
                <AutoAwesome />
                <span>There&lsquo;s no more data</span>
              </Stack>
            )
          }
          refreshFunction={console.log}
          style={{ width: "100%" }}
        >
          {context.docs.map((transaction, index) => (
            <Box key={index} my={2}>
              <Card
                key={index}
                elevation={0}
                sx={{
                  background:
                    transaction.type === "OUTFLOW" ? "#f5f5f5" : "#fff",
                }}
              >
                <CardContent>
                  <Stack
                    direction={"row"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Box>
                      <Typography variant="caption" color="initial">
                        {transaction.type} - {transaction.status}
                      </Typography>
                      <Typography variant="body1" color="initial">
                        {transaction.category}
                      </Typography>
                      <Typography variant="h5" fontSize={18}>
                        {transaction.description}
                      </Typography>
                    </Box>
                    <Box textAlign={"right"}>
                      <Typography variant="body1" color="initial">
                        {humanDate(transaction.value_date)}
                      </Typography>
                      <Typography fontSize={16} color="initial">
                        {transaction.type === "OUTFLOW" ? "-" : "+"} $
                        {transaction.amount} {transaction.currency}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Box>
          ))}
        </InfiniteScroll>
      </Container>
    </>
  );
}
