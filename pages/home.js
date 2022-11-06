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
    <div className = {styles.body}>
     
        <div className={styles.body_upper}>
            <h1 className = {styles.serviceName}>TAG DAO</h1>
              <h1> is a DAO in which all kinds of Tokens are Tagged </h1>
              <h1>in a decentral way by Full-Onchian Voting System on Ethereum.</h1>
        </div>
        <div>
          <h1 className = {styles.whyWeDoTitle}>Why We Do</h1> 
          <h2>The evolution of web3 has hit a wall because of the anonymity of the wallet. </h2><h2>To avoid this problem, the current trend is to derive the nature of the wallet owner from the tokens (FT, NFT, SBT) held in the wallet. </h2><h2>To do this, it is necessary to identify what kind of token it is by linking the token to a human-identifiable Tag.
          </h2><h2>This DAO is useful in a variety of cases by recording Token - Tag Link information in a decentralized, on-chain way.
          </h2>
          <h1 className = {styles.whyWeDoTitle}>Tag Use Case</h1> 
            <h2>・Update conventional DAO Voting System</h2>
              <h3>
              In the current DAO, the weight of votes is proportional to the amount of tokens held, which is not decentralized. By using Tag, for example, in the case of a finance-related vote in an environmental DAO, the weight of the vote can be increased for those who own more tokens with the environmental/finance tag, resulting in a more optimal choice for the community.
              </h3>
            <h2>・Job Matching</h2>
             <h3>As the number of DAOs increases, the recruitment of workers will increase. At this time, by using tags to understand the characteristics of wallet holders, it is possible to efficiently reach the desired workers. Matching services using Tags will also emerge.</h3>
            <h2>・Derive credit information for Lending Defi </h2>
              <h3>
              The problem with Defi current Lending service is that it is unable to obtain trust information, making low-collateral lending impossible. Tag can be used to understand the characteristics of the wallet and calculate the lending risk.
              </h3>
            
        </div>
        <div>
            <h1 className = {styles.registrationDemoTitle}>TAG DAO Overview</h1>
            <h2>TAG DAO overview is below.</h2>
            <h2>In addition to this, the discussion on the set of Tags itself is also decided by a vote in TAG DAO.</h2>
            <div className={styles.overviewimage}>
              <Image src="/overview.png"  width={1000} height={550} />
            </div>
        </div>
        <div>
            <h1 className = {styles.whyWeDoTitle}>TAG DAO Token Utility</h1> 
            <div className={styles.body_bottom}>
                <div className={styles.nftimage}>
                    <Image src="/nft.jpg"  width={550} height={400} />
                </div>    
                <div className={styles.utilityExp}>
                  <div >
                    <h3>・Vote Right</h3>
                      <h4>
                      TAG DAO token holder (=TAG DAO member) can participate in votes on Token Register application 
                      </h4>
                    <h3>・Vote Reward</h3>
                    <h4>
                    TAG DAO token holder can recieve reward for their votes activities.
                    </h4>
                      
                    <h3>・Priority access right</h3>
                    <h4>
                    We plan to expand into a variety of business using Tag. Token Holder can access it more quickly.
                    </h4>
                  </div>
                    
                    <div className={styles.button_loc}>
                        <h2 >Join TAG DAO and make the world more decentralized!</h2>
                        <div className={styles.button}>
                          <Link href="/home"  onClick={mintTagDaoToken}> Mint NFT</Link>
                        </div>
                    </div>

                  
                </div> 

              
            </div>
        </div>
        
        

    </div>


    );
  };
  export default Home;

export const getServerSideProps = async () => {
  console.log("aa")
  const response = await fetch("https://tag-dao-project.vercel.app/api/token/readall")  
  const allTokens = await response.json() 
  console.log(allTokens);
  return{
    props: allTokens 
  }
  

}


      


  
     
      