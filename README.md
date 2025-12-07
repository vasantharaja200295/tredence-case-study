# HR Workflow Designer

A drag-and-drop workflow designer for HR processes. This application allows HR administrators to visually create and test internal workflows such as onboarding, leave approval, and document verification.

## Overview

The HR Workflow Designer is a React-based application that provides a visual canvas for building HR workflows. Users can drag predefined node types onto the canvas, configure each node with specific requirements, and simulate workflow execution.

[**Preview**](https://vasantharaja-tredence-case-study.vercel.app/)

## Key Features

- Visual workflow canvas with drag-and-drop node placement
- Five node types: Start, Task, Approval, Automation, and End
- Configurable node forms with dynamic fields
- Workflow simulation and testing sandbox
- Export/Import workflows as JSON
- Real-time validation with cycle and self-loop prevention
- Dark mode support
- Mini-map navigation and zoom controls

## Tech Stack

- React 19.2 with TypeScript
- React Flow 12.10 for canvas implementation
- Zustand 5.0 for state management
- React Query 5.90 for async operations
- Shadcn UI for component library
- Tailwind CSS for styling
- Vite for build tooling

## Project Structure

```
src/
├── components/
│   ├── nodes/           # Custom React Flow node components
│   ├── forms/           # Node configuration forms
│   ├── modals/          # Import, Export, Run workflow dialogs
│   ├── ui/              # Shadcn UI components
│   ├── theme/           # Theme provider and toggle
│   ├── WorkflowCanvas   # Main canvas component
│   ├── ConfigPanel      # Node configuration sidebar
│   ├── Header           # Header with action buttons
│   └── NodeSidebar      # Draggable node type sidebar
├── store/
│   └── workflowStore.ts # Zustand state management
├── types/
│   ├── nodes.ts         # Node type definitions
│   └── state.ts         # App state interface
├── api/
│   ├── index.ts         # React Query hooks
│   └── mocks.ts         # Mock API implementation
├── lib/
│   ├── graphUtils.ts    # Graph validation utilities
│   ├── nodeUtils.ts     # Node creation helpers
│   └── utils.ts         # General utilities
├── constants/
│   ├── index.ts         # Constants
│   └── mockData.ts      # Mock data and initial workflow
└── main.tsx             # Application entry point
```

## Getting Started

### Prerequisites

- Node.js 16 or higher
- npm package manager
- Git for cloning the repository

### Clone the Repository

```bash
git clone https://github.com/vasantharaja200295/tredence-case-study.git
cd tredence-case-study
```

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

The application will be available at http://localhost:5173

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Node Types

### Start Node
Entry point of the workflow. Each workflow must begin with a Start node.

**Required Fields:**
- Title: Workflow name or description

### Task Node
Represents a manual task assigned to a team member.

**Required Fields:**
- Title: Task name
- Description: Task details
- Assignee: Team member responsible for the task
- Due Date: Task deadline

### Approval Node
Decision point where a manager or HR representative approves or rejects the workflow progression.

**Required Fields:**
- Title: Approval name
- Approver Role: Role of the approver (Manager, HRBP, Director)
- Auto-Approve Threshold: Auto-approval limit in currency or points

### Automation Node
Represents system-triggered actions such as sending emails or generating documents.

**Required Fields:**
- Title: Action name
- Action: Selected from available mock actions
- Parameters: Dynamic fields based on selected action

### End Node
Workflow termination point with optional completion message and summary flag.

**Required Fields:**
- End Message: Completion message
- Summary Flag: Boolean to include workflow summary

## Workflow Canvas Operations

### Adding Nodes

1. Select a node type from the left sidebar
2. Drag the node onto the canvas
3. Click the node to select it
4. Configure the node properties in the right sidebar

### Creating Connections

1. Click and drag from the node output handle
2. Connect to another node's input handle
3. Valid connections are automatically validated

### Constraints

- Start node cannot be deleted
- Self-loops and cycles are prevented
- Each node type has required and optional fields

### Deleting Nodes

1. Select the node on the canvas
2. Click Delete Node in the configuration panel
3. Connected edges are automatically removed

## Workflow Testing

The Run Workflow feature allows simulation of workflow execution:

1. Click the Run Workflow button in the header
2. The system serializes the workflow graph
3. Execution steps are displayed in sequence
4. Each step shows: type, status, assignee/approver details

The simulation validates workflow structure and executes a dry-run through all nodes.

## Import/Export

### Exporting a Workflow

1. Click the Export button in the header
2. A JSON file containing nodes and edges is downloaded
3. Filename: flow.json

### Importing a Workflow

1. Click the Import button in the header
2. Select a previously exported JSON file
3. The workflow is loaded and replaces the current canvas

JSON format:
```json
{
  "nodes": [...],
  "edges": [...],
  "viewport": {...}
}
```

## State Management

The application uses Zustand for state management. The workflow store maintains:

- nodes: Array of workflow nodes
- edges: Array of connections between nodes
- selectedNode: Currently selected node for editing
- Actions: Methods for updating nodes, edges, and workflow state

State updates trigger automatic re-renders in connected components.

## API Integration

### Mock API Endpoints

GET /automations
- Returns available automation actions
- Response format:
```json
[
  {
    "id": "send_email",
    "name": "Send Email",
    "params": [
      { "name": "to", "value": "..." },
      { "name": "subject", "value": "..." }
    ]
  }
]
```

POST /simulate
- Accepts workflow JSON (nodes and edges)
- Returns execution steps with status and details
- Used for workflow testing and validation

## Validation Rules

### Graph Validation

- Cycle Detection: Prevents circular dependencies between nodes
- Self-Loop Prevention: A node cannot connect to itself
- Start Node Protection: Start node cannot be deleted

### Field Validation

- Required fields must be populated before workflow execution
- Date fields support standard date picker input
- Role and action selections use predefined dropdown lists

## Error Handling

The application displays errors and warnings using toast notifications:

- Invalid connections are rejected with visual feedback
- File import errors are reported with specific messages
- API simulation failures show error details
- Node deletion constraints are enforced with warnings

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Architecture Decisions

### Why Zustand?
Simple, lightweight state management without Provider Hell. Suitable for workflow state that doesn't require complex transformations.

### Why React Flow?
Industry-standard library for graph-based UIs. Handles complex node positioning, edge routing, and user interactions out of the box.

### Component Organization
Nodes, forms, and modals are separated for maintainability and extensibility. New node types can be added by creating new node components and forms.

### Type Safety
Full TypeScript implementation ensures type safety across the application, reducing runtime errors and improving developer experience.

## Completed vs. Future Enhancements

### What Was Completed

Core Requirements:
- Full React Flow canvas with 5 node types
- Drag-and-drop node placement
- Node configuration forms with all required fields
- Mock API integration with GET /automations and POST /simulate
- Workflow testing and sandbox panel
- Graph validation (cycle detection, self-loop prevention)
- Export/Import workflow JSON functionality
- Clean architecture with separated concerns
- Full TypeScript implementation

Bonus Features:
- Export/Import as JSON
- Mini-map and zoom controls
- Dark mode support
- Real-time validation feedback
- Error handling with toast notifications

### Future Enhancements

Potential improvements for future versions:

- Enforcing strict Form validations
- Undo/Redo stack implementation for node and edge modifications
- Node templates and presets for common workflow patterns
- Workflow versioning and history tracking
- Conditional branches based on task outcomes (approval paths)
- Integration with real backend APIs instead of mocks
- Workflow analytics and execution metrics
- Role-based access control for different user types
- Node collaboration and comments
- Workflow scheduling and automation
- Advanced search and filtering for large workflows