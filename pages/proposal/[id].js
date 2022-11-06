import { useRouter } from 'next/router'
import Web3 from "web3";
import { contractAbi, contractAddress } from '../../utils/smartcontract';
import Swal from 'sweetalert2'
import styles from "../../styles/proposalDetail.module.css"
import Link from "next/link"
//import { useState, useEffect } from "react";



const ReadSingleProposal = (props) => {
    
    
    //const [fetchedProposal, setFetchedProposal] = useState();
    const router = useRouter()

    const pollFor = async(e) => {
        
        e.preventDefault()
        try{
            const { ethereum } = window;
            const web3 = new Web3(ethereum);
            let tagDaoContract = new web3.eth.Contract(contractAbi, contractAddress);
            try {
                tagDaoContract.methods.voteTokenProposal(props.proposal.id, true).send({from: localStorage.getItem("address")}).then(res => {
                    console.log(res);
                    Swal.fire("Voted！");
                });
              
            } catch (error) {

                Swal.fire("fail to vote")
                console.log(error);
            }
        }catch(err){
            Swal.fire("fail to vote")
        }
    }
    const pollAgainst = async(e) => {
        e.preventDefault()
        try{
            const { ethereum } = window;
            const web3 = new Web3(ethereum);
            let tagDaoContract = new web3.eth.Contract(contractAbi, contractAddress);
            try {
                tagDaoContract.methods.voteTokenProposal(props.proposal.id, false).send({from: localStorage.getItem("address")}).then(res => {
                    console.log(res);
                    Swal.fire("Voted！");
                });
              
            } catch (error) {

                Swal.fire("fail to vote")
                console.log(error);
            }
        }catch(err){
            Swal.fire("fail to vote")
        }
    }
    return (
        <div className = {styles.fullbody}>
            <h1 className = {styles.title}> Application Detail</h1>
            <div className={styles.applicationFull}>
                <div className={styles.body_upper}>
                    <div className={styles.upper_left}>
                        <h1>SYMBOL&#058;&emsp;{props.proposal.appendToken[1]}</h1>
                    </div>

                    <div className={styles.upper_right}>
                        <h1>&emsp;&emsp;ADDRESS&#058;&emsp;{props.proposal.appendToken[2]}</h1>
                    </div>
                </div>
                <div className={styles.body_middle}>
                    <div className={styles.middle_left}>
                        <h1>TAGS&#058;&emsp;{props.proposal.appendToken[3]}, {props.proposal.appendToken[4]},  {props.proposal.appendToken[5]}</h1>
                    </div>    
                    <div className={styles.middle_right}>
                        <h1>&emsp;&emsp;APPLICATION STATUS&#058;&emsp;{props.proposal.status}</h1>
                    </div>
                </div>
                    
                <div className={styles.body_middlebottom}>
                    <div className={styles.bottom_left}>  
                        <h1>Description&#058;&emsp;</h1>
                        <h2>{props.proposal.description}</h2>
                    </div>
                </div>
            </div>
            <div className={styles.body_bottom}>
                <div>
                    <h1 className={styles.voteCheck}>Vote</h1>
                    <h3>You need a TAG DAO token to vote.</h3>

                </div>
                <div className={styles.votingButton}>
                    <button className={styles.button} onClick={pollFor}> FOR</button>
                    <h1>&emsp;&emsp;&emsp;&emsp;</h1>
                    <button  className={styles.button}onClick={pollAgainst}> AGAINST</button>
                </div>
                

            </div>  
            
            
        </div>
        
    )
}

export default ReadSingleProposal

export async function getServerSideProps(context) {

    const response = await fetch(`https://tag-dao-project.vercel.app/api/proposal/${context.query.id}`)  
    const singleProposal = await response.json()
    console.log(singleProposal.proposal.appendToken)

    return{
        props: singleProposal
    }
}

