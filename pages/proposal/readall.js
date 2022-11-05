import Link from "next/link"
import { useRouter } from 'next/router'
import styles from "../../styles/ProposalAll.module.css"

const ReadAllProposals = (props) => {
    const router = useRouter()
    const pageTransition = () => {
        router.push("/proposal/create")
    }

    return (
        <div>
            
            <div className = {styles.body_upper}>
                <h1 className = {styles.appListTitle}> Application List</h1>
                <h2>Here are all applications submitted to TAG DAO smart contract.  </h2>
                <h3>・Only TAG DAO Token holder can vote for them. </h3>
                <h3>・If you contribute Tagging Tokens by voting and your vote turns out to be correct (=majority), 
                    you can receive reward.</h3>
                <h3>・The amount of the reward depends on when in the voting period the vote is cast; the earlier the vote, the higher the reward.</h3>
                <h3>・Rewards are calculated automatically and are tied to the holders account on TAGDAO , which can be withdrawn at any time.</h3>
            </div>
            
            <table className={styles.Table}>
              <thead className={styles.Table_Head}>
                <tr className={styles.Table_Head_Row}>
                    <th className={styles.Table_Head_Row_Cell}>Application ID</th>
                    <th className={styles.Table_Head_Row_Cell}>Token</th>
                    <th className={styles.Table_Head_Row_Cell_tag}>Tags</th>
                    <th className={styles.Table_Head_Row_Cell}>Proposal status</th>
                    <th className={styles.Table_Head_Row_Cell}></th>
                </tr>
                </thead>
                <tbody className={styles.Table_Body}>
                {props.allProposals.reduceRight((p, c) => [...p, c], []).map(Proposal => 
                      
                  <tr className={styles.Table_Body_Row} key={Proposal[0]}>
                      <td className={styles.Table_Head_Row_Cell_content}  >{Proposal[0]}</td>
                      <td className={styles.Table_Head_Row_Cell_content}  >{Proposal[5][1]}</td>
                      <td className={styles.Table_Head_Row_Cell_content}>{Proposal[5][3]}, {Proposal[5][4]}, {Proposal[5][5]}</td>
                      <td className={styles.Table_Head_Row_Cell_content}>{Proposal[3]}</td>
                      <td className={styles.buttonField}><div className = {styles.button}> <Link  href={{pathname:`/proposal/${Proposal[0]}`}} > Detail / Vote </Link></div> </td>
                  </tr>
                  
  
                  )} 
              </tbody>
            </table>

        
        </div>
    )
}

export default ReadAllProposals

export const getServerSideProps = async() => {
    const response = await fetch("https://tag-dao-project.vercel.app/api/proposal/readall")   
    //console.log(response)
    const allProposals = await response.json()   
    console.log(allProposals)
    return{
        props: allProposals 
    }
}