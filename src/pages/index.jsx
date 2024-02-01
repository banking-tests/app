import {
  Grid,
  Container,
  FormControl,
  InputLabel,
  Stack,
  Button,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAccount } from "../services/accounts.service";

export function Index() {
  const [account, setAccount] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleAccountChange = (e) => {
    const value = e.target.value;
    const uuidPattern =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
    setError(value !== "" ? !uuidPattern.test(value) : false);
    setAccount(e.target.value);
  };

  const handleSubmit = async () => {
    if (account && !error) {
      const data = await getAccount(account);
      if (data) {
        navigate(`/dashboard`, {
          state: { account: data },
        });
      }
    }
  };

  return (
    <>
      <Container>
        <Grid container justifyContent={"center"}>
          <Grid item xs={12} md={4}>
            <FormControl variant="filled" fullWidth>
              <InputLabel variant="filled" shrink fullWidth>
                Número de cuenta
              </InputLabel>
              <TextField
                name="account"
                variant="filled"
                value={account}
                onChange={handleAccountChange}
                helperText={error ? "El número de cuenta debe ser un UUID" : ""}
                FormHelperTextProps={{ error: error }}
              />
            </FormControl>
            <Stack direction={"row"} justifyContent={"center"} my={2}>
              <Button fullWidth variant="contained" onClick={handleSubmit}>
                Ingresar
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
