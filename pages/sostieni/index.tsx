'use client'

import type { NextPage } from 'next';
import { Navbar } from '../../components/Navbar';
import { Title } from '../../components/Title';
import { Footer } from '../../components/Footer';
import { Raccolta } from '../../components/Raccolta';
import { useEffect, useState } from 'react';
import { getCampaigns } from '../../utils/registry';
import { getEverythingCampaign, getRDonators } from '../../utils/campaigns';
import { getDonatorAmount, getDonators } from '../../utils/donators';
import { getAccount, getPublicClient } from '@wagmi/core'
import { formatUnits } from 'viem';
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
                    const addressR = await getRDonators(publicClient, addressC);
                    const donators = await getDonators(publicClient, addressR);
                    if (donators.includes(address)) {
                        const myFund = formatUnits(await getDonatorAmount(publicClient, addressR, address as string), 18);
                        const det = await getEverythingCampaign(publicClient, addressC);
                        if (!det.state)
                            data.push({ ...det, myFund });
                    }
                }
                setCards(data);
            }
        })();
    }, [])

    if (!isMounted) return null;
    if (!isConnected) {
        return (
            <div >
                <Navbar />
                <Container style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "2em", height: "90vh" }}>
                    <Title title='Questa pagina è disponibile solo per chi è loggato, collega il tuo wallet per vedere chi sostieni' />
                </Container>
                <Footer />
            </div>
        )
    }

    return (
        <div >
            <Navbar />
            {
                !cards &&
                <Container style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "2em", height: "90vh" }}>
                    <Spinner style={{ margin: "auto" }} />
                </Container>
            }
            {
                cards && cards.length > 0 &&
                <Container style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "2em", height: "90vh" }}>
                    <Raccolta cards={cards} />
                    <Title title="Grazie infinitivamente per il tuo contributo!" />
                </Container>
            }
            {
                cards && cards.length == 0 &&
                <Container style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "2em", height: "90vh" }}>
                    <Title title='Nessuna raccolta sostenuta!' />
                </Container>
            }
            <Footer />
        </div>
    );
};

export default Home;
