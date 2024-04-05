import { ethers } from "ethers";

const wallet = new ethers.Wallet(
  process.env.WALLET_PRIVATE_KEY,
  ethers.getDefaultProvider(process.env.ALCHEMY_URL)
);
export async function POST(req, res) {
  const stuff = await req.json();
  try {
    const walletAddress = stuff.address;
    const txn = await wallet.sendTransaction({
      to: walletAddress,
      value: ethers.parseEther("0.01"),
    });

    return Response.json({ txnHash: txn.hash, success: true });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return Response.json({ error: error.message });
    }
  }
}
