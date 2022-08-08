import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import { MetaMaskconnector, walletconnect } from '../wallet/wallet'
import { useCallback, useEffect, useState } from 'react'
import { useMintContract } from '../config/contract'
import MetaIcon from '../assets/meta.png'
import WalletConnect from '../assets/wallet.svg'
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Modal from './Modal';
const WalletButton = (props) => {
  const [modalShow, setModalShow] = useState(false)
  const { active, activate, deactivate, account, error } = useWeb3React()
  const mintContract = useMintContract();

  const isUnsupportedChain = error instanceof UnsupportedChainIdError
  useEffect(() => {
    if (active) {
      localStorage.setItem('shouldEagerConnect', true)
    }
  }, [active])
  const handleConnectMetaMask = useCallback(() => {
    activate(MetaMaskconnector)
  }, [activate])

  const handleConnectWalletConnect = async () => {
    try {
      await activate(walletconnect)
    } catch (e) {
      console.log(e)
    }
  }

  const handleDisconnect = () => {
    deactivate()
    localStorage.removeItem('shouldEagerConnect')
    window.location.reload()
  }
  useEffect(() => {
    if (active) {
      setModalShow(false)
    }
  }, [active])

  const mint = async (mintType) => {
    if(props.mintType === 1) {
      console.log("hello1", mintType)
      try {
        if(active) {
          await mintContract.methods.mintPublic(props.amount).send({from:account, value: props.price})
        }
      } catch (error) {
        console.log(error);
      }
    } 
    if(props.mintType === 2) {
      try {
        if(active) {
          await mintContract.methods.mintPreSale(props.amount).send({from:account, value: props.price})
        }
      } catch (error) {
        console.log(error);
      }
    } 
    if(props.mintType === 3) {
      try {
        if(active) {
          await mintContract.methods.mintPreSale(props.amount).send({from:account, value: props.price})
        }
      } catch (error) {
        console.log(error);
      }
    } 
  }

  // Connection Modal
  const WalletConnector = ({ show, onHide }) => {
    return (
      <Modal show={show} handleClose={onHide}>
        <div className="font-bold text-white text-2xl text-center py-2">Connect Wallet</div>
        <div
          className="hover:bg-blue-850 border rounded-xl my-3 hover:border-blue-450"
          onClick={() => {
            setModalShow(false)
            handleConnectMetaMask()
          }}
        >
          <div className='flex items-center justify-between p-4'>
            <div className='text-xl'>
              MetaMask
            </div>
            <img className='w-8 h-8' src={MetaIcon} alt="Metamask" />
          </div>
        </div>
        <div
          className="hover:bg-blue-850 border rounded-xl  my-3 hover:border-blue-450"
          onClick={() => {
            setModalShow(false)
            handleConnectWalletConnect()
          }}
        >
          <div className='flex items-center justify-between p-4'>
            <div className='text-xl'>
              WalletConnect
            </div>
            <img className='w-8 h-8 ml-24' src={WalletConnect} alt="DeFi Wallet" />
          </div>
        </div>
      </Modal>
    )
  }

  return (
    <>
      {!active ? (
        <button className="rounded-full flex items-center py-2 px-20 bg-blue-460  m-0.5" onClick={() => setModalShow(true)}>
          <div>{isUnsupportedChain ? 'Switch to Chain' : 'Connect'}</div>
        </button>
      ) : (
        <button className="rounded-full flex items-center py-2 px-12 bg-blue-900 m-0.5 space-x-2" onClick={()=>mint(props.mintType)}>
          {props.mintType === 1 && <div>Public Mint</div>}
          {props.mintType === 2 && <div>Pre Mint</div>}
          {props.mintType === 3 && <div>WhiteList</div>}
        </button>
      )}
      <WalletConnector show={modalShow} onHide={() => setModalShow(false)} />
    </>
  )
}
export default WalletButton;