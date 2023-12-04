'use client';
import { Container } from "react-bootstrap";
import colors from "../constant/colors";
import useViewportState from "beautiful-react-hooks/useViewportState";

export function Footer() {
    const { width } = useViewportState();

    if (width < 1000) {
        return (
            <Container fluid style={{ width: "100%", height: "100%", backgroundColor: colors.darkgreen, color: colors.white }} >
                <div style={{ display: "flex", justifyContent: "space-between", paddingLeft: "30px" }}>
                    <h1 style={{fontSize:"20px"}}>
                        Quando cerchi aiuto senza compromessi
                    </h1>
                    <p>
                        ©FairFund
                    </p>
                </div>
            </Container>
        )
    }
    return (
        <Container fluid style={{ width: "100%", height: "60px", backgroundColor: colors.darkgreen, color: colors.white }} >
            <div style={{ display: "flex", justifyContent: "space-between", paddingLeft: "30px" }}>

                <h1>
                    Quando cerchi aiuto senza compromessi
                </h1>
                <p>
                    ©FairFund
                </p>
            </div>
        </Container>
    )
}