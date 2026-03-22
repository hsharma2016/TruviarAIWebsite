# Custom Claude Slash Commands

Drop `.md` files here to create custom `/command-name` slash commands available in Claude Code for this project.

## How it works

- Each `.md` file becomes a slash command: `my-skill.md` → `/my-skill`
- The file content is the prompt that runs when you invoke the command
- Subdirectories create namespaced commands: `frontend/component.md` → `/frontend:component`

## Structure

```
.claude/commands/
├── README.md          ← this file
├── example.md         ← invoked as /example
└── frontend/          ← group related commands in subdirs
    └── component.md   ← invoked as /frontend:component
```

## Tips

- Use `$ARGUMENTS` in your prompt to pass text after the command name
- Commands have access to the full project context
