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
            <h1> Proposal List</h1>
            
            <table className={styles.Table}>
              <thead className={styles.Table_Head}>
                <tr className={styles.Table_Head_Row}>
                    <th className={styles.Table_Head_Row_Cell}>symbol</th>
                    <th className={styles.Table_Head_Row_Cell}>tags</th>
                    <th className={styles.Table_Head_Row_Cell}>status</th>
                </tr>
                </thead>
                <tbody className={styles.Table_Body}>
                {props.allProposals.map(Proposal => 
                      
                  <tr className={styles.Table_Body_Row} key={Proposal[0]}>
                   
                      <td className={styles.Table_Head_Row_Cell_content}  >{Proposal[5][1]}</td>
                      <td className={styles.Table_Head_Row_Cell_content}>{Proposal[5][3]}, {Proposal[5][4]}, {Proposal[5][5]}</td>
                      <td className={styles.Table_Head_Row_Cell_content}>{Proposal[3]}</td>
                      <td className={styles.buttonField}>
                         <Link  href={`/proposal/${Proposal[0]}`} className={styles.button} > Vote </Link>
                      </td>
                      
                      
                  </tr>
                  
  
                  )} 
              </tbody>
            </table>

        
        </div>
    )
}

export default ReadAllProposals

export const getStaticProps = async() => {
    const response = await fetch("https://tag-dao-project-hack-akiyoshi-yagi.vercel.app/api/proposal/readall")   
    //console.log(response)
    const allProposals = await response.json()   
    console.log(allProposals)
    return{
        props: allProposals 
    }
}