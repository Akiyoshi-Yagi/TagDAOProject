import { useRouter } from 'next/router'
import styles from "../../styles/TokenList.module.css"


const ReadAllTokens = (props) => {
    const router = useRouter()
    const pageTransition = () => {
        //router.push("/token/create")
    }

    return (
        <div>
            <h1> Registerd Tokens List</h1>
            
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
                    
                <tr className={styles.Table_Body_Row} key={Token}>
                    <td className={styles.Table_Head_Row_Cell}  >{Token[0]}</td>
                    <td className={styles.Table_Head_Row_Cell}>{Token[1]}</td>
                    <td className={styles.Table_Head_Row_Cell}>{Token[2]},{Token[3]},{Token[4]}</td>
                    <button className={styles.button} > Update / delete Token</button>
                </tr>
                

                )} 
            </tbody>
          </table>
            
        </div>
    )
}

export default ReadAllTokens

export const getServerSideProps = async() => {
    const response = await fetch("http://localhost:3000/api/token/readall")   
    const allTokens = await response.json() 
    console.log(allTokens);

    return{
        props: allTokens 
    }
}