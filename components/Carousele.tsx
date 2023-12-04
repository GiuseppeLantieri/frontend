'use client';
import { Col, Row } from "react-bootstrap";
import { Card } from "./Cards";
import colors from "../constant/colors";
import useViewportState from "beautiful-react-hooks/useViewportState";

export function Carousel({ cards }: {
    cards: {
        address: string,
        rDonators: string,
        name: string,
        description: string,
        image: string,
        budget: number,
        company: string,
        location: string,
        postal: string,
        receiver: string,
        fundRaised: string,
        Nft: string
    }[]
}) {
    const { width } = useViewportState();

    if (width < 1000) {
        return (
            <div style={{ padding: "0.5em", backgroundColor: colors.green, borderRadius: "25px" }}>
                <h1>Raccolte attive:</h1>
                <Row>
                    {
                        cards.map((c: any, index) => {
                            return (
                                <Col lg={4} key={index}>
                                    <Card detail={c} />
                                </Col>
                            )
                        })
                    }
                </Row>
            </div>
        )
    }

    return (
        <div style={{ marginLeft: "90px", marginRight: "90px", padding: "2em", backgroundColor: colors.green, borderRadius: "25px" }}>
            <h1>Raccolte attive </h1>
            <Row>
                {
                    cards.map((c: any, index) => {
                        return (
                            <Col lg={4} key={index}>
                                <Card detail={c} />
                            </Col>
                        )
                    })
                }
            </Row>
        </div>
    )
}