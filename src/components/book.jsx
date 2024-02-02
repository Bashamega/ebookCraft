import React, { useState, useEffect } from "react";
import { BiChevronLeft } from "react-icons/bi";
import { BiChevronRight } from "react-icons/bi";
import settings from "@/setting/settings.json";

export function Book() {
  const [currentPage, setCurrentPage] = useState("default.html");
  const [pageContent, setPageContent] = useState("");
  const [current, setCurrent] = useState(1)
  const [pages, setpages] = useState([])
  useEffect(() => {
    setCurrentPage(pages[current-1])
    console.log(pages)
    console.log(pages.length)
    if(currentPage){
      const pagePath = `/pages/${currentPage}`;
    fetch(pagePath)
      .then((response) => response.text())
      .then((data) => setPageContent(data))
      .catch((error) => console.error("Error fetching page content:", error));
    switch (current) {
      case 1:
        document.getElementById('back').classList.add('disabled')
        document.getElementById('forward').classList.remove('disabled')
        break;
      case pages.length:
        document.getElementById('forward').classList.add('disabled')
        document.getElementById('back').classList.remove('disabled')
        break;
      default:
        document.getElementById('back').classList.remove('disabled')
        document.getElementById('forward').classList.remove('disabled')

        break;
    }
    
    }
  }, [currentPage, current, pages]);
  useEffect(()=>{
    fetch("/api/pagesRender").then(res=>res.json()).then(data=>setpages(data))
  }, [])
  return (
    <main id="book">
      <iframe title="book-page" srcDoc={pageContent}></iframe>
      <footer>
        <span id="forward" onClick={(e) => {
          if(!document.getElementById('forward').classList.contains('disabled')) {
            setCurrent((prevCurrent) => prevCurrent + 1);
          }
        }}>
          <BiChevronLeft />
        </span>
        <div>
        <h2 onClick={() => setCurrentPage('default.html')}>{settings.title}</h2>
        <p>Created by {settings.author}</p>
        <p>{pages.length}/{current}</p>
        </div>
        <span id="back" onClick={() => {
          if(!document.getElementById('back').classList.contains('disabled')) {
            setCurrent((prevCurrent) => prevCurrent - 1);
          }
        }}>
          <BiChevronRight />
        </span>
      </footer>
    </main>
  );
}
