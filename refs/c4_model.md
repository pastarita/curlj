# C4 Model - Curlj Application

## System Context Diagram

```mermaid
C4Context
    title System Context Diagram for Curlj Application

    Person(user, "User", "Application user")
    System(curlj, "Curlj Application", "Next.js web application")
    System_Ext(api, "External APIs", "Third-party services")

    Rel(user, curlj, "Uses")
    Rel(curlj, api, "Makes API calls to")
```

## Container Diagram

```mermaid
C4Container
    title Container Diagram for Curlj Application

    Person(user, "User", "Application user")
    
    Container_Boundary(c1, "Curlj Application") {
        Container(spa, "Single Page Application", "Next.js, React", "Provides all functionality to users via their web browser")
        Container(api, "API", "Next.js API Routes", "Handles API requests and business logic")
        Container(store, "State Store", "React State Management", "Manages application state")
    }

    System_Ext(extAPI, "External APIs", "Third-party services")

    Rel(user, spa, "Uses", "HTTPS")
    Rel(spa, api, "Makes API calls to", "JSON/HTTPS")
    Rel(spa, store, "Reads from and writes to")
    Rel(api, extAPI, "Makes API calls to", "JSON/HTTPS")
```

## Component Diagram

```mermaid
C4Component
    title Component Diagram for Curlj Application

    Container_Boundary(spa, "Single Page Application") {
        Component(pages, "Pages", "Next.js Pages", "Main application pages")
        Component(components, "UI Components", "React Components", "Reusable UI components")
        Component(layout, "Layout", "Next.js Layout", "Application layout structure")
    }

    Container_Boundary(api, "API Layer") {
        Component(routes, "API Routes", "Next.js API Routes", "API endpoints")
        Component(handlers, "Request Handlers", "TypeScript", "Handle API requests")
        Component(middleware, "Middleware", "Next.js Middleware", "Request/Response processing")
    }

    Container_Boundary(state, "State Management") {
        Component(store, "State Store", "React State", "Application state")
        Component(actions, "Actions", "TypeScript", "State modifications")
    }

    Rel(pages, components, "Uses")
    Rel(pages, layout, "Uses")
    Rel(routes, handlers, "Uses")
    Rel(handlers, middleware, "Uses")
    Rel(pages, store, "Reads from")
    Rel(actions, store, "Modifies")
```

## Code Level Diagram

```mermaid
C4Code
    title Code Level Diagram for Key Components

    Boundary(ui, "UI Layer") {
        Class(page, "Page Component")
        Class(component, "UI Component")
    }

    Boundary(logic, "Business Logic") {
        Class(handler, "Request Handler")
        Class(service, "Service")
    }

    Boundary(state, "State Management") {
        Class(store, "Store")
        Class(action, "Action")
    }

    Rel(page, component, "uses")
    Rel(page, handler, "calls")
    Rel(handler, service, "uses")
    Rel(page, store, "subscribes to")
    Rel(action, store, "updates")
```
