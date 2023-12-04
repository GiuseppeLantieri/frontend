'use client'
import type { NextPage } from 'next';
import { Navbar } from '../../components/Navbar';
import { Title } from '../../components/Title';
import { Footer } from '../../components/Footer';
import { CardInfo } from '../../components/CardInfo';
import { getAccount, getPublicClient } from '@wagmi/core'
import { getCampaigns } from '../../utils/registry';
import { getEverythingCampaign, getReceiver } from '../../utils/campaigns';
import { useEffect, useState } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { useIsMounted } from '../../hook/useIsMounted';


const Home: NextPage = () => {
    const [cards, setCards] = useState() as any;
    const publicClient = getPublicClient()

    const { address, isConnected } = getAccount();
    const isMounted = useIsMounted()


    useEffect(() => {
        (async () => {
            if (isConnected) {
                const campaigns = await getCampaigns(publicClient);
                const data = [];
                for (const addressC of campaigns) {
                    const receiver = await getReceiver(publicClient, addressC);
                    if (receiver == address) {
                        const det = await getEverythingCampaign(publicClient, addressC);
                        if (!det.state)
                            data.push({ ...det });
                    }
                }
                setCards(data);
            }
        })();
    }, [])

    if (!isMounted) return null
    if (!isConnected) {
        return (
            <div >
                <Navbar />
                {
                    !isConnected &&
                    <Container style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "2em", height: "90vh" }}>
                        <Title title='Questa pagina è disponibile solo per chi è loggato, collega il tuo wallet per vedere quali sono le tue raccolte' />
                    </Container>
                }
                <Footer />
            </div>
        )
    }

    return (
        <div >
            <Navbar />
            {
                !isConnected &&
                <Container style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "2em", height: "90vh" }}>
                    <Title title='Questa pagina è disponibile solo per chi è loggato, collega il tuo wallet per vedere quali sono le tue raccolte' />
                </Container>
            }
            {
                isConnected && !cards &&
                <Container style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "2em", height: "90vh" }}>
                    <Title title='La tua raccolta' />
                    <Spinner style={{ margin: "auto" }} />
                </Container>
            }
            {
                isConnected && cards &&
                <>
                    <Title title='La tua raccolta' />
                    {
                        cards.map((card: any, index: number) => {
                            return (
                                <CardInfo key={index} data={card} withdraw={true} />
                            )
                        })
                    }
                </>
            }
            {
                isConnected && cards && cards.length == 0 &&
                <Container style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "2em", height: "90vh" }}>
                    <Title title='Nessuna raccolta creata!' />
                </Container>
            }
            <Footer />
        </div>
    );
};

export default Home;
