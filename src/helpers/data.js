export const DEFAULT_COUNTRY = {
    code: "US",
    calling_code: "+1",
}

export const USER = {
    name: "Lewis Hilton",
    email: "hilton.lewis@gmail.com",
    country_code: "US",
    dialing_code: "+1",
    phone: "6468980885",
    image_url: "https://i.pravatar.cc/150?img=3",
}

export const NOTIFICATIONS = [
    {
        id: 1,
        read: false,
        title: "New Message",
        description: "You have received a new message from John.",
        date: "2026-04-13",
        time: "08:30 PM"
    },
    {
        id: 2,
        read: true,
        title: "Order Confirmed",
        description: "Your order #12345 has been successfully placed.",
        date: "2026-04-12",
        time: "06:15 PM"
    },
    {
        id: 3,
        read: false,
        title: "Password Changed",
        description: "Your password was updated successfully.",
        date: "2026-04-11",
        time: "02:45 PM"
    },
    {
        id: 4,
        read: true,
        title: "New Offer",
        description: "Get 20% off on your next purchase.",
        date: "2026-04-10",
        time: "11:00 AM"
    },
    {
        id: 5,
        read: false,
        title: "Account Alert",
        description: "Suspicious login detected. Please verify your account.",
        date: "2026-04-09",
        time: "09:20 PM"
    }
]

export const LOREM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."

export const BUSINESS_CATEGORIES = [
    { id: "1", name: "Restaurant" },
    { id: "2", name: "Retail" },
    { id: "3", name: "Healthcare" },
    { id: "4", name: "Professional Services" },
    { id: "5", name: "Education" },
    { id: "6", name: "Technology" },
]

export const BUSINESS_DAYS = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
]

export const MY_BUSINESSES = [
    {
        id: "1",
        name: "Hilton's Kitchen",
        description: "Family-owned restaurant serving authentic halal cuisine.",
        category: { id: "1", name: "Restaurant" },
        email: "info@hiltonskitchen.com",
        phone: "6468980885",
        country_code: "US",
        dialing_code: "+1",
        website: "https://hiltonskitchen.com",
        address: {
            formatted: "123 Main Street, New York, NY 10001",
            country: "United States",
            state: "New York",
            city: "New York",
            latitude: 40.7128,
            longitude: -74.0060,
        },
        hours: [
            { day: "monday", open: "09:00", close: "21:00", closed: false },
            { day: "tuesday", open: "09:00", close: "21:00", closed: false },
            { day: "wednesday", open: "09:00", close: "21:00", closed: false },
            { day: "thursday", open: "09:00", close: "21:00", closed: false },
            { day: "friday", open: "09:00", close: "22:00", closed: false },
            { day: "saturday", open: "10:00", close: "22:00", closed: false },
            { day: "sunday", open: "10:00", close: "20:00", closed: false },
        ],
        logo_url: "https://picsum.photos/seed/business-logo-1/200/200",
        image_url: "https://picsum.photos/seed/business-cover-1/800/400",
        status: "approved",
        verified: true,
        active: true,
    },
    {
        id: "2",
        name: "Metro Tech Solutions",
        description: "IT consulting and software development for small businesses.",
        category: { id: "6", name: "Technology" },
        email: "hello@metrotech.io",
        phone: "2125550199",
        country_code: "US",
        dialing_code: "+1",
        website: "https://metrotech.io",
        address: {
            formatted: "456 Broadway, New York, NY 10013",
            country: "United States",
            state: "New York",
            city: "New York",
            latitude: 40.7209,
            longitude: -74.0007,
        },
        hours: [
            { day: "monday", open: "08:00", close: "18:00", closed: false },
            { day: "tuesday", open: "08:00", close: "18:00", closed: false },
            { day: "wednesday", open: "08:00", close: "18:00", closed: false },
            { day: "thursday", open: "08:00", close: "18:00", closed: false },
            { day: "friday", open: "08:00", close: "17:00", closed: false },
            { day: "saturday", open: "00:00", close: "00:00", closed: true },
            { day: "sunday", open: "00:00", close: "00:00", closed: true },
        ],
        logo_url: "https://picsum.photos/seed/business-logo-2/200/200",
        image_url: "https://picsum.photos/seed/business-cover-2/800/400",
        status: "pending",
        verified: false,
        active: true,
    },
    {
        id: "3",
        name: "Green Leaf Pharmacy",
        description: "Community pharmacy with prescription and wellness products.",
        category: { id: "3", name: "Healthcare" },
        email: "contact@greenleafrx.com",
        phone: "7185550142",
        country_code: "US",
        dialing_code: "+1",
        website: "",
        address: {
            formatted: "789 Queens Blvd, Queens, NY 11373",
            country: "United States",
            state: "New York",
            city: "Queens",
            latitude: 40.7282,
            longitude: -73.7949,
        },
        hours: [
            { day: "monday", open: "08:00", close: "20:00", closed: false },
            { day: "tuesday", open: "08:00", close: "20:00", closed: false },
            { day: "wednesday", open: "08:00", close: "20:00", closed: false },
            { day: "thursday", open: "08:00", close: "20:00", closed: false },
            { day: "friday", open: "08:00", close: "20:00", closed: false },
            { day: "saturday", open: "09:00", close: "18:00", closed: false },
            { day: "sunday", open: "10:00", close: "16:00", closed: false },
        ],
        logo_url: "https://picsum.photos/seed/business-logo-3/200/200",
        image_url: "https://picsum.photos/seed/business-cover-3/800/400",
        status: "rejected",
        verified: false,
        active: false,
    },
]
