import { useEffect, useState } from 'react';
import { Modal, ProgressBar } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import CardB from 'react-bootstrap/Card';
import colors from '../constant/colors';
import { getPublicClient } from '@wagmi/core'



import { CardInfo } from '../components/CardInfo';
import FormB from 'react-bootstrap/Form';
import { useWrite } from '../hook/useWrite';
import contracts from '../constant/contracts';
import { parseUnits } from 'viem';
import { getEverythingCampaign } from '../utils/campaigns';

function Open({ detail, show, handleClose }: {
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
                        <h2>Abbiamo raggiunto finora:</h2>
                        <h2>{detail.fundRaised}/{detail.budget}</h2>
                    </div>

                    <div style={{
                        display: "flex",
                        justifyContent: "end"
                    }}>
                        <Button onClick={click}>Ritira i soldi</Button>
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
    const [hoover, setHoover] = useState(false);
    const [show, setShow] = useState(false) as any;

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleMouseEnter = () => {
        setHoover(true);
    };

    const handleMouseLeave = () => {
        setHoover(false);
    };
    return (
        <CardB style={{ width: '20rem', margin: "0px", borderRadius: "25px", padding: "0px", cursor: hoover ? "pointer" : "auto" }}
            onClick={handleShow} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <Open detail={detail} show={show} handleClose={handleClose} />
            {hoover ?
                <div style={{ padding: "3em", width: "20em", height: "24em", backgroundColor: colors.darkgreen, borderRadius: "25px", }}>
                    {detail.description}
                </div>
                :
                <>
                    <CardB.Img variant="top" src={detail.image} style={{ padding: "0px", width: "100%", height: "20em", borderRadius: "25px", }} />

                    <CardB.Body style={{ padding: "1em" }}>
                        <CardB.Title>{detail.name}</CardB.Title>
                        <ProgressBar now={(Number(detail.fundRaised) / Number(detail.budget)) * 100} />
                    </CardB.Body>
                </>
            }
        </CardB>

    );
}
