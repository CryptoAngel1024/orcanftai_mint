import Web3 from "web3";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

export const MetaMaskconnector = new InjectedConnector({ supportedChainIds: [1] });

export const walletconnect = new WalletConnectConnector({
  rpc: { 1: "https://rpc.ankr.com/eth"},
  chainId: 1,
  supportedChainIds:[1],
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
});

export const getLibrary = provider => {
  return new Web3(provider);
}