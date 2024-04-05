import { ethers } from "ethers";
import { headers } from "next/headers";

const wallet = new ethers.Wallet(
  process.env.WALLET_PRIVATE_KEY,
  ethers.getDefaultProvider(process.env.ALCHEMY_URL)
);
export async function POST(req, res) {
  const stuff = await req.json();
  console.log(stuff);
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const token = stuff.token;
  console.log(token);
  const formData = `secret=${secretKey}&response=${token}`;
  try {
    const googleResponse = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
      }
    );
    console.log(googleResponse);
    const data = await googleResponse.json();
    if (googleResponse.ok && data?.success) {
      console.log(data);
      try {
        const walletAddress = stuff.values.address;
        console.log(walletAddress);
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
    } else {
      console.log("failed");
      return Response.json({ error: "Recaptcha failed" });
    }
  } catch (error) {
    return Response.json({ error: error.message });
  }
}
