import { useState, useEffect } from "react";

const placeholderSection = (
    <div class="
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

const notifications = [
    {
      "title": "Tropical Cyclone Warning",
      "severity": "RED",
      "timestamp": "2024-11-06T09:00:00+08:00",
      "affected_area": "Eastern Visayas",
      "summary": "Typhoon 'Zelda' has made landfall and is expected to bring heavy rainfall, strong winds, and rough seas. Flooding and landslides are likely."
    },
    {
      "title": "Flood Warning",
      "severity": "RED",
      "timestamp": "2024-11-06T08:00:00+08:00",
      "affected_area": "Metro Manila, Rizal, Cavite",
      "summary": "Continuous heavy rains are expected due to a low-pressure area, leading to potential flooding in urban areas and along riverbanks."
    },
    {
      "title": "Thunderstorm Warning",
      "severity": "ORANGE",
      "timestamp": "2024-11-06T15:00:00+08:00",
      "affected_area": "Bicol Region",
      "summary": "A severe thunderstorm is expected to develop, bringing strong winds, heavy rain, and possible hail. Flash flooding is possible in mountainous areas."
    },
    {
      "title": "Storm Surge Warning",
      "severity": "RED",
      "timestamp": "2024-11-06T10:00:00+08:00",
      "affected_area": "Northern Cebu, Southern Leyte",
      "summary": "High waves and possible coastal flooding due to strong winds brought by a nearby tropical storm. Storm surge of up to 3 meters expected."
    },
    {
      "title": "Heat Index Advisory",
      "severity": "ORANGE",
      "timestamp": "2024-11-06T11:00:00+08:00",
      "affected_area": "Metro Manila, Calabarzon, Central Luzon",
      "summary": "The heat index is expected to exceed 40°C, posing a risk of heat exhaustion or heat stroke, especially in outdoor activities."
    },
    {
      "title": "Yellow Rainfall Warning",
      "severity": "GREEN",
      "timestamp": "2024-11-06T14:00:00+08:00",
      "affected_area": "Mindanao (Sarangani, Davao Oriental)",
      "summary": "Moderate to heavy rainfall expected in the next few hours. Possible flooding in low-lying areas."
    },
    {
      "title": "Red Rainfall Warning",
      "severity": "RED",
      "timestamp": "2024-11-06T12:00:00+08:00",
      "affected_area": "Zamboanga Peninsula, Northern Mindanao",
      "summary": "Heavy rainfall expected to cause significant flooding and landslides. This is a high-risk area for flash floods."
    },
    {
      "title": "Wind Signal No. 2",
      "severity": "RED",
      "timestamp": "2024-11-06T07:00:00+08:00",
      "affected_area": "Bicol Region, Quezon Province, Eastern Samar",
      "summary": "Winds of 61-100 km/h are expected. The typhoon is approaching and will bring strong winds and heavy rains."
    }
  ]
  
const AdminNotificationsSection = ({}) => {

    return (
        <div className="flex flex-col border rounded-[0.22rem] h-[50%]">
            <div className="w-[100%] bg-[rgb(244,247,247)] px-7 py-4 font-medium">NOTIFICATIONS</div>
            <div class="
                flex
                flex-1
                flex-col
                w-full
                overflow-y-auto
                items-center
            ">

                {notifications.map((notification, index) => {
                    return (
                        <details class={`
                            w-[95%]
                            `}>
                            <summary class={`
                                flex
                                items-center
                                border-t
                                border-dashed
                                py-2
                                px-12
                                hover:cursor-pointer
                                ${notification.severity === "GREEN" ? "bg-green-500 hover:bg-green-300" : (notification.severity === "RED" ? "bg-red-500 hover:bg-red-300" : "bg-orange-500 hover:bg-orange-300")}
                                rounded-[0.25rem]
                                list-none
                                `}
                            >
                                <div>
                                    <div class="
                                        flex
                                        font-semibold
                                        items-center
                                    ">
                                        {notification.title} - {notification.affected_area}
                                    </div>
                                    <div class="flex text-sm">
                                       Date/Time: {notification.timestamp}
                                    </div>
                                </div>
                                <div 
                                    class="ml-auto hover:underline text-black-400 font-semibold" 
                                    
                                >
                                    {"VIEW"}
                                </div>
                                
                            </summary>
                            
                            <div>
                                
                                    <div class={`
                                        flex
                                        items-center
                                        border-t
                                        border-dashed
                                        py-2
                                        px-16
                                        hover:cursor-pointer
                                        ${notification.severity === "GREEN" ? "bg-green-500 hover:bg-green-300" : (notification.severity === "RED" ? "bg-red-500 hover:bg-red-300" : "bg-orange-500 hover:bg-orange-300")}
                                        text-sm
                                        `}
                                    >
                                        <div>
                                            <div class="
                                                flex
                                                font-semibold
                                                items-center
                                            ">
                                                Summary
                                            </div>
                                            <div class="flex text-xs">
                                                {notification.summary}
                                            </div>
                                        </div>
                                    </div>
                            
                            </div>
                            
                        </details>
                    )
                })}
            </div>
        </div>
    );
};

export default AdminNotificationsSection;