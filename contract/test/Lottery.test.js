const { Web3 } = require("web3");
const ganache = require("ganache");
const assert = require("assert");
const { contractAbi, contractBytecode } = require("../compile");

const web3 = new Web3(ganache.provider());

let accounts = [];
let lottery;

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.personal.getAccounts();

  // Use one of those accounts to deploy our contract
  lottery = await new web3.eth.Contract(contractAbi)
    .deploy({ data: contractBytecode })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Lottery", () => {
  it("deploys a contract", () => {
    assert.ok(lottery.options.address);
  });

  it("allows one account to enter", async () => {
    await lottery.methods.addPlayers().send({
      from: accounts[0],
      value: web3.utils.toWei("0.02", "ether"),
    });

    const players = await lottery.methods.getPlayers().call({
      from: accounts[0],
    });

    assert.equal(accounts[0], players[0]);
    assert.equal(1, players.length);
  });

  it("allows multiple accounts to enter", async () => {
    await lottery.methods.addPlayers().send({
      from: accounts[0],
      value: web3.utils.toWei("0.02", "ether"),
    });

    await lottery.methods.addPlayers().send({
      from: accounts[1],
      value: web3.utils.toWei("0.02", "ether"),
    });

    await lottery.methods.addPlayers().send({
      from: accounts[2],
      value: web3.utils.toWei("0.02", "ether"),
    });

    const players = await lottery.methods.getPlayers().call({
      from: accounts[0],
    });

    assert.equal(3, players.length);
  });

  it("requires a minimum amount of ether to enter", async () => {
    try {
      await lottery.methods.addPlayers().send({
        from: accounts[0],
        value: 200, // 200 is wei, i.e. 0.0000000000000002 ether
      });
      assert(false);
    } catch (error) {
      assert(error);
    }
  });

  it("only manager can call pickWinner", async () => {
    try {
      await lottery.methods.pickWinner().send({
        from: accounts[1], // not the manager
      });
      assert(false);
    } catch (error) {
      assert(error);
    }
  });

  it("sends money to the winner and resets the players array", async () => {
    await lottery.methods.addPlayers().send({
      from: accounts[1],
      value: web3.utils.toWei("2", "ether"),
    });

    const initialBalance = await web3.eth.getBalance(accounts[1]);

    await lottery.methods.pickWinner().send({
      from: accounts[0],
    });

    const finalBalance = await web3.eth.getBalance(accounts[1]);

    const difference = finalBalance - initialBalance;
    assert(difference > web3.utils.toWei("1.8", "ether"));
  });
});

// assert.ok(somevalue) - ok assure that some value is passed into this function
// assert() - assert checks for truthiness, unlike ok whiich checks for existance
