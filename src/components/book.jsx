import React, { useState, useEffect } from "react";
import { BiChevronLeft } from "react-icons/bi";
import { BiChevronRight } from "react-icons/bi";
import settings from "@/setting/settings.json";
const fs = require('fs')
const path = require('path')
export function Book() {
  const [currentPage, setCurrentPage] = useState("default.html");
  const [pageContent, setPageContent] = useState("");
  const [current, setCurrent] = useState(1)
  const [pages, setpages] = useState([])
  useEffect(() => {
    const pagePath = `/pages/${currentPage}`;

    fetch(pagePath)
      .then((response) => response.text())
      .then((data) => setPageContent(data))
      .catch((error) => console.error("Error fetching page content:", error));
  }, [currentPage]);
  /*useEffect(()=>{
    const pathName = "/pages/"
    fs.readdir(pathName, (err, files)=>{
      if(err){
        console.error(err)
        return;
      }
      files.forEach(file=>{
        if(path.extname(file) ===".html"){
          setCurrent( + file)
        }
      })
    })
  })*/

  return (
    <main id="book">
      <iframe title="book-page" srcDoc={pageContent}></iframe>
      <footer>
        <span id="forward" onClick={() => setCurrentPage('previous')}>
          <BiChevronLeft />
        </span>
        <div>
        <h2 onClick={() => setCurrentPage('default.html')}>{settings.title}</h2>
        <p>{pages.length}/{current}</p>
        </div>
        <span id="back" onClick={() => setCurrentPage('next')}>
          <BiChevronRight />
        </span>
      </footer>
    </main>
  );
}
