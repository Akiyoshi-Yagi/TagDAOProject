import { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import Web3 from "web3";
import { nftAbi, nftAddress } from "../../utils/smartcontract";
import styles from "../../styles/holderMenu.module.css";
import Image from 'next/image'
import Link from "next/link"
import Swal from 'sweetalert2'

const Holder = (props) => {

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
        localStorage.setItem("address", account);
      } else {
        console.log("No authorized account found");
      }
    };
  
    /*
     * connectWallet メソッドを実装します。
     */
    const transtionWithdrawPage = async() => {
      try{
        const { ethereum } = window;
        const web3 = new Web3(ethereum);
        let tagDaoContract = new web3.eth.Contract(nftAbi, nftAddress);
        try {
            tagDaoContract.methods.balanceOf(localStorage.getItem("address")).call({from: localStorage.getItem("address")}).then(res => {
                console.log(res);
                if (res != 0){
                  Swal.fire("You have TagDao Token.（Coming soon）")
                  router.push("/holder/menu");

                }else{
                  Swal.fire("You have no NFT");
                }
            });
        } catch (error) {

            Swal.fire("fail to connect to the TagDaoToken contract")
            console.log(error);
        }
      }catch(err){
          Swal.fire("fail to connect to the TagDaoToken contradt")
      }

    }

    const transtionTagProposal = async() => {
      try{
        const { ethereum } = window;
        const web3 = new Web3(ethereum);
        let tagDaoContract = new web3.eth.Contract(nftAbi, nftAddress);
        try {
            tagDaoContract.methods.balanceOf(localStorage.getItem("address")).call({from: localStorage.getItem("address")}).then(res => {
                console.log(res);
                if (res != 0){
                  Swal.fire("You have TagDao Token.(Comming soon)")
                  router.push("/holder/menu");
                }else{
                  Swal.fire("You have no NFT");
                }
            });
          
        } catch (error) {

            Swal.fire("fail to connect to the TagDaoToken contract")
            console.log(error);
        }
      }catch(err){
          Swal.fire("fail to connect to the TagDaoToken contradt")
      }

    }


    useEffect(() => {
      checkIfWalletIsConnected();
    }, []);
    return (
    <div>
      <div className={styles.body_upper}>
          <h1>This is a page only for Tag DAO Token Holder.</h1>
      </div>

      <h1>Tag Registration</h1>
      <div className={styles.body}>
        <div className={styles.left_body}>
        <h2>Registration steps</h2>
        <ol>
          <li>Token Application</li>
            Representative of the Token community submit αn application to TAG DAO.
          <li>Vote in TAG DAO</li>
            TAG DAO member (=NFT Holder) vote on whether to grant the token application.
          <li>Token Registration</li>
            If the vote is won, the Token is recorded on the blockchain along with its Tag information.
            <div className={styles.button_loc}>
                  <button className={styles.button} onClick={transtionTagProposal}> propose Tag list update</button>
          </div>
        </ol>
        </div>
        <div className={styles.right_body}>
          <h2>Latest Registered Tokens</h2>
          <table className={styles.Table}>
            <thead className={styles.Table_Head}>
              <tr className={styles.Table_Head_Row}>
                  <th className={styles.Table_Head_Row_Cell}>symbol</th>
                  <th className={styles.Table_Head_Row_Cell}>contractAddress</th>
                  <th className={styles.Table_Head_Row_Cell}>Tags</th>
              </tr>
              </thead>
              <tbody className={styles.Table_Body}>
              {props.allTokens.map(Token => 
              
                    
                <tr className={styles.Table_Body_Row} key={Token[0]}>
                    <td className={styles.Table_Head_Row_Cell}  >{Token[0]}</td>
                    <td className={styles.Table_Head_Row_Cell}>{Token[1]}</td>
                    <td className={styles.Table_Head_Row_Cell}>{Token[2]},{Token[3]},{Token[4]}</td>
                </tr>
             
                )} 
            </tbody>
          </table>
        </div>
      </div>
      <h1>Check your deposit on Tag DAO smartcontract</h1>
      <div className={styles.body_bottom}>
          
          <div className={styles.nftimage}>
          <Image src="/nft.jpg"  width={400} height={300} />
          </div>    
          <div>
      
          <li>Voting Right</li>
            NFT Holder can participate the judgements of the  
          <li>Vote in TAG DAO</li>
            TAG DAO member (=NFT Holder) vote on whether to grant the token application.
          <li>Token Registration</li>
            If the vote is won, the Token is recorded on the blockchain along with its Tag information.
          <div className={styles.button_loc}>
                  <button className={styles.button} onClick={transtionWithdrawPage}> check your deposit</button>
          </div>
          </div>
          
      </div>

    </div>


    );
  };


export const getServerSideProps = async () => {
  console.log("aa")
  const response = await fetch("https://tag-dao-project-akiyoshi-yagi.vercel.app/api/token/readall")  
  const allTokens = await response.json() 
  console.log(allTokens);
  return{
    props: allTokens 
  }
}

export default Holder;


      


  
     
      