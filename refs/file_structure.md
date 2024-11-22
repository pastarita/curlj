# Curlj Application File Structure

```mermaid
graph TD
    root[curlj/] --> src[src/]
    root --> public[public/]
    root --> config[Configuration Files]
    
    src --> app[app/]
    src --> components[components/]
    src --> types[types/]
    
    app --> layout[layout.tsx]
    app --> page[page.tsx]
    app --> globals[globals.css]
    
    components --> ui[ui/]
    components --> custom[custom components]
    
    config --> next_config[next.config.js]
    config --> tailwind[tailwind.config.ts]
    config --> tsconfig[tsconfig.json]
    config --> package[package.json]
</mermaid>

## File Context Descriptions

### Root Level
- `package.json`: Node.js project configuration and dependencies
- `next.config.js`: Next.js framework configuration
- `tailwind.config.ts`: Tailwind CSS configuration
- `tsconfig.json`: TypeScript configuration
- `.eslintrc.json`: ESLint configuration for code style

### Source Directory (src/)
- `app/`: Main application directory containing pages and layouts
- `components/`: Reusable UI components and custom components
- `types/`: TypeScript type definitions

### Public Directory
- Static assets and public resources

### Configuration
- Build and development environment configurations
- Type checking and linting rules
- Package dependencies and scripts
