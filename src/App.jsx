import React from "react";
import Header from "./components/Header/Header";
import Display from "./components/Display/Display";
import Body from "./components/Body/Body";
import Footer from "./components/Footer/Footer";
import useLocalStorage from "use-local-storage";
import { InputProvider } from "./context/InputContext";
export default function App() {
    const defaultDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
    ).matches;
    const [theme, setTheme] = useLocalStorage(
        "theme",
        defaultDark ? "dark" : "light"
    );
    const handleChange = (event) => {
        setTheme(event.target.id);
    };

    return (
        <>
            <main data-theme={theme}>
                <div className="card">
                    <Header onChange={handleChange} theme={theme} />
                    <InputProvider>
                        <Display />
                        <Body />
                    </InputProvider>
                </div>
            </main>
            <Footer theme={theme} />
        </>
    );
}
