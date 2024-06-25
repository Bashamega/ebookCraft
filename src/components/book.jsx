import { useEffect, useState, useRef } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import dynamic from 'next/dynamic';
import settings from "@/setting/settings.json";
import styles from "@/styles/Book.module.css";
import '@/styles/Book.module.css';

const ClassicEditor = dynamic(() => import('@ckeditor/ckeditor5-build-classic'), { ssr: false });

export function Book() {
  const [currentPage, setCurrentPage] = useState("default.html");
  const [pageContent, setPageContent] = useState("");
  const [current, setCurrent] = useState(1);
  const [pages, setPages] = useState([]);
  const [animationClass, setAnimationClass] = useState("");
  const [isNotebookOpen, setIsNotebookOpen] = useState(false);
  const [editorInstance, setEditorInstance] = useState(null);
  const editorRef = useRef(null);

  useEffect(() => {
    setCurrentPage(pages[current - 1]);
    if (currentPage) {
      const pagePath = `/pages/${currentPage}`;
      fetch(pagePath)
        .then((response) => response.text())
        .then((data) => setPageContent(data))
        .catch((error) => console.error("Error fetching page content:", error));
    }

    switch (current) {
      case 1:
        disableButtons(true, false);
        break;
      case pages.length:
        disableButtons(false, true);
        break;
      default:
        disableButtons(false, false);
        break;
    }
  }, [currentPage, current, pages]);

  useEffect(() => {
    if (settings.pageSaver && localStorage.getItem(settings.title + "_pagesaver")) {
      setCurrent(parseInt(localStorage.getItem(settings.title + "_pagesaver")));
    }
    fetch("/api/pagesRender")
      .then((res) => res.json())
      .then((data) => setPages(data));
  }, []);

  useEffect(() => {
    if (isNotebookOpen && !editorInstance) {
      if (ClassicEditor && typeof ClassicEditor.create === 'function') {
        ClassicEditor
          .create(editorRef.current, {
            // CKEditor configuration options can be added here
          })
          .then(editor => {
            setEditorInstance(editor);
            loadNotebook();
          })
          .catch(error => {
            console.error("Error creating CKEditor instance:", error);
          });
      } else {
        console.error("ClassicEditor.create is not available.");
      }
    } else if (!isNotebookOpen && editorInstance) {
      editorInstance.destroy()
        .then(() => {
          setEditorInstance(null);
        })
        .catch(error => {
          console.error("Error destroying CKEditor instance:", error);
        });
    }
  }, [isNotebookOpen]);

  const disableButtons = (backDisabled, forwardDisabled) => {
    const backBtn = document.getElementById("back");
    const forwardBtn = document.getElementById("forward");

    if (backBtn) {
      backBtn.classList.toggle("disabled", backDisabled);
    }
    if (forwardBtn) {
      forwardBtn.classList.toggle("disabled", forwardDisabled);
    }
  };

  const navigate = (direction) => {
    if (direction === 'back') {
      if (current > 1) {
        handleAnimation(styles.iframeSlideOutRight, current - 1, styles.iframeSlideInLeft);
      }
    } else if (direction === 'forward') {
      if (current < pages.length) {
        handleAnimation(styles.iframeSlideOutLeft, current + 1, styles.iframeSlideInRight);
      }
    }
  };

  const handleAnimation = (slideOutClass, newCurrent, slideInClass) => {
    setAnimationClass(slideOutClass);
    setTimeout(() => {
      setCurrent(newCurrent);
      localStorage.setItem(settings.title + "_pagesaver", newCurrent);
      setAnimationClass(slideInClass);
    }, 500);
  };

  const toggleNotebook = () => {
    setIsNotebookOpen(!isNotebookOpen);
  };

  const saveNotebook = () => {
    if (editorInstance) {
      const content = editorInstance.getData();
      localStorage.setItem("notebookContent", content);
      alert("Notebook saved!");
    } else {
      console.error("Editor instance is not available.");
    }
  };

  const loadNotebook = () => {
    const content = localStorage.getItem("notebookContent");
    if (content && editorInstance) {
      editorInstance.setData(content);
    }
  };

  return (
    <main id="book">
      <div className={`${styles.iframeContainer} ${animationClass}`}>
        <iframe title="book-page" srcDoc={pageContent}></iframe>
      </div>
      <footer>
        <span id="back" className="navigation-btn" onClick={() => navigate('back')}>
          <BiChevronLeft />
        </span>
        <div>
          <svg id="notebook-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" onClick={toggleNotebook} style={{ width: '100px', height: '100px', marginLeft: '5px' }}>
            <path d="M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M19,19H5V5h14V19z M7,7h10v2H7V7z" />
          </svg>
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
        <span id="forward" className="navigation-btn" onClick={() => navigate('forward')}>
          <BiChevronRight />
        </span>
      </footer>

      {settings.notebookFeatureEnabled && (
        <div>
          {isNotebookOpen && (
            <div className={styles.notebook}>
              <div className="close" onClick={toggleNotebook}>×</div>
              <div ref={editorRef} className={styles.editor}></div>
              <button onClick={saveNotebook}>Save</button>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
