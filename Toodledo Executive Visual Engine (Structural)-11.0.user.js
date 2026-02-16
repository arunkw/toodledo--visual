// ==UserScript==
// @name         Toodledo Executive Visual Engine (Structural)
// @namespace    http://tampermonkey.net/
// @version      11.0
// @description  Missing > Location > Context > Status (Stable)
// @match        *://tasks.toodledo.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    function updateTasks() {

        document.querySelectorAll(".taskRow").forEach(task => {

            const title = task.querySelector(".tc_title");
            const priorityCell = task.querySelector(".tc_priority");
            const statusCell = task.querySelector(".tc_status .cellInner");

            if (!title || !priorityCell) return;

            /* RESET */
            task.style.backgroundColor = "";
            task.style.color = "";
            title.style.color = "";
            title.style.textDecoration = "";
            title.style.opacity = "1";

            const cells = task.querySelectorAll(".taskCell");

            /* STRUCTURAL COLUMN DETECTION */

            const contextCell = priorityCell.previousElementSibling;  // confirmed working earlier
            const locationCell = cells[3] || null; // based on your DOM structure
            const folderCell = cells[2] || null;   // based on your DOM structure

            /* ==================================================
               1️⃣ MISSING REQUIRED FIELDS (HIGHEST PRIORITY)
            ================================================== */

            const noContext =
                !contextCell ||
                contextCell.innerText.trim() === "" ||
                contextCell.innerText.includes("No Context");

            const noStatus =
                !statusCell ||
                statusCell.innerText.trim() === "" ||
                statusCell.innerText.includes("No Status");

            const noLocation =
                !locationCell ||
                locationCell.innerText.trim() === "" ||
                locationCell.innerText.includes("No Location");

            const noFolder =
                !folderCell ||
                folderCell.innerText.trim() === "" ||
                folderCell.innerText.includes("No Folder");

            if (noContext || noStatus || noFolder || noLocation) {

                task.style.backgroundColor = "#b71c1c";
                task.style.color = "#ffffff";
                title.style.color = "#ffffff";

                return;
            }

            /* ==================================================
               2️⃣ LOCATION OVERRIDE
            ================================================== */

            const locText = locationCell.innerText.trim();

     //       if (
     //           locText === "02 🌐 Prep b/ Market 📥" ||
     //           locText === "03 🌐 Mulund St./ Market 📥"
     //       ) {

      //          task.style.backgroundColor = "#000000";
      //          task.style.color = "#ffffff";
      //         title.style.color = "#ffffff";

      //          return;
      //      }

            /* ==================================================
               3️⃣ CONTEXT HEATMAP
            ================================================== */

            if (contextCell) {

                const match = contextCell.innerText.trim().match(/^(\d{2})\./);

                if (match) {

                    const code = parseInt(match[1], 10);

                    if (code >= 0 && code <= 8) {
                        task.style.backgroundColor = "rgba(183, 28, 28, 0.45)";
                    }
                    else if (code === 9) {
                        task.style.backgroundColor = "rgba(198, 40, 40, 0.35)";
                    }
                    else if (code === 10) {
                        task.style.backgroundColor = "rgba(255, 111, 0, 0.30)";
                    }
                    else if (code === 11 || code === 12) {
                        task.style.backgroundColor = "rgba(255, 152, 0, 0.25)";
                    }
                    else if (code === 13 || code === 14) {
                        task.style.backgroundColor = "rgba(56, 142, 60, 0.20)";
                    }
                    else if (code === 15) {
                        task.style.backgroundColor = "rgba(76, 175, 80, 0.10)";
                    }
                }
            }

            /* ==================================================
               4️⃣ STATUS STRIKE
            ================================================== */

            if (statusCell) {

                const statusText = statusCell.innerText.trim();

                if (statusText === "Hold" || statusText === "Someday") {
                    title.style.textDecoration = "line-through";
                    title.style.opacity = "0.6";
                }
            }

        });
    }

    window.addEventListener("load", () => {
        updateTasks();
        setInterval(updateTasks, 1500);
    });

})();
