const NewsItem = ({newsItem}) => {
    const {title, description, url, image} = newsItem
    return (
        <div>
            <a 
                href={url} 
                target="_blank"
                rel="noreferrer"
                className={`
                    
                    `}
                > 

                    <div className={`
                        flex
                        justify-around
                        my-2.5
                        `}>
                        <div className="w-[40%]  ">
                            <img 
                                className={`
                                    object-contain
                                    `}
                                src={image} alt="news" />

                        </div>
                        <div className="basis-1/2">
                            <h1 className="font-bold">{title}</h1>
                            <p className="my-1" >{description}</p>
                        </div>
                    </div>
            </a>
        </div>
    )
}

export default NewsItem