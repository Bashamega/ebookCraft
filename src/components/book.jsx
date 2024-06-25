import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import React, { useEffect, useState } from "react";

import settings from "@/setting/settings.json";
import styles from "../styles/Book.module.css";

export function Book() {
  const [currentPage, setCurrentPage] = useState("default.html");
  const [pageContent, setPageContent] = useState("");
  const [current, setCurrent] = useState(1);
  const [pages, setPages] = useState([]);
  const [animationClass, setAnimationClass] = useState("");

  useEffect(() => {
    setCurrentPage(pages[current - 1]);
    console.log(pages);
    console.log(pages.length);
    if (currentPage) {
      const pagePath = `/pages/${currentPage}`;
      fetch(pagePath)
        .then((response) => response.text())
        .then((data) => setPageContent(data))
        .catch((error) => console.error("Error fetching page content:", error));

      switch (current) {
        case 1:
          document.getElementById("back").classList.add("disabled");
          document.getElementById("forward").classList.remove("disabled");
          break;
        case pages.length:
          document.getElementById("forward").classList.add("disabled");
          document.getElementById("back").classList.remove("disabled");
          break;
        default:
          document.getElementById("back").classList.remove("disabled");
          document.getElementById("forward").classList.remove("disabled");
          break;
      }
    }
  }, [currentPage, current, pages]);

  useEffect(() => {
    if (settings.pageSaver) {
      if (localStorage.getItem(settings.title + "_pagesaver") !== null) {
        const page = parseInt(localStorage.getItem(settings.title + "_pagesaver"));
        setCurrent(page);
      }
    }
    fetch("/api/pagesRender")
      .then((res) => res.json())
      .then((data) => setPages(data));
  }, []);

  const back = () => {
    if (!document.getElementById("back").classList.contains("disabled") && current > 0) {
      setAnimationClass(styles.iframeSlideOutRight);
      setCurrent((prevCurrent) => prevCurrent - 1);
      setTimeout(() => {
        localStorage.setItem(settings.title + "_pagesaver", current - 1);
        setAnimationClass(styles.iframeSlideInLeft);
      }, 500);
    }
  };

  const forward = () => {
    if (!document.getElementById("forward").classList.contains("disabled")) {
      setAnimationClass(styles.iframeSlideOutLeft);
      setTimeout(() => {
        setCurrent((prevCurrent) => prevCurrent + 1);
        localStorage.setItem(settings.title + "_pagesaver", current + 1);
        setAnimationClass(styles.iframeSlideInRight);
      }, 500);
    }
  };

  return (
    <main id="book">
      <div className={`${styles.iframeContainer} ${animationClass}`}>
        <iframe title="book-page" srcDoc={pageContent}></iframe>
      </div>
      <footer>
        <span id="back" onClick={back}>
          <BiChevronLeft />
        </span>
        <div>
          <h2 onClick={() => setCurrentPage("default.html")}>{settings.title}</h2>
          <p>Created by {settings.author}</p>
          <p>
            {pages.length}/
            <input
              type="number"
              min="1"
              max={pages.length}
              onChange={(e) => {
                const newValue = parseInt(e.target.value);
                if (newValue <= 0 || newValue > pages.length) {
                  e.target.classList.add("error");
                } else {
                  e.target.classList.remove("error");
                  setCurrent(newValue);
                }
              }}
              value={current}
              style={{ width: "50px" }}
            ></input>
          </p>
        </div>
        <span id="forward" onClick={forward}>
          <BiChevronRight />
        </span>
      </footer>
    </main>
  );
}