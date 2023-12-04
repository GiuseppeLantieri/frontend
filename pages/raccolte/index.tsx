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


const Home: NextPage = () => {
    const [cards, setCards] = useState() as any;
    const publicClient = getPublicClient()

    const account = getAccount();

    useEffect(() => {
        (async () => {
            if (account.address) {
                const campaigns = await getCampaigns(publicClient);
                const data = [];
                for (const addressC of campaigns) {
                    const receiver = await getReceiver(publicClient, addressC);
                    if (receiver == account.address) {
                        const det = await getEverythingCampaign(publicClient, addressC);
                        if (!det.state)
                            data.push({ ...det });
                    }
                }

                setCards(data);
            }
        })();
    }, [])

    return (
        <div >
            <Navbar />
            <Title title='La tua raccolta' />
            {!cards && <Container style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "2em", height: "70vh" }}>
                <Spinner style={{ margin: "auto" }} />
            </Container>}
            {
                cards && cards.map((card: any, index: number) => {
                    return (
                        <CardInfo key={index} data={card} withdraw={true} />
                    )
                })
            }
            {cards && cards.length == 0 && <Container style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "2em", height: "70vh" }}>
                <Title title='Nessuna raccolta creata!' />
            </Container>}
            <Footer />
        </div>
    );
};

export default Home;
