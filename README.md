# Toodledo Executive Visual Engine

A Tampermonkey userscript that transforms Toodledo into a structured decision-support dashboard using rule-based visual logic.

---

## 🔥 Features

### 1️⃣ Missing Required Fields (Highest Priority)
If any of the following are missing:
- Folder
- Location
- Context
- Status

The entire task row turns **red with white text**.

---

### 2️⃣ Context Heatmap
Visual risk scaling based on Context code (00–17):

| Code Range | Meaning | Color |
|------------|----------|-------|
| 00–08 | Extremely High | Deep Red |
| 09 | Strong Risk | Red |
| 10 | Moderate Risk | Red-Orange |
| 11–12 | Low Risk | Amber |
| 13–14 | Minimal | Light Green |
| 15 | Negligible | Very Faint Green |
| 16–17 | No Impact | Default |

---

### 3️⃣ Status Logic
Tasks with:
- `Hold`
- `Someday`

Are automatically struck through and dimmed.

---

## 📦 Installation

### Step 1 – Install Tampermonkey

Install the Tampermonkey browser extension:

- Chrome
- Edge
- Firefox

### Step 2 – Install Script

1. Open Tampermonkey Dashboard
2. Create a new script
3. Paste contents of:
