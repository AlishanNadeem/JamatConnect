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
    createdAt: "2024-03-15",
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

export const BUSINESS_DAYS = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
]

const REVIEW_COMMENTS = [
    "Friendly staff and great service. Highly recommend this place to the community.",
    "Good experience overall. A bit busy on weekends but worth the visit.",
    "Clean, professional, and very welcoming. Will definitely come back.",
    "Quality is consistent and the team is always helpful.",
    "Nice atmosphere and fair prices. Happy I found this through the community.",
]

const REVIEW_NAMES = [
    "Amina Rahman",
    "Omar Siddiqui",
    "Fatima Ali",
    "Hassan Malik",
    "Zainab Hussain",
    "Yusuf Khan",
    "Maryam Noor",
    "Ibrahim Shah",
    "Sara Qureshi",
    "Bilal Ahmed",
    "Huda Karim",
    "Tariq Aziz",
    "Layla Farooq",
    "Naveed Iqbal",
    "Sana Javed",
    "Adeel Raza",
    "Noor Fatima",
    "Kamran Sheikh",
    "Ayesha Siddiqui",
    "Rehan Ali",
    "Mariam Zahid",
    "Farhan Malik",
]

export const BUSINESS_REVIEWS = REVIEW_NAMES.map((name, index) => ({
    id: String(index + 1),
    name,
    image_url: `https://i.pravatar.cc/150?img=${index + 5}`,
    rating: [5, 4, 5, 3, 5, 4, 5, 4, 5, 3, 4, 5, 4, 5, 5, 4, 3, 5, 4, 5, 4, 5][index],
    comment: REVIEW_COMMENTS[index % REVIEW_COMMENTS.length],
    created_at: `2026-07-${String((index % 27) + 1).padStart(2, "0")}`,
}))
