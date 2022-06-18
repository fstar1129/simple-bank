import { Component } from '@angular/core';
import { ethers } from 'ethers';
import { formatUnits } from 'ethers/lib/utils';
import { bankAddress, bankToken } from 'src/contracts';
import bankABI from '../contracts/BankABI.json';
import erc20ABI from '../contracts/ERC20.json';
declare let window: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  address: string = '';
  isConnected: boolean = false;
  balance: string = '';
  amount: string | undefined;

  async connect() {
    //client side code
    if (!window.ethereum) return;

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    //Now define listener! (mostly if it sends some token, it triggers Transfer event)

    window.ethereum.enable().then(async () => {
      const signer = provider.getSigner();
      this.address = await signer.getAddress();

      //Now defining contract you want to listen to.
      const contract: any = await new ethers.Contract(
        bankToken,
        erc20ABI,
        signer
      );

      this.balance = formatUnits(
        await contract.balanceOf(this.address)
      ).toString();
      this.isConnected = true;
    });
  }

  async claim() {
    //client side code
    if (!window.ethereum) return;

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    //Now define listener! (mostly if it sends some token, it triggers Transfer event)

    window.ethereum.enable().then(async () => {
      const signer = provider.getSigner();
      this.address = await signer.getAddress();

      //Now defining contract you want to listen to.
      const contract: any = await new ethers.Contract(
        bankAddress,
        bankABI,
        signer
      );

      const tx = await contract.claim(this.amount, { gasLimit: 700000 });
      //   console.log(tx)
      await tx.wait();
      await provider.waitForTransaction(tx.hash);
    });
  }
}
