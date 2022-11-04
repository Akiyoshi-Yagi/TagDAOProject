import { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import Web3 from "web3";
import { contractAbi, contractAddress, nftAbi, nftAddress } from "../utils/smartcontract";
import styles from "../styles/Home.module.css";
import Image from 'next/image'
import Link from "next/link"
import Swal from 'sweetalert2'

const Home = (props) => {

    const router = useRouter()
  
    /*
     * connectWallet メソッドを実装します。
     */
    const mintTagDaoToken = async() => {
      try{
        const { ethereum } = window;
        const web3 = new Web3(ethereum);
        let tagDaoContract = new web3.eth.Contract(nftAbi, nftAddress);
        try {
            tagDaoContract.methods.safeMint(localStorage.getItem("address")).send({value:10000000000000000, from: localStorage.getItem("address")})
            .then(res => {console.log(res);Swal.fire("minted！");})
        } catch (error) {
            Swal.fire("fail to mint")
            console.log(error);
        }
        }catch(err){
            Swal.fire("fail to mint")
        }
    }
    return (
    <div>
      <div className={styles.body_upper}>
          <h1>TAG DAO is a community in which all kinds of Tokens are "tagged" decentrallly by full-onchian voting system.</h1>
      </div>

      <h1>Token Registration</h1>
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
                <Link href={`/Token/${Token[0]}`} key={Token}>
                    
                    <tr className={styles.Table_Body_Row}>
                    <td className={styles.Table_Head_Row_Cell}  >{Token[0]}</td>
                    <td className={styles.Table_Head_Row_Cell}>{Token[1]}</td>
                    <td className={styles.Table_Head_Row_Cell}>{Token[2]},{Token[3]},{Token[4]}</td>
                </tr>
                </Link>
                )} 
            </tbody>
          </table>
        </div>
      </div>
      <h1>TAG DAO Token Utility</h1>
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
                  <a className={styles.button} onClick={mintTagDaoToken}> Mint NFT</a>
          </div>
          </div>
          
      </div>

    </div>


    );
  };
  export default Home;

export const getServerSideProps = async () => {
  console.log("aa")
  const response = await fetch("http://localhost:3000/api/token/readall")  
  const allTokens = await response.json() 
  console.log(allTokens);
  return{
    props: allTokens 
  }
  

}


      


  
     
      