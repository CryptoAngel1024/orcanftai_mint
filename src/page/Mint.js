import React, { useState, useEffect }  from "react";
import 'react-toastify/dist/ReactToastify.css';
import WalletButton from '../component/WalletButton'
import ABI_MINT from '../config/mint.json'
import Web3 from 'web3'
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Mint = () => {
  const [totalSupply, setTotalSupply] = useState(0);
  const [preSalePrice, setPreSalePrice] = useState(0);
  const [publicSalePrice, setPublicSalePrice] = useState(0);
  const [amount1, setAmount1] = useState(1)
  const [amount2, setAmount2] = useState(1)
  const [amount3, setAmount3] = useState(1)
  const web3 = new Web3("https://rpc.ankr.com/eth")
  
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

  const decrementMintHandler = (type) => {
    if(type === 1) {
      if (amount1 > 1) {
        setAmount1(amount1 - 1);
      }
    } 
    if(type === 2) {
      if (amount2 > 1) {
        setAmount2(amount2 - 1);
      }
    } 
    if(type === 3) {
      if (amount3 > 1) {
        setAmount3(amount3 - 1);
      }
    } 
 
  };
  const incrementMintHandler = (type) => {
    
    if(type === 1) {
      setAmount1(amount1 + 1);
    } 
    if(type === 2) {
      setAmount2(amount2 + 1);
    } 
    if(type === 3) {
      setAmount3(amount3 + 1);
    } 
  };
  
  return (
    <div className="flex justify-center items-center h-screen flex-col space-y-5">
      <div className="text-white border rounded-xl w-1/2 mx-auto flex flex-col p-4 space-y-3 border-blue-460 bg-blue-860">
        <div className="text-2xl text-center font-bold">Minted 0/{totalSupply} Supply</div>
        <div className="text-xl text-center">Mint 1 Pad Club NTF for {preSalePrice} ETH</div>
        <div className="text-xl text-center">Maximum allowed mints per Wallet: 10 NFT</div>
        <div className="flex py-2 justify-center">
          <button
            className="bg-blue-450 w-12 h-12 border-2 hover:bg-blue-460 border-white text-white rounded-xl shadow flex justify-center items-center"
            onClick={() => {
              decrementMintHandler(1);
            }}
          >
            <div className="text-xl">
              <FontAwesomeIcon icon={faMinus} />
            </div>
          </button>
          <input
            type="text"
            className="border-2 w-32 border-blue-450 rounded-xl shadow mx-8 text-center text-blue-850 text-3xl"
            value={amount1}
            onChange={(e)=>setAmount1(e.target.value)}
          />
          <button
            className="bg-blue-450 w-12 h-12 border-2 hover:bg-blue-460 border-white text-white rounded-xl shadow flex justify-center items-center"
            onClick={() => {
              incrementMintHandler(1);
            }}
          >
            <div className="text-xl">
              <FontAwesomeIcon icon={faPlus} />
            </div>
          </button>
        </div>
        <div className="w-72 mx-auto flex justify-center"><WalletButton price={publicSalePrice} mintType={1} amount={Number(amount1)}/> </div>
      </div>

      <div className="text-white border rounded-xl w-1/2 mx-auto flex flex-col p-4 space-y-3 border-blue-460 bg-blue-860">
        <div className="text-2xl text-center font-bold">Minted 0/{totalSupply} Supply</div>
        <div className="text-xl text-center">Mint 1 Pad Club NTF for {publicSalePrice} ETH</div>
        <div className="text-xl text-center">Maximum allowed mints per Wallet: 10 NFT</div>
        <div className="flex py-2 justify-center">
          <button
            className="bg-blue-450 w-12 h-12 border-2 hover:bg-blue-460 border-white text-white rounded-xl shadow flex justify-center items-center"
            onClick={() => {
              decrementMintHandler(2);
            }}
          >
            <div className="text-xl">
              <FontAwesomeIcon icon={faMinus} />
            </div>
          </button>
          <input
            type="text"
            className="border-2 w-32 border-blue-450 rounded-xl shadow mx-8 text-center text-blue-850 text-3xl"
            value={amount2}
            onChange={(e)=>setAmount2(e.target.value)}
          />
          <button
            className="bg-blue-450 w-12 h-12 border-2  hover:bg-blue-460 border-white text-white rounded-xl shadow flex justify-center items-center"
            onClick={() => {
              incrementMintHandler(2);
            }}
          >
            <div className="text-xl">
              <FontAwesomeIcon icon={faPlus} />
            </div>
          </button>
        </div>
        <div className="w-72 mx-auto flex justify-center"><WalletButton price={preSalePrice} mintType={2} amount={Number(amount2)}/> </div>
      </div>

      <div className="text-white border rounded-xl w-1/2 mx-auto flex flex-col p-4 space-y-3 border-blue-460 bg-blue-860">
        <div className="text-2xl text-center font-bold">Minted 0/{totalSupply} Supply</div>
        <div className="text-xl text-center">Mint 1 Pad Club NTF for 0 ETH</div>
        <div className="text-xl text-center">Maximum allowed mints per Wallet: 10 NFT</div>
        <div className="flex py-2 justify-center">
          <button
            className="bg-blue-450 w-12 h-12 border-2 hover:bg-blue-460 border-white text-white rounded-xl shadow flex justify-center items-center"
            onClick={() => {
              decrementMintHandler(3);
            }}
          >
            <div className="text-xl">
              <FontAwesomeIcon icon={faMinus} />
            </div>
          </button>
          <input
            type="text"
            className="border-2 w-32 border-blue-450 rounded-xl shadow mx-8 text-center text-blue-850 text-3xl"
            value={amount3}
            onChange={(e)=>setAmount3(e.target.value)}
          />
          <button 
            className="bg-blue-450 w-12 h-12 border-2  hover:bg-blue-460 border-white text-white rounded-xl shadow flex justify-center items-center"
            onClick={() => {
              incrementMintHandler(3);
            }}
          >
            <div className="text-xl">
              <FontAwesomeIcon icon={faPlus} />
            </div>
          </button>
        </div>
        <div className="w-72 mx-auto flex justify-center"><WalletButton price={preSalePrice} mintType={3} amount={Number(amount3)}/> </div>
      </div>
    </div>
  );
};

export default Mint;