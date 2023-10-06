import { Col, Container, Row } from "react-bootstrap";
import { Card } from "./Cards";
import colors from "../constant/colors";

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
    return (
        <div style={{ marginLeft: "90px", marginRight: "90px", padding: "2em", backgroundColor: colors.green, borderRadius: "25px" }}>
            <h1>Raccolte in evidenza</h1>
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