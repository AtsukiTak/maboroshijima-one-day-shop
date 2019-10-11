import React from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import {
  CardElement,
  ReactStripeElements,
  injectStripe
} from "react-stripe-elements";

import { buyShirt } from "infra/stripe";
import { Shirt } from "models/shirt";

type Props = ReactStripeElements.InjectedStripeProps & {
  shirt: Shirt;
  size: string;
};

const InputComponents: React.FC<Props> = ({ stripe, shirt, size }) => {
  const [reqState, setReqState] = React.useState<
    null | "Requesting" | "Success" | "Fail"
  >(null);

  const [email, setEmail] = React.useState("");
  const [cardholder, setCardholder] = React.useState("");
  const [shippingName, setShippingName] = React.useState("");
  const [shippingAddress, setShippingAddress] = React.useState({
    zip: "",
    prefecture: "",
    city: "",
    line1: ""
  });

  const submit = async () => {
    if (stripe) {
      setReqState("Requesting");

      const { token } = await stripe.createToken({
        name: cardholder
      });
      if (token === undefined) {
        setReqState("Fail");
        return;
      }
      try {
        await buyShirt({
          shirtId: shirt.id,
          size,
          cardToken: token.id,
          email,
          shippingName,
          shippingAddress
        });
        setReqState("Success");
      } catch (e) {
        console.error(e);
        setReqState("Fail");
      }
    }
  };

  return (
    <>
      <Container>
        <InputsContainer>
          <Typography variant="subtitle2" gutterBottom>
            購入者情報
          </Typography>
          <Divider />
          <InputsContent>
            <TextField
              label={<InputLabel>メールアドレス</InputLabel>}
              type="email"
              autoComplete="email"
              fullWidth
              margin="dense"
              onChange={e => setEmail(e.target.value)}
            />
            <CardField>
              <CardElement hidePostalCode={true} />
            </CardField>
            <TextField
              label={<InputLabel>カード所有者名</InputLabel>}
              type="text"
              fullWidth
              margin="dense"
              onChange={e => setCardholder(e.target.value)}
            />
          </InputsContent>
        </InputsContainer>
        <InputsContainer>
          <Typography variant="subtitle2" gutterBottom>
            送り先情報
          </Typography>
          <Divider />
          <InputsContent>
            <TextField
              label={<InputLabel>氏名</InputLabel>}
              type="text"
              autoComplete="name"
              fullWidth
              margin="dense"
              onChange={e => setShippingName(e.target.value)}
            />
            <TextField
              label={<InputLabel>郵便番号</InputLabel>}
              type="text"
              autoComplete="postal-code"
              placeholder="1008111"
              fullWidth
              margin="dense"
              onChange={e =>
                setShippingAddress({ ...shippingAddress, zip: e.target.value })
              }
            />
            <TextField
              label={<InputLabel>都道府県</InputLabel>}
              type="text"
              autoComplete="address-level1"
              placeholder="東京都"
              fullWidth
              margin="dense"
              onChange={e =>
                setShippingAddress({
                  ...shippingAddress,
                  prefecture: e.target.value
                })
              }
            />
            <TextField
              label={<InputLabel>市区町村</InputLabel>}
              type="text"
              autoComplete="address-level2"
              placeholder="千代田区"
              fullWidth
              margin="dense"
              onChange={e =>
                setShippingAddress({ ...shippingAddress, city: e.target.value })
              }
            />
            <TextField
              label={<InputLabel>番地以下</InputLabel>}
              type="text"
              autoComplete="address-level3"
              placeholder="千代田1-1"
              fullWidth
              margin="dense"
              onChange={e =>
                setShippingAddress({
                  ...shippingAddress,
                  line1: e.target.value
                })
              }
            />
          </InputsContent>
        </InputsContainer>
        <ButtonContainer>
          <Button
            variant="contained"
            color="primary"
            disabled={stripe === undefined}
            onClick={submit}
          >
            注文する
          </Button>
        </ButtonContainer>
      </Container>
      <Dialog
        open={reqState !== null}
        disableBackdropClick
        disableEscapeKeyDown
        fullWidth
      >
        <DialogContent>
          {reqState === "Requesting" ? <CircularProgress /> : null}
          {reqState === "Success" ? (
            <DialogContentText>
              ご購入ありがとうございました！
            </DialogContentText>
          ) : null}
          {reqState === "Fail" ? (
            <DialogContentText>
              入力内容に不備があります。入力内容をご確認の上、再度注文をお願いいたします。
            </DialogContentText>
          ) : null}
        </DialogContent>
        {reqState === "Success" || reqState === "Fail" ? (
          <DialogActions>
            <Button onClick={() => setReqState(null)} color="primary">
              Ok
            </Button>
          </DialogActions>
        ) : null}
      </Dialog>
    </>
  );
};

export default injectStripe(InputComponents);

const Container = styled.div`
  padding: 32px 20px;
`;

const InputsContainer = styled.div`
  margin-bottom: 70px;
`;

const InputsContent = styled.div`
  padding-left: 20px;
`;

const InputLabel = styled.span`
  font-size: 0.9rem;
`;

const CardField = styled.div`
  margin: 25px 0 4px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.42);
`;

const ButtonContainer = styled.div`
  width: fit-content;
  margin: 0 auto;
`;
