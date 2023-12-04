'use client';
import { useState } from 'react';
import { Modal, ProgressBar } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import CardB from 'react-bootstrap/Card';

import FormB from 'react-bootstrap/Form';
import { useWrite } from '../hook/useWrite';
import contracts from '../constant/contracts';
import { parseUnits } from 'viem';
import useViewportState from 'beautiful-react-hooks/useViewportState';

function OpenModal({ detail, show, handleClose }: {
    detail: {
        address: string,
        unlockTime: number,
        rDonators: string,
        name: string,
        description: string,
        image: string,
        budget: string,
        company: string,
        location: string,
        postal: string,
        receiver: string,
        fundRaised: string,
        Nft: string
    },
    show: boolean,
    //@ts-ignore
    handleClose: any
}) {
    const { width } = useViewportState();
    const [funds, setFunds] = useState(0) as any;
    const { write } = useWrite({
        abi: contracts.campaign.abi,
        address: detail.address as `0x${string}`,
        args: [],
        enabled: Boolean(funds),
        functionName: "sendFund",
        value: funds == 0 ? BigInt(0) : parseUnits(funds, 18)
    });

    const click = async () => {
        write?.()
    }

    if (width < 1000) {
        return (
            <>
                <Modal size='lg' show={show} onHide={handleClose} >
                    <Modal.Header closeButton>
                        <Modal.Title><h1>{detail.name}</h1></Modal.Title>
                    </Modal.Header>
                    <div style={{ padding: "10px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <img style={{ width: "100px", height: "100px", borderRadius: "25px" }} src={detail.image} alt="" />
                            <div style={{ border: "black 1px solid", width: "60%", borderRadius: "25px", padding: "5px" }}>
                                {detail.description}
                            </div>
                        </div>
                        <div style={{ marginTop: "0.5em" }}>
                            <h2>Abbiamo raggiunto finora: {detail.fundRaised}/{detail.budget}</h2>
                        </div>
                        <div style={{
                            border: "black 1px solid",
                            borderRadius: "25px",
                            padding: "10px",
                            display: "flex",
                            justifyContent: "space-around"
                        }}>
                            <div style={{ display: "flex", alignContent: "center" }}>
                                <FormB.Label>Budget BFT</FormB.Label>
                                <FormB.Control name='budget' type="number" style={{ width: "100%" }} value={funds} onInput={(e: any) => setFunds(e.target.value)} />
                            </div>
                            <Button onClick={click}>Sostieni!</Button>
                        </div>
                    </div>
                </Modal>
            </>
        )
    }

    return (
        <>
            <Modal size='xl' show={show} onHide={handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title><h1>{detail.name}</h1></Modal.Title>
                </Modal.Header>
                <div style={{ padding: "1em" }}>


                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div style={{ flexGrow: "1", height: "20em", border: "black 1px solid", borderRadius: "25px", padding: "1em" }}>
                            {detail.description}
                        </div>
                        <img style={{ height: "20em", width: "20em", marginLeft: "3em", borderRadius: "25px" }} src={detail.image} alt="" />
                    </div>
                    <div style={{ marginTop: "2em" }}>
                        <h2>Abbiamo raggiunto finora: {detail.fundRaised}/{detail.budget}</h2>
                    </div>
                    <div style={{
                        marginLeft: "90px", marginRight: "90px", marginTop: "2em", marginBottom: "2em",
                        border: "black 1px solid", padding: "20px", borderRadius: "25px", display: "flex",
                        justifyContent: "space-around"
                    }}>
                        <div style={{ display: "flex", alignContent: "center" }}>
                            <FormB.Label>Budget BFT</FormB.Label>
                            <FormB.Control name='budget' type="number" style={{ width: "10em" }} value={funds} onInput={(e: any) => setFunds(e.target.value)} />
                        </div>
                        <Button onClick={click}>Sostieni!</Button>
                    </div>
                </div>
            </Modal>
        </>
    );
}

export function Card({ detail }: {
    detail: {
        address: string,
        unlockTime: number,
        rDonators: string,
        name: string,
        description: string,
        image: string,
        budget: string,
        company: string,
        location: string,
        postal: string,
        receiver: string,
        fundRaised: string,
        Nft: string
    }
}) {
    const [show, setShow] = useState(false) as any;

    const handleClose = () => { setShow(false) };
    const handleShow = () => { setShow(true) };

    return (
        <>
            <OpenModal detail={detail} show={show} handleClose={handleClose} />
            <CardB style={{ width: '20rem', margin: "0px", borderRadius: "25px", padding: "0px", }}
                onClick={handleShow} >

                <>
                    <CardB.Img variant="top" src={detail.image} style={{ padding: "0px", width: "100%", height: "20em", borderRadius: "25px", }} />

                    <CardB.Body style={{ padding: "1em" }}>
                        <CardB.Title>{detail.name}</CardB.Title>
                        <ProgressBar now={(Number(detail.fundRaised) / Number(detail.budget)) * 100} />
                    </CardB.Body>
                </>

            </CardB>
        </>

    );
}
