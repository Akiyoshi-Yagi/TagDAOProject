import { contractAbi, contractAddress } from "../../../utils/smartcontract";

const getAllTags = async(req, res) => {
    try{
        console.log("aaa")
        const Web3 = require("web3");
        const web3 = new Web3();
        web3.setProvider(new web3.providers.HttpProvider(process.env.NEXT_PUBLIC_INFURA_API))
        //let result = await web3.eth.getBalance("0x5dcE2f6D2C427dC122cAe63174730D33Cb39c0A1");
        
        try {
            new web3.eth.Contract(contractAbi, contractAddress).methods.tagList().call().then(allTags => {
                console.log(allTags);
                return res.status(200).json({message: "fetch success", allTags: allTags});
            });
        } catch (error) {
            console.log(error);

        }
    }catch(err){

        return res.status(400).json({message: "fetch fail"})
    }
}

export default getAllTags