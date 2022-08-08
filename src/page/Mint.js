import React, { useState, useEffect }  from "react";
import 'react-toastify/dist/ReactToastify.css';
import WalletButton from '../component/WalletButton'
import { useMintContract } from '../config/contract'
import ABI_MINT from '../config/mint.json'
import Web3 from 'web3'

const Mint = () => {
  const contractMint = useMintContract();
  const [totalSupply, setTotalSupply] = useState(0);
  const [preSalePrice, setPreSalePrice] = useState(0);
  const [publicSalePrice, setPublicSalePrice] = useState(0);
  const [amount1, setAmount1] = useState(1)
  const [amount2, setAmount2] = useState(1)
  const [amount3, setAmount3] = useState(1)
  const web3 = new Web3("https://mainnet.infura.io/v3/202fe8f1f38d4c468742ce31f9ecbd7f")
  const mintContract = new web3.eth.Contract(ABI_MINT, `${process.env.REACT_APP_NFT}`);
  useEffect(() => {
    getTotalSupply();
    getPreSalePrice();
    getPubSalePrice();
  }, []);

  const getTotalSupply = async () => {
    const total = await mintContract.methods.totalSupply().call();
    setTotalSupply(total)
  }

  const getPreSalePrice = async () => {
    const prePrice = await mintContract.methods.presalePrice().call();
    setPreSalePrice(web3.utils.fromWei(prePrice, 'ether'))
  }

  const getPubSalePrice = async () => {
    const pubPrice = await mintContract.methods.publicPrice().call();
    setPublicSalePrice(web3.utils.fromWei(pubPrice, 'ether'))
  }
  
  return (
    <div className="flex justify-center items-center h-screen flex-col space-y-5">
      <div className="text-white border rounded-xl w-1/2 mx-auto flex flex-col p-4 space-y-3 border-blue-460 bg-blue-860">
        <div className="text-2xl text-center font-bold">Minted 0/{totalSupply} Supply</div>
        <div className="text-xl text-center">Mint 1 Pad Club NTF for {preSalePrice} ETH</div>
        <div className="text-xl text-center">Maximum allowed mints per Wallet: 10 NFT</div>
        <input type="text" className="bg-blue-300 py-2 px-4" value={amount1} onChange={(e)=>setAmount1(e.target.value)}/>
        <div className="w-56 mx-auto"><WalletButton price={publicSalePrice} mintType={1} amount={Number(amount1)}/> </div>
      </div>

      <div className="text-white border rounded-xl w-1/2 mx-auto flex flex-col p-4 space-y-3 border-blue-460 bg-blue-860">
        <div className="text-2xl text-center font-bold">Minted 0/{totalSupply} Supply</div>
        <div className="text-xl text-center">Mint 1 Pad Club NTF for {publicSalePrice} ETH</div>
        <div className="text-xl text-center">Maximum allowed mints per Wallet: 10 NFT</div>
        <input type="text" className="bg-blue-300 py-2 px-4" value={amount2} onChange={(e)=>setAmount2(e.target.value)}/>
        <div className="w-56 mx-auto"><WalletButton price={preSalePrice} mintType={2} amount={Number(amount2)}/> </div>
      </div>

      <div className="text-white border rounded-xl w-1/2 mx-auto flex flex-col p-4 space-y-3 border-blue-460 bg-blue-860">
        <div className="text-2xl text-center font-bold">Minted 0/{totalSupply} Supply</div>
        <div className="text-xl text-center">Mint 1 Pad Club NTF for 0 ETH</div>
        <div className="text-xl text-center">Maximum allowed mints per Wallet: 10 NFT</div>
        <input type="text" className="bg-blue-300 py-2 px-4" value={amount3} onChange={(e)=>setAmount3(e.target.value)}/>
        <div className="w-56 mx-auto"><WalletButton price={preSalePrice} mintType={3} amount={Number(amount3)}/> </div>
      </div>
    </div>
  );
};

export default Mint;