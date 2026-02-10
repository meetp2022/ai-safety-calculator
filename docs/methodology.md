# Methodology: AI Job Safety Calculator (v2.0)

## 1. Objective
The AI Job Safety Calculator is designed to provide a high-fidelity, task-level assessment of AI's potential impact on professional roles. Unlike generalized "job loss" predictions, this tool analyzes the specific technical and social barriers to automation within a user's daily workflow.

## 2. The TIS v2.0 Formula
The core of our assessment is the **Task Impact Score (TIS)**. In version 2.0, we moved from a linear model to a **non-linear interaction model** to better reflect how automation technologies actually scale.

### The Equation:
`TIS = [(AS^1.25 × ACM^1.25 × AF) × (1 − (HAF^2 × 0.85))] × FW`

#### Variable Definitions:
| Variable | Name | Description |
| :--- | :--- | :--- |
| **AS** | Automation Suitability | The degree to which a task is digital/repetitive vs. physical/unpredictable. |
| **ACM** | AI Capability Maturity | The current state-of-the-art proficiency of Generative AI or Robotics for this specific task. |
| **AF** | Adoption Friction | Legal, economic, and social barriers that slow down technological integration. |
| **HAF** | Human Advantage Factor | Requirement for empathy, high-stakes ethics, or complex strategic synthesis. |
| **FW** | Frequency Weight | A multiplier based on how often the task is performed (Daily, Weekly, etc.). |

### Why Non-Linear?
In Version 1.0, risk was additive. In **v2.0**, we use power functions (`^1.25`). This means that when a task has both high suitability **and** high AI maturity, the risk compounds exponentially, reflecting the "tipping point" often seen in technology adoption.

---

## 3. Contextual Modifiers
The final "Exposure Score" is adjusted by three major environmental factors:

### A. Experience Modifier
Seniority acts as a "Moat". 
- **Entry Level (1.2x):** Higher concentration on procedural and standard tasks.
- **Expert (0.6x):** High concentration on rare edge-cases and human-to-human negotiation.

### B. Core Value Identification (New in v2.0)
Users can flag specific tasks as their "Primary Value Add". If AI maturity is high for these core pillars, the engine applies a **30% sensitivity boost**, as the impact on the user's career value is significantly higher.

### C. Environmental Adoption Context
The engine recognizes that "Technology Availability" ≠ "Technology Adoption".
- **Aggressive (1.25x):** AI-first industries (e.g., Software, Fintech).
- **Safe Haven (0.8x):** Regulated or traditional industries (e.g., Healthcare, Legal, Crafts).

---

## 4. Technical Implementation
- **Framework:** Next.js (Client-side focused for privacy).
- **Styling:** Tailwind CSS v4 (Industrial Dark Theme).
- **Logic:** TypeScript deterministic engine (No black-box ML used; all scores are explainable).
- **Data Architecture:** A multi-layered JSON taxonomy mapping 12 industries to 70+ specific task evaluations.

## 5. Philosophy: Augmentation vs. Replacement
The results are framed through the lens of **"Saturation"**, not "Replacement". A high score indicates that a majority of a role's tasks can be performed by AI, suggesting a shift toward supervisory and strategic functions rather than job elimination.
