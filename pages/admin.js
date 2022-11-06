import { useState } from "react"
import Web3 from "web3";
import { contractAbi, contractAddress, zeroAddress } from "../utils/smartcontract";
import styles from "../styles/admin.module.css"
import Swal from 'sweetalert2'



const CreateTokenProposal = (props) => {
    const [newAddress, setNewAddress] = useState("")
    const [checkId, setCheckId] = useState("")
    const [executeId, setExecuteId] = useState("")
    const [newOwner, setNewOwner] = useState("")
    const [withdraw, setWithdraw] = useState("")
    
    const submitNewAddress = async(e) => {
        e.preventDefault()
        try{
            const { ethereum } = window;
            const web3 = new Web3(ethereum);
            let tagDaoContract = new web3.eth.Contract(contractAbi, contractAddress);
            try {
                console.log("aaa");
                console.log(tag1);
                tagDaoContract.methods.setTagDaoTokenAddress(newAddress).send({from: localStorage.getItem("address")}).then(res => {
                    console.log(res);
                    Swal.fire("changed address");
                });
              
            } catch (error) {

                Swal.fire("fail")
                console.log(error);
            }
        }catch(err){
            Swal.fire("fail")
        }
    }
    const submitCheckId = async(e) => {
        e.preventDefault()
        try{
            const { ethereum } = window;
            const web3 = new Web3(ethereum);
            let tagDaoContract = new web3.eth.Contract(contractAbi, contractAddress);
            try {
                console.log("aaa");
                console.log(tag1);
                tagDaoContract.methods.checkExpairTokenProposal(checkId).send({from: localStorage.getItem("address"),value:10000000000000000}).then(res => {
                    console.log(res);
                    Swal.fire("checked");
                });
              
            } catch (error) {

                Swal.fire("fail ")
                console.log(error);
            }
        }catch(err){
            Swal.fire("fail")
        }
    }
    const submitExecuteId = async(e) => {
        e.preventDefault()
        try{
            const { ethereum } = window;
            const web3 = new Web3(ethereum);
            let tagDaoContract = new web3.eth.Contract(contractAbi, contractAddress);
            try {
                console.log("aaa");
                console.log(tag1);
                tagDaoContract.methods.executeTokenProposal(executeId).send({from: localStorage.getItem("address"),value:10000000000000000}).then(res => {
                    console.log(res);
                    Swal.fire("executed！");
                });
              
            } catch (error) {

                Swal.fire("fail")
                console.log(error);
            }
        }catch(err){
            Swal.fire("fail")
        }
    }
    const submitNewOwner = async(e) => {
        e.preventDefault()
        try{
            const { ethereum } = window;
            const web3 = new Web3(ethereum);
            let tagDaoContract = new web3.eth.Contract(contractAbi, contractAddress);
            try {
                console.log("aaa");
                console.log(tag1);
                tagDaoContract.methods.transferOwnership(newOwner).send({from: localStorage.getItem("address"),value:10000000000000000}).then(res => {
                    console.log(res);
                    Swal.fire("changed！");
                });
              
            } catch (error) {

                Swal.fire("fail")
                console.log(error);
            }
        }catch(err){
            Swal.fire("fail")
        }
    }
    const submitWithdraw = async(e) => {
        e.preventDefault()
        try{
            const { ethereum } = window;
            const web3 = new Web3(ethereum);
            let tagDaoContract = new web3.eth.Contract(contractAbi, contractAddress);
            try {
                console.log("aaa");
                console.log(tag1);
                tagDaoContract.methods.withdrawTreasury(withdraw).send({from: localStorage.getItem("address"),value:10000000000000000}).then(res => {
                    console.log(res);
                    Swal.fire("withdraw");
                });
              
            } catch (error) {

                Swal.fire("fail")
                console.log(error);
            }
        }catch(err){
            Swal.fire("fail")
        }
    }
    

    return (
        <div>
            <h1 className = {styles.title}>Admin</h1>
            <div>
                <h1 className = {styles.title}> Set New NFT contract Address</h1>
                <input className = {styles.textarea} value={newAddress} onChange={(e) => setNewAddress(e.target.value)} type="text" name="newAddress" placeholder="0xC0AdCEFfd19ed2ea7a395d28af1aE7d6f807Fd71" />
                <button className = {styles.submitbutton}  onClick={submitNewAddress}><span>SUBMIT</span></button>
                <h1 className = {styles.title}> Check Application, acvite&rarr;queued, acvite&rarr;defeated</h1>
                <input className = {styles.textarea} value={checkId} onChange={(e) => setCheckId(e.target.value)} type="number" name="checkId" placeholder="5" />
                <button className = {styles.submitbutton}  onClick={submitCheckId}><span>SUBMIT</span></button>
                <h1 className = {styles.title}> execute Application, queued&rarr;executed</h1>
                <input className = {styles.textarea} value={executeId} onChange={(e) => setExecuteId(e.target.value)} type="number" name="symbol" placeholder="5" />
                <button className = {styles.submitbutton}  onClick={submitExecuteId}><span>SUBMIT</span></button>
                <h1 className = {styles.title}>Change Owner Address</h1>
                <input className = {styles.textarea} value={newOwner} onChange={(e) => setNewOwner(e.target.value)} type="text" name="newOwner" placeholder="0xC0AdCEFfd19ed2ea7a395d28af1aE7d6f807Fd71" />
                <button className = {styles.submitbutton}  onClick={submitNewOwner}><span>SUBMIT</span></button>
                <h1 className = {styles.title}> Withdraw contract amount</h1>
                <input className = {styles.textarea} value={withdraw} onChange={(e) => setWithdraw(e.target.value)} type="number" name="withdraw" placeholder="10000000" />
                <button className = {styles.submitbutton}  onClick={submitWithdraw}><span>SUBMIT</span></button>
            </div>
        </div>
                
            
    )
}

export default CreateTokenProposal




//next-dev.js?3515:20 Warning: Each child in a list should have a unique "key" prop.