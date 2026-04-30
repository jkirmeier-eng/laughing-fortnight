const delay = (ms = 250) => new Promise((res) => setTimeout(res, ms));

const keys = {
    contacts: "sentInfo",
    campaigns: "checkedOutCampaigns",
    discount: "discount",
    interestSeen: "interest_seen",
};

function read(key, fallback) {
    try {
        return JSON.parse(sessionStorage.getItem(key)) ?? fallback;
    } catch {
        return fallback;
    }
}

function write(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
    return value;
}

export async function getContacts() {
    await delay();
    return read(keys.contacts, []);
}

export async function saveContact(contact) {
    await delay();
    const contacts = read(keys.contacts, []);
    return write(keys.contacts, [...contacts, contact]);
}

export async function getCampaigns() {
    await delay();
    return read(keys.campaigns, []);
}

export async function saveCampaign(campaign) {
    await delay();
    const campaigns = read(keys.campaigns, []);
    return write(keys.campaigns, [...campaigns, campaign]);
}

export async function cancelCampaign(index) {
    await delay();
    const campaigns = read(keys.campaigns, []);
    return write(
        keys.campaigns,
        campaigns.filter((_, i) => i !== index)
    );
}

export async function getDiscount() {
    await delay();
    return Number(sessionStorage.getItem(keys.discount) || 0);
}

export async function saveDiscount(discount) {
    await delay();
    sessionStorage.setItem(keys.discount, String(discount));
    return discount;
}

export async function shouldAskInterest() {
    await delay();

    if (sessionStorage.getItem(keys.interestSeen)) {
        return false;
    }

    const shouldShow = Math.random() < 0.25;
    sessionStorage.setItem(keys.interestSeen, "true");
    return shouldShow;
}

export async function getSystemSlides() {
    await delay();
    const res = await fetch("/laughing-fortnight/system_slides.json");
    return res.json();
}

export async function getTestimonials() {
    await delay();
    const res = await fetch("/laughing-fortnight/testimonies.json");
    return res.json();
}

export async function getGalleryItems() {
    await delay();

    return [
        {
            id: 1,
            title: "Local launch campaign",
            type: "Short-form ad",
            image: "https://picsum.photos/seed/ajay-gallery-1/900/600",
            description: "A mock campaign visual for a local business launch.",
        },
        {
            id: 2,
            title: "KAAS variation set",
            type: "Ad variations",
            image: "https://picsum.photos/seed/ajay-gallery-2/900/600",
            description: "One idea split into multiple testable campaign angles.",
        },
        {
            id: 3,
            title: "Conversion push",
            type: "Direct response",
            image: "https://picsum.photos/seed/ajay-gallery-3/900/600",
            description: "A sample conversion-focused campaign concept.",
        },
    ];
}

export async function getSystemSlideImages() {
    await delay();

    return [
        "https://picsum.photos/seed/kaas-system-1/900/500",
        "https://picsum.photos/seed/kaas-system-2/900/500",
        "https://picsum.photos/seed/kaas-system-3/900/500",
        "https://picsum.photos/seed/kaas-system-4/900/500",
        "https://picsum.photos/seed/kaas-system-5/900/500",
    ];
}