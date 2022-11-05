import { useRouter } from 'next/router'
import styles from "../../styles/TokenList.module.css"
import Link from "next/link"
import Swal from 'sweetalert2'
import { contractAddress } from '../../utils/smartcontract'


const ReadAllTokens = (props) => {
    const router = useRouter()


    return (
        <div>

          <div className = {styles.body_upper}>
                <h1 className = {styles.appListTitle}> Application List</h1>
                <h2>Here are all registerd Token on TAG DAO smart contract.  </h2>
                <h3>・TAG DAO smart contract address ：{contractAddress} </h3>
                <h3>・You can use "Token - Tag info" in many use case as explained home page.</h3>
                <h3>・You can access all the data on smart conrtact. Call function "tokenList()" returns all registerd token. Please try it.</h3>
            </div>
            
            <table className={styles.Table}>
              <thead className={styles.Table_Head}>
                <tr className={styles.Table_Head_Row}>
                    <th className={styles.Table_Head_Row_Cell}>ID</th>
                    <th className={styles.Table_Head_Row_Cell}>Token</th>
                    <th className={styles.Table_Head_Row_Cell}>Contract Address</th>
                    <th className={styles.Table_Head_Row_Cell_tag}>Tags</th>
                    <th className={styles.Table_Head_Row_Cell}></th>
                </tr>
                </thead>
                <tbody className={styles.Table_Body}>
                {props.allTokens.reduceRight((p, c) => [...p, c], []).map(Token => 
                      
                  <tr className={styles.Table_Body_Row} key={Token[0]}>
                      <td className={styles.Table_Head_Row_Cell_content}  >{Token[0]}</td>
                      <td className={styles.Table_Head_Row_Cell_content}  >{Token[1]}</td>
                      <td className={styles.Table_Head_Row_Cell_content}>{Token[2]} </td>
                      <td className={styles.Table_Head_Row_Cell_content}>{Token[3]}, {Token[4]}, {Token[5]}</td>
                      <td className={styles.buttonField}><div className = {styles.button}> <Link  href={{pathname:`/token/update`}} > Delete / Update </Link></div> </td>
                  </tr>
                  
  
                  )} 
              </tbody>
            </table>
            
        </div>
    )
}

export default ReadAllTokens

export const getServerSideProps = async() => {
    const response = await fetch("https://tag-dao-project.vercel.app/api/token/readall")   
    const allTokens = await response.json() 
    console.log(allTokens);

    return{
        props: allTokens 
    }
}