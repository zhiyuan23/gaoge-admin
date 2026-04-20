# React Sports Admin Design

## Overview

This spec defines the first React-based admin implementation for the Gaoge admin repository.
The goal is to replace the current root-level Vue admin app on a dedicated `react` branch with a new
`React + Vite + TypeScript + shadcn/ui + Tailwind CSS + TanStack Router` application.

The first delivery is a sports operations admin shell with a complete navigation model and one
fully implemented business page: the player information list page. Other modules will be reachable
through polished placeholder pages so the product feels structurally complete from the first pass.

## Goals

- Rebuild the repository root as a React admin application on a dedicated `react` branch.
- Establish a maintainable admin architecture for future sports management modules.
- Deliver a production-quality admin shell with common navigation, search, and account affordances.
- Deliver a player information list page with search, filtering, summary metrics, table display, and
  a details entry point.
- Use mock data shaped like real backend resources so later API integration is straightforward.

## Non-Goals

- No real backend integration in this phase.
- No full player details page implementation in this phase.
- No authentication, permission matrix, or role-specific rendering in this phase.
- No migration path that preserves the Vue app inside the same branch at runtime.
- No SSR or Next.js adoption in this phase.

## Product Direction

The admin should look and behave like a professional sports operations console rather than a generic
template dashboard. The UI should communicate control, density, and clarity without collapsing into
a dark-mode-heavy or visually noisy aesthetic.

### Visual Style

- Primary experience is light theme.
- Accent colors:
  - deep navy for structure, emphasis, and navigation
  - field green for positive or active sports-related states
  - alert orange for warnings such as expiring contracts or injury-related attention states
- Panels use restrained borders, layered surfaces, and tight spacing.
- Typography should feel compact and operational, not airy or consumer-app casual.
- Placeholder screens must look intentional and productized, not temporary.

### Interaction Style

- Left sidebar supports expanded and collapsed states.
- Top bar includes breadcrumb, global search affordance, notifications entry, and user menu.
- Navigation must support first-level and second-level sections.
- Active route state must be clear in both sidebar and breadcrumb.
- Tables should support hover feedback, badge states, and obvious action entry points.

## Technical Stack

- React
- Vite
- TypeScript
- Tailwind CSS
- shadcn/ui
- TanStack Router
- Lucide React for iconography

## Architecture

The app should be organized into four layers:

1. `app shell`
   The root composition for providers, layout shell, navigation wiring, and router bootstrapping.
2. `route pages`
   Route-level page components bound to TanStack Router.
3. `feature modules`
   Domain-specific UI and data modules such as players, dashboard, teams, and matches.
4. `shared ui`
   Reusable presentation primitives, layout helpers, status badges, tables, and empty states.

### Routing Strategy

- TanStack Router is the source of truth for navigation hierarchy.
- Route metadata should define:
  - label
  - icon
  - breadcrumb text
  - sidebar grouping
  - placeholder vs implemented status where useful
- Breadcrumbs and sidebar items must be derived from routing metadata rather than duplicated config.

### Layout Strategy

The base layout uses a three-zone admin shell:

- left sidebar navigation
- top toolbar
- main content area

The shell must work cleanly across desktop and smaller laptop widths. Mobile behavior only needs
baseline usability in this phase, not a full mobile-admin optimization pass.

## Navigation Model

The initial navigation tree should include:

- Dashboard
- Player Management
  - Player Information
  - Contracts & Valuation
  - Transfer Records
- Team Management
- Schedule & Matches
- Training & Medical
- Data Analysis
- Content & Announcements
- System Settings

### Navigation Rules

- `Player Information` is the first real business page.
- Remaining entries are connected routes with designed placeholder screens.
- Every route should be clickable and land on a coherent page.
- No dead-end or hidden routes in the first pass.

## First Implemented Page: Player Information

### Purpose

Provide an operations-oriented player list for club staff to quickly search, filter, inspect status,
and jump into future detail workflows.

### Page Structure

1. Page header
   Includes title, descriptive subtitle, and a primary action button.
2. Summary metrics row
   Compact cards showing:
   - total players
   - available players
   - injured players
   - contracts nearing expiration
3. Filter panel
   Supports:
   - free-text search by player name
   - position filter
   - team filter
   - availability/status filter
   - reset filters action
4. Player table
   Columns:
   - avatar
   - player name
   - squad number
   - position
   - team
   - age
   - market value
   - contract status
   - match availability
   - updated at
   - actions
5. Row actions
   At minimum includes a `View Details` action that routes to a reserved details path.

### Data Behavior

- Filtering is client-side using mock data in this phase.
- Summary cards respond to the filtered result set only if that remains clear and intuitive during
  implementation; otherwise they should represent the full dataset and be labeled implicitly by page
  context. The implementation should choose one behavior and keep it consistent.
- Empty-state handling is required for zero-result filters.

## Data Design

Mock data should be split by domain and kept close to future API boundaries:

- `players`
- `teams`
- `player statuses`
- `dashboard summaries`

Each player record should support the player list needs directly and be realistic enough for later
expansion into details, contracts, and transfer history.

## Placeholder Page Design

Non-implemented modules should still look complete. Each placeholder page should include:

- page title
- brief module explanation
- a short list of planned capabilities or current scope
- one or more contextual action buttons if appropriate
- consistent card or panel styling aligned with the admin shell

This avoids the “coming soon” anti-pattern and keeps the product visually credible.

## Responsive Behavior

- Desktop is the primary target.
- Sidebar collapse should preserve usability on narrower widths.
- Filters should stack cleanly on smaller screens.
- The player table may remain horizontally scrollable if needed, but must preserve readability.

## Testing and Verification

Minimum verification for the first implementation:

- app boots locally
- app builds successfully
- primary navigation works for all defined routes
- player information page renders correctly
- filters update the list as expected
- placeholder routes render without broken layout states

## Implementation Notes

- Replace the existing root app structure on the `react` branch rather than nesting a second app in
  a subdirectory.
- Preserve the architecture boundaries early to avoid route config and feature code drifting into a
  single monolithic folder.
- Prefer reusable status badge, metric card, and page shell patterns so later modules can extend the
  system without visual drift.

## Risks and Mitigations

- Risk: root-level replacement could leave behind Vue-specific config or assets that confuse the new
  app.
  Mitigation: reset the root structure deliberately during implementation and keep only assets or
  content that are still relevant.

- Risk: a full navigation tree can create too much placeholder noise.
  Mitigation: keep placeholder pages visually concise and route metadata centralized.

- Risk: sports-admin visual density can become cluttered.
  Mitigation: use strong hierarchy, restrained color accents, and compact but readable spacing.

## Acceptance Criteria

- A new React admin app is initialized at repository root on a dedicated `react` branch.
- The app uses `shadcn/ui` and `TanStack Router`.
- The admin shell includes sidebar navigation, top toolbar, breadcrumbs, global search affordance,
  notifications entry, and user menu.
- The navigation tree covers the agreed sports-admin modules with second-level entries where defined.
- All navigation items route to working pages.
- `Player Information` is fully implemented as a list page with summary cards, filters, table, and a
  details entry action.
- Mock data is organized by domain and ready for future API replacement.
- The app runs and builds locally.
