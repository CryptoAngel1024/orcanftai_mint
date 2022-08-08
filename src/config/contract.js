import { useMemo } from "react";
import { useWeb3React } from "@web3-react/core";
import mint from "./mint.json"

const useMintContract = () => {
  const { active, library } = useWeb3React();
  
  return useMemo(()=>{
    if(active && library) {
      return new library.eth.Contract(mint, `${process.env.REACT_APP_NFT}`);
    }
  }, [library, active]);
}

export { useMintContract }
