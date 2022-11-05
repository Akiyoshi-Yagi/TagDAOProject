import Swal from 'sweetalert2'
//import { nftAddress, nftAbi } from '../utils/smartcontract';
import { useState, useEffect } from "react";
import styles from "./component.module.css"
import Web3 from "web3";
import Link from "next/link"

function Layout({ children }) {
    const [currentAccount, setCurrentAccount] = useState("");
    
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
          localStorage.setItem("address", account);
        } else {
          console.log("No authorized account found");
        }
      };
    
    
    const connectWallet = async (e) => {
        try {
          const { ethereum } = window;
          if (!ethereum) {
            Swal.fire("Get MetaMask!");
            return;
          }
  
          if(currentAccount){
            Swal.fire("already connected!")  
            return;
          };
          
          const accounts = await ethereum.request({
            method: "eth_requestAccounts",
          });
          console.log("Connected", accounts[0]);

          setCurrentAccount(accounts[0]);
          localStorage.setItem("address", accounts[0])
        } catch (error) {
          console.log(error);
        }
      };

    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);

    return (
    <div>
        <div className={styles.site_header}>
            <div className={styles.site_header__wrapper}>
                <div className={styles.site_header__start}>
                    <Link href="/home">TAG DAO</Link>
                </div>
                <div className={styles.site_header__middle}>
                    <nav className={styles.nav}>
                        <ul className={styles.nav__wrapper}>
                            <li className={styles.nav__item}><Link href="/home">Home</Link></li>
                            <li className={styles.nav__item}><Link href="/token/readall">Registered Tokens</Link></li>
                            <li className={styles.nav__item}><Link href="/token/create">Registration Application</Link></li>
                            <li className={styles.nav__item}><Link href="/proposal/readall">Vote for application</Link></li>
                            <li className={styles.nav__item}><Link href="/holder/menu">NFT Holder Only</Link></li>
                        </ul>
                    </nav>
                </div>
                <div className={styles.site_header__end}>
                    <button className={styles.button} onClick={connectWallet}> Connect Wallet</button>
                </div>
            </div>
        </div>
        <div className = {styles.commonBody}>
          {children}
        </div>
               
    </div>
    )
  };
  
  export default Layout