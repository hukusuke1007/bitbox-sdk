const Bitcoin = require("bitcoincashjs-lib")
const coininfo = require("coininfo")

export interface ECPair {
  _address: any
  setAddress(address: any): void
  fromWIF(privateKeyWIF: string): any
  toWIF(ecpair: any): string
  sign(ecpair: any, buffer: any): any
  verify(ecpair: any, buffer: any, signature: any): any
  fromPublicKey(pubkeyBuffer: any): any
  toPublicKey(ecpair: any): any
  toLegacyAddress(ecpair: any): string
  toCashAddress(ecpair: any, regtest: boolean): string
}

export class ECPair implements ECPair {
  static _address: any
  static setAddress(address: any): void {
    ECPair._address = address
  }

  static fromWIF(privateKeyWIF: string): any {
    let network: string = "mainnet"
    if (privateKeyWIF[0] === "L" || privateKeyWIF[0] === "K")
      network = "mainnet"
    else if (privateKeyWIF[0] === "c") network = "testnet"

    let bitcoincash: any
    if (network === "mainnet") bitcoincash = coininfo.bitcoincash.main
    else bitcoincash = coininfo.bitcoincash.test

    const bitcoincashBitcoinJSLib = bitcoincash.toBitcoinJS()

    return Bitcoin.ECPair.fromWIF(privateKeyWIF, bitcoincashBitcoinJSLib)
  }

  static toWIF(ecpair: any): string {
    return ecpair.toWIF()
  }

  static sign(ecpair: any, buffer: any): any {
    return ecpair.sign(buffer)
  }

  static verify(ecpair: any, buffer: any, signature: any): any {
    return ecpair.verify(buffer, signature)
  }

  static fromPublicKey(pubkeyBuffer: any): any {
    return Bitcoin.ECPair.fromPublicKeyBuffer(pubkeyBuffer)
  }

  static toPublicKey(ecpair: any): any {
    return ecpair.getPublicKeyBuffer()
  }

  static toLegacyAddress(ecpair: any): string {
    return ecpair.getAddress()
  }

  static toCashAddress(ecpair: any, regtest: boolean = false): string {
    return ECPair._address.toCashAddress(ecpair.getAddress(), true, regtest)
  }
}
