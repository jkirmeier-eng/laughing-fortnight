const delay = (ms = 250) => new Promise((res) => setTimeout(res, ms));

const keys = {
    sessions: "ajay_sessions",
    contacts: "ajay_contacts",
    campaigns: "ajay_campaigns",
    discount: "ajay_discount",
    interestResolved: "ajay_interest_resolved",
};

function readStorage(key, fallback) {
    try {
        return JSON.parse(localStorage.getItem(key)) ?? fallback;
    } catch {
        return fallback;
    }
}

function writeStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
    return value;
}

function makeId() {
    return crypto.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
}

function makeToken() {
    return `fake-token-${makeId()}`;
}

function userKey(baseKey, email) {
    return `${baseKey}:${email}`;
}

function daysBetween(startDate, endDate) {
    if (!startDate || !endDate) return 1;

    const start = new Date(startDate);
    const end = new Date(endDate);
    const diff = end - start;

    if (diff < 0) return -1;
    if (diff === 0) return 1;

    return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function getEmailForToken(token) {
    if (!token) return null;

    const sessions = readStorage(keys.sessions, {});
    const session = sessions[token];

    if (!session) return null;

    if (Date.now() > session.expiresAt) {
        delete sessions[token];
        writeStorage(keys.sessions, sessions);
        return null;
    }

    return session.email;
}

function requireSession(token) {
    const email = getEmailForToken(token);

    if (!email) {
        return {
            ok: false,
            message: "Please login first.",
            email: null,
        };
    }

    return {
        ok: true,
        email,
    };
}

// AUTH API

export async function loginWithEmail(email) {
    await delay();

    const token = makeToken();
    const sessions = readStorage(keys.sessions, {});

    sessions[token] = {
        email,
        createdAt: Date.now(),
        expiresAt: Date.now() + 1000 * 60 * 60,
    };

    writeStorage(keys.sessions, sessions);

    return {
        ok: true,
        token,
        email,
    };
}

export async function getActiveUser(token) {
    await delay();

    const auth = requireSession(token);
    if (!auth.ok) return null;

    return {
        email: auth.email,
    };
}

export async function logoutUser(token) {
    await delay();

    const sessions = readStorage(keys.sessions, {});
    delete sessions[token];
    writeStorage(keys.sessions, sessions);

    return { ok: true };
}

// CONTACT API

export async function getContactMessages(token) {
    await delay();

    const auth = requireSession(token);
    if (!auth.ok) return [];

    return readStorage(userKey(keys.contacts, auth.email), []);
}

export async function createContactMessage(token, { name, message }) {
    await delay();

    const auth = requireSession(token);

    if (!auth.ok) {
        return {
            ok: false,
            message: auth.message,
        };
    }

    const contacts = readStorage(userKey(keys.contacts, auth.email), []);

    const contact = {
        id: makeId(),
        name,
        email: auth.email,
        message,
        createdAt: new Date().toISOString(),
    };

    writeStorage(userKey(keys.contacts, auth.email), [...contacts, contact]);

    return { ok: true, contact };
}

// INTEREST / DISCOUNT API

export async function getInterestState(token) {
    await delay();

    const auth = requireSession(token);

    if (!auth.ok) {
        return {
            resolved: false,
            discount: 0,
        };
    }

    return {
        resolved: readStorage(userKey(keys.interestResolved, auth.email), false),
        discount: readStorage(userKey(keys.discount, auth.email), 0),
    };
}

export async function resolveInterestLevel(token, interestLevel) {
    await delay();

    const auth = requireSession(token);

    if (!auth.ok) {
        return {
            ok: false,
            message: auth.message,
        };
    }

    const parsed = Number(interestLevel);

    if (Number.isNaN(parsed) || parsed < 1 || parsed > 10) {
        return {
            ok: false,
            message: "Interest level must be a number from 1 to 10.",
        };
    }

    writeStorage(userKey(keys.interestResolved, auth.email), true);

    if (parsed > 5) {
        writeStorage(userKey(keys.discount, auth.email), 0);

        return {
            ok: true,
            discountTriggered: false,
            discount: 0,
        };
    }

    const discount = Math.round((10 - parsed) * 4);
    writeStorage(userKey(keys.discount, auth.email), discount);

    return {
        ok: true,
        discountTriggered: true,
        discount,
    };
}

export async function getCurrentDiscount(token) {
    await delay();

    const auth = requireSession(token);
    if (!auth.ok) return 0;

    return readStorage(userKey(keys.discount, auth.email), 0);
}

export async function returnDiscount(token, discount) {
    await delay();

    const auth = requireSession(token);
    if (!auth.ok) return 0;

    const current = readStorage(userKey(keys.discount, auth.email), 0);
    const returned = Math.max(current, Number(discount) || 0);

    writeStorage(userKey(keys.discount, auth.email), returned);

    return returned;
}

export async function shouldShowCheckoutInterestModal(token) {
    await delay();

    const auth = requireSession(token);
    if (!auth.ok) return false;

    return !readStorage(userKey(keys.interestResolved, auth.email), false);
}

// CAMPAIGN API

export async function quoteCampaign(token, { startDate, endDate, index }) {
    await delay();

    const days = daysBetween(startDate, endDate);

    if (days < 0) {
        return {
            ok: false,
            message: "End date cannot be before start date.",
            days: 0,
            baseCost: 0,
            discount: 0,
            estimatedCost: 0,
        };
    }


    const today = new Date().toISOString().split("T")[0];

    if (startDate < today || endDate < today) {
        return {
            ok: false,
            message: "Dates cannot be in the past.",
            days: 0,
            baseCost: 0,
            discount: 0,
            estimatedCost: 0,
        };
    }

    const discount = index === 0 ? await getCurrentDiscount(token) : 0;
    const baseCost = days * 50;
    const estimatedCost = Math.round(baseCost * (1 - discount / 100));

    return {
        ok: true,
        days,
        baseCost,
        discount,
        estimatedCost,
    };
}

export async function getCampaignOrders(token) {
    await delay();

    const auth = requireSession(token);
    if (!auth.ok) return [];

    return readStorage(userKey(keys.campaigns, auth.email), []);
}

export async function createCampaignOrder(token, { startDate, endDate, cost, discountUsed }) {
    await delay();

    const auth = requireSession(token);

    if (!auth.ok) {
        return {
            ok: false,
            message: auth.message,
        };
    }

    const days = daysBetween(startDate, endDate);

    if (days < 0) {
        return {
            ok: false,
            message: "End date cannot be before start date.",
        };
    }

    const campaigns = readStorage(userKey(keys.campaigns, auth.email), []);

    const campaign = {
        id: makeId(),
        startDate,
        endDate,
        cost,
        discountUsed: Number(discountUsed) || 0,
        email: auth.email,
        createdAt: new Date().toISOString(),
    };

    writeStorage(userKey(keys.campaigns, auth.email), [...campaigns, campaign]);

    if (campaign.discountUsed > 0) {
        writeStorage(userKey(keys.discount, auth.email), 0);
    }

    return { ok: true, campaign };
}

export async function deleteCampaignOrder(token, id) {
    await delay();

    const auth = requireSession(token);

    if (!auth.ok) {
        return {
            ok: false,
            message: auth.message,
        };
    }

    const campaigns = readStorage(userKey(keys.campaigns, auth.email), []);
    const target = campaigns.find((campaign) => campaign.id === id);

    if (!target) {
        return {
            ok: false,
            message: "Campaign not found.",
        };
    }

    const updated = campaigns.filter((campaign) => campaign.id !== id);
    writeStorage(userKey(keys.campaigns, auth.email), updated);

    if (target.discountUsed > 0) {
        const returned = await returnDiscount(token, target.discountUsed);

        return {
            ok: true,
            returnedDiscount: target.discountUsed,
            currentDiscount: returned,
            campaign: target,
        };
    }

    return {
        ok: true,
        returnedDiscount: 0,
        campaign: target,
    };
}

// CONTENT API

export async function getSystemSlides() {
    await delay();
    const res = await fetch("/laughing-fortnight/system_slides.json");
    return res.json();
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