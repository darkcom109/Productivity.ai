# Changelog

## Version 2.0.0 - Advanced Features Release (November 2025)

### 🎉 Major New Features

#### Drag & Drop Reordering
- Manual reordering of todos via drag and drop
- Available in list view when "Manual Order" sort is selected
- Visual grip handle appears on hover
- Powered by @dnd-kit library

#### Subtasks/Checklists
- Add unlimited subtasks to any todo
- Track completion progress (X/Y completed)
- Expand/collapse subtask view
- Independent completion tracking
- Delete individual subtasks

#### Time Tracking
- Built-in timer for each todo
- Start/stop functionality
- Multiple time entries per todo
- Accumulated time display
- Time data in analytics and exports

#### Kanban Board View
- Visual board with 5 columns (Urgent, High, Medium, Low, Completed)
- Drag cards between columns to change priority
- Compact card view with essential info
- Toggle between List and Kanban views
- Keyboard shortcut: Ctrl+K

#### Productivity Analytics
- Comprehensive statistics dashboard
- Completion rate tracking
- Time tracking summaries
- Completions by day/week/month
- Visual charts (pie and bar)
- Category and priority breakdowns
- Keyboard shortcut: Ctrl+A

#### Import/Export
- Export to JSON (complete data) or CSV (spreadsheet)
- Import from JSON files
- Automatic backup file naming with dates
- Preserves all metadata including subtasks and time entries
- Keyboard shortcut: Ctrl+E

#### Keyboard Shortcuts
- Global keyboard shortcuts for major actions
- Ctrl+N: New todo
- Ctrl+K: Toggle view
- Ctrl+A: Analytics
- Ctrl+E: Import/Export
- Ctrl+F: Focus search
- ?: Show shortcuts help
- ESC: Close modals
- Platform-aware (Cmd on Mac, Ctrl on Windows/Linux)

#### Archive Functionality
- Archive completed todos instead of deleting
- Separate filter for archived items
- Preserve history while keeping list clean
- Unarchive functionality
- Included in statistics and exports

### 🔧 Technical Improvements

#### New Dependencies
- `@dnd-kit/core`: ^6.1.0 - Drag and drop core
- `@dnd-kit/sortable`: ^8.0.0 - Sortable drag and drop
- `@dnd-kit/utilities`: ^3.2.2 - DnD utilities
- `recharts`: ^2.12.0 - Analytics charts

#### Data Structure Updates
- Added `archived` boolean field
- Added `subtasks` array with Subtask interface
- Added `timeEntries` array with TimeEntry interface
- Added `order` number field for manual ordering
- Automatic migration from v1 data format

#### New Types
- `Subtask`: id, title, completed
- `TimeEntry`: id, startTime, endTime, duration
- `ProductivityStats`: comprehensive analytics data
- `ViewMode`: 'list' | 'kanban'
- Extended `FilterOption` to include 'archived'
- Extended `SortOption` to include 'manual'

#### New Components
- `ProductivityDashboard.tsx`: Analytics display with charts
- `ImportExport.tsx`: Import/export modal dialog
- `KeyboardShortcuts.tsx`: Shortcuts help modal
- `KanbanBoard.tsx`: Kanban view container
- `KanbanCard.tsx`: Individual Kanban cards
- `DraggableTodoList.tsx`: List with drag and drop
- `DraggableTodoItem.tsx`: Draggable wrapper for todos

#### Updated Components
- `TodoItem.tsx`: Added subtasks, time tracking, archive
- `FilterBar.tsx`: Added archived filter, manual sort
- `AddTodoForm.tsx`: Minor UI improvements
- `page.tsx`: Complete rewrite with all new features

#### New Utilities
- Enhanced `useTodos` hook with:
  - Archive/unarchive functions
  - Reorder functionality
  - Subtask management (add, toggle, delete)
  - Time tracking (start, stop, getTotalTime)
  - Import/export functions
  - Productivity statistics calculation

### 📚 Documentation

#### New Files
- `FEATURES.md`: Comprehensive feature documentation
- `QUICK_REFERENCE.md`: Quick reference guide
- `CHANGELOG.md`: This file

#### Updated Files
- `README.md`: Updated with all new features
- Added installation instructions for new dependencies
- Added keyboard shortcuts reference
- Added advanced usage guide

### 🎨 UI/UX Improvements
- Smooth animations for drag and drop
- Visual feedback for active timers
- Progress indicators for subtasks
- Improved color coding and visual hierarchy
- Responsive design for all new features
- Better mobile support
- Enhanced dark mode styling

### 🐛 Bug Fixes
- Fixed localStorage migration issues
- Improved error handling for import/export
- Better keyboard shortcut conflict resolution
- Fixed z-index issues with modals

### ⚡ Performance
- Optimized todo filtering and sorting
- Efficient drag and drop implementation
- Lazy calculation of statistics
- Memoized chart components

### 🔐 Privacy & Data
- All data remains local (localStorage)
- No external API calls
- Export for backup and portability
- Data migration handled automatically

---

## Version 1.0.0 - Initial Release

### Core Features
- Create, read, update, delete todos
- Todo properties: title, description, priority, category, due date, tags
- Smart search functionality
- Multiple sort options
- Advanced filtering
- Inline editing
- Dark mode support
- Persistent localStorage
- Beautiful gradient UI
- Responsive design
- Statistics display

### Initial Components
- `TodoItem.tsx`: Individual todo cards
- `AddTodoForm.tsx`: Form for creating todos
- `FilterBar.tsx`: Search and filter controls
- `page.tsx`: Main application page

### Technologies
- Next.js 14 with App Router
- React 18
- TypeScript
- Tailwind CSS
- Lucide React icons
- date-fns for date handling

---

## Upgrade Notes

### From v1.0.0 to v2.0.0

#### Automatic Migration
Your existing todos will be automatically migrated to the new format when you first load v2.0.0. The migration adds:
- `archived: false` (default)
- `subtasks: []` (empty array)
- `timeEntries: []` (empty array)
- `order: <index>` (based on current order)

#### No Data Loss
- All existing todo data is preserved
- No manual migration required
- Backwards compatible with v1.0.0 exports

#### New Dependencies Required
Run `npm install` to install new dependencies:
```bash
npm install
```

#### Recommended Actions After Upgrade
1. Test export/import functionality
2. Explore new Kanban view
3. Try keyboard shortcuts (press ?)
4. Enable manual sort to try drag & drop
5. Export data as backup

---

## Roadmap

### Planned for v2.1.0
- Recurring tasks
- Task templates
- Custom themes
- Enhanced mobile experience
- More export formats

### Planned for v3.0.0
- Cloud synchronization (optional)
- Collaboration features
- Calendar integration
- Advanced reporting
- AI-powered suggestions

---

**Current Version**: 2.0.0  
**Release Date**: November 25, 2025  
**License**: MIT

