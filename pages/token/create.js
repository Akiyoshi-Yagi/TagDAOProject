import { useState } from "react"
import { useRouter } from 'next/router'
import Web3 from "web3";
import { contractAbi, contractAddress, zeroAddress } from "../../utils/smartcontract";
import styles from "../../styles/applicationToken.module.css"
import Swal from 'sweetalert2'
import Link from "next/link"


const CreateTokenProposal = (props) => {
    const [symbol, setSymbol] = useState("")
    const [address, setAddress] = useState("")
    const [tag1, setTag1] = useState("")
    const [tag2, setTag2] = useState("")
    const [tag3, setTag3] = useState("")
    const [spanDays, setSpanDays] = useState("")
    const [description, setDescription] = useState("")

    const router = useRouter()
    
    const submitApplication = async(e) => {
        e.preventDefault()
        try{
            const { ethereum } = window;
            const web3 = new Web3(ethereum);
            let tagDaoContract = new web3.eth.Contract(contractAbi, contractAddress);
            try {
                console.log("aaa");
                console.log(tag1);
                tagDaoContract.methods.proposeTokenProposal(description,symbol,address,[tag1, tag2, tag3],"",zeroAddress,["", "", ""],spanDays).send({from: localStorage.getItem("address"),value:10000000000000000}).then(res => {
                    console.log(res);
                    Swal.fire("application submitted！");
                });
              
            } catch (error) {

                Swal.fire("fail to submit")
                console.log(error);
            }
        }catch(err){
            Swal.fire("fail to submit")
        }
    }
    
    const pageTransition = () => {
        router.push("/token/create")
    }

    return (
        <div className = {styles.body}>
            <h1 className="page-title">Token Application</h1>
            <h3 className="page-title">Plaease fulllfill the below form in ENGLISH.</h3>
            <h3 className="page-title">※ An Application takes 1 ETH per token regardless of whether it accepted or not.</h3>
            
            <table className="form-table">
                <tbody>
                    <tr>
                        <th>Symbol</th>
                        <td>
                            <input className = {styles.textarea} value={symbol} onChange={(e) => setSymbol(e.target.value)} type="text" name="symbol" placeholder="TAG" required/>
                        </td>
                    </tr>
                    <tr>
                        <th>Token Address</th>
                        <td>
                            <input className = {styles.textarea} value={address} onChange={(e) => setAddress(e.target.value)} type="text" name="address" placeholder="0x77993B6ca64eEAfa427Bc8b4f9945BcF31b7D82c" required/>
                        </td>
                    </tr>
                    <tr>
                        <th>Tags 
                            (CHOOSE 3 Tags)
                        </th>
                        
                        <td>  
                            <div className={styles.cp_ipselect.cp_sl02}>
                                <select onChange={(e) => setTag1(e.target.value) } required>
                                    <option value="" hidden>Choose</option>
                                    {props.allTags.map(Tag => 
                                    <option key={Tag} value={Tag}  type="text" name="tag1" > {Tag}</option>)}
                                </select>
                                <select onChange={(e) => setTag2(e.target.value) }required>
                                    <option value="" hidden>Choose</option>
                                    {props.allTags.map(Tag =>
                                    <option key={Tag}  value={Tag}  type="text" name="tag2" > {Tag}</option>)}
                                </select>
                                <select onChange={(e) => setTag3(e.target.value) } required>
                                    <option value="" hidden>Choose</option>
                                    {props.allTags.map(Tag => 
                                    <option key={Tag}  value={Tag}  type="text" name="tag3" > {Tag}</option>)}
                                </select>
                            </div> 

                        </td>
                    </tr>
                    <tr>
                        <th>Discription</th>
                        <td>
                            <textarea className = {styles.textarea} value={description} onChange={(e) => setDescription(e.target.value)} name="description" rows={15} placeholder="Summary, reason for choosing 3 tags, dicussion URL, Token home Page, etc..." required></textarea>
                        </td>
                    </tr>
                    <tr>
                        <th>Voting days </th>
                        <td>
                            <input className = {styles.textarea} value={spanDays} onChange={(e) => setSpanDays(e.target.value)} type="number" name="spanDays" placeholder="7" required/>
                        </td>
                    </tr>

                    
                    
                        
                    

                    
                </tbody>
                
            </table>
            <div className={styles.submitfield}>
                <button className = {styles.submitbutton}  onClick={submitApplication}><span>SUBMIT</span></button>
            </div>
            
        </div>
    )
}

export default CreateTokenProposal


export const getStaticProps = async() => {
    const response = await fetch("https://tag-dao-project-hack.vercel.app/api/token/create")   
    const allTags = await response.json() 
    console.log(allTags);

    return{
        props: allTags 
    }
}


//next-dev.js?3515:20 Warning: Each child in a list should have a unique "key" prop.