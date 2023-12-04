'use client';
import { Button } from 'react-bootstrap';
import contracts from "../constant/contracts";
import { useWrite } from "../hook/useWrite";
import useViewportState from 'beautiful-react-hooks/useViewportState';

export function CardInfo({ data, withdraw }: {
    data: {
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
    withdraw: boolean
}) {
    const { width } = useViewportState();
    const condition = Boolean(data.unlockTime * 1000 < Date.now()) ||
        Boolean(data.fundRaised >= data.budget);
    const { write } = useWrite({
        abi: contracts.campaign.abi,
        address: data.address as `0x${string}`,
        args: [[data.image]],
        enabled: condition,
        functionName: "withdraw",
        value: BigInt(0)
    });

    const click = async () => {
        write?.()
    }


    if (width < 1000) {
        return (
            <div style={{ padding: "7px" }}>
                <div style={{ marginTop: "0.5em", marginBottom: "0.5em", border: "black 1px solid", padding: "10px", borderRadius: "25px" }}>
                    <h1>{data.name}</h1>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <img style={{ width: "100px", height: "100px", borderRadius: "25px" }} src={data.image} alt="" />
                        <div style={{ border: "black 1px solid", width: "60%", borderRadius: "25px", padding: "5px" }}>
                            {data.description}
                        </div>
                    </div>
                    <div style={{ marginTop: "2em" }}>
                        <h2>Abbiamo raggiunto finora:</h2>
                        <h2>{data.fundRaised}/{data.budget}</h2>
                    </div>
                    {
                        withdraw &&
                        <div style={{
                            display: "flex",
                            justifyContent: "end"
                        }}>
                            <Button disabled={!condition} onClick={click}>Ritira i soldi</Button>
                        </div>
                    }
                </div>
            </div>
        );
    }


    return (
        <div style={{ marginLeft: "90px", marginRight: "90px", marginTop: "2em", marginBottom: "2em", border: "black 1px solid", padding: "20px", borderRadius: "25px" }}>
            <h1>{data.name}</h1>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ flexGrow: "1", height: "20em", border: "black 1px solid", borderRadius: "25px", padding: "1em" }}>
                    {data.description}
                </div>
                <img style={{ height: "20em", width: "20em", marginLeft: "3em", borderRadius: "25px" }} src={data.image} alt="" />
            </div>

            <div style={{ marginTop: "2em" }}>
                <h2>Abbiamo raggiunto finora:</h2>
                <h2>{data.fundRaised}/{data.budget}</h2>
            </div>
            {
                withdraw &&
                <div style={{
                    display: "flex",
                    justifyContent: "end"
                }}>
                    <Button disabled={!condition} onClick={click}>Ritira i soldi</Button>
                </div>
            }
        </div>
    );
}
