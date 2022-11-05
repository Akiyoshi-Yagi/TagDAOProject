import { useRouter } from 'next/router'
import Web3 from "web3";
import { contractAbi, contractAddress } from '../../utils/smartcontract';
import Swal from 'sweetalert2'

const ReadSingleProposal = (props) => {
    
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
        <div className="grid-container-si">
            <div>
                <h1>{props.proposal.appendToken[1]}</h1>
                <h1>{props.proposal.appendToken[2]}</h1>
                <h1>{props.proposal.appendToken[3]}, {props.proposal.appendToken[4]},  {props.proposal.appendToken[5]}</h1>
                <h1>{props.proposal.description}</h1>
                <h1>{props.proposal.status}</h1>
                <h1>{props.proposal.epairTimeStamp}</h1>

                <div>
                    <h2>投票</h2>
                    <button onClick={pollFor}>賛成</button>
                    <button onClick={pollAgainst}>反対</button>
                    
                </div>
            </div>
        </div>
    )
}

export default ReadSingleProposal

export async function getStaticPaths() {
    return {
      // `paths`にid=1,2のみを定義。これらのパスはBuild時に生成される
      paths: [{ params: { id: "0"} }, { params: { id: "1" } }, { params: { id: "2" } }, { params: { id: "3" } }, { params: { id: "4" } } ],
      // id=3を許容できるようにfallback: trueを設定する
      fallback: false,
    }
}

export async function getStaticProps({params}) {
    //console.log(context.query.proposal_id)
    const response = await fetch(`https://tag-dao-project-hack.vercel.app/api/proposal/${params.id}`)  
    const singleProposal = await response.json()
    console.log(singleProposal.proposal)

    return{
        props: singleProposal
    }
}

