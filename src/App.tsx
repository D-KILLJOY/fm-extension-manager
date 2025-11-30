import logoDark from "/images/logo-dark.svg";
import logoLight from "/images/logo-light.svg";
import light from "/images/icon-sun.svg";
import dark from "/images/icon-moon.svg";
import data from "./data.json";

import { useEffect, useState } from "react";
type theme = "light" | "dark";
type filter = "all" | "active" | "inactive";

function App() {
    const [theme, setTheme] = useState<theme>("light");
    const [extention, setExtension] = useState(data);
    const [modal, setModal] = useState<boolean>(false);
    const [mrkdExt, setMrkdExt] = useState<string>("");
    const [extFtr, setExFtr] = useState<filter>("all");

    function mrkExt(name: string) {
        setMrkdExt(name);
        modalControl();
    }

    function modalControl() {
        setModal((prev) => !prev);
    }

    const actTgl = (name: string) => {
        setExtension((prevExtn) =>
            prevExtn.map((item) => {
                return item.name === name
                    ? { ...item, isActive: !item.isActive }
                    : item;
            })
        );
    };

    const delEXtn = () => {
        setExtension((prevExtn) =>
            prevExtn.filter((item) => item.name !== mrkdExt)
        );
        modalControl();
    };

    const filterExtension = extention.filter((item) =>
        extFtr === "all"
            ? true
            : extFtr === "active"
            ? item.isActive
            : extFtr === "inactive" && !item.isActive
    );

    function filterMode(filter: filter) {
        setExFtr(filter);
    }

    function Extension() {
        return (
            <>
                {filterExtension.map((item) => (
                    <div className="extension" key={item.name}>
                        <div className="info">
                            <img
                                className="ext__img"
                                src={item.logo}
                                alt={`${item.name} logo`}
                            />
                            <article className="desc">
                                <h2 className="desc__header">{item.name}</h2>
                                <p className="desc__text">{item.description}</p>
                            </article>
                        </div>
                        <div className="control">
                            <button
                                type="button"
                                onClick={() => mrkExt(item.name)}
                                className="rmv__btn"
                            >
                                Remove
                            </button>
                            <div
                                onClick={() => actTgl(item.name)}
                                tabIndex={0}
                                role="switch"
                                aria-checked={item.isActive}
                                aria-label="Active toggle"
                                onKeyDown={(e) =>
                                    e.key === "Enter" && actTgl(item.name)
                                }
                                className={`act__tgl ${
                                    item.isActive ? "act__tgl--active" : ""
                                }`}
                            ></div>
                        </div>
                    </div>
                ))}
            </>
        );
    }

    function themeToggle() {
        setTheme(theme === "light" ? "dark" : "light");
    }

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    return (
        <main className="main__con">
            {modal === true && (
                <div className="modal">
                    <div className="prompt ">
                        <p>
                            this action would remove this extension{" "}
                            <span className="warn">"{mrkdExt}"</span>
                        </p>
                        <p>Do you wish to Proceed ?</p>
                        <div className="prompt__btns__con">
                            <button
                                type="button"
                                onClick={() => modalControl()}
                                className="prompt__btn cancel"
                            >
                                cancel
                            </button>
                            <button
                                type="button"
                                onClick={() => delEXtn()}
                                className="prompt__btn confirm"
                            >
                                confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <nav className="main__nav">
                {theme === "dark" ? (
                    <img src={logoDark} className="logo" alt="" />
                ) : (
                    <img src={logoLight} className="logo" alt="" />
                )}
                <button
                    aria-label="Change theme"
                    type="button"
                    onClick={themeToggle}
                    className="theme__btn"
                >
                    {theme === "dark" ? (
                        <img src={light} alt="sun icon" />
                    ) : (
                        <img src={dark} alt="moon icon" />
                    )}
                </button>
            </nav>
            <section className="filter__nav">
                <h1 className="main__header">Extensions list</h1>
                <div className="filter__btns__con">
                    <button
                        type="button"
                        onClick={() => filterMode("all")}
                        className={`filter__btn ${
                            extFtr === "all" ? "filter__btn--active" : ""
                        }`}
                    >
                        all
                    </button>
                    <button
                        type="button"
                        onClick={() => filterMode("active")}
                        className={`filter__btn ${
                            extFtr === "active" ? "filter__btn--active" : ""
                        }`}
                    >
                        active
                    </button>
                    <button
                        type="button"
                        onClick={() => filterMode("inactive")}
                        className={`filter__btn ${
                            extFtr === "inactive" ? "filter__btn--active" : ""
                        }`}
                    >
                        inactive
                    </button>
                </div>
            </section>
            <section className="exten__con">
                <Extension />
            </section>
        </main>
    );
}

export default App;
