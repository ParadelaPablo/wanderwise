function ErrorState() {
    const messages = [
        "🚦 Oh no! Looks like the road trip is stuck in traffic. We'll get it moving soon! 🚗💨",
        "🔄 Oops, your trips took a wrong turn. Try refreshing or taking a coffee break! ☕",
        "🔍 Error: Your adventures seem to be hiding. Maybe they're planning a surprise for you! 🎉",
        "📡 Uh-oh! It seems like your trips missed the GPS signal. Let's try recalculating the route. 🗺️",
        "🚙 Looks like our trip data went off-road. We’ll bring it back ASAP! 🔧",
        "🚧 Error 404: Your wanderlust has hit a speed bump. Don’t worry, the mechanic is on it. 🛠️",
        "🐞 Oopsie! Our travel bug (the software kind) has stopped your trip plans. We’re squashing it now. 🪲",
        "🗺️ Oh no, the trips are lost! Did you pack the map? We’re trying to find them for you. 🧭",
        "⛽ Your trips have temporarily run out of gas. Refueling now ... 🚗💨",
        "🛑 Bummer! The trips hit a detour. Refresh to get back on track. 🔄"
    ]

    return (
        <div className="flex items-center justify-center h-screen">
            <span className="m-2 px-5 py-2 bg-red-200 md:text-4xl rounded-md text-gray-600 text-xl text-center">
                {messages[Math.floor(Math.random() * messages.length)]}
            </span>
        </div>
    );

}

export { ErrorState };