
import Web3 from "web3";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import { contractAbi, contractAddress} from "../../utils/smartcontract";

const Landing = () => {
    const [currentAccount, setCurrentAccount] = useState("");
    const router = useRouter()


    console.log("currentAccount: ", currentAccount);

    const checkIfWalletIsConnected = async () => {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Make sure you have MetaMask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }
 
      const accounts = await ethereum.request({ method: "eth_accounts" });
  
      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
        localStorage.setItem("address", currentAccount);
      } else {
        console.log("No authorized account found");
      }
    };
  
    const connectWallet = async (e) => {
      try {
        const { ethereum } = window;
        if (!ethereum) {
            alert("Get MetaMask!");
            return;
        }

        if(currentAccount){
            localStorage.setItem("address", currentAccount)
            alert("already connected!");
            router.push("/user/home")
        };
        
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log("Connected", accounts[0]);

        setCurrentAccount(accounts[0]);
        localStorage.setItem("address", currentAccount)
        router.push("/user/home")
      } catch (error) {
        console.log(error);
      }
    };


    useEffect(() => {
      checkIfWalletIsConnected();
    }, []);
    return (
    <div>
        <button onClick={connectWallet}>
                 connect wellet
        </button>
    </div>


    );
  };
  export default Landing;



      


  
     
      