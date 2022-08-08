import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import { MetaMaskconnector, walletconnect } from '../wallet/wallet'
import { useMintContract } from '../config/contract'
import { useCallback, useEffect, useState } from 'react'
import MetaIcon from '../assets/meta.png'
import WalletConnect from '../assets/wallet.svg'
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from './Modal';
const WalletButton = () => {
  const [modalShow, setModalShow] = useState(false)
  const { active, activate, deactivate, account, error } = useWeb3React()

  const isUnsupportedChain = error instanceof UnsupportedChainIdError
  const contractMint = useMintContract();
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

  const mintPublic = async () => {
    const _amountOfEther = 140000000000000000;
    try {
      if(active) {
        await contractMint.methods.mintPublic(1).send({from:account, value: _amountOfEther})
      }
    } catch (error) {
      console.log(error);
    }
  };

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
        <button className="rounded-full flex items-center py-2 px-12 bg-blue-900 m-0.5 space-x-2" onClick={handleDisconnect}>
          <FontAwesomeIcon icon={faWallet}  className="w-5 h-5 text-blue-460"/>
          <div>{`${account.slice(0, -38)}...${account.substring(40)}`}</div>
        </button>
      )}
      <WalletConnector show={modalShow} onHide={() => setModalShow(false)} />
    </>
  )
}
export default WalletButton;