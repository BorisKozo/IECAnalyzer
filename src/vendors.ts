export interface ITrack {
    name: string;
    discount: number;
    startTime: string;
    endTime: string;
    days: string[];
    comment?: string;
    monthlyPay?: number;
}

export interface IVendor {
    name: string;
    tracks: ITrack[];
}

export const vendors: IVendor[] = [
    {
        name: 'סלקום',
        tracks: [
            {
                name: 'חוסכים קבוע שנה 1',
                discount: 5,
                startTime: '00:00',
                endTime: '00:00',
                days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            },
            {
                name: 'חוסכים קבוע שנה 2',
                discount: 6,
                startTime: '00:00',
                endTime: '00:00',
                days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            },
            {
                name: 'חוסכים קבוע שנה 3',
                discount: 7,
                startTime: '00:00',
                endTime: '00:00',
                days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            },
            {
                name: 'חוסכים ביום',
                discount: 15,
                startTime: '07:00',
                endTime: '17:00',
                days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu'],
            },
            {
                name: 'חוסכים למשפחה',
                discount: 18,
                startTime: '14:00',
                endTime: '20:00',
                days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            },
            {
                name: 'חוסכים בלילה',
                discount: 20,
                startTime: '23:00',
                endTime: '07:00',
                days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            },
        ]
    },
    {
        name: 'פזגז',
        tracks: [
            {
                name: '27-7 קבוע',
                discount: 7,
                startTime: '00:00',
                endTime: '00:00',
                days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                comment: 'תשלום חודשי קבוע',
                monthlyPay: 2.9
            },
        ]
    },
    {
        name: 'אלקטרה',
        tracks: [
            {
                name: 'היטק שנה 1',
                discount: 8,
                startTime: '23:00',
                endTime: '17:00',
                days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            },
            {
                name: 'היטק שנה 2',
                discount: 9,
                startTime: '23:00',
                endTime: '17:00',
                days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            },
            {
                name: 'היטק שנה 3',
                discount: 10,
                startTime: '23:00',
                endTime: '17:00',
                days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            },
            {
                name: 'power שנה 1',
                discount: 5,
                startTime: '00:00',
                endTime: '00:00',
                days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            },
            {
                name: 'power שנה 2',
                discount: 6,
                startTime: '00:00',
                endTime: '00:00',
                days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            },
            {
                name: 'power שנה 3',
                discount: 7,
                startTime: '00:00',
                endTime: '00:00',
                days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            },
            {
                name: 'לילה',
                discount: 20,
                startTime: '23:00',
                endTime: '07:00',
                days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            },
        ]
    },
    {
        name: 'הוט energy',
        tracks: [
            {
                name: 'חוסכים 24-7 שנה 1',
                discount: 5,
                startTime: '00:00',
                endTime: '00:00',
                days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            },
            {
                name: 'חוסכים 24-7 שנה 2',
                discount: 6,
                startTime: '00:00',
                endTime: '00:00',
                days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            },
            {
                name: 'חוסכים 24-7 שנה 3',
                discount: 7,
                startTime: '00:00',
                endTime: '00:00',
                days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            },
            {
                name: 'חוסכים ביום',
                discount: 15,
                startTime: '07:00',
                endTime: '17:00',
                days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu'],
            },
            {
                name: 'חוסכים בלילה',
                discount: 20,
                startTime: '23:00',
                endTime: '07:00',
                days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu'],
            },
            {
                name: 'חוסכים קבוע e-triple',
                discount: 10,
                startTime: '00:00',
                endTime: '00:00',
                days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                comment: 'לקוחות HOT במסלול טריפל ו HOT MOBILE'
            },
            {
                name: 'חוסכים קבוע HOT',
                discount: 7,
                startTime: '00:00',
                endTime: '00:00',
                days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                comment: 'ללקוחות HOT במסלול טריפל'
            },
            {
                name: 'חוסכים קבוע NEXT',
                discount: 6,
                startTime: '00:00',
                endTime: '00:00',
                days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                comment: 'ללקוחות במסלול דאבל NEXT'
            },
        ]
    },
    {
        name: 'פרטנר חשמל',
        tracks: [
            {
                name: 'הנחה קבועה שנה 1',
                discount: 5,
                startTime: '00:00',
                endTime: '00:00',
                days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            },
            {
                name: 'הנחה קבועה שנה 2',
                discount: 6,
                startTime: '00:00',
                endTime: '00:00',
                days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            },
            {
                name: 'הנחה קבועה שנה 3',
                discount: 7,
                startTime: '00:00',
                endTime: '00:00',
                days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            },
            {
                name: 'עובדים מהבית',
                discount: 15,
                startTime: '07:00',
                endTime: '17:00',
                days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu'],
            },
            {
                name: 'חיות לילה',
                discount: 20,
                startTime: '23:00',
                endTime: '07:00',
                days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            },
        ]
    },
    {
        name: 'בזק energy',
        tracks: [
            {
                name: 'חוסכים חכם שנה 1',
                discount: 5,
                startTime: '00:00',
                endTime: '00:00',
                days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            },
            {
                name: 'חוסכים חכם שנה 2',
                discount: 6,
                startTime: '00:00',
                endTime: '00:00',
                days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            },
            {
                name: 'חוסכים חכם שנה 3',
                discount: 7,
                startTime: '00:00',
                endTime: '00:00',
                days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            },
            {
                name: 'חוסכים חכם ביום',
                discount: 15,
                startTime: '07:00',
                endTime: '17:00',
                days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu'],
            },
            {
                name: 'חוסכים חכם בלילה',
                discount: 20,
                startTime: '23:00',
                endTime: '07:00',
                days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            },
        ]
    }
];