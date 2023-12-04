'use client';

import { Col, Row } from "react-bootstrap";
import { Card } from "./Cards";
import { Title } from "./Title";
import useViewportState from "beautiful-react-hooks/useViewportState";

export function Raccolta({ cards }: {
    cards: {
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
        Nft: string,
        myFund: string
    }[]
}) {
    const { width } = useViewportState();

    if (width < 1000) {
        return (
            <>
                <div style={{ borderRadius: "25px" }}>
                    <h1>Raccolta delle donazioni:</h1>
                    <Row style={{ justifyContent: "center" }}>
                        {
                            cards && cards.map((e, index) => {
                                return (
                                    <Col key={index} lg={3}>
                                        <Card detail={e} />
                                    </Col>
                                )
                            })
                        }
                    </Row>

                </div>
                <Title title={`Hai donato un totale di ${cards.reduce((a, b) => a + Number(b.myFund), 0)} BFT`} />
            </>
        )
    }
    return (
        <>
            <div style={{ marginLeft: "90px", marginRight: "90px", borderRadius: "25px" }}>
                <h1>Raccolta delle donazioni</h1>

                <Row style={{ justifyContent: "space-around" }}>
                    {
                        cards && cards.map((e, index) => {
                            return (
                                <Col key={index} lg={3} >
                                    <Card detail={e} />
                                </Col>
                            )
                        })
                    }
                </Row>

            </div>
            <Title title={`Hai donato un totale di ${cards.reduce((a, b) => a + Number(b.myFund), 0)} BFT`} />
        </>
    )
}