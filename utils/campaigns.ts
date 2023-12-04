import contracts from "../constant/contracts";
import { formatUnits } from 'viem';

export const getContract = (address: string) => ({
    address: address as `0x${string}`,
    abi: contracts.campaign.abi,
})

export const getUnlockTime = async (publicClient: any, address: string) => {
    try {
        const data = await publicClient.readContract({
            ...getContract(address),
            functionName: 'unlockTime',
        })
        return data;
    } catch (e) {
        return -1;
    }
}

export const getRDonators = async (publicClient: any, address: string) => {
    try {
        const data = await publicClient.readContract({
            ...getContract(address),
            functionName: 'registryDonators',
        })
        return data;
    } catch (e) {
        return "";
    }
}

export const getNft = async (publicClient: any, address: string) => {
    try {
        const data = await publicClient.readContract({
            ...getContract(address),
            functionName: 'nft',
        })
        return data;
    } catch (e) {
        return "";
    }
}

export const getReceiver = async (publicClient: any, address: string) => {
    try {
        const data = await publicClient.readContract({
            ...getContract(address),
            functionName: 'receiver',
        })
        return data;
    } catch (e) {
        return "";
    }
}

export const getBudget = async (publicClient: any, address: string) => {
    try {
        const data = await publicClient.readContract({
            ...getContract(address),
            functionName: 'budget',
        })
        return data;
    } catch (e) {
        return -1;
    }
}

export const getFundRaiser = async (publicClient: any, address: string) => {
    try {
        const data = await publicClient.readContract({
            ...getContract(address),
            functionName: 'fundRaised',
        })
        return data;
    } catch (e) {
        return -1;
    }
}

export const getName = async (publicClient: any, address: string) => {
    try {
        const data = await publicClient.readContract({
            ...getContract(address),
            functionName: 'name',
        })
        return data;
    } catch (e) {
        return "";
    }
}

export const getDescription = async (publicClient: any, address: string) => {
    try {
        const data = await publicClient.readContract({
            ...getContract(address),
            functionName: 'description',
        })
        return data;
    } catch (e) {
        return "";
    }
}

export const getImage = async (publicClient: any, address: string) => {
    try {
        const data = await publicClient.readContract({
            ...getContract(address),
            functionName: 'image',
        })
        return data;
    } catch (e) {
        return "";
    }
}

export const getCompany = async (publicClient: any, address: string) => {
    try {
        const data = await publicClient.readContract({
            ...getContract(address),
            functionName: 'company',
        })
        return data;
    } catch (e) {
        return "";
    }
}

export const getLocation = async (publicClient: any, address: string) => {
    try {
        const data = await publicClient.readContract({
            ...getContract(address),
            functionName: 'location',
        })
        return data;
    } catch (e) {
        return "";
    }
}

export const getPostal = async (publicClient: any, address: string) => {
    try {
        const data = await publicClient.readContract({
            ...getContract(address),
            functionName: 'postal',
        })
        return data;
    } catch (e) {
        return "";
    }
}

export const getState = async (publicClient: any, address: string) => {
    try {
        const data = await publicClient.readContract({
            ...getContract(address),
            functionName: 'isPaused',
        })
        return data;
    } catch (e) {
        return "";
    }
}

export const isExausted = async (publicClient: any, address: string) => {
    try {
        const data = await publicClient.readContract({
            ...getContract(address),
            functionName: 'isExausted',
        })
        return data;
    } catch (e) {
        return "";
    }
}

export const getEverythingCampaign = async (publicClient: any, address: string) => {
    const rDonatorsP = getRDonators(publicClient, address);
    const nameP = getName(publicClient, address);
    const descriptionP = getDescription(publicClient, address);
    const imageP = getImage(publicClient, address);
    const budgetP = getBudget(publicClient, address);
    const companyP = getCompany(publicClient, address);
    const locationP = getLocation(publicClient, address);
    const postalP = getPostal(publicClient, address);
    const receiverP = getReceiver(publicClient, address);
    const fundRaisedP = getFundRaiser(publicClient, address);
    const NftP = getNft(publicClient, address);
    const unlockTimeP = getUnlockTime(publicClient, address);
    const stateP = getState(publicClient, address);
    const isExaustedP = isExausted(publicClient, address);

    const [rDonators, name, description, image,
        budget, company, location, postal,
        receiver, fundRaised, Nft, unlockTime, state, exausted
    ] = await Promise.all([
        rDonatorsP, nameP, descriptionP, imageP,
        budgetP, companyP, locationP, postalP,
        receiverP, fundRaisedP, NftP, unlockTimeP, stateP, isExaustedP]);

    return {
        address,
        unlockTime: formatUnits(unlockTime, 0),
        rDonators,
        name,
        description,
        image: image.replace("ipfs://", "https://ipfs.io/ipfs/"),
        budget: formatUnits(budget, 18),
        company,
        location,
        postal,
        receiver,
        fundRaised: formatUnits(fundRaised, 18),
        Nft,
        state,
        exausted
    }
}