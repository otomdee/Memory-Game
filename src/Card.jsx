export default function Card({gifObj, handleClick}) {
    return (
        <div className="card" onClick={() => handleClick(gifObj.id)}>
            <img 
            src={gifObj.images.fixed_height.url} 
            alt={gifObj.title}
            />
        </div>
    )
}