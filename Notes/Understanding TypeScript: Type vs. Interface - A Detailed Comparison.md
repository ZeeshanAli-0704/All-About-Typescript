
# Type vs Interface in TypeScript: A Complete Guide with Examples

TypeScript, a statically typed superset of JavaScript, enhances **code reliability and maintainability** by introducing types. Two fundamental constructs for defining types in TypeScript are **type aliases** and **interfaces**.

At first glance, they seem similar—they both describe the “shape” of data. But when you dig deeper, there are key differences in **features, use cases, and performance**.

This blog breaks it all down with clear explanations, practical examples, and guidance on when to use **type** vs **interface**.

---

## What Are Type Aliases and Interfaces?

### Type Aliases

A **type alias** gives a name to any type in TypeScript. It can represent **primitives, objects, unions, intersections, tuples, or complex combinations**.

```ts
type User = {
  name: string;
  age: number;
};

const user: User = { name: "Alice", age: 25 };
```

---

### Interfaces

An **interface** defines the structure of an object or class. It fits naturally into **object-oriented programming**, supporting inheritance and **declaration merging**.

```ts
interface User {
  name: string;
  age: number;
}

const user: User = { name: "Bob", age: 30 };
```

So, both look similar—but their differences emerge in **specific scenarios**.

---

## Key Differences Between Type and Interface

### 1. Flexibility in Type Definitions

* **Type Aliases** are extremely versatile:

  * Can represent primitives, unions, intersections, tuples, mapped types, and conditional types.

```ts
type ID = string | number; // Union
type Status = "active" | "inactive"; // Literal
type Point = [number, number]; // Tuple
type User = { name: string } & { age: number }; // Intersection
```

* **Interfaces** are limited to describing **object shapes or class contracts**.

```ts
interface User {
  name: string;
  age: number;
}

// ❌ Cannot directly define unions like string | number
```

✅ **Takeaway**: Use **type** for unions, primitives, or advanced compositions. Use **interface** for object/class shapes.

---

### 2. Extensibility

* **Interfaces** support **declaration merging** and **extends**, making them great for extensibility.

```ts
// Declaration merging
interface User {
  name: string;
}
interface User {
  age: number;
}
const user: User = { name: "Alice", age: 25 };

// Extends
interface Admin extends User {
  role: string;
}
```

* **Types** don’t merge—you must use intersections.

```ts
type User = { name: string };
type Admin = User & { role: string };

const admin: Admin = { name: "Bob", role: "admin" };
```

✅ **Takeaway**: Use **interface** when extensibility and merging matter.

---

### 3. Class Implementation

Both can define contracts for classes, but **interfaces are more idiomatic**.

```ts
interface User {
  name: string;
  greet(): string;
}

class Person implements User {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  greet() {
    return `Hello, ${this.name}!`;
  }
}
```

✅ **Takeaway**: Prefer **interface** for class contracts—it aligns better with OOP.

---

### 4. Performance Considerations

* **Interfaces**: Faster in large projects due to optimized lookups and caching.
* **Types**: May add overhead in deeply nested unions or intersections.

✅ **Takeaway**: For large-scale apps, prefer **interface** for object shapes.

---

## Practical Examples

### Example 1: Union Types with Type Aliases

```ts
type ID = string | number;
type Status = "active" | "inactive";

function getUser(id: ID, status: Status) {
  return { id, status };
}
```

👉 Only **type** works here—interfaces can’t represent unions.

---

### Example 2: Declaration Merging with Interfaces

```ts
interface Window {
  customProperty: string;
}
interface Window {
  customMethod(): void;
}

window.customProperty = "Hello";
window.customMethod = () => console.log("Custom method");
```

👉 Only **interface** supports merging—great for extending global types.

---

### Example 3: Combining Types with Intersection

```ts
type Name = { name: string };
type Age = { age: number };
type User = Name & Age;

const user: User = { name: "Alice", age: 25 };
```

👉 **Types** make ad-hoc combinations easy.

---

### Example 4: Complex Types with Type Aliases

```ts
type Optional<T> = {
  [K in keyof T]?: T[K];
};

type User = { name: string; age: number };
type OptionalUser = Optional<User>;

const user: OptionalUser = { name: "Alice" }; // ✅ Valid
```

👉 Advanced features like **mapped types** are only possible with **type**.

---

## When to Use Type vs Interface

### Use **interface** when:

* Defining object shapes or class contracts.
* You need **declaration merging** (e.g., extending `Window`).
* Inheritance with `extends` is required.
* Large projects where **compilation performance** matters.

### Use **type** when:

* Defining **unions, primitives, or tuples**.
* Creating complex type compositions with intersections.
* Using **mapped or conditional types**.
* You want lightweight, one-off type definitions.

---

## Common Misconceptions

* **“Interfaces are only for objects”** → Mostly true, but they can be extended indirectly for flexibility.
* **“Types are less powerful”** → Not at all—types are more flexible for advanced scenarios.
* **“You must pick one”** → Wrong! You can (and should) use both where appropriate.

---

## Conclusion

Both **type** and **interface** are powerful tools in TypeScript.

* **Interfaces** excel in OOP, inheritance, and declaration merging.
* **Types** shine for unions, intersections, and advanced type logic.

👉 A good rule of thumb:

* **Use `interface` for objects and classes**.
* **Use `type` for everything else**.

By understanding their strengths, you’ll write cleaner, more maintainable TypeScript code that scales with your project.



