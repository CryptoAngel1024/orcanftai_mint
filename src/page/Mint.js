import React, { useState, useEffect }  from "react";
import 'react-toastify/dist/ReactToastify.css';
import MintButton from '../component/MintButton'
import { useMintContract } from '../config/contract'

const Mint = () => {
  const contractMint = useMintContract();
  const [totalSupply, setTotalSupply] = useState(0);
  const [preSalePrice, setPreSalePrice] = useState(0);
  const [publicSalePrice, setPublicSalePrice] = useState(0);
  useEffect(() => {
    getTotalSupply();
    getPreSalePrice();
    getPubSalePrice();
  }, []);

  const getTotalSupply = async () => {
    const total = await contractMint.methods.totalSupply().call();
    setTotalSupply(total)
  }

  const getPreSalePrice = async () => {
    const prePrice = await contractMint.methods.presalePrice().call();
    setPreSalePrice(prePrice)
  }

  const getPubSalePrice = async () => {
    const pubPrice = await contractMint.methods.publicPrice().call();
    setPublicSalePrice(pubPrice)
  }
  
  return (
    <div className="flex justify-center items-center h-screen flex-col space-y-5">
      <div className="text-white border rounded-xl w-1/2 mx-auto flex flex-col p-4 space-y-3 border-blue-460 bg-blue-860">
        <div className="text-2xl text-center font-bold">Minted 0/{totalSupply} Supply</div>
        <div className="text-xl text-center">Mint 1 Pad Club NTF for {preSalePrice} ETH</div>
        <div className="text-xl text-center">Maximum allowed mints per Wallet: 10 NFT</div>
        <input type="text" className="bg-blue-300 py-2 px-4"/>
        <button className="w-56 mx-auto"><MintButton/> </button>
      </div>

      <div className="text-white border rounded-xl w-1/2 mx-auto flex flex-col p-4 space-y-3 border-blue-460 bg-blue-860">
        <div className="text-2xl text-center font-bold">Minted 0/{totalSupply} Supply</div>
        <div className="text-xl text-center">Mint 1 Pad Club NTF for {publicSalePrice} ETH</div>
        <div className="text-xl text-center">Maximum allowed mints per Wallet: 10 NFT</div>
        <input type="text" className="bg-blue-300 py-2 px-4"/>
        <button className="w-56 mx-auto"><MintButton/> </button>
      </div>

      <div className="text-white border rounded-xl w-1/2 mx-auto flex flex-col p-4 space-y-3 border-blue-460 bg-blue-860">
        <div className="text-2xl text-center font-bold">Minted 0/{totalSupply} Supply</div>
        <div className="text-xl text-center">Mint 1 Pad Club NTF for 0 ETH</div>
        <div className="text-xl text-center">Maximum allowed mints per Wallet: 10 NFT</div>
        <input type="text" className="bg-blue-300 py-2 px-4"/>
        <button className="w-56 mx-auto"><MintButton/> </button>
      </div>
    </div>
  );
};

export default Mint;