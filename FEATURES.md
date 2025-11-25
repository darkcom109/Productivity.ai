# Advanced Features Documentation

## Table of Contents
1. [Drag & Drop Reordering](#drag--drop-reordering)
2. [Subtasks/Checklists](#subtaskschecklists)
3. [Time Tracking](#time-tracking)
4. [Kanban Board View](#kanban-board-view)
5. [Productivity Analytics](#productivity-analytics)
6. [Import/Export](#importexport)
7. [Keyboard Shortcuts](#keyboard-shortcuts)
8. [Archive Functionality](#archive-functionality)

---

## Drag & Drop Reordering

### Overview
Manually reorder your todos using intuitive drag-and-drop functionality.

### How It Works
1. Select "Manual Order" from the sort dropdown
2. A drag handle (grip icon) appears on each todo
3. Click and drag todos to reorder them
4. Changes are saved automatically

### Technical Details
- Uses `@dnd-kit/core` and `@dnd-kit/sortable` libraries
- Maintains order via an `order` property on each todo
- Only available when "Manual Order" sort is selected
- Disabled for archived todos

### Use Cases
- Prioritize daily tasks in your preferred order
- Group related tasks together visually
- Create a custom workflow sequence

---

## Subtasks/Checklists

### Overview
Break down complex todos into smaller, manageable subtasks.

### Features
- Add unlimited subtasks to any todo
- Check off subtasks independently
- See progress (e.g., "3/5 subtasks completed")
- Delete individual subtasks
- Subtasks persist with the parent todo

### How to Use
1. Click "Add Subtask" button on a todo
2. Enter subtask title and press Enter or click Add
3. Click checkbox to mark subtask complete
4. Click X to delete a subtask

### Technical Implementation
- Each todo has a `subtasks` array
- Subtasks have: id, title, completed status
- Progress calculation: `completedCount / totalCount`
- Subtasks visible in both List and Kanban views

### Best Practices
- Use for multi-step tasks
- Keep subtasks atomic and actionable
- Review subtask progress regularly
- Consider completing parent todo only when all subtasks done

---

## Time Tracking

### Overview
Built-in timer to track time spent on each task.

### Features
- Start/stop timer per todo
- Multiple time entries per todo
- Accumulated time tracking
- Visual display of total time
- Time persists across sessions

### How to Use
1. Click "Start Timer" on a todo
2. Work on the task
3. Click "Stop Timer" when finished
4. Time is automatically saved and displayed

### Technical Details
- `TimeEntry` interface: id, startTime, endTime, duration
- Duration calculated in seconds
- Each todo can have multiple time entries
- Active timer indicated by "Stop Timer" button
- Only one timer per todo at a time

### Analytics Integration
- Total time tracked across all todos
- Average time per completed task
- Time data included in analytics dashboard
- Export includes time tracking data

### Use Cases
- Track billable hours
- Analyze time spent per category
- Improve time estimates
- Identify time-consuming tasks

---

## Kanban Board View

### Overview
Visual board organized by priority levels for better task management.

### Columns
1. **Urgent** (Red): Critical, immediate tasks
2. **High Priority** (Orange): Important tasks
3. **Medium Priority** (Yellow): Standard tasks
4. **Low Priority** (Green): Nice-to-have tasks
5. **Completed** (Blue): Finished tasks

### Features
- Drag cards between columns to change priority
- Compact card view with essential information
- Visual indicators for subtasks, due dates, tags
- Quick actions on each card
- Responsive horizontal scrolling

### How to Use
1. Click "Kanban View" button or press `Ctrl+K`
2. View todos organized by priority
3. Drag cards between columns to change priority
4. All actions available (complete, edit, delete, archive)

### Technical Implementation
- Uses `@dnd-kit/core` for drag and drop
- Todos filtered by priority and completion status
- Drag events update todo priority
- Maintains all filtering and search functionality

### Best Practices
- Use for visual task management
- Drag to quickly re-prioritize
- Review columns for balanced workload
- Keep urgent column minimal

---

## Productivity Analytics

### Overview
Comprehensive dashboard showing productivity metrics and trends.

### Metrics Displayed

#### Overview Cards
- **Total Tasks**: Active (non-archived) tasks
- **Completed**: Completed tasks with completion rate
- **Time Tracked**: Total time across all tasks
- **Archived**: Number of archived tasks

#### Completion Tracking
- Tasks completed today
- Tasks completed this week
- Tasks completed this month

#### Visualizations
- **Pie Chart**: Completions by category
  - Shows distribution across Personal, Work, Shopping, Health, Other
- **Bar Chart**: Completions by priority
  - Shows Urgent, High, Medium, Low completions

### How to Access
- Click "Analytics" button
- Press `Ctrl+A`
- Toggle on/off as needed

### Technical Details
- Uses `recharts` library for visualizations
- Real-time calculations from todo data
- Uses `date-fns` for date calculations
- Stats object includes:
  - `totalTodos`, `completedTodos`, `activeTodos`, `archivedTodos`
  - `completionRate`, `totalTimeTracked`, `avgTimePerTodo`
  - `todayCompleted`, `weekCompleted`, `monthCompleted`
  - `completionsByCategory`, `completionsByPriority`

### Use Cases
- Weekly productivity reviews
- Identify patterns in task completion
- Balance workload across categories
- Track improvement over time

---

## Import/Export

### Overview
Backup and transfer your todo data with flexible export formats.

### Export Options

#### JSON Export
- **Complete Data**: All todos with full metadata
- **Includes**: 
  - Todo details (title, description, priority, etc.)
  - Subtasks and completion status
  - Time tracking entries
  - Tags and custom ordering
  - Timestamps
- **Use For**: Backups, data transfer, re-importing

#### CSV Export
- **Spreadsheet Compatible**: Open in Excel, Google Sheets
- **Includes**: Title, Description, Priority, Category, Status, Due Date, Tags, Created Date
- **Use For**: Analysis, reporting, sharing

### Import Feature
- **Format**: JSON only
- **Behavior**: Adds imported todos to existing list
- **Safety**: Generates new IDs to avoid conflicts
- **Validation**: Checks file format before import

### How to Use
1. Click "Import/Export" button or press `Ctrl+E`
2. For Export: Choose format (JSON or CSV) and download
3. For Import: Select JSON file to upload
4. Confirmation message on success

### File Naming
- Format: `todos-YYYY-MM-DD.json` or `todos-YYYY-MM-DD.csv`
- Example: `todos-2025-11-25.json`

### Best Practices
- Export regularly (weekly/monthly) for backups
- Use JSON for complete backups
- Use CSV for data analysis
- Store exports in cloud storage for safety
- Test imports on a backup first

---

## Keyboard Shortcuts

### Overview
Efficient keyboard-driven workflow for power users.

### Available Shortcuts

| Shortcut | Action | Description |
|----------|--------|-------------|
| `Ctrl+N` | New Todo | Opens add todo form |
| `Ctrl+K` | Toggle View | Switches List ↔ Kanban |
| `Ctrl+A` | Analytics | Shows/hides analytics dashboard |
| `Ctrl+E` | Import/Export | Opens import/export dialog |
| `Ctrl+F` | Focus Search | Focuses search input |
| `?` | Help | Shows keyboard shortcuts guide |
| `ESC` | Close | Closes open modals/dialogs |

### Platform Support
- **Windows/Linux**: Use `Ctrl` key
- **macOS**: Use `Cmd` key
- Automatically detects platform

### Technical Implementation
- Global event listener on `keydown`
- Checks for modifier keys (Ctrl/Cmd)
- Prevents default browser behavior
- Ignores shortcuts when typing in inputs
- ESC can blur active input

### Context Awareness
- Shortcuts disabled when typing in inputs/textareas
- ESC returns focus from inputs
- Modal shortcuts work even when modal is open

### Learning Shortcuts
- Press `?` to see shortcuts modal
- Tooltips show shortcuts on hover
- Referenced in UI (e.g., "Analytics (Ctrl+A)")

---

## Archive Functionality

### Overview
Archive completed tasks to keep your list clean while preserving history.

### How It Works
1. Complete a todo
2. Click the archive icon
3. Todo moves to archived status
4. Removed from active list

### Viewing Archived Todos
1. Change status filter to "Archived"
2. View all archived todos
3. Can restore (unarchive) if needed

### Archive vs Delete
- **Archive**: Preserves data, can restore
- **Delete**: Permanently removes, cannot restore

### Technical Details
- Todos have `archived` boolean property
- Archived todos excluded from most views
- Included in statistics (tracked separately)
- Included in exports (full backup)
- Can be filtered specifically

### Use Cases
- Clean up completed projects
- Preserve historical data
- Reference past tasks
- Maintain completion statistics
- Reduce visual clutter

### Best Practices
- Archive completed tasks weekly
- Delete only duplicates or mistakes
- Review archived todos monthly
- Use search to find archived todos
- Export before mass archiving

---

## Integration & Workflow

### Recommended Workflow

1. **Morning Planning**
   - Press `Ctrl+K` to switch to Kanban view
   - Review urgent and high priority columns
   - Drag tasks to re-prioritize

2. **During Work**
   - Start timer when beginning a task
   - Use subtasks to track progress
   - Mark subtasks complete as you go
   - Stop timer when done or switching tasks

3. **End of Day**
   - Complete finished todos
   - Archive completed tasks
   - Press `Ctrl+A` to view analytics
   - Plan tomorrow's priorities

4. **Weekly Review**
   - Check analytics for completion trends
   - Review archived tasks
   - Export data for backup
   - Adjust priorities for next week

### Feature Combinations

**For Complex Projects:**
- Use subtasks for task breakdown
- Track time to measure effort
- High/Urgent priority
- Work category
- Relevant tags

**For Quick Tasks:**
- No subtasks needed
- Low/Medium priority
- Quick time tracking
- Simple title only

**For Recurring Work:**
- Use consistent tags
- Track time for patterns
- Regular category
- Archive when complete

---

## Technical Architecture

### Data Structure
```typescript
interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  archived: boolean;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'personal' | 'work' | 'shopping' | 'health' | 'other';
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  subtasks: Subtask[];
  timeEntries: TimeEntry[];
  order: number;
}
```

### Storage
- localStorage with key: `productivity-ai-todos`
- Automatic migration from old format
- Real-time saving on changes
- No server storage (privacy-first)

### Libraries Used
- `@dnd-kit/*`: Drag and drop
- `recharts`: Analytics charts
- `date-fns`: Date manipulation
- `lucide-react`: Icons

---

## Future Enhancement Ideas

Potential features for future versions:
- Recurring tasks
- Task dependencies
- Collaboration/sharing
- Cloud sync
- Mobile app
- Task templates
- Custom themes
- More chart types
- AI-powered suggestions
- Calendar integration

---

**Documentation Version**: 2.0  
**Last Updated**: November 2025  
**Application Version**: 2.0.0

