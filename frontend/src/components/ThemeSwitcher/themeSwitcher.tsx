import React, { useEffect, useState } from "react";

const ThemeSwitcher: React.FC = () => {
const [theme, setTheme] = useState("emerald"); 

const toggleTheme = () => {
const newTheme = theme === "emerald" ? "dracula" : "emerald";
setTheme(newTheme);
localStorage.setItem("theme", newTheme);
document.documentElement.setAttribute("data-theme", newTheme);
};

useEffect(() => {
const savedTheme = localStorage.getItem("theme") || "emerald";
setTheme(savedTheme);
document.documentElement.setAttribute("data-theme", savedTheme);
}, []);

return (
<button
    onClick={toggleTheme}
    className="btn btn-sm flex items-center gap-2 px-4 py-2 rounded-xl transition-all"
>
    {theme === "emerald" ? (
    <>
        🌞 <span>Light</span>
    </>
    ) : (
    <>
        🌙 <span>Dark</span>
    </>
    )}
</button>
);
};

export default ThemeSwitcher;
