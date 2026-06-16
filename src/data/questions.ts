import { Question } from "../types";

export const QUESTIONS: Question[] = [
  // ==========================================
  // SUBJECT 1: Data Structures and Algorithms
  // ==========================================
  {
    id: 1,
    subject: "Data Structures and Algorithms",
    difficulty: "Medium",
    question: "In a binary search tree (BST), what traversal sequence produces an output list sorted in ascending numerical order?",
    choices: [
      "Pre-order Traversal",
      "In-order Traversal",
      "Post-order Traversal",
      "Level-order Traversal"
    ],
    correctAnswer: 1,
    explanation: "In-order traversal visits nodes in Left-Root-Right sequence, which prints elements of a BST in ascending key order."
  },
  {
    id: 2,
    subject: "Data Structures and Algorithms",
    difficulty: "Easy",
    question: "Which data structure is explicitly required when implementing a Breadth-First Search (BFS) graph traversal strategy?",
    choices: [
      "LIFO Stack",
      "FIFO Queue",
      "Priority Min-Heap",
      "Self-Balancing AVL Tree"
    ],
    correctAnswer: 1,
    explanation: "Breadth-First Search (BFS) explores vertices level-by-level, which requires a First-In, First-Out (FIFO) queue to track discovered neighbors."
  },
  {
    id: 3,
    subject: "Data Structures and Algorithms",
    difficulty: "Easy",
    question: "What is the worst-case time complexity of accessing an element in a standard static array via its index?",
    choices: [
      "O(1)",
      "O(n)",
      "O(log n)",
      "O(n^2)"
    ],
    correctAnswer: 0,
    explanation: "A static array guarantees O(1) random-access speed because the memory address is calculated instantly using a pointer offset."
  },
  {
    id: 4,
    subject: "Data Structures and Algorithms",
    difficulty: "Medium",
    question: "When a Dynamic Array (ArrayList) crosses its capacity partition, what is the typical implicit reallocation default behavior?",
    choices: [
      "Double the capacity",
      "50% capacity bump expansion",
      "Resize to exact size plus one",
      "No change; throws StackOverflow"
    ],
    correctAnswer: 1,
    explanation: "The reviewer highlights that when Dynamic Arrays cross size boundaries, an implicit capacity reallocation triggers a typical 50% capacity bump."
  },
  {
    id: 5,
    subject: "Data Structures and Algorithms",
    difficulty: "Medium",
    question: "Which exception is thrown immediately when attempting to write/access an index outside bounds in a Java static array?",
    choices: [
      "NullPointerException",
      "ArrayIndexOutOfBoundsException",
      "NoSuchElementException",
      "ArrayStoreReferenceException"
    ],
    correctAnswer: 1,
    explanation: "Targeting an index outside the range of 0 to length - 1 in static arrays instantly yields an ArrayIndexOutOfBoundsException."
  },
  {
    id: 6,
    subject: "Data Structures and Algorithms",
    difficulty: "Hard",
    question: "Under worst-case scenarios, what does a unguided, highly-skewed binary search tree (BST) degrade to, and what is its lookup time complexity?",
    choices: [
      "Balanced AVL Tree with O(log n)",
      "Linear Sequence with O(n)",
      "Binary Heap with O(1)",
      "Complete Tree with O(n^2)"
    ],
    correctAnswer: 1,
    explanation: "If unguided data enters a BST in sorted order, the tree skews into a single linear chain and degrades to O(n) lookup efficiency."
  },
  {
    id: 7,
    subject: "Data Structures and Algorithms",
    difficulty: "Easy",
    question: "What is the strict rule defining a Stack's access interface?",
    choices: [
      "First-In, First-Out (FIFO)",
      "Last-In, First-Out (LIFO)",
      "Random Location Insert (RLI)",
      "Double-Ended Access"
    ],
    correctAnswer: 1,
    explanation: "Stacks are strict LIFO structures. The last element added via push() is the first element retrieved or removed via pop()."
  },
  {
    id: 8,
    subject: "Data Structures and Algorithms",
    difficulty: "Medium",
    question: "Which Stack operation inspects the current active top element without removing it from the structure?",
    choices: [
      "pop()",
      "push()",
      "peek()",
      "dequeue()"
    ],
    correctAnswer: 2,
    explanation: "The peek() method inspects the element on the top boundary of a stack without removing it."
  },
  {
    id: 9,
    subject: "Data Structures and Algorithms",
    difficulty: "Easy",
    question: "What error condition occurs when attempting to execute a pop() operation on an empty Stack structure?",
    choices: [
      "Stack Overflow",
      "Stack Underflow",
      "NoSuchElementException",
      "NullPointerFault"
    ],
    correctAnswer: 1,
    explanation: "Executing pop() against an empty stack framework triggers a Stack Underflow fault."
  },
  {
    id: 10,
    subject: "Data Structures and Algorithms",
    difficulty: "Medium",
    question: "In standard queues, where do structural insertions (enqueue) and extractions (dequeue) occur?",
    choices: [
      "Enqueue at head, dequeue at tail",
      "Enqueue at tail, dequeue at head",
      "Both at head",
      "Both at tail"
    ],
    correctAnswer: 1,
    explanation: "Queues process FIFO: insertions occur at the rear tail (enqueue) and extractions occur from the front head boundary (dequeue)."
  },
  {
    id: 11,
    subject: "Data Structures and Algorithms",
    difficulty: "Hard",
    question: "What is the worst-case height balance factor difference permitted between any node's left and right subtrees in an AVL Tree?",
    choices: [
      "0",
      "1",
      "2",
      "Variable based on node count"
    ],
    correctAnswer: 1,
    explanation: "An AVL Tree implements a strict height-balanced paradigm where the balance factor (height delta) must never exceed 1."
  },
  {
    id: 12,
    subject: "Data Structures and Algorithms",
    difficulty: "Medium",
    question: "Which data structure or system is used to traverse a graph using a Depth-First Search (DFS) methodology?",
    choices: [
      "FIFO Queue",
      "LIFO Stack",
      "Self-Balancing Tree",
      "Adjacency Map only"
    ],
    correctAnswer: 1,
    explanation: "Depth-First Search (DFS) uses a Stack (or function call stack recursively) to explore deeply down a branch before backtracking."
  },
  {
    id: 13,
    subject: "Data Structures and Algorithms",
    difficulty: "Hard",
    question: "What are the average-case and worst-case time complexities of a Binary Search algorithm, respectively?",
    choices: [
      "O(1), O(n)",
      "O(log n), O(log n)",
      "O(n), O(n^2)",
      "O(log n), O(n)"
    ],
    correctAnswer: 1,
    explanation: "Binary search achieves O(log n) complexity in both average and worst-case scenarios, continually halving the search space."
  },
  {
    id: 14,
    subject: "Data Structures and Algorithms",
    difficulty: "Easy",
    question: "What is a strict prerequisite for applying a Binary Search algorithm on an array?",
    choices: [
      "Elements must be unique",
      "Elements must be strictly positive",
      "Elements must be explicitly sorted beforehand",
      "The array must feel fixed-sized"
    ],
    correctAnswer: 2,
    explanation: "Binary search relies on midpoint comparisons to halve indices; hence, the data must be sorted beforehand so the search space rules apply."
  },
  {
    id: 15,
    subject: "Data Structures and Algorithms",
    difficulty: "Medium",
    question: "What is the midpoint index calculation formula utilized in a standard binary search?",
    choices: [
      "mid = low + high * 2",
      "mid = ⌊(low + high) / 2⌋",
      "mid = (high - low) / n",
      "mid = low + ⌊high / 2⌋"
    ],
    correctAnswer: 1,
    explanation: "The midpoint is computed mathematically as the floor of the sum of the low and high bounds divided by 2: mid = ⌊(low + high) / 2⌋."
  },
  {
    id: 16,
    subject: "Data Structures and Algorithms",
    difficulty: "Medium",
    question: "Which sorting algorithm iteratively compares adjacent elements and swaps them if they violate the target sorting order?",
    choices: [
      "Selection Sort",
      "Bubble Sort",
      "Insertion Sort",
      "Merge Sort"
    ],
    correctAnswer: 1,
    explanation: "Bubble Sort iteratively compares adjacent index values, swapping them if needed so larger values float to the end of the collection."
  },
  {
    id: 17,
    subject: "Data Structures and Algorithms",
    difficulty: "Hard",
    question: "What is the best-case time complexity of an optimized Bubble Sort on a pre-sorted array?",
    choices: [
      "O(1)",
      "O(n)",
      "O(n log n)",
      "O(n^2)"
    ],
    correctAnswer: 1,
    explanation: "An optimized Bubble Sort can exit early if no swaps are made in its first pass, achieving a linear O(n) best-case time complexity."
  },
  {
    id: 18,
    subject: "Data Structures and Algorithms",
    difficulty: "Medium",
    question: "How does the Selection Sort algorithm organize elements?",
    choices: [
      "By placing items in active stacks",
      "By dividing into segments, locating the absolute minimum value, and swapping it into place",
      "By bubbling items up via binary tree offsets",
      "By shifting elements down element-by-element"
    ],
    correctAnswer: 1,
    explanation: "Selection Sort divides the collection into sorted and unsorted segments. It scans the unsorted part to locate the absolute minimum, then swaps it to the front."
  },
  {
    id: 19,
    subject: "Data Structures and Algorithms",
    difficulty: "Medium",
    question: "Which sorting algorithm builds the final output array sequentially by shifting larger unsorted values down to insert the target at its precise relative position?",
    choices: [
      "Bubble Sort",
      "Selection Sort",
      "Insertion Sort",
      "Heap Sort"
    ],
    correctAnswer: 2,
    explanation: "Insertion Sort builds a sorted array element-by-element, shifting larger unsorted items down to place the target element correctly."
  },
  {
    id: 20,
    subject: "Data Structures and Algorithms",
    difficulty: "Hard",
    question: "What are the space complexities of Insertion Sort and Selection Sort, respectively?",
    choices: [
      "O(1) and O(1)",
      "O(n) and O(1)",
      "O(1) and O(n)",
      "O(log n) and O(1)"
    ],
    correctAnswer: 0,
    explanation: "Both Insertion Sort and Selection Sort operate in-place with no additional memory scaling, ensuring O(1) auxiliary space complexity."
  },
  {
    id: 21,
    subject: "Data Structures and Algorithms",
    difficulty: "Medium",
    question: "Under ideal circumstances, what is the average query time complexity in a height-balanced AVL Tree?",
    choices: [
      "O(1)",
      "O(n)",
      "O(log n)",
      "O(n log n)"
    ],
    correctAnswer: 2,
    explanation: "Due to its strict height-balanced self-regulation, AVL Trees guarantee a logarithmic query time of O(log n)."
  },
  {
    id: 22,
    subject: "Data Structures and Algorithms",
    difficulty: "Easy",
    question: "Which kind of linked list structure features nodes with both forward and custom backward-linking pointers?",
    choices: [
      "Singly Linked List",
      "Doubly Linked List",
      "Circular Singly List",
      "Binary Pointer Tree"
    ],
    correctAnswer: 1,
    explanation: "Singly Linked Lists track sequential forward pointers. Doubly Linked Configurations store alternative reverse pointers."
  },
  {
    id: 23,
    subject: "Data Structures and Algorithms",
    difficulty: "Medium",
    question: "What is the primary trade-off of standard Singly Linked Lists compared to arrays?",
    choices: [
      "Insertion/deletion is slower, lookup is faster",
      "Insertion/deletion requires simple pointer remapping O(1), but random lookup degrades to O(n)",
      "Infinite space with no pointer memory overhead",
      "Guaranteed index-based address offsetting O(1)"
    ],
    correctAnswer: 1,
    explanation: "Inserting and deleting is O(1) because you simply remap adjacent pointers, but searching is O(n) because you must traverse from the head sequentially."
  },
  {
    id: 24,
    subject: "Data Structures and Algorithms",
    difficulty: "Hard",
    question: "What is the worst-case performance of Selection Sort when sorting a reverse-sorted dataset?",
    choices: [
      "O(n)",
      "O(n log n)",
      "O(n^2)",
      "O(1)"
    ],
    correctAnswer: 2,
    explanation: "Selection Sort always scans the remaining unsorted values completely to find the minimum, keeping the time complexity O(n^2) across all input states."
  },
  {
    id: 25,
    subject: "Data Structures and Algorithms",
    difficulty: "Easy",
    question: "What is the space complexity of standard Linear Search on array structures?",
    choices: [
      "O(1)",
      "O(n)",
      "O(log n)",
      "O(n^2)"
    ],
    correctAnswer: 0,
    explanation: "Linear search operates iteratively on the input dataset requiring no additional dynamically allocated structures, achieving O(1) space complexity."
  },

  // ==========================================
  // SUBJECT 2: Object-Oriented Programming (OOP)
  // ==========================================
  {
    id: 26,
    subject: "Object-Oriented Programming",
    difficulty: "Easy",
    question: "Which keyword is utilized in Java to establish a hierarchical relationship between a parent class and its sub-class?",
    choices: [
      "implements",
      "extends",
      "inherits",
      "super"
    ],
    correctAnswer: 1,
    explanation: "The 'extends' keyword is used to derive a sub-class from a parent class, enabling standard OOP inheritance hierarchies."
  },
  {
    id: 27,
    subject: "Object-Oriented Programming",
    difficulty: "Medium",
    question: "Which OOP concept bundles state variables and behavior within a single class while restricting direct external modification?",
    choices: [
      "Inheritance",
      "Polymorphism",
      "Encapsulation",
      "Abstraction"
    ],
    correctAnswer: 2,
    explanation: "Encapsulation bundles data (variables) and methods, keeping attributes private while exposing accessor/mutator (getter/setter) templates."
  },
  {
    id: 28,
    subject: "Object-Oriented Programming",
    difficulty: "Medium",
    question: "Which of the following describes compile-time (static) polymorphism in Java?",
    choices: [
      "Method Overriding",
      "Method Overloading",
      "Inheritance dynamic bindings",
      "Interface instantiation"
    ],
    correctAnswer: 1,
    explanation: "Compile-time (static) polymorphism is achieved via Method Overloading, where methods in the same class share the name but have distinct parameter lists."
  },
  {
    id: 29,
    subject: "Object-Oriented Programming",
    difficulty: "Medium",
    question: "Which of the following describes runtime (dynamic) polymorphism in Java?",
    choices: [
      "Method Overloading",
      "Method Overriding",
      "Constructor chaining using 'this'",
      "Static variable resolution"
    ],
    correctAnswer: 1,
    explanation: "Runtime (dynamic) polymorphism is achieved via Method Overriding, where a subclass redefines an inherited parent method with matching signatures."
  },
  {
    id: 30,
    subject: "Object-Oriented Programming",
    difficulty: "Hard",
    question: "What design challenge or compilation ambiguity does Java prevent by strictly limiting classes to single inheritance tracking?",
    choices: [
      "Symmetrical Interface Multi-Call Anomalies",
      "The Diamond Problem",
      "Memory Stack Overflow Errors",
      "Variable Shadows conflict"
    ],
    correctAnswer: 1,
    explanation: "The Diamond Problem arises when a class inherits from two parent classes that define the same method, causing conflict. Java avoids this via single class inheritance."
  },
  {
    id: 31,
    subject: "Object-Oriented Programming",
    difficulty: "Medium",
    question: "Which Java structures are designed to represent pure behavioral blueprints that support multiple implementation pathways?",
    choices: [
      "Abstract Classes only",
      "Interfaces",
      "Final Concrete Classes",
      "Static Helper Classes"
    ],
    correctAnswer: 1,
    explanation: "Interfaces are pure behavioral blueprints that support multiple inheritance implementations in Java, whereas classes only support single hierarchy."
  },
  {
    id: 32,
    subject: "Object-Oriented Programming",
    difficulty: "Easy",
    question: "To protect an instance field from direct outer-class alterations, which access visibility modifier should be selected?",
    choices: [
      "private",
      "public",
      "protected",
      "default"
    ],
    correctAnswer: 0,
    explanation: "Declaring members private restricts access exclusively to within the class itself, ensuring maximum encapsulation safety."
  },
  {
    id: 33,
    subject: "Object-Oriented Programming",
    difficulty: "Medium",
    question: "Under the default (no modifier) access level, which components can see and interact with the designated fields?",
    choices: [
      "Any class globally",
      "Only the same class and classes in the same package",
      "Only subclass instances inside external packages",
      "None; equivalent to private"
    ],
    correctAnswer: 1,
    explanation: "Default (no modifier) scope restricts visibility exclusively to the declaring class and other classes present inside the same package."
  },
  {
    id: 34,
    subject: "Object-Oriented Programming",
    difficulty: "Medium",
    question: "Which access modifier grants visibility to the same class, same package, and subclasses inside external packages, but not the general global world?",
    choices: [
      "private",
      "default",
      "protected",
      "public"
    ],
    correctAnswer: 2,
    explanation: "The protected modifier opens access to the same class, the same package, and subclass relationships outside the package, while denying general global access."
  },
  {
    id: 35,
    subject: "Object-Oriented Programming",
    difficulty: "Easy",
    question: "Which keyword represents an initialization routine executed automatically during object instantiation using the new keyword?",
    choices: [
      "Method",
      "Constructor",
      "Initializer Block",
      "destructor"
    ],
    correctAnswer: 1,
    explanation: "Constructors are dedicated class routines matching the class name precisely, executed automatically during object creation via 'new'."
  },
  {
    id: 36,
    subject: "Object-Oriented Programming",
    difficulty: "Medium",
    question: "What is the return type of a standard constructor definition in Java?",
    choices: [
      "void",
      "The class instance type",
      "There is no return type declaration",
      "int status code"
    ],
    correctAnswer: 2,
    explanation: "Java constructors must exactly match the class name and completely omit any return type declaration, not even 'void'."
  },
  {
    id: 37,
    subject: "Object-Oriented Programming",
    difficulty: "Medium",
    question: "What happens if you define a class but write no constructor inside its layout?",
    choices: [
      "The code fails to compile",
      "The compiler automatically generates a hidden default no-argument constructor",
      "You cannot instantiate the class via new",
      "An empty instance is returned as null"
    ],
    correctAnswer: 1,
    explanation: "If no constructor is written, the compiler automatically generates a basic, public, parameterless constructor in the compiled bytecode."
  },
  {
    id: 38,
    subject: "Object-Oriented Programming",
    difficulty: "Hard",
    question: "Contrast the precise referential point of the keywords 'this' and 'super' inside a class constructor.",
    choices: [
      "'this' references the static template; 'super' references the parent instance",
      "'this' references the current object instance; 'super' points directly to the parent class context",
      "'this' represents the helper files; 'super' calls the browser",
      "Both point to the same memory segment directly"
    ],
    correctAnswer: 1,
    explanation: "In Java, 'this' references the active, current object instance, whereas 'super' addresses parent subclass relations/initializers."
  },
  {
    id: 39,
    subject: "Object-Oriented Programming",
    difficulty: "Medium",
    question: "Which keyword restricts a variable, method, or block memory access so that it allocates to the class blueprint itself rather than on individual instantiated object scopes?",
    choices: [
      "final",
      "this",
      "static",
      "super"
    ],
    correctAnswer: 2,
    explanation: "The static keyword associates variables or methods to the shared class blueprint, meaning a single memory location is shared globally."
  },
  {
    id: 40,
    subject: "Object-Oriented Programming",
    difficulty: "Hard",
    question: "What restriction is imposed on static methods in object-oriented execution scopes?",
    choices: [
      "They can never modify variables",
      "They can only access other static members directly and cannot make use of 'this' or 'super'",
      "They require object instantiation before execution calls",
      "They cannot receive inputs"
    ],
    correctAnswer: 1,
    explanation: "Static methods operate in class contexts. They cannot use 'this' or 'super' keyword pointers, and can only access static fields directly."
  },
  {
    id: 41,
    subject: "Object-Oriented Programming",
    difficulty: "Easy",
    question: "What is the primary action of the 'final' keyword modifier when applied to a variable in Java?",
    choices: [
      "It makes the variable private",
      "It prevents its value from being modified after initial assignment (enforces immutability)",
      "It destroys the variable automatically",
      "It allows child classes to override it"
    ],
    correctAnswer: 1,
    explanation: "When final is applied to a variable, its value becomes unchangeable (constant) once initialized."
  },
  {
    id: 42,
    subject: "Object-Oriented Programming",
    difficulty: "Medium",
    question: "What structural block is enforced when the 'final' keyword modifier is added to a method definition?",
    choices: [
      "The method cannot serve return values",
      "The method cannot be overridden by subclasses",
      "The method cannot require parameters",
      "The method can only operate static parameters"
    ],
    correctAnswer: 1,
    explanation: "Making a method final seals its operation, preventing child subclasses from overriding it in polymorphic chains."
  },
  {
    id: 43,
    subject: "Object-Oriented Programming",
    difficulty: "Hard",
    question: "What happens when a class layout is declared with the 'final' keyword modifier in Java?",
    choices: [
      "It must be instantiated statically",
      "It completely blocks inheritance (cannot be extended by any other subclass)",
      "All of its fields must be declared as public static",
      "It becomes a pure interface layout"
    ],
    correctAnswer: 1,
    explanation: "Declaring a class final seals its definition, preventing any subclass from extending or inheriting from it."
  },
  {
    id: 44,
    subject: "Object-Oriented Programming",
    difficulty: "Medium",
    question: "Why are abstract classes and final classes considered conceptual opposites in Java?",
    choices: [
      "One is only for integers, the other for classes",
      "Abstract classes rely on subclass inheritance to be useful, while final classes block inheritance entirely",
      "Abstract classes cannot contain concrete methods",
      "One is client-side, the other is server-side"
    ],
    correctAnswer: 1,
    explanation: "An abstract class *must* be extended to be useful, while a final class *cannot* be extended. They are strict functional opposites."
  },
  {
    id: 45,
    subject: "Object-Oriented Programming",
    difficulty: "Easy",
    question: "Which of these modifier combinations is illegal in Java?",
    choices: [
      "public static",
      "private final",
      "abstract final class",
      "public final"
    ],
    correctAnswer: 2,
    explanation: "An 'abstract final' combination is illegal because abstract requires subclass inheritance, while final blocks subclassing. The compiler will reject this."
  },
  {
    id: 46,
    subject: "Object-Oriented Programming",
    difficulty: "Hard",
    question: "Which statement is true regarding the memory footprint of static fields?",
    choices: [
      "Each instance of the object gets its own copy of the static field",
      "They reside in a single shared memory location across all object instances",
      "They are deleted automatically when no user is active",
      "They belong to stack memories and terminate with execution loops"
    ],
    correctAnswer: 1,
    explanation: "Static variables are stored with class-level definitions in memory, sharing one single location instead of instantiating for each object."
  },
  {
    id: 47,
    subject: "Object-Oriented Programming",
    difficulty: "Easy",
    question: "Which visibility modifier grants maximum accessibility throughout any general global world scope in standard Java applications?",
    choices: [
      "protected",
      "private",
      "public",
      "default"
    ],
    correctAnswer: 2,
    explanation: "Declaring a member 'public' allows access from any other class or file globally across the entire program compilation scope."
  },
  {
    id: 48,
    subject: "Object-Oriented Programming",
    difficulty: "Medium",
    question: "If a method has the exact same name as another method in the parent class but distinct parameters, this represents custom:",
    choices: [
      "Method Overriding",
      "Method Overloading",
      "Dynamic Dispatching",
      "Constructor Chaining"
    ],
    correctAnswer: 1,
    explanation: "Distinct parameter signatures represent method overloading (static compile-time polymorphism), whereas matching signature redefinition represents method overriding."
  },
  {
    id: 49,
    subject: "Object-Oriented Programming",
    difficulty: "Medium",
    question: "What separates Abstract Classes from Interfaces in Java?",
    choices: [
      "Abstract classes cannot define instance variables; interfaces can",
      "Abstract classes can contain both abstract and concrete methods, while interfaces are pure behavioral blueprints (historically strictly non-state)",
      "Interfaces allow duplicate constructor definitions",
      "Abstract classes block inheritance entirely"
    ],
    correctAnswer: 1,
    explanation: "Abstract classes combine partial implementations (concrete methods) and abstract declarations. Interfaces draft pure, state-free behavioral blueprints."
  },
  {
    id: 50,
    subject: "Object-Oriented Programming",
    difficulty: "Hard",
    question: "What is the primary architectural purpose of utilizing getters and setters?",
    choices: [
      "To optimize heap-stack allocation",
      "To restrict direct property manipulation and support data validation rules inside encapsulation barriers",
      "To bypass private access limits statically",
      "To declare new sub-types in execution lines"
    ],
    correctAnswer: 1,
    explanation: "Getters/setters isolate internal state from external tampering, permitting validity evaluations (e.g. checks) before modifying variables."
  },

  // ==========================================
  // SUBJECT 3: Web Systems and Technologies
  // ==========================================
  {
    id: 51,
    subject: "Web Systems and Technologies",
    difficulty: "Easy",
    question: "Which HTML elements are used to define text headlines, and which represents the absolute largest tier of headings?",
    choices: [
      "<h1> through <h6>, with <h6> being the largest",
      "<p> through <h6>, with <p> being the largest",
      "<h1> through <h6>, with <h1> being the largest",
      "<header> and <footer>, with <header> being the largest"
    ],
    correctAnswer: 2,
    explanation: "According to the sheet, <h1> through <h6> define text headings, where <h1> represents the absolute largest tier."
  },
  {
    id: 52,
    subject: "Web Systems and Technologies",
    difficulty: "Easy",
    question: "Which HTML tag is used to create hyperlinks, and through which attribute is the destination URL specified?",
    choices: [
      "<link> tag and its src attribute",
      "<a> (anchor) tag and its href attribute",
      "<href> tag and its url attribute",
      "<a> (anchor) tag and its link attribute"
    ],
    correctAnswer: 1,
    explanation: "The <a> (anchor) tag creates hyperlinks via its href attribute."
  },
  {
    id: 53,
    subject: "Web Systems and Technologies",
    difficulty: "Easy",
    question: "Which HTML structural container contains document metadata, styles, links, and titles that do not render in the visible viewport?",
    choices: [
      "<body>",
      "<html>",
      "<head>",
      "<metadata>"
    ],
    correctAnswer: 2,
    explanation: "The <head> contains metadata, styles, links, and document titles that do not render in the visible viewport."
  },
  {
    id: 54,
    subject: "Web Systems and Technologies",
    difficulty: "Easy",
    question: "Which HTML structural element holds all of the visible content of a web page?",
    choices: [
      "<head>",
      "<body>",
      "<main>",
      "<content>"
    ],
    correctAnswer: 1,
    explanation: "The <body> holds all visible content of an HTML document."
  },
  {
    id: 55,
    subject: "Web Systems and Technologies",
    difficulty: "Easy",
    question: "Which structural combination of elements is used to create unordered list, ordered list, and individual list items?",
    choices: [
      "<ul> for unordered list, <ol> for ordered list, and <li> for individual list items",
      "<ol> for unordered list, <ul> for ordered list, and <item> for individual list items",
      "<list> for unordered list, <numlist> for ordered list, and <li> for individual list items",
      "<bullet> for unordered list, <number> for ordered list, and <list> for individual list items"
    ],
    correctAnswer: 0,
    explanation: "According to the sheet, <ul> creates an unordered (bulleted) list; <ol> creates an ordered (numbered) list; <li> defines individual list items."
  },
  {
    id: 56,
    subject: "Web Systems and Technologies",
    difficulty: "Easy",
    question: "In HTML tables, which elements are used to define a table row, table data cells, and table header cells respectively?",
    choices: [
      "<tr> for rows, <th> for data cells, and <td> for header cells",
      "<row> for rows, <td> for data cells, and <head> for header cells",
      "<tr> for rows, <td> for data cells, and <th> for header cells",
      "<thead> for rows, <tbody> for data cells, and <tfoot> for header cells"
    ],
    correctAnswer: 2,
    explanation: "<tr> defines a table row, <td> table data cells, and <th> table header cells."
  },
  {
    id: 57,
    subject: "Web Systems and Technologies",
    difficulty: "Easy",
    question: "What HTML tag is used to display images, and what attribute provides alternative descriptive text if the asset fails to render?",
    choices: [
      "<picture> tag with title attribute",
      "<img> tag with alt attribute",
      "<image> tag with src attribute",
      "<img> tag with desc attribute"
    ],
    correctAnswer: 1,
    explanation: "According to the sheet, <img> displays images; its mandatory alt attribute provides alternative descriptive text if the asset fails to render."
  },
  {
    id: 58,
    subject: "Web Systems and Technologies",
    difficulty: "Easy",
    question: "In an HTML form, which attribute is used to define the destination URL route where data is sent upon submission?",
    choices: [
      "method",
      "route",
      "action",
      "target"
    ],
    correctAnswer: 2,
    explanation: "The <form> uses the action attribute to define the destination URL route where data is sent upon submission."
  },
  {
    id: 59,
    subject: "Web Systems and Technologies",
    difficulty: "Easy",
    question: "What is the primary role of Cascading Style Sheets (CSS)?",
    choices: [
      "To manage server-side logic and connect to databases",
      "To structure raw document text into semantic headings",
      "To handle presentation layout of the document",
      "To authenticate user inputs and validate emails"
    ],
    correctAnswer: 2,
    explanation: "According to the sheet, Cascading Style Sheets handle presentation layout."
  },
  {
    id: 60,
    subject: "Web Systems and Technologies",
    difficulty: "Medium",
    question: "In CSS, how are inline style rules written, and what is their specificity weight compared to external stylesheet rules?",
    choices: [
      "Written outside HTML using class selectors; they have equal specificity",
      "Written directly inside an opening HTML tag using the style attribute; they have a higher specificity weight and override conflicting external stylesheet rules",
      "Written inside a <style> block in the head; they have lower specificity weight",
      "Written directly inside the body; they are always overridden by external rules"
    ],
    correctAnswer: 1,
    explanation: "According to the sheet, inline style rules are written directly inside an opening HTML tag using the style attribute (e.g., <p style=\"color: red;\">). Inline styles have a higher specificity weight and override conflicting external stylesheet rules."
  },
  {
    id: 61,
    subject: "Web Systems and Technologies",
    difficulty: "Easy",
    question: "Which CSS selector targets elements containing a specific class attribute?",
    choices: [
      "#classname",
      "*classname",
      "@classname",
      ".classname"
    ],
    correctAnswer: 3,
    explanation: "According to the selector definitions, .classname targets elements containing that specific class attribute."
  },
  {
    id: 62,
    subject: "Web Systems and Technologies",
    difficulty: "Easy",
    question: "Which CSS selector targets a single element with a matching unique id attribute?",
    choices: [
      ".idvalue",
      "#idvalue",
      "@idvalue",
      "id(idvalue)"
    ],
    correctAnswer: 1,
    explanation: "According to the selector definitions, #idvalue targets a single element with a matching unique id attribute."
  },
  {
    id: 63,
    subject: "Web Systems and Technologies",
    difficulty: "Medium",
    question: "According to the CSS Box Model, what are the layers wrapping content ordered from inside to outside?",
    choices: [
      "Content -> Border -> Padding -> Margin",
      "Content -> Margin -> Padding -> Border",
      "Content -> Padding -> Border -> Margin",
      "Margin -> Border -> Padding -> Content"
    ],
    correctAnswer: 2,
    explanation: "The CSS Box Model is composed of layers wrapping content, ordered from inside to outside: Content -> Padding -> Border -> Margin."
  },
  {
    id: 64,
    subject: "Web Systems and Technologies",
    difficulty: "Medium",
    question: "Where does CSS padding sit in relation to the content area and the border line?",
    choices: [
      "Padding directly surrounds the content area and sits inside the border line",
      "Padding surrounds the border line and sits outside the margin",
      "Padding sits outside the margin and does not surround the content area",
      "Padding directly surrounds the margin line and sits inside the content area"
    ],
    correctAnswer: 0,
    explanation: "According to the CSS Box Model, Padding directly surrounds the content area and sits inside the border line."
  },
  {
    id: 65,
    subject: "Web Systems and Technologies",
    difficulty: "Medium",
    question: "Which sequence/direction does the CSS margin shorthand property define layout spacing around the outer border perimeter?",
    choices: [
      "Counter-clockwise starting from Top: Top, Left, Bottom, Right",
      "Clockwise sequence: Top, Right, Bottom, Left",
      "From inside out: Left, Right, Top, Bottom",
      "X and Y axis: Left-Right first, then Top-Bottom"
    ],
    correctAnswer: 1,
    explanation: "According to the sheet, Margin defines shorthand layout spacing around the outer border perimeter in a clockwise sequence: Top, Right, Bottom, Left."
  },
  {
    id: 66,
    subject: "Web Systems and Technologies",
    difficulty: "Medium",
    question: "If you define a CSS rule as 'margin: 10px 20px 5px 15px;', what is the resulting spacing applied to the left margin?",
    choices: [
      "10px",
      "20px",
      "5px",
      "15px"
    ],
    correctAnswer: 3,
    explanation: "Shorthand margin layout spacing follows the clockwise sequence (Top, Right, Bottom, Left). Thus, 'margin: 10px 20px 5px 15px;' gives a left margin of 15px."
  },
  {
    id: 67,
    subject: "Web Systems and Technologies",
    difficulty: "Easy",
    question: "Which CSS properties are used to modify backgrounds and scale text rendering respectively?",
    choices: [
      "background-color and font-size",
      "fill-color and text-scale",
      "bg-color and font-weight",
      "color-background and size-font"
    ],
    correctAnswer: 0,
    explanation: "According to the sheet properties: background-color modifies backgrounds, and font-size handles rendering text scale."
  },
  {
    id: 68,
    subject: "Web Systems and Technologies",
    difficulty: "Easy",
    question: "Which CSS rule should be applied to strip default bullets from HTML list items?",
    choices: [
      "list-bullets: none;",
      "list-style-type: none;",
      "text-decoration: none;",
      "bullet-type: hidden;"
    ],
    correctAnswer: 1,
    explanation: "The rule CSS property 'list-style-type: none;' strips default bullets from list items."
  },
  {
    id: 69,
    subject: "Web Systems and Technologies",
    difficulty: "Medium",
    question: "P3.1. Which of the following correctly describes the visual effect of the CSS property display: none;?",
    choices: [
      "The element becomes fully transparent but still takes up structural space.",
      "The element is completely removed from the rendering layout as if it did not exist.",
      "The font color matches the background.",
      "The element moves off-screen to the left side."
    ],
    correctAnswer: 1,
    explanation: "From the Practice Questions, the CSS property display: none; completely removes the element from the rendering layout as if it did not exist."
  },
  {
    id: 70,
    subject: "Web Systems and Technologies",
    difficulty: "Medium",
    question: "P3.2. In a standard HTML form, which attribute dictates how the data is packaged and sent to the server (e.g., hiding or exposing it via the URL)?",
    choices: [
      "action",
      "method",
      "target",
      "enctype"
    ],
    correctAnswer: 1,
    explanation: "The 'method' attribute dictates how the data is packaged and sent to the server (e.g., hiding or exposing it via the URL)."
  },
  {
    id: 71,
    subject: "Web Systems and Technologies",
    difficulty: "Medium",
    question: "Which of the following is true regarding inline styles and external stylesheet rules according to CSS basics?",
    choices: [
      "External stylesheet rules always override inline styles because they are in separate stylesheet files.",
      "Inline styles have a higher specificity weight and override conflicting external stylesheet rules.",
      "Inline styles cannot be written using the style attribute.",
      "Inline styles have lower specificity priority weight than external stylesheet rules."
    ],
    correctAnswer: 1,
    explanation: "According to the sheet, inline style rules are written directly inside an opening HTML tag using the style attribute, having a higher specificity weight and overriding conflicting external stylesheet rules."
  },
  {
    id: 72,
    subject: "Web Systems and Technologies",
    difficulty: "Easy",
    question: "Which element represents the individual bulleted list items inside an unordered list (<ul>) or ordered list (<ol>)?",
    choices: [
      "<list-item>",
      "<item>",
      "<li>",
      "<ul>"
    ],
    correctAnswer: 2,
    explanation: "The tag <li> defines individual list items."
  },
  {
    id: 73,
    subject: "Web Systems and Technologies",
    difficulty: "Easy",
    question: "In an HTML table structure, which specific tags represent row containers and header cells respectively?",
    choices: [
      "<tr> and <th>",
      "<row> and <head>",
      "<td> and <th>",
      "<tr> and <td>"
    ],
    correctAnswer: 0,
    explanation: "According to the sheet, <tr> defines a table row, and <th> table header cells."
  },
  {
    id: 74,
    subject: "Web Systems and Technologies",
    difficulty: "Medium",
    question: "Given 'margin: 10px 20px 5px 15px;', what are the spacing measurements for Top and Right margins respectively?",
    choices: [
      "10px and 5px",
      "20px and 15px",
      "10px and 20px",
      "15px and 5px"
    ],
    correctAnswer: 2,
    explanation: "Margin definitions flow clockwise around the perimeter: Top (10px), Right (20px), Bottom (5px), and Left (15px)."
  },
  {
    id: 75,
    subject: "Web Systems and Technologies",
    difficulty: "Medium",
    question: "According to the CSS Selector guide, what is the correct syntax for a class selector and a single id selector respectively?",
    choices: [
      ".classname and #idvalue",
      "#classname and .idvalue",
      "class:classname and id:idvalue",
      "*classname and @idvalue"
    ],
    correctAnswer: 0,
    explanation: "The selector .classname targets specific class attributes, whereas #idvalue targets a matching unique id attribute."
  },

  // ==========================================
  // SUBJECT 4: Information Management
  // ==========================================
  {
    id: 76,
    subject: "Information Management",
    difficulty: "Easy",
    question: "Which of the following database concepts maps attributes into vertical coordinates and records into horizontal coordinates, respectively?",
    choices: [
      "Fields (columns) and Tuples/Records (rows)",
      "Keys and Relationships",
      "Views and Queries",
      "Cells and Indexes"
    ],
    correctAnswer: 0,
    explanation: "A table schema contains vertical columns (which describe fields/attributes) and horizontal rows (which capture records/tuples)."
  },
  {
    id: 77,
    subject: "Information Management",
    difficulty: "Easy",
    question: "What is the primary constraint defining a Primary Key (PK) invariant in relational design?",
    choices: [
      "Must contain duplicate integers",
      "Must be unique and cannot contain NULL values",
      "Must reference foreign indexes",
      "Exists exclusively in parent views"
    ],
    correctAnswer: 1,
    explanation: "Primary keys must uniquely identify records and must not be empty (cannot permit NULL values)."
  },
  {
    id: 78,
    subject: "Information Management",
    difficulty: "Medium",
    question: "Which database component establishes a logical link between separate tables to protect referential integrity and block orphan records?",
    choices: [
      "Primary Key",
      "Foreign Key",
      "Composite Index",
      "Unique Constraints"
    ],
    correctAnswer: 1,
    explanation: "A Foreign Key (FK) in one table points to the Primary Key of another, managing structural references and maintaining referential integrity."
  },
  {
    id: 79,
    subject: "Information Management",
    difficulty: "Medium",
    question: "Divide the commands CREATE, ALTER, DROP, and SELECT, INSERT, UPDATE, DELETE into their respective SQL structural subcategories.",
    choices: [
      "All represent DML",
      "First group represents Data Definition Language (DDL); second group represents Data Manipulation Language (DML)",
      "First group is DML, second is DDL",
      "Both represent transaction models"
    ],
    correctAnswer: 1,
    explanation: "DDL manages schema and database layout structural changes (CREATE/ALTER/DROP), while DML handles actual data modifications (SELECT/INSERT/UPDATE/DELETE)."
  },
  {
    id: 80,
    subject: "Information Management",
    difficulty: "Hard",
    question: "What is the structural consequence of executing the command 'DELETE FROM students;' without a qualifying WHERE clause?",
    choices: [
      "Throws a semantic database syntax error",
      "Removes all records from the table while leaving the structural table schema intact",
      "Drops the entire table schema and index references",
      "Nothing; requires confirmed commit"
    ],
    correctAnswer: 1,
    explanation: "A DELETE command missing a WHERE clause targets all records in the table, wiping it clean while preserving the schema empty framework."
  },
  {
    id: 81,
    subject: "Information Management",
    difficulty: "Medium",
    question: "Which SQL JOIN yields records exclusively when intersecting attributes have matching values across both targeted tables?",
    choices: [
      "LEFT JOIN",
      "INNER JOIN",
      "FULL JOIN",
      "CROSS JOIN"
    ],
    correctAnswer: 1,
    explanation: "INNER JOIN selects records only where matching parameters exist inside both linked tables."
  },
  {
    id: 82,
    subject: "Information Management",
    difficulty: "Medium",
    question: "Describe the output profile of a LEFT (OUTER) JOIN SQL statement if unmatched items occur in the right table.",
    choices: [
      "Skips the unmatched rows entirely",
      "Returns all rows from the left table, with unmatched right attributes filled with NULL values",
      "Throws an execution anomaly",
      "Fills unmatched rows with random values"
    ],
    correctAnswer: 1,
    explanation: "LEFT OUTER JOIN returns everything from the left table. Unmatched values on the right return as NULL."
  },
  {
    id: 83,
    subject: "Information Management",
    difficulty: "Hard",
    question: "What is the core structural rule governing First Normal Form (1NF) in database design?",
    choices: [
      "Must eliminate all partial key dependencies",
      "Requires all table attributes to hold atomic, indivisible values, banning repeating groups",
      "Must eliminate transitional dependencies",
      "Must define foreign mappings"
    ],
    correctAnswer: 1,
    explanation: "1NF requires database values to be atomic and indivisible. Multi-valued fields or repeating groups are forbidden."
  },
  {
    id: 84,
    subject: "Information Management",
    difficulty: "Hard",
    question: "A database table has a composite primary key (CourseID, ProfessorID). If a column named ProfessorRoom depends entirely on ProfessorID alone, what structural rule is violated?",
    choices: [
      "First Normal Form (1NF)",
      "Second Normal Form (2NF)",
      "Third Normal Form (3NF)",
      "Boyce-Codd Normal Form (BCNF)"
    ],
    correctAnswer: 1,
    explanation: "Because ProfessorRoom depends on only a portion of the composite key (ProfessorID), it has a partial dependency, breaking 2NF rules."
  },
  {
    id: 85,
    subject: "Information Management",
    difficulty: "Hard",
    question: "What is the primary condition needed to satisfy Third Normal Form (3NF) once 2NF is achieved?",
    choices: [
      "All attributes must be numeric keys",
      "No non-key attribute can exhibit a Transitive Dependency on any other non-key attribute",
      "Requires splitting all tables into single rows",
      "Must verify zero foreign pointers remain"
    ],
    correctAnswer: 1,
    explanation: "3NF demands that no non-key attribute depend on another non-key attribute (must eliminate transitive dependencies)."
  },
  {
    id: 86,
    subject: "Information Management",
    difficulty: "Medium",
    question: "Describe a database Deletion Anomaly.",
    choices: [
      "An inability to save variables because unrelated inputs are missing",
      "Losing vital, unintended records as an unintended side effect of deleting a specific tuple",
      "Failure to reflect item details uniformly across redundant records",
      "Failing to compile sql statements due to syntax errors"
    ],
    correctAnswer: 1,
    explanation: "A Deletion Anomaly occurs when deleting a record accidentally destroys unrelated data that can only exist inside that row."
  },
  {
    id: 87,
    subject: "Information Management",
    difficulty: "Medium",
    question: "Which database anomaly describes a situation where duplicate records are not updated uniformly?",
    choices: [
      "Insertion Anomaly",
      "Update Anomaly",
      "Deletion Anomaly",
      "Atomicity Anomaly"
    ],
    correctAnswer: 1,
    explanation: "An Update Anomaly occurs when redundant data is modified in one location but not another, leaving the database in an inconsistent state."
  },
  {
    id: 88,
    subject: "Information Management",
    difficulty: "Easy",
    question: "Which clause is utilized in SQL queries to specify conditional filter ranges?",
    choices: [
      "SELECT",
      "WHERE",
      "ORDER BY",
      "GROUP BY"
    ],
    correctAnswer: 1,
    explanation: "The WHERE clause acts as a conditional filter to return rows matching criteria."
  },
  {
    id: 89,
    subject: "Information Management",
    difficulty: "Easy",
    question: "How can SQL outputs be sorted in descending order?",
    choices: [
      "ORDER BY field DESC",
      "ORDER BY field ASC",
      "SORT DOWN field",
      "FILTER BY field LIMIT 0"
    ],
    correctAnswer: 0,
    explanation: "The ORDER BY clause sorts records, combined with the DESC modifier to sort datasets in descending order."
  },
  {
    id: 90,
    subject: "Information Management",
    difficulty: "Medium",
    question: "What term describes the system software that manages security, query optimization, and structured disk access schemas?",
    choices: [
      "CMS",
      "DBMS",
      "FTP",
      "DML"
    ],
    correctAnswer: 1,
    explanation: "A DBMS (Database Management System) manages storage, security, query execution, and data formatting."
  },
  {
    id: 91,
    subject: "Information Management",
    difficulty: "Easy",
    question: "What is the primary constraint of relational primary keys regarding NULL entries?",
    choices: [
      "They can hold up to 50% nulls",
      "They cannot contain any NULL values",
      "They only permit null values during development steps",
      "They reside as null when linked to foreign points"
    ],
    correctAnswer: 1,
    explanation: "Primary keys uniquely identify records, so they must be fully defined and cannot contain NULL values."
  },
  {
    id: 92,
    subject: "Information Management",
    difficulty: "Medium",
    question: "Which JOIN generates all possible Cartesian product combinations from both tables?",
    choices: [
      "LEFT JOIN",
      "CROSS JOIN",
      "INNER JOIN",
      "FULL JOIN"
    ],
    correctAnswer: 1,
    explanation: "A CROSS JOIN combines every row from the first table with every row from the second, producing a full Cartesian product."
  },
  {
    id: 93,
    subject: "Information Management",
    difficulty: "Hard",
    question: "Which structural database failure occurs when you cannot log new parent entry data because unrelated fields or key details are missing?",
    choices: [
      "Deletion Anomaly",
      "Insertion Anomaly",
      "Transitive Dependency",
      "Partial Dependency Conflict"
    ],
    correctAnswer: 1,
    explanation: "An Insertion Anomaly occurs when database configurations prevent inserting a record because unrelated fields must be defined first."
  },
  {
    id: 94,
    subject: "Information Management",
    difficulty: "Easy",
    question: "What SQL keyword adds new records to a database table?",
    choices: [
      "CREATE",
      "INSERT INTO",
      "UPDATE",
      "ADD ROW"
    ],
    correctAnswer: 1,
    explanation: "INSERT INTO is the standard DML keyword to add new data rows into a database structure."
  },
  {
    id: 95,
    subject: "Information Management",
    difficulty: "Easy",
    question: "What SQL statement is used to alter the email of student Nino to 'nino@pit.edu'?",
    choices: [
      "CHANGE student SET email = 'nino@pit.edu'",
      "UPDATE student SET email = 'nino@pit.edu' WHERE id_number='Nino'",
      "INSERT INTO student SET email = 'nino@pit.edu'",
      "ALTER TABLE student MODIFY email = 'nino@pit.edu'"
    ],
    correctAnswer: 1,
    explanation: "UPDATE modifies existing data fields. Combining it with SET and a WHERE clause updates specific records."
  },
  {
    id: 96,
    subject: "Information Management",
    difficulty: "Hard",
    question: "Why does the normalization process deliberately split single large database tables into separate interconnected tables?",
    choices: [
      "To bypass RAM constraints of older databases",
      "To eliminate data redundancy, streamline data updates, and prevent structural anomalies",
      "To allow the use of multiple primary keys in one table",
      "To increase loading speeds by avoiding index configurations"
    ],
    correctAnswer: 1,
    explanation: "Normalization organizes columns and tables to eliminate redundant data and secure integrity across the schema."
  },
  {
    id: 97,
    subject: "Information Management",
    difficulty: "Medium",
    question: "If a database table contains the columns (ProductID, OrderID, Quantity, CustomerName), and ProductID determines Quantity while OrderID determines Quantity, what key form describes (ProductID, OrderID)?",
    choices: [
      "Primary index key",
      "Composite Primary Key",
      "Foreign tracking key",
      "Candidate key index"
    ],
    correctAnswer: 1,
    explanation: "A key made of up to two or more attributes to uniquely identify records is a Composite Primary Key."
  },
  {
    id: 98,
    subject: "Information Management",
    difficulty: "Easy",
    question: "In what order are SELECT results returned unless sorted via ORDER BY?",
    choices: [
      "Ascending key order",
      "Descending entry dates",
      "Undefined (determined entirely by the DBMS engine optimization)",
      "Saves in alphabetic order of names"
    ],
    correctAnswer: 2,
    explanation: "Unless sorted with ORDER BY, SQL results are returned in an undefined, arbitrary order determined by the DBMS query optimizer."
  },
  {
    id: 99,
    subject: "Information Management",
    difficulty: "Medium",
    question: "Which of the following describes DDL operations?",
    choices: [
      "Modifying individual cells",
      "Defining, altering, or dropping database architecture layouts and schemas",
      "Streaming records over APIs",
      "Executing sub-query filtering calculations"
    ],
    correctAnswer: 1,
    explanation: "DDL operations (CREATE, ALTER, DROP) manage the structure of database objects (tables, indexes, columns) rather than the underlying data."
  },
  {
    id: 100,
    subject: "Information Management",
    difficulty: "Medium",
    question: "What is the primary key constraint definition regarding unique inputs?",
    choices: [
      "Duplicate values are allowed if the foreign key is different",
      "All primary key values must be completely unique",
      "Only primary keys using letters must be unique",
      "Duplicate primary key values are allowed"
    ],
    correctAnswer: 1,
    explanation: "Primary keys must be unique. Duplicate keys are rejected by relational database management systems because they break record identification boundaries."
  },

  // ==========================================
  // SUBJECT 5: Computer Graphics and Animation
  // ==========================================
  {
    id: 101,
    subject: "Computer Graphics and Animation",
    difficulty: "Easy",
    question: "Which digital graphic model is directed by mathematical coordinate paths, shapes, and formulas to scale infinitely without pixelation?",
    choices: [
      "Symmetric Raster Graphics",
      "Vector Graphics",
      "Bitonal Raster Graphics",
      "Lossy Pixel Matrix"
    ],
    correctAnswer: 1,
    explanation: "Vector Graphics (like SVG) use coordinate math and equations to scale infinitely without loss of quality."
  },
  {
    id: 102,
    subject: "Computer Graphics and Animation",
    difficulty: "Easy",
    question: "Which graphic model maps images to a fixed grid of color pixels, causing blurriness when scaled past native dimensions?",
    choices: [
      "Vector Graphics",
      "Raster Graphics",
      "Spline Bezier Graphics",
      "AI vector drawings"
    ],
    correctAnswer: 1,
    explanation: "Raster Graphics (like JPEG, PNG) map colors directly to pixel grids. Scaling causes pixelation."
  },
  {
    id: 103,
    subject: "Computer Graphics and Animation",
    difficulty: "Medium",
    question: "Why does the standard JPEG file format fail to support alpha channel transparency layers?",
    choices: [
      "It uses CMYK subtractive models strictly",
      "It implements lossy compression optimized purely for rich, continuous-tone photograph assets",
      "It restricts palettes to 256 colors",
      "It is code-driven"
    ],
    correctAnswer: 1,
    explanation: "JPEG uses lossy compression focused on natural photographs, omitting alpha channel transparency to save metadata space."
  },
  {
    id: 104,
    subject: "Computer Graphics and Animation",
    difficulty: "Easy",
    question: "Which of the following raster graphic formats implements lossless compression and robust alpha channel transparency tracking, making it ideal for UI assets?",
    choices: [
      "JPEG",
      "PNG",
      "GIF",
      "EPS"
    ],
    correctAnswer: 1,
    explanation: "PNG (Portable Network Graphics) supports lossless compression with alpha channel transparency."
  },
  {
    id: 105,
    subject: "Computer Graphics and Animation",
    difficulty: "Medium",
    question: "What is the primary limitation of the GIF file format concerning color palette depth?",
    choices: [
      "Vector grids only",
      "Restricted to a maximum 8-bit color palette depth (256 colors)",
      "Incompatible with web animations",
      "Requires CMYK physical ink mappings"
    ],
    correctAnswer: 1,
    explanation: "GIF is limited to an 8-bit color palette (256 colors), but natively supports simple looping frame animations."
  },
  {
    id: 106,
    subject: "Computer Graphics and Animation",
    difficulty: "Hard",
    question: "Where is the coordinate origin point (0, 0) located in standard digital screen layouts and canvas coordinate space mapping?",
    choices: [
      "The exact center of the screen viewport",
      "The top-left corner of the viewport",
      "The bottom-left corner of the viewport",
      "Determined dynamically by hardware"
    ],
    correctAnswer: 1,
    explanation: "Unlike Cartesian geometry, digital browser displays map the origin (0,0) to the top-left corner, with Y-coordinates increasing downwards."
  },
  {
    id: 107,
    subject: "Computer Graphics and Animation",
    difficulty: "Medium",
    question: "When rendering graphics on a web canvas, what coordinate changes are needed to move an object vertically straight up?",
    choices: [
      "X value increases, Y stays constant",
      "Y value decreases, X stays constant",
      "Both X and Y values increase",
      "Y value increases, X stays constant"
    ],
    correctAnswer: 1,
    explanation: "Moving straight up decreases the Y value (since Y increases downward in screen coordinates) while keeping X constant."
  },
  {
    id: 108,
    subject: "Computer Graphics and Animation",
    difficulty: "Hard",
    question: "Contrast the basic scientific rules defining the RGB and CMYK color spaces.",
    choices: [
      "RGB is subtractive (digital devices); CMYK is additive (printing)",
      "RGB is an additive color model blending light waves for emissive displays; CMYK is a subtractive color model combining inks for physical printing",
      "Both are subtractive color models",
      "RGB targets print, while CMYK runs on screens"
    ],
    correctAnswer: 1,
    explanation: "RGB blends red, green, and blue light waves (additive) to create white for displays. CMYK mixes physical ink wavelengths (subtractive) on paper, combining to create black."
  },
  {
    id: 109,
    subject: "Computer Graphics and Animation",
    difficulty: "Hard",
    question: "What terms define the workflow where an animator sets critical baseline position frames, and a rendering system auto-generates the intermediate motion states?",
    choices: [
      "Onion Skinning",
      "Rasterization",
      "Keyframing and Tweening",
      "Linear Point Interpolation"
    ],
    correctAnswer: 2,
    explanation: "Keyframes define outer boundaries. Tweening (in-betweening) is the rendering engine process of calculating intermediate values."
  },
  {
    id: 110,
    subject: "Computer Graphics and Animation",
    difficulty: "Medium",
    question: "What does the abbreviation FPS stand for, and what is the standard value target for fluid web browser animations?",
    choices: [
      "Fonts Per Screen, targeting 30 FPS",
      "Frames Per Second, targeting 60 FPS",
      "Floating Point System, targeting 120 FPS",
      "Fixed Pixel Standard, targeting 24 FPS"
    ],
    correctAnswer: 1,
    explanation: "FPS stands for Frames Per Second. Standard web animations target a fluid 60 FPS profile (one frame rendered roughly every 16.67ms)."
  },
  {
    id: 111,
    subject: "Computer Graphics and Animation",
    difficulty: "Hard",
    question: "Which process defines the computational rendering pipeline that translates mathematical vector shapes into physical grids of display pixels?",
    choices: [
      "Optimization",
      "Rasterization",
      "Tweening",
      "Pixel Mapping"
    ],
    correctAnswer: 1,
    explanation: "Rasterization is the process of converting vector graphics data into raster format (pixels) for display output."
  },
  {
    id: 112,
    subject: "Computer Graphics and Animation",
    difficulty: "Easy",
    question: "Which of the following is a native vector graphics extension supported on standard modern web browsers?",
    choices: [
      ".png",
      ".svg",
      ".gif",
      ".jpeg"
    ],
    correctAnswer: 1,
    explanation: "SVG is an XML-based vector graphics format natively rendered by browsers."
  },
  {
    id: 113,
    subject: "Computer Graphics and Animation",
    difficulty: "Medium",
    question: "What is the standard framerate baseline utilized for cinematic movie video content?",
    choices: [
      "12 FPS",
      "24 FPS",
      "30 FPS",
      "60 FPS"
    ],
    correctAnswer: 1,
    explanation: "Cinematic video content typically outputs at a standard 24 FPS baseline, as outlined in the reviewer."
  },
  {
    id: 114,
    subject: "Computer Graphics and Animation",
    difficulty: "Medium",
    question: "What are the three standard file formats associated with vector graphic design in design workflows?",
    choices: [
      "SVG, PNG, GIF",
      "SVG, AI, EPS",
      "JPEG, SVG, PDF",
      "PSD, PNG, ICO"
    ],
    correctAnswer: 1,
    explanation: "According to the reviewer, standard vector design formats include SVG (Scalable Vector Graphics), AI (Adobe Illustrator), and EPS (Encapsulated PostScript)."
  },
  {
    id: 115,
    subject: "Computer Graphics and Animation",
    difficulty: "Easy",
    question: "If you modify a vector image by scaling it to five times its original size, what change occurs in image quality?",
    choices: [
      "The graphic becomes blurry and pixelated",
      "The graphic scales infinitely with zero quality loss",
      "It loses opacity automatically",
      "The file size increases linearly"
    ],
    correctAnswer: 1,
    explanation: "Since vector images rely on coordinate math rather than fixed pixel grids, they scale infinitely with no degradation in quality."
  },
  {
    id: 116,
    subject: "Computer Graphics and Animation",
    difficulty: "Hard",
    question: "What are the minimum and maximum ranges for color intensity values per channel in a standard digital RGB color space?",
    choices: [
      "0 to 100 per channel",
      "0 to 255 per channel",
      "1 to 1000 per channel",
      "#00 to #FFF per channel"
    ],
    correctAnswer: 1,
    explanation: "Standard 8-bit RGB color spaces map intensity coordinates from 0 (no color, black) to 255 (maximum intensity per channel)."
  },
  {
    id: 117,
    subject: "Computer Graphics and Animation",
    difficulty: "Easy",
    question: "Which of the following is designated as a subtractive color model used in printing?",
    choices: [
      "RGB",
      "CMYK",
      "HSL",
      "Hexadecimal Code"
    ],
    correctAnswer: 1,
    explanation: "CMYK (Cyan, Magenta, Yellow, Key/Black) is a subtractive color space tailored for physical printed papers."
  },
  {
    id: 118,
    subject: "Computer Graphics and Animation",
    difficulty: "Medium",
    question: "What is the key difference between keyframes and tweening operations?",
    choices: [
      "They are identical",
      "Keyframes define start/end configurations, while tweening computes the intermediate values",
      "Keyframes are raster components, whereas tweening belongs to vector shapes",
      "Keyframes require physical printing, while tweening is purely digital"
    ],
    correctAnswer: 1,
    explanation: "Keyframes establish checkpoints for animation properties, and tweening uses mathematical interpolation to fill the frames in between."
  },
  {
    id: 119,
    subject: "Computer Graphics and Animation",
    difficulty: "Medium",
    question: "On a web display monitor, what coordinate changes occur when moving an object horizontally to the left?",
    choices: [
      "X value increases, Y stays constant",
      "X value decreases, Y stays constant",
      "Y value increases, X stays constant",
      "Y value decreases, X stays constant"
    ],
    correctAnswer: 1,
    explanation: "Moving left on a screen moves away from coordinates, decreasing the X-value while leaving Y unchanged."
  },
  {
    id: 120,
    subject: "Computer Graphics and Animation",
    difficulty: "Hard",
    question: "At 60 frames per second (FPS), how many milliseconds are allocated to calculate, render, and draw a single display frame?",
    choices: [
      "41.67 milliseconds",
      "16.67 milliseconds",
      "8.33 milliseconds",
      "24 milliseconds"
    ],
    correctAnswer: 1,
    explanation: "Dividing 1 second (1000 milliseconds) by 60 frames yields approximately 16.67 milliseconds per frame."
  },
  {
    id: 121,
    subject: "Computer Graphics and Animation",
    difficulty: "Easy",
    question: "What does the 'K' stand for in the CMYK color space?",
    choices: [
      "Krypton",
      "Key/Black",
      "Kallium",
      "Kelly Green"
    ],
    correctAnswer: 1,
    explanation: "The 'K' in CMYK stands for 'Key,' representing the black ink plate used to align colors in printing processes."
  },
  {
    id: 122,
    subject: "Computer Graphics and Animation",
    difficulty: "Hard",
    question: "Why are vector formats preferred over raster formats for high-resolution logo designs?",
    choices: [
      "They generate smaller file sizes regardless of detail",
      "They scale cleanly to any size (from business cards to billboards) without quality loss",
      "They support millions of more colors than raster models",
      "They can be easily edited using basic text editors like Notepad"
    ],
    correctAnswer: 1,
    explanation: "Vector files use math instead of fixed pixels, allowing designs to scale cleanly from tiny icons to massive billboards without quality loss."
  },
  {
    id: 123,
    subject: "Computer Graphics and Animation",
    difficulty: "Easy",
    question: "Which of the following formats should be chosen for animating simple banners on the web?",
    choices: [
      "JPEG",
      "PNG",
      "GIF",
      "SVG static drawing"
    ],
    correctAnswer: 2,
    explanation: "GIF files support basic frame-by-frame looping animations natively in all standard web browsers."
  },
  {
    id: 124,
    subject: "Computer Graphics and Animation",
    difficulty: "Medium",
    question: "How are digital display screens lit to produce colors?",
    choices: [
      "By shining light through pigments (subtractive model)",
      "By projecting and blending additive Red, Green, and Blue light waves",
      "By reflecting natural ambient light off paper",
      "By static ink absorption methods"
    ],
    correctAnswer: 1,
    explanation: "Emissive screens use the RGB color space, injecting Red, Green, and Blue light waves directly into the user's eyes (additive)."
  },
  {
    id: 125,
    subject: "Computer Graphics and Animation",
    difficulty: "Hard",
    question: "What physical mechanism drives the illusion of smooth continuous motion when images are presented sequentially in animations?",
    choices: [
      "The Moire Illusion",
      "Persistence of Vision",
      "Linear Color Blending",
      "Alpha Transparency masking"
    ],
    correctAnswer: 1,
    explanation: "The persistence of vision retains an image in the brain for a fraction of a second, blending rapid sequential frames into a seamless continuous flow."
  },

  // ==========================================
  // SUBJECT 6: Integrative Programming (PHP)
  // ==========================================
  {
    id: 126,
    subject: "Integrative Programming (PHP)",
    difficulty: "Easy",
    question: "Which statement is true regarding the execution environment of PHP scripts?",
    choices: [
      "PHP runs natively within client web browsers",
      "PHP code executes entirely on the web server (e.g., Apache, Nginx) before outputting plain HTML to the browser",
      "PHP requires compilation into desktop computer binaries",
      "PHP files are processed by HTML5 canvas modules"
    ],
    correctAnswer: 1,
    explanation: "PHP is a server-side scripting language. The server processes raw PHP logic and returns standard HTML text to the client web browser."
  },
  {
    id: 127,
    subject: "Integrative Programming (PHP)",
    difficulty: "Easy",
    question: "What is the required prefix indicator for all variables in PHP syntax?",
    choices: [
      "&",
      "#",
      "$",
      "@"
    ],
    correctAnswer: 2,
    explanation: "All variable identifiers in PHP must begin with the dollar sign ($) symbol."
  },
  {
    id: 128,
    subject: "Integrative Programming (PHP)",
    difficulty: "Medium",
    question: "What is the output behavior of opening a raw .php file directly via local file path access without an active web server running?",
    choices: [
      "Runs perfectly as client Javascript",
      "Allows full database reading",
      "Displays raw code strings as plain text or triggers file downloads",
      "Automatically displays PHP error logs"
    ],
    correctAnswer: 2,
    explanation: "Without a web server to interpret and execute the PHP engine, the browser will treat the file as a basic text stream or download candidate."
  },
  {
    id: 129,
    subject: "Integrative Programming (PHP)",
    difficulty: "Easy",
    question: "Which operator is used to perform string concatenation in PHP?",
    choices: [
      "+",
      "&",
      ". (period)",
      "&&"
    ],
    correctAnswer: 2,
    explanation: "PHP uses the period (.) operator to concatenate separate strings together into a unified sequence."
  },
  {
    id: 130,
    subject: "Integrative Programming (PHP)",
    difficulty: "Medium",
    question: "What is the expected output of this PHP statement: echo \"Hello\" . \" \" . \"World\";?",
    choices: [
      "Hello. .World",
      "Hello World",
      "Hello+ +World",
      "Error: Semicolon Misplaced"
    ],
    correctAnswer: 1,
    explanation: "The period acts as a string concatenation operator. Joining 'Hello', a space (' '), and 'World' produces 'Hello World'."
  },
  {
    id: 131,
    subject: "Integrative Programming (PHP)",
    difficulty: "Medium",
    question: "Contrast standard equality (==) and strict identity (===) operators in PHP execution.",
    choices: [
      "They perform identical actions",
      "Standard Equality (==) compares values after performing type coercion, while Strict Identity (===) evaluates both value equivalence and data types without coercion",
      "Strict Identity only compares integers",
      "Standard Equality is server-side while Strict Identity is client-side"
    ],
    correctAnswer: 1,
    explanation: "The double equals (==) operator allows PHP type coercion before matching, while the triple equals (===) operator requires both the value and type to match."
  },
  {
    id: 132,
    subject: "Integrative Programming (PHP)",
    difficulty: "Medium",
    question: "Based on PHP comparison rules, what do the evaluations '5' == 5 and '5' === 5 return?",
    choices: [
      "false and true",
      "true and false",
      "true and true",
      "false and false"
    ],
    correctAnswer: 1,
    explanation: "'5' == 5 evaluates to true because of type coercion. '5' === 5 is false because '5' is a string and 5 is an integer."
  },
  {
    id: 133,
    subject: "Integrative Programming (PHP)",
    difficulty: "Hard",
    question: "Which PHP built-in function evaluates if a variable has been declared and is not NULL before processing form submissions?",
    choices: [
      "empty()",
      "count()",
      "isset()",
      "verify()"
    ],
    correctAnswer: 2,
    explanation: "The isset() function verifies if a variable exists and is not null. It is useful for validating form parameters before execution."
  },
  {
    id: 134,
    subject: "Integrative Programming (PHP)",
    difficulty: "Hard",
    question: "What is the primary action of the empty() function in PHP variable validation?",
    choices: [
      "Wipes clean a variable's data",
      "Checks if a variable holds a falsey value (like an empty string, 0, NULL, or empty array)",
      "Checks if a variable count exceeds index limits",
      "Throws errors if variables contain strings"
    ],
    correctAnswer: 1,
    explanation: "The empty() function evaluates whether a variable contains a falsey or empty value, including '', 0, NULL, or empty arrays."
  },
  {
    id: 135,
    subject: "Integrative Programming (PHP)",
    difficulty: "Hard",
    question: "Which predefined superglobal associative array gathers parameters passed securely via the HTTP request body?",
    choices: [
      "$_GET",
      "$_POST",
      "$_REQUEST_BODY",
      "$_PARAMS"
    ],
    correctAnswer: 1,
    explanation: "$_POST captures parameters sent in HTTP POST requests, hiding details from direct URL query visibility."
  },
  {
    id: 136,
    subject: "Integrative Programming (PHP)",
    difficulty: "Medium",
    question: "Which superglobal is used to capture parameters passed publicly through URL query strings?",
    choices: [
      "$_POST",
      "$_GET",
      "$_SERVER",
      "$_REQUEST"
    ],
    correctAnswer: 1,
    explanation: "The $_GET superglobal collects parameters appended to target browser URL query parameters."
  },
  {
    id: 137,
    subject: "Integrative Programming (PHP)",
    difficulty: "Easy",
    question: "What mandatory character sequence must terminate standard PHP statements?",
    choices: [
      ". (period)",
      "; (semicolon)",
      ": (colon)",
      "NEWLINE character"
    ],
    correctAnswer: 1,
    explanation: "Every standard statement in PHP must terminate with a semicolon (;). Failure to write this triggers syntax errors."
  },
  {
    id: 138,
    subject: "Integrative Programming (PHP)",
    difficulty: "Medium",
    question: "Which PHP built-in function calculates and returns the number of elements contained in an array?",
    choices: [
      "size()",
      "count()",
      "length()",
      "volume()"
    ],
    correctAnswer: 1,
    explanation: "The count() function returns the total number of elements inside active array collections."
  },
  {
    id: 139,
    subject: "Integrative Programming (PHP)",
    difficulty: "Medium",
    question: "Define the core attributes of a PHP Associative Array compared to indexed arrays.",
    choices: [
      "They only permit boolean keys",
      "They use descriptive, custom text strings as keys instead of sequential integers",
      "They contain static class variables",
      "They can only save HTML snippets"
    ],
    correctAnswer: 1,
    explanation: "Associative arrays use descriptive key mappings (strings) instead of simple incremental numerical indices."
  },
  {
    id: 140,
    subject: "Integrative Programming (PHP)",
    difficulty: "Easy",
    question: "Which characters represent single-line comments in PHP layout blocks?",
    choices: [
      "// or #",
      "/* or */",
      "<!-- or -->",
      "-- or %"
    ],
    correctAnswer: 0,
    explanation: "Single-line comments in PHP use double slashes (//) or hash symbols (#), while multi-line comments use /* and */."
  },
  {
    id: 141,
    subject: "Integrative Programming (PHP)",
    difficulty: "Medium",
    question: "What are the two primary commands used to print output text streams in PHP?",
    choices: [
      "echo or print",
      "display or write",
      "out or response",
      "document.write or console.log"
    ],
    correctAnswer: 0,
    explanation: "Both echo and print are built-in language constructs used to output raw strings to the stream."
  },
  {
    id: 142,
    subject: "Integrative Programming (PHP)",
    difficulty: "Medium",
    question: "Given $prof = ['subject' => 'PHP', 'school' => 'PIT']; parse $prof['subject'].",
    choices: [
      "Returns 'PIT'",
      "Returns 'PHP'",
      "Throws an undefined index error",
      "Prints array contents entirely"
    ],
    correctAnswer: 1,
    explanation: "Accessing the associative key 'subject' retrieves its mapped value, which is 'PHP'."
  },
  {
    id: 143,
    subject: "Integrative Programming (PHP)",
    difficulty: "Hard",
    question: "Why is PHP classified as a loosely, dynamically typed programming language?",
    choices: [
      "Because variable scopes always default to global templates",
      "Because variables adapt to values assigned to them without requiring explicit type declarations",
      "Because it does not support class OOP methods",
      "Because it only runs inside lightweight servers"
    ],
    correctAnswer: 1,
    explanation: "In PHP, variables do not have fixed types. They adapt to whatever value is assigned at runtime."
  },
  {
    id: 144,
    subject: "Integrative Programming (PHP)",
    difficulty: "Easy",
    question: "What does the PHP acronym stand for?",
    choices: [
      "Protocol Hosting Processor",
      "PHP: Hypertext Preprocessor",
      "Private HTML Planner",
      "Preloaded Home Page"
    ],
    correctAnswer: 1,
    explanation: "PHP is a recursive acronym standing for PHP: Hypertext Preprocessor."
  },
  {
    id: 145,
    subject: "Integrative Programming (PHP)",
    difficulty: "Hard",
    question: "If a variable is declared inside a function scope in PHP, how is it accessed from a global script context?",
    choices: [
      "Accessed directly by its name",
      "Using the 'global' keyword modifier or the $GLOBALS superglobal array",
      "Variables inside function scopes are automatically global",
      "They can never be accessed globally"
    ],
    correctAnswer: 1,
    explanation: "PHP keeps scopes isolated. Function variables are local but can be accessed globally via the 'global' keyword or $GLOBALS superglobal."
  },
  {
    id: 146,
    subject: "Integrative Programming (PHP)",
    difficulty: "Easy",
    question: "Which of these expressions will evaluate to true using the empty() function?",
    choices: [
      "empty(0)",
      "empty('text')",
      "empty(100)",
      "empty(true)"
    ],
    correctAnswer: 0,
    explanation: "The value 0 is evaluated as a falsey integer in PHP, making empty(0) return true."
  },
  {
    id: 147,
    subject: "Integrative Programming (PHP)",
    difficulty: "Medium",
    question: "What index syntax represents standard arrays inside PHP code blocks?",
    choices: [
      "$val = array('a', 'b'); or $val = ['a', 'b'];",
      "$val = list('a', 'b');",
      "$val = { 'a', 'b' };",
      "$val = map('a', 'b');"
    ],
    correctAnswer: 0,
    explanation: "PHP supports both the traditional array() function constructor and modern short bracket [] array syntax."
  },
  {
    id: 148,
    subject: "Integrative Programming (PHP)",
    difficulty: "Medium",
    question: "What is the result of count([1, 2, 3]) in PHP?",
    choices: [
      "1",
      "2",
      "3",
      "Error"
    ],
    correctAnswer: 2,
    explanation: "The count() function calculates the direct size of the array, returning 3."
  },
  {
    id: 149,
    subject: "Integrative Programming (PHP)",
    difficulty: "Hard",
    question: "What security risk is primarily mitigated by accessing HTTP inputs with $_POST rather than $_GET wrapper lines?",
    choices: [
      "Prevents sensitive values (like passwords) from appearing in plain-text URL browser histories and server access logs",
      "Encrypts data automatically before transport",
      "Saves databases from SQL Injection directly",
      "Increases page load speeds"
    ],
    correctAnswer: 0,
    explanation: "$_POST passes values inside the HTTP request body instead of appending them to the browser URL tail (which gets cached)."
  },
  {
    id: 150,
    subject: "Integrative Programming (PHP)",
    difficulty: "Easy",
    question: "Are PHP variables case-sensitive?",
    choices: [
      "No, variable casing does not matter",
      "Yes, $User and $user represent separate variables",
      "Only if they are class constants",
      "Only in Windows servers"
    ],
    correctAnswer: 1,
    explanation: "All variable identifiers in PHP are strictly case-sensitive. Casing changes will treat them as different memory identifiers."
  },

  // ==========================================
  // SUBJECT 7: Computer Networking
  // ==========================================
  {
    id: 151,
    subject: "Computer Networking",
    difficulty: "Easy",
    question: "Which of the following geographical network scopes connects computing devices within a localized area like a lab, office, or building?",
    choices: [
      "WAN",
      "LAN",
      "MAN",
      "PAN"
    ],
    correctAnswer: 1,
    explanation: "A LAN (Local Area Network) is a localized network connection offering high speeds and low error rates."
  },
  {
    id: 152,
    subject: "Computer Networking",
    difficulty: "Easy",
    question: "Which geographical network scope spans wide regions (linking cities, states, or countries) and typically relies on leased telecommunication lines?",
    choices: [
      "LAN",
      "WAN",
      "PAN",
      "CAN"
    ],
    correctAnswer: 1,
    explanation: "A WAN (Wide Area Network) covers large geographical scopes, with the Internet being the prime example."
  },
  {
    id: 153,
    subject: "Computer Networking",
    difficulty: "Medium",
    question: "Which topology structure connects each node directly to a single centralized hub or switch device?",
    choices: [
      "Bus Topology",
      "Star Topology",
      "Mesh Topology",
      "Ring Topology"
    ],
    correctAnswer: 1,
    explanation: "In a Star topology, all devices connect to a central hub. If one peripheral line fails, only that node goes down."
  },
  {
    id: 154,
    subject: "Computer Networking",
    difficulty: "Hard",
    question: "Calculate the total required cabling linkages needed to establish a Full Mesh Topology composed of n devices.",
    choices: [
      "n - 1",
      "n^2",
      "n(n - 1) / 2",
      "2n"
    ],
    correctAnswer: 2,
    explanation: "A Full Mesh topology requires direct lines to all other devices, calculated by the combination formula: n(n - 1) / 2."
  },
  {
    id: 155,
    subject: "Computer Networking",
    difficulty: "Medium",
    question: "What failure scenario occurs in a Bus Topology if the main center backbone cable breaks or misses proper termination?",
    choices: [
      "Only the broken device goes down",
      "Signal reflection disrupts communication across the entire segment, disabling the network",
      "The network automatically switches to a star layout",
      "Power overload damages connected devices"
    ],
    correctAnswer: 1,
    explanation: "A Bus topology requires a terminated central cable. A break causes signal reflection, which disrupts communications and halts the entire segment."
  },
  {
    id: 156,
    subject: "Computer Networking",
    difficulty: "Easy",
    question: "The Open Systems Interconnection (OSI) reference model abstracts network communication into how many distinct sequential layer steps?",
    choices: [
      "4 layers",
      "5 layers",
      "7 layers",
      "9 layers"
    ],
    correctAnswer: 2,
    explanation: "The ISO/OSI architecture breaks network communications down into 7 logical layers."
  },
  {
    id: 157,
    subject: "Computer Networking",
    difficulty: "Medium",
    question: "Which layer of the seven-layer OSI model handles logical packet routing, path determination, and IP addressing across subnets?",
    choices: [
      "Data Link Layer (Layer 2)",
      "Network Layer (Layer 3)",
      "Transport Layer (Layer 4)",
      "Physical Layer (Layer 1)"
    ],
    correctAnswer: 1,
    explanation: "Layer 3 (Network Layer) is responsible for routing, addressing, and path determination. Routers operate at this layer."
  },
  {
    id: 158,
    subject: "Computer Networking",
    difficulty: "Medium",
    question: "Which Layer 2 OSI device is responsible for physical hardware mapping, MAC address routing, and error checking inside frames?",
    choices: [
      "Repeater",
      "Switch",
      "Router",
      "Domain Gateway"
    ],
    correctAnswer: 1,
    explanation: "Switches operate at Layer 2 (Data Link Layer), mapping MAC addresses to forward data frames to specific devices."
  },
  {
    id: 159,
    subject: "Computer Networking",
    difficulty: "Hard",
    question: "Describe the core data unit types associated with Physical, Data Link, Network, and Transport layers, respectively.",
    choices: [
      "Packets, Frames, Segments, Bits",
      "Bits, Frames, Packets, Segments (TCP) / Datagrams (UDP)",
      "Frames, Packets, Segments, Messages",
      "Bits, packes, frames, envelopes"
    ],
    correctAnswer: 1,
    explanation: "The OSI data units: Physical (Bits), Data Link (Frames), Network (Packets), and Transport (Segments/Datagrams)."
  },
  {
    id: 160,
    subject: "Computer Networking",
    difficulty: "Hard",
    question: "Contrast the fundamental communication properties of the TCP and UDP protocols.",
    choices: [
      "TCP is fast and connectionless; UDP is reliable and connection-oriented",
      "TCP is connection-oriented, offering reliable delivery via three-way handshakes and error checking; UDP is a lightweight, connectionless protocol prioritizing speed over reliability",
      "TCP belongs to Layer 3, UDP is Layer 4",
      "TCP is only for websites; UDP is only for local storage"
    ],
    correctAnswer: 1,
    explanation: "TCP is connection-oriented and guarantees reliable data delivery. UDP is lightweight and connectionless, prioritizing speed."
  },
  {
    id: 161,
    subject: "Computer Networking",
    difficulty: "Medium",
    question: "Identify the bit sizes of standard IPv4 and IPv6 internet addresses, respectively.",
    choices: [
      "16-bit and 32-bit",
      "32-bit and 128-bit",
      "32-bit and 64-bit",
      "128-bit and 256-bit"
    ],
    correctAnswer: 1,
    explanation: "IPv4 uses 32-bit addresses in dotted-decimal format. IPv6 uses 128-bit addresses in colon-hexadecimal notation."
  },
  {
    id: 162,
    subject: "Computer Networking",
    difficulty: "Easy",
    question: "What is the default subnet mask utilized in standard Class C IPv4 networking blocks?",
    choices: [
      "255.0.0.0",
      "255.255.0.0",
      "255.255.255.0",
      "255.255.255.255"
    ],
    correctAnswer: 2,
    explanation: "A standard Class C network layout uses a default mask of 255.255.255.0 (or /24)."
  },
  {
    id: 163,
    subject: "Computer Networking",
    difficulty: "Medium",
    question: "Which command protocol translates human-readable domain names (e.g., google.com) into machine-routable IP addresses?",
    choices: [
      "DHCP",
      "DNS",
      "ARP",
      "IMAP"
    ],
    correctAnswer: 1,
    explanation: "DNS (Domain Name System) acts as the phonebook of the internet, mapping human-readable domains to numeric IP addresses."
  },
  {
    id: 164,
    subject: "Computer Networking",
    difficulty: "Hard",
    question: "Which network protocol is responsible for dynamically assigning IP addresses, gateways, and subnet masks to host devices automatically upon connecting?",
    choices: [
      "DNS",
      "ARP",
      "DHCP",
      "HTTP"
    ],
    correctAnswer: 2,
    explanation: "DHCP (Dynamic Host Configuration Protocol) automatically assigns IP configurations to clients, preventing address conflicts."
  },
  {
    id: 165,
    subject: "Computer Networking",
    difficulty: "Hard",
    question: "Which protocol maps a logical Layer 3 IP address to a physical Layer 2 MAC address on local network segments?",
    choices: [
      "DNS",
      "DHCP",
      "ARP",
      "TCP"
    ],
    correctAnswer: 2,
    explanation: "ARP (Address Resolution Protocol) maps logical IP addresses directly to physical MAC hardware addresses."
  },
  {
    id: 166,
    subject: "Computer Networking",
    difficulty: "Easy",
    question: "Which layer of the OSI model manages the physical hardware cables, voltage levels, and raw bit streams?",
    choices: [
      "Physical Layer (Layer 1)",
      "Data Link Layer (Layer 2)",
      "Session Layer (Layer 5)",
      "Application Layer (Layer 7)"
    ],
    correctAnswer: 0,
    explanation: "The Physical Layer (Layer 1) handles transmission of raw unstructured bit streams over physical mediums (cables, hubs)."
  },
  {
    id: 167,
    subject: "Computer Networking",
    difficulty: "Medium",
    question: "What happens to the remaining nodes in a Star topology if one peripheral device cable is broken or unplugged?",
    choices: [
      "The entire network collapses",
      "Only that single node loses connectivity, while other nodes operate unaffected",
      "The switch devices automatically restart",
      "All nodes slow down by 50%"
    ],
    correctAnswer: 1,
    explanation: "Because devices connect via dedicated lines to a central switch in a Star layout, a single cable fault only isolates that device."
  },
  {
    id: 168,
    subject: "Computer Networking",
    difficulty: "Easy",
    question: "What is the primary transmission unit format of Layer 2 (Data Link) communications?",
    choices: [
      "Bits",
      "Frames",
      "Packets",
      "Segments"
    ],
    correctAnswer: 1,
    explanation: "The Data Link layer formats logical bit data streams into concrete chunks termed 'Frames' for physical hardware transmission."
  },
  {
    id: 169,
    subject: "Computer Networking",
    difficulty: "Medium",
    question: "Which layer of the seven-layer OSI model provides protocols supporting user-facing interfaces (such as HTTP, DNS, FTP, SMTP)?",
    choices: [
      "Presentation Layer",
      "Session Layer",
      "Transport Layer",
      "Application Layer"
    ],
    correctAnswer: 3,
    explanation: "The Application Layer (Layer 7) hosts the high-level protocols that interface with user software applications."
  },
  {
    id: 170,
    subject: "Computer Networking",
    difficulty: "Hard",
    question: "Which OSI level manages data formatting, compression, encryption and decryption sequences?",
    choices: [
      "Application Layer (Layer 7)",
      "Presentation Layer (Layer 6)",
      "Session Layer (Layer 5)",
      "Transport Layer (Layer 4)"
    ],
    correctAnswer: 1,
    explanation: "Layer 6 (Presentation Layer) handles syntactic conversion, data compression, and encryption/decryption."
  },
  {
    id: 171,
    subject: "Computer Networking",
    difficulty: "Medium",
    question: "What does the 'three-way handshake' establish in standard TCP communications?",
    choices: [
      "An automated file download pathway",
      "A synchronized, reliable connection state between client and server BEFORE actual data transport occurs",
      "An address translation index",
      "Speed optimization across routers"
    ],
    correctAnswer: 1,
    explanation: "The TCP three-way handshake (SYN, SYN-ACK, ACK) establishes a synchronized connection state before any payload data is sent."
  },
  {
    id: 172,
    subject: "Computer Networking",
    difficulty: "Easy",
    question: "Which of the following IPv4 addresses represents a valid loopback or local host indicator?",
    choices: [
      "192.168.1.1",
      "127.0.0.1",
      "255.255.255.255",
      "0.0.0.0"
    ],
    correctAnswer: 1,
    explanation: "By standard networking specifications, the 127.0.0.1 address is reserved as the loopback local host address on any device."
  },
  {
    id: 173,
    subject: "Computer Networking",
    difficulty: "Medium",
    question: "What layer of the OSI model establishes, manages, and terminates logical communication sessions between applications?",
    choices: [
      "Presentation Layer",
      "Session Layer",
      "Transport Layer",
      "Network Layer"
    ],
    correctAnswer: 1,
    explanation: "The Session Layer (Layer 5) is responsible for setting up, managing, and tearing down connection sessions between applications."
  },
  {
    id: 174,
    subject: "Computer Networking",
    difficulty: "Easy",
    question: "What notation is used to write standard IPv6 addresses?",
    choices: [
      "Dotted-decimal notation (with periods)",
      "Hexadecimal notation (with colons)",
      "Plain binary strings",
      "ASCII characters only"
    ],
    correctAnswer: 1,
    explanation: "IPv6 addresses are written in colon-hexadecimal notation, grouping 128 bits into blocks of hexadecimal values."
  },
  {
    id: 175,
    subject: "Computer Networking",
    difficulty: "Hard",
    question: "What standard device runs at Layer 3 (Network Layer) to find paths and forward packets across different subnets?",
    choices: [
      "Hardware Switch",
      "Router",
      "Physical Hub",
      "Repeater block"
    ],
    correctAnswer: 1,
    explanation: "Routers operate at Layer 3 of the OSI model, using logical IP addresses to direct packet traffic across subnets."
  }
];

export const SUBJECTS_LIST = [
  { id: "dsa", name: "Data Structures and Algorithms", icon: "Boxes", color: "from-blue-500 to-indigo-600" },
  { id: "oop", name: "Object-Oriented Programming", icon: "CodeXml", color: "from-purple-500 to-pink-600" },
  { id: "web", name: "Web Systems and Technologies", icon: "Globe", color: "from-emerald-500 to-teal-600" },
  { id: "info", name: "Information Management", icon: "Database", color: "from-amber-500 to-orange-600" },
  { id: "graphics", name: "Computer Graphics and Animation", icon: "Palette", color: "from-rose-500 to-red-600" },
  { id: "php", name: "Integrative Programming (PHP)", icon: "Cpu", color: "from-cyan-500 to-blue-600" },
  { id: "networking", name: "Computer Networking", icon: "Network", color: "from-violet-500 to-purple-600" }
];
