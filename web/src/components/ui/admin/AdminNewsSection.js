import { NewsItem } from '@synergy-project-t/ui-components';
import { useState, useEffect } from "react";

const placeholderSection = (
    <div className="
        my-auto
        self-center
        mx-auto
        text-xl
        font-bold
        text-gray-400
    ">
        Nothing to display
    </div>
);

const news = [
    {
        "id": "4c28cafe-a6fc-46f1-92dc-b6e4a3f2dfdd",
        "title": "2 Cagayan towns under Signal No. 2 as Typhoon Marce gains more strength",
        "description": "Typhoon Marce (Yinxing) further intensifies, with its maximum sustained winds increasing to 140 km/h on Tuesday evening, November 5",
        "url": "https://www.rappler.com/philippines/weather/typhoon-marce-update-pagasa-forecast-november-5-2024-11pm/",
        "author": "Acor Arceo",
        "image": "https://www.rappler.com/tachyon/2024/11/marce-satellite-november-5-2024-11pm.png",
        "language": "en",
        "category": [
            "general"
        ],
        "published": "2024-11-05 16:45:00 +0000"
    },
    {
        "id": "1ce85320-d751-4ed7-a400-ff16f7d74c6d",
        "title": "DA to consumers: Brace for higher veggie prices",
        "description": "MANILA, Philippines — Consumers should brace for higher retail prices of vegetables following the severe impact of the recent weather disturbances on the agriculture sector.\n\n“When typhoons",
        "url": "https://newsinfo.inquirer.net/2001212/da-to-consumers-brace-for-higher-veggie-prices",
        "author": "Jordeene B. Lagare",
        "image": "https://newsinfo.inquirer.net/files/2023/03/Front-Page439335.jpg",
        "language": "en",
        "category": [
            "national"
        ],
        "published": "2024-11-05 05:36:06 +0000"
    },
    {
        "id": "34776785-fb25-4f2b-8303-e87dc9bc1678",
        "title": "Marce strengthens into typhoon while moving east of Aurora",
        "description": "Typhoon Marce (Yinxing) has maximum sustained winds of 120 km/h on Tuesday morning, November 5",
        "url": "https://www.rappler.com/philippines/weather/typhoon-marce-update-pagasa-forecast-november-5-2024-11am/",
        "author": "Acor Arceo",
        "image": "https://www.rappler.com/tachyon/2024/11/marce-satellite-november-5-2024-11am.jpg",
        "language": "en",
        "category": [
            "general"
        ],
        "published": "2024-11-05 04:20:56 +0000"
    },
    {
        "id": "378de8c1-567e-4a9a-bc1f-0a180233705c",
        "title": "Marce may become typhoon before Northern Luzon landfall",
        "description": "MANILA, Philippines — Tropical Storm Marce (international name: Yinxing) may become stronger and reach typhoon category before hitting land in Northern Luzon, the Philippine Atmospheric,",
        "url": "https://newsinfo.inquirer.net/2001029/marce-may-become-typhoon-before-northern-luzon-landfall",
        "author": "Zacarian Sarao",
        "image": "https://newsinfo.inquirer.net/files/2024/11/PAGASA-11042024-130PM-1200px.png",
        "language": "en",
        "category": [
            "general"
        ],
        "published": "2024-11-04 13:39:54 +0000"
    },
    {
        "id": "db485729-2296-47ac-91d5-0a80b994d88b",
        "title": "INQToday: Marce may intensify into typhoon; Signal no. 4 possible",
        "description": "https://youtube.com/live/ilwU0CqHprs\nHere’s a quick roundup of today’s top stories:\n\nMarce may intensify into typhoon; Signal no. 4 possible\nTropical storm Marce may intensify into a typhoon",
        "url": "https://newsinfo.inquirer.net/2000992/inqtoday-marce-may-intensify-into-typhoon-signal-no-4-possible",
        "author": "@inquirerdotnet",
        "image": "https://newsinfo.inquirer.net/files/2024/11/INQTODAY-20241104-12NN.jpg",
        "language": "en",
        "category": [
            "general"
        ],
        "published": "2024-11-04 12:18:33 +0000"
    }
]

const AdminNewsSection = ({}) => {

    return (
        <div className="flex flex-col border rounded-[0.22rem] min-h-[50%] flex-1">
            <div className="w-[100%] bg-[rgb(244,247,247)] px-7 py-4 font-medium">NEWS</div>
            <div class="
                flex
                flex-1
                flex-col
                w-full
                overflow-y-auto
            ">
                { news.length > 0 ? 
                    news.map((newsItem) => {
                        return (<NewsItem newsItem={newsItem} key={newsItem.id} />)
                    })
                : placeholderSection}
            </div>
        </div>
    );
};

export default AdminNewsSection;