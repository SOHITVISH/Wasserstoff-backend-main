const express = require("express");

const router = express.Router();
const Moralis = require("moralis").default;
const { EvmChain } = require("@moralisweb3/common-evm-utils");
const chain = EvmChain.ETHEREUM;
const run = require("../config/db");


async function getData(address, chain) {
  // Get native balance
  const nativeBalance = await Moralis.EvmApi.balance.getNativeBalance({
    address,
    chain,
  });

  // Format the native balance formatted in ether via the .ether getter
  const native = nativeBalance.result.balance.ether;

  // Get token balances
  const tokenBalances = await Moralis.EvmApi.token.getWalletTokenBalances({
    address,
    chain,
  });

  const tokens = tokenBalances.result;
  return { native, tokens };
}
router.get("/getbalance", async (req, res) => {
  try {
    const { query } = req;
    const data = await getData(query.address, (query.chain = chain));
    res.status(200);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500);
    res.json({ error: error.message });
  }
});

router.get("/address", async (req, res) => {
  try {
    const { query } = req;

    const response = await Moralis.EvmApi.transaction.getWalletTransactions({
      address: query.address,
      chain,
    });

    return res.status(200).json(response);
  } catch (e) {
    console.log(`Something went wrong ${e}`);
    return res.status(400).json();
  }
});
router.get("/getethprice", async (req, res) => {
  try {
    const address = req.query.address
    const response = await Moralis.EvmApi.token.getTokenPrice({
      address: address,
      chain: chain,
    });

    return res.status(200).json(response);
  } catch (e) {
    console.log(`Somthing went wrong ${e}`);
    return res.status(400).json();
  }
});

router.post("/subscribe", async (req, res) => {
    try {
        let address = req.query.address;
        const streamId = await Moralis.Streams.getAll({
          limit: 10,
        });
        let x = streamId.jsonResponse.result[0];
        // console.log({ x });
        const streams = await Moralis.Streams.addAddress({
          id: x.id,
          address: address,
        });
        return res.status(200).json({ success: true, streams });
    } catch (error) {
        console.error('Error subscribing:', error);
    return res.status(500).json({ error: 'Internal server error' });
    }
 
});

router.post('/moralis-webhook', async(req, res) => {
     
  let db =   await run()
  let transactions= await db.collection("transactions").insertOne(req.body)

  return res.status(201)
    .send({
      product: transactions,
      message:
        "Webhook received successfully",
    });
  });

module.exports = router;
