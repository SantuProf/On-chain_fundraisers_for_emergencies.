const contractAddress = "0x9DDFa0246B7ee4104CD1b5D2a639b21763feB8Fb"; 
const abi = [
    [
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "campaignId",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "totalAmountRaised",
                    "type": "uint256"
                }
            ],
            "name": "CampaignClosed",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "campaignId",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "creator",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "title",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "goal",
                    "type": "uint256"
                }
            ],
            "name": "CampaignCreated",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "campaignId",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "donor",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "DonationReceived",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "campaigns",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "creator",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "title",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "description",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "goal",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amountRaised",
                    "type": "uint256"
                },
                {
                    "internalType": "bool",
                    "name": "active",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_campaignId",
                    "type": "uint256"
                }
            ],
            "name": "closeCampaign",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "contributions",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_title",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_description",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "_goal",
                    "type": "uint256"
                }
            ],
            "name": "createCampaign",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_campaignId",
                    "type": "uint256"
                }
            ],
            "name": "donate",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_campaignId",
                    "type": "uint256"
                }
            ],
            "name": "getCampaign",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getTotalCampaigns",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_campaignId",
                    "type": "uint256"
                }
            ],
            "name": "withdrawFunds",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ]
];

let web3;
let contract;

window.addEventListener('load', async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        contract = new web3.eth.Contract(abi, contractAddress);
        loadCampaigns();
    } else {
        alert("Please install MetaMask!");
    }
});

async function createCampaign() {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const goal = document.getElementById("goal").value;

    const accounts = await web3.eth.getAccounts();
    await contract.methods.createCampaign(title, description, web3.utils.toWei(goal, 'ether'))
        .send({ from: accounts[0] });

    alert("Campaign Created!");
    loadCampaigns();
}

async function donate() {
    const campaignId = document.getElementById("campaignId").value;
    const amount = document.getElementById("donationAmount").value;

    const accounts = await web3.eth.getAccounts();
    await contract.methods.donate(campaignId)
        .send({ from: accounts[0], value: web3.utils.toWei(amount, 'ether') });

    alert("Donation Successful!");
    loadCampaigns();
}

async function loadCampaigns() {
    const total = await contract.methods.getTotalCampaigns().call();
    const container = document.getElementById("campaigns");
    container.innerHTML = "";

    for (let i = 0; i < total; i++) {
        const campaign = await contract.methods.getCampaign(i).call();
        
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <h3>${campaign[1]}</h3>
            <p>${campaign[2]}</p>
            <p>Goal: ${web3.utils.fromWei(campaign[3], 'ether')} ETH</p>
            <p>Raised: ${web3.utils.fromWei(campaign[4], 'ether')} ETH</p>
            <p>Status: ${campaign[5] ? "Active" : "Closed"}</p>
        `;
        container.appendChild(card);
    }
}
