import './App.scss'
import { Signer, utils } from 'ethers'
import React, { Component } from 'react'
import { Button, Form, InputGroup, Modal } from 'react-bootstrap'
import { toast } from 'react-toastify'

type DonateButtonProps = {
  signer: Signer,
}

type DonateButtonState = {
  show: boolean,
  amount: string,
}

class DonateButton extends Component<DonateButtonProps, DonateButtonState> {
  state: DonateButtonState = {
    show: false,
    amount: '0.02',
  }

  async sendDonation() {
    if (!this.props.signer) {
      alert('Please connect your web3 wallet to donate')
    }

    try {
      await this.props.signer.sendTransaction({
        to: '0xe126b3E5d052f1F575828f61fEBA4f4f2603652a',
        from: await this.props.signer.getAddress(),
        value: utils.parseEther(this.state.amount),
      })

      toast.dark('Thanks for the donation!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })

      this.setState({ show: false })
    } catch (err) {
      if (err.code && err.code === 'INVALID_ARGUMENT') {
        alert('Input is not a valid number')
      }
      console.log(err)
    }
  }

  render() {
    const handleClose = () => this.setState({ show: false })
    const handleShow = () => this.setState({ show: true })

    return (
      <>
        <Button variant="outline-primary" onClick={handleShow}>Donate</Button>

        <Modal show={this.state.show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Donate to Revoke.cash</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup>
              <Form.Control
                value={this.state.amount}
                onChange={(event) => (this.setState({ amount: event.target.value }))}
              />
              <InputGroup.Append>
                <InputGroup.Text>ETH</InputGroup.Text>
              </InputGroup.Append>
              <InputGroup.Append>
                <Button variant="secondary" onClick={() => this.sendDonation()}>
                  Send
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Modal.Body>
        </Modal>
      </>
    )
  }
}

export default DonateButton
