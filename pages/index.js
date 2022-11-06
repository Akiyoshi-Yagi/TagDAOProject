import { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import Image from 'next/image'
import styles from '../styles/Landing.module.css'
import Swal from 'sweetalert2'
import Link from "next/link";


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
          const accounts = await ethereum.request({ method: "eth_accounts" });
          if (accounts.length !== 0) {
            localStorage.setItem("address", accounts[0])
            Swal.fire("already connected!");
            router.push("/home")
            return;
          }
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

  const transitionHome = () => {
    router.push("/home");
  }
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []); 
  return (
    <div className={styles.container}>
      
      <main className={styles.main}>
        <Image src="/tagdao.png"  width={600} height={500} />
        <div className={styles.underButton}>
          <div className={styles.grid}>
            <button className={styles.card} onClick={connectWallet}>
              <h2>Connect Metamask &rarr;</h2>
              <p> 
                you can connect your metamask from here.
              </p>
            </button>
          </div>
          <div className={styles.grid}>
            <button className={styles.card} onClick={transitionHome}>
              <h2>Guest Login &rarr;</h2>
              <p>
                 If you don&#039;t have metamask,
              </p> 
              <p> 
                you can enter from here.
              </p>
            </button>
          </div>
        </div>
      </main>

    </div>
  )
}

export const getServerSideProps = async (context) => ({
  props: {
    layout: true
  }
})
