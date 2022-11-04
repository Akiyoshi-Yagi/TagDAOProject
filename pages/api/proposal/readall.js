import { contractAbi,contractAddress} from "../../../utils/smartcontract"; 

const getAllTokens = async(req, res) => {
    try{
        console.log("aaa")
        const Web3 = require("web3");
        const web3 = new Web3();
        web3.setProvider(new web3.providers.HttpProvider(process.env.INFURA_API))
        //let result = await web3.eth.getBalance("0x5dcE2f6D2C427dC122cAe63174730D33Cb39c0A1");
        
        try {
            new web3.eth.Contract(contractAbi, contractAddress).methods.tokenProposal().call().then(allProposals => {
                console.log(allProposals);
                return res.status(200).json({message: "fetch success", allProposals: allProposals});
            });
        } catch (error) {
            console.log("やばい")
            console.log(error);

        }
    }catch(err){

        return res.status(400).json({message: "fetch fail"})
    }
}

export default getAllTokens