import { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import Image from 'next/image'
import styles from '../styles/Landing.module.css'
import Swal from 'sweetalert2'


export default function Landing(props) {
  const [currentAccount, setCurrentAccount] = useState("");
  const router = useRouter()

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
        console.log("Find an authorized account:", account);
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
            localStorage.setItem("address", currentAccount)
            Swal.fire("already connected!");
            router.push("/home")
            return;
        };
        
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        Swal.fire("Success in conenecting to  MetaMask!");

        setCurrentAccount(accounts[0]);
        localStorage.setItem("address", currentAccount)
        router.push("/home")
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []); 
  return (
    <div className={styles.container}>
      
      <main className={styles.main}>
        <Image src="/tagdao.png"  width={600} height={500} />

        <div className={styles.grid}>
          <button className={styles.card} onClick={connectWallet}>
            <h2>connect wallet &rarr;</h2>
            <p>
              Before starting, 
            </p> 
            <p> 
              you need to install and connedt your metamask
            </p>
          </button>
        </div>
      </main>

    </div>
  )
}

export const getStaticProps = async (context) => ({
  props: {
    layout: true
  }
})
