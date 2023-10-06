import { Col, Container, Row } from "react-bootstrap";
import { Card } from "./Cards";
import colors from "../constant/colors";
import { Title } from "./Title";

export function Raccolta({ cards }: {
    cards:  {
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
        myFund:string
    }[]
}) {
    return (
        <>
            <div style={{ marginLeft: "90px", marginRight: "90px", borderRadius: "25px" }}>
                <h1>Raccolte in evidenza</h1>

                <Row style={{ justifyContent: "space-around" }}>
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