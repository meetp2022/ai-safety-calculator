# AI Job Safety Calculator

A data-driven, task-level analysis of AI impact on professional roles. Built with Next.js and TypeScript.

## Methodology

The calculator uses a rule-based scoring engine to determine the "Task Impact Score" (TIS) for each task in a role.

### The Formula
`TIS = (AS × ACM × AF) × (1 − HAF)`

- **AS (Automation Suitability):** How inherently suitable a task is for automation.
- **ACM (AI Capability Maturity):** How mature the AI technology is for this specific task.
- **AF (Adoption Friction):** Economic, legal, or social barriers to AI adoption.
- **HAF (Human Advantage Factor):** The degree to which human empathy, ethics, or complex physical dexterity is required.

### Disclaimer
This tool is for educational purposes. "Impact" refers to the automation of specific tasks, not necessarily the replacement of the entire job role.

## Project Structure
- `engine/`: Scoring logic and constants.
- `data/`: Job roles, tasks, and taxonomy.
- `app/`: Next.js frontend.
- `docs/`: Documentation and principles.
- `agents/`: AI agent instructions (mental models).

## Getting Started
1. `npm install`
2. `npm run dev`
3. Open [http://localhost:3000](http://localhost:3000)
